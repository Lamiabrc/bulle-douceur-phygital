import os, re, yaml, psycopg
from typing import Optional, Dict, Any, Tuple, List
from .advise import DATABASE_URL  # on réutilise la même config DB

# Chargement profils & règles
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
PROFILES_PATH = os.path.join(BASE_DIR, "expert_profiles.yaml")
ROUTING_PATH  = os.path.join(BASE_DIR, "routing.yaml")

PROFILES = {}
if os.path.exists(PROFILES_PATH):
    data = yaml.safe_load(open(PROFILES_PATH, "r", encoding="utf-8")) or {}
    for p in data.get("profiles", []):
        PROFILES[p["id"]] = p

RULES = yaml.safe_load(open(ROUTING_PATH, "r", encoding="utf-8")) if os.path.exists(ROUTING_PATH) else {"profiles":{}, "weights":{}}
W_RULE = float(RULES.get("weights",{}).get("rule_keywords", 1.0))
W_SIG  = float(RULES.get("weights",{}).get("user_signals", 0.8))
W_ZS   = float(RULES.get("weights",{}).get("zero_shot", 1.2))
USER_TAGS = RULES.get("user_signal_tags", {})

# --- util: normaliser texte
def _norm(s: str)->str:
    return re.sub(r"\s+", " ", s.lower()).strip()

# --- récupérer des signaux simples pour un user (tags besoin)
FEATURE_SQL = """
with base as (
  select ts::date as d, workload, strain, disconnect
  from checkins
  where user_id = %(uid)s and ts >= now() - interval '30 days'
)
select
  max(workload) >= 4 as high_workload,
  max(strain)   >= 4 as high_strain,
  coalesce(min(disconnect),5) <= 2 as low_disconnect
from base;
"""

def _user_need_tags(user_id: Optional[str]) -> List[str]:
    if not user_id or not DATABASE_URL: return []
    with psycopg.connect(DATABASE_URL) as conn, conn.cursor() as cur:
        cur.execute(FEATURE_SQL, {"uid": user_id})
        row = cur.fetchone()
        if not row: return []
        needs = []
        high_workload, high_strain, low_disc = row
        if high_workload: needs += ["charge","deconnexion"]
        if high_strain:   needs += ["ergonomie"]
        if low_disc:      needs += ["deconnexion","sommeil"]
        # uniq
        return list(dict.fromkeys(needs))

# --- zero-shot: similarité question ↔ description des profils (embeddings)
# Utilise le même provider que /advise (openai|mistral) via env var PROVIDER_ROUTER
def _embed(text: str, provider: str) -> List[float]:
    text = text.replace("\n", " ")
    if provider == "mistral":
        from mistralai import Mistral
        client = Mistral(api_key=os.getenv("MISTRAL_API_KEY"))
        out = client.embeddings.create(model="mistral-embed", inputs=[text])
        return out.data[0].embedding
    else:
        from openai import OpenAI
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        out = client.embeddings.create(model="text-embedding-3-small", input=text)
        return out.data[0].embedding

def _cos(a: List[float], b: List[float]) -> float:
    import math
    num = sum(x*y for x,y in zip(a,b))
    da = math.sqrt(sum(x*x for x in a)) + 1e-9
    db = math.sqrt(sum(y*y for y in b)) + 1e-9
    return num/(da*db)

# Pré-embed des descriptions de profils
PROFILE_EMBEDS: Dict[str, List[float]] = {}

def _get_profile_desc(pid: str) -> str:
    p = PROFILES.get(pid) or {}
    scope = ", ".join(p.get("scope", []))
    tone  = p.get("tone","")
    return f"Profil {pid}. Ton: {tone}. Domaines: {scope}."

def _ensure_profile_embeds(provider: str):
    if PROFILE_EMBEDS: return
    for pid in PROFILES.keys():
        PROFILE_EMBEDS[pid] = _embed(_get_profile_desc(pid), provider)

def choose_profile(question: str, user_id: Optional[str], provider: str = "openai") -> Tuple[str, Dict[str, Any]]:
    q = _norm(question)
    # 1) score par mots-clés
    scores = {pid: 0.0 for pid in PROFILES.keys()}
    hits: Dict[str, Any] = {pid: {"keywords":[],"signals":[],"zero_shot":0.0} for pid in PROFILES.keys()}

    for pid, cfg in RULES.get("profiles", {}).items():
        if pid not in scores: continue
        kws_any = [w.lower() for w in cfg.get("keywords_any", [])]
        kws_not = [w.lower() for w in cfg.get("keywords_not", [])]
        if any(w in q for w in kws_not):
            continue
        kw_hits = [w for w in kws_any if w in q]
        if kw_hits:
            scores[pid] += W_RULE * len(kw_hits)
            hits[pid]["keywords"] = kw_hits

    # 2) score par signaux utilisateur
    needs = _user_need_tags(user_id)
    for pid in scores.keys():
        boost = 0
        for tag, synonyms in USER_TAGS.items():
            if tag in needs:
                # map simple
                if pid == "expert-juridique" and tag in ("deconnexion",):
                    boost += 1
                if pid == "expert-qvt" and tag in ("charge","ergonomie","deconnexion"):
                    boost += 1
                if pid == "prof-de-yoga" and tag in ("sommeil",):
                    boost += 1
                if pid == "psy-coach" and tag in ("charge","sommeil"):
                    boost += 0.5
        if boost:
            scores[pid] += W_SIG * boost
            hits[pid]["signals"] = needs

    # 3) zero-shot sémantique (embeddings)
    try:
        _ensure_profile_embeds(provider)
        qvec = _embed(q, provider)
        for pid, pvec in PROFILE_EMBEDS.items():
            sim = _cos(qvec, pvec)  # 0..1 approx
            scores[pid] += W_ZS * max(sim, 0)
            hits[pid]["zero_shot"] = sim
    except Exception:
        pass  # si pas de clé, on reste en règles

    # 4) décision
    chosen = max(scores.items(), key=lambda x: x[1])[0]
    reasons = {"scores": scores, "hits": hits, "needs": needs}
    return chosen, reasons
