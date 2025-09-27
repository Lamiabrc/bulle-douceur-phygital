from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, Optional
import os
import psycopg

# ---------------------- config ----------------------
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL missing")

app = FastAPI(title="QVT Box AI Service", version="0.3.0")

# ---------------------- SQL snippets ----------------------
FEATURE_SQL = """
with base as (
  select ts, mood, energy, workload, strain, climate, disconnect
  from checkins
  where user_id=%(user_id)s and ts >= now() - interval '30 days'
),
win7 as (
  select
    avg(mood)      as mood_mean_7d,
    min(energy)    as energy_min_7d,
    max(workload)  as workload_max_7d,
    max(strain)    as strain_max_7d
  from base where ts >= now() - interval '7 days'
),
win30 as (
  select
    avg(climate)     as climate_mean_30d,
    min(disconnect)  as disconnect_min_30d
  from base
)
select * from win7, win30;
"""

WHO5_SQL = """
select w1,w2,w3,w4,w5
from who5
where user_id=%(user_id)s
order by ts desc
limit 1;
"""

KARASEK_SQL = """
select demand, control, support
from karasek_short
where user_id=%(user_id)s
order by ts desc
limit 1;
"""

ERI_SQL = """
select effort, reward, overcommit
from eri_short
where user_id=%(user_id)s
order by ts desc
limit 1;
"""

UWES_SQL = """
select vigor, dedication, absorption
from uwes9
where user_id=%(user_id)s
order by ts desc
limit 1;
"""

LAST_SCORE_SQL = """
select score from scores
where user_id=%(user_id)s and time_window=%(tw)s
order by computed_at desc
limit 1;
"""

INSERT_SCORE_SQL = """
insert into scores (user_id, time_window, score, trend, explanation)
values (%(user_id)s, %(tw)s, %(score)s, %(trend)s, %(explanation)s)
returning id, computed_at;
"""

INSERT_ALERT_SQL = """
insert into alerts (
  id, user_id, created_at, risk_level, status,
  target_role, user_consent, anonymized_message, primary_axis, notes
)
values (
  gen_random_uuid(), %(user_id)s, now(), %(risk)s, 'open',
  'salarié', true, true, %(axis)s, %(notes)s
)
returning id;
"""

INSERT_RECO_SQL = """
insert into recommendations (id, user_id, kind, payload, reason)
values (gen_random_uuid(), %(user_id)s, %(kind)s, %(payload)s, %(reason)s)
returning id;
"""

# ---------------------- models ----------------------
class ScoreIn(BaseModel):
    user_id: str
    time_window: str = "7d"  # '7d' | '30d'

class AlertsIn(BaseModel):
    user_id: str

# ---------------------- helpers ----------------------
def _row_to_dict(cur) -> Optional[Dict[str, Any]]:
    row = cur.fetchone()
    if not row:
        return None
    cols = [d.name for d in cur.description]
    return dict(zip(cols, row))

def _compute_v2(
    feats: Dict[str, Any],
    who5: Optional[Dict[str, int]] = None,
    karasek: Optional[Dict[str, int]] = None,
    eri: Optional[Dict[str, int]] = None,
    uwes: Optional[Dict[str, int]] = None,
):
    """
    Score 1–15, transparent et explicable.
    Pondération implicite via règles (+/-), simple à auditer.
    """
    score = 8
    rules = []

    # 1) Signaux checkins (7d/30d)
    if feats.get("workload_max_7d", 0) >= 4:
        score -= 2; rules.append("workload_max_7d>=4:-2")
    if feats.get("strain_max_7d", 0) >= 4:
        score -= 2; rules.append("strain_max_7d>=4:-2")
    if feats.get("disconnect_min_30d", 5) <= 2:
        score -= 1; rules.append("disconnect_min_30d<=2:-1")
    if feats.get("mood_mean_7d", 0) >= 4:
        score += 2; rules.append("mood_mean_7d>=4:+2")
    if feats.get("climate_mean_30d", 0) >= 4:
        score += 1; rules.append("climate_mean_30d>=4:+1")

    # 2) WHO-5 (0..25)
    if who5:
        who5_total = sum([who5.get(k, 0) for k in ("w1","w2","w3","w4","w5")])
        if who5_total <= 8:
            score -= 2; rules.append("WHO5<=8:-2")
        elif who5_total >= 20:
            score += 1; rules.append("WHO5>=20:+1")

    # 3) Karasek / ERI
    if karasek and karasek.get("demand", 0) >= 4 and karasek.get("control", 5) <= 2:
        score -= 1; rules.append("Karasek(high_demand & low_control):-1")

    if eri and eri.get("reward") and eri.get("effort"):
        effort = float(eri["effort"])
        reward = float(eri["reward"])
        if reward <= 0.000001 or (effort / (reward + 1e-6)) > 1.0:
            score -= 1; rules.append("ERI>1:-1")

    # 4) UWES (protection)
    if uwes and uwes.get("vigor", 0) >= 5:
        score += 1; rules.append("UWES(vigor>=5):+1")

    score = max(1, min(15, int(round(score))))
    return score, rules

def _axis_from_feats(f: Dict[str, Any]) -> str:
    if f.get("workload_max_7d", 0) >= 4:
        return "workload"
    if f.get("strain_max_7d", 0) >= 4:
        return "strain"
    if f.get("energy_min_7d", 5) <= 2:
        return "energy"
    return "general"

def _risk_from_score(score: int, feats: Dict[str, Any]) -> Optional[str]:
    if score <= 4:
        return "prioritaire"
    if score <= 5 and (
        feats.get("workload_max_7d", 0) >= 4
        or feats.get("strain_max_7d", 0) >= 4
        or feats.get("disconnect_min_30d", 5) <= 2
    ):
        return "attention"
    if score <= 6:
        return "signal-faible"
    return None

# ---------------------- endpoints ----------------------
@app.post("/v1/score/compute")
def compute_score(p: ScoreIn):
    if p.time_window not in ("7d", "30d"):
        raise HTTPException(400, "time_window must be '7d' or '30d'")

    with psycopg.connect(DATABASE_URL) as conn, conn.cursor() as cur:
        # features base (checkins)
        cur.execute(FEATURE_SQL, {"user_id": p.user_id})
        feats = _row_to_dict(cur)
        if not feats:
            raise HTTPException(404, "No checkins in last 30 days")

        # optionnels : who5 / karasek / eri / uwes (dernière valeur)
        cur.execute(WHO5_SQL, {"user_id": p.user_id})
        who5 = _row_to_dict(cur)

        cur.execute(KARASEK_SQL, {"user_id": p.user_id})
        kar = _row_to_dict(cur)

        cur.execute(ERI_SQL, {"user_id": p.user_id})
        eri = _row_to_dict(cur)

        cur.execute(UWES_SQL, {"user_id": p.user_id})
        uwes = _row_to_dict(cur)

        # score + règles
        score, rules = _compute_v2(feats, who5=who5, karasek=kar, eri=eri, uwes=uwes)

        # trend vs dernier score même fenêtre
        cur.execute(LAST_SCORE_SQL, {"user_id": p.user_id, "tw": p.time_window})
        prev = cur.fetchone()
        trend = score - int(prev[0]) if prev and prev[0] is not None else None

        # persistance
        explanation = {
            "rules": rules,
            "features": feats,
            "who5": who5,
            "karasek": kar,
            "eri": eri,
            "uwes": uwes,
        }
        cur.execute(
            INSERT_SCORE_SQL,
            {"user_id": p.user_id, "tw": p.time_window, "score": score, "trend": trend, "explanation": explanation},
        )
        _sid, ts = cur.fetchone()
        conn.commit()

        return {
            "score": score,
            "trend": trend,
            "explanation": {"rules": rules},  # on peut exposer plus si besoin
            "computed_at": ts.isoformat(),
        }

@app.post("/v1/alerts/scan")
def scan_alerts(payload: AlertsIn):
    with psycopg.connect(DATABASE_URL) as conn, conn.cursor() as cur:
        # récupérer features pour le user
        cur.execute(FEATURE_SQL, {"user_id": payload.user_id})
        feats = _row_to_dict(cur)
        if not feats:
            raise HTTPException(404, "No checkins in last 30 days")

        # enrichisseurs (facultatifs)
        cur.execute(WHO5_SQL, {"user_id": payload.user_id}); who5 = _row_to_dict(cur)
        cur.execute(KARASEK_SQL, {"user_id": payload.user_id}); kar = _row_to_dict(cur)
        cur.execute(ERI_SQL, {"user_id": payload.user_id}); eri = _row_to_dict(cur)
        cur.execute(UWES_SQL, {"user_id": payload.user_id}); uwes = _row_to_dict(cur)

        score, rules = _compute_v2(feats, who5=who5, karasek=kar, eri=eri, uwes=uwes)
        risk = _risk_from_score(score, feats)
        if not risk:
            return {"created": False, "message": "no alert"}

        axis = _axis_from_feats(feats)
        notes = f"rules={','.join(rules)}; score={score}"
        cur.execute(
            INSERT_ALERT_SQL,
            {"user_id": payload.user_id, "risk": risk, "axis": axis, "notes": notes},
        )
        aid = cur.fetchone()[0]
        conn.commit()
        return {"created": True, "risk_level": risk, "alert_id": str(aid)}

@app.get("/v1/reco/{user_id}")
def get_recos(user_id: str):
    """
    Recommandations heuristiques (rituels/contenus/box) en fonction des signaux.
    """
    with psycopg.connect(DATABASE_URL) as conn, conn.cursor() as cur:
        cur.execute(FEATURE_SQL, {"user_id": user_id})
        f = _row_to_dict(cur)
        if not f:
            raise HTTPException(404, "No checkins in last 30 days")

        recos = []

        # Charge élevée -> microbreak / focus / déconnexion
        if f.get("workload_max_7d", 0) >= 4:
            recos.append({
                "kind": "rituel",
                "payload": {"title": "Bloc focus 25'", "steps": ["Couper notifs 25'", "Pause 5'", "Hydratation"]},
                "reason": {"workload_max_7d": f.get("workload_max_7d")}
            })
            recos.append({
                "kind": "contenu",
                "payload": {"title": "Droit à la déconnexion", "url": "/ressources/deconnexion"},
                "reason": {"policy": "deconnexion"}
            })
            recos.append({
                "kind": "box",
                "payload": {"sku": "BOX-SALARIE-MOB", "items": ["gourde", "lingettes", "snack", "creme_mains"], "cost_eur": 9.8, "tags": ["microbreak","mobilité","anti-stress"]},
                "reason": {"tag": "mobilité|anti-stress"}
            })

        # Pénibilité -> étirements ergonomie
        if f.get("strain_max_7d", 0) >= 4:
            recos.append({
                "kind": "rituel",
                "payload": {"title": "3 étirements terrain", "steps": ["Cervicales", "Épaules", "Poignets"]},
                "reason": {"strain_max_7d": f.get("strain_max_7d")}
            })

        # Déconnexion faible -> ressource + rituel soir
        if f.get("disconnect_min_30d", 5) <= 2:
            recos.append({
                "kind": "rituel",
                "payload": {"title": "Routine soir 10'", "steps": ["Écran OFF 30'", "Carnet 3 lignes", "Hydratation"]},
                "reason": {"disconnect_min_30d": f.get("disconnect_min_30d")}
            })

        # Persiste (optionnel) et renvoie
        for r in recos:
            cur.execute(INSERT_RECO_SQL, {"user_id": user_id, "kind": r["kind"], "payload": r["payload"], "reason": r["reason"]})
        conn.commit()
        return recos

# ---------------------- health ----------------------
@app.get("/health")
def health():
    return {"ok": True, "version": app.version}
