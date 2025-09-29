import os, re, glob, psycopg, yaml, traceback
from typing import List, Tuple
from pypdf import PdfReader  # <— pour PDF

# -------- Config --------
DATABASE_URL = os.getenv("DATABASE_URL")
PROVIDER = os.getenv("PROVIDER", "openai").lower()  # 'openai' | 'mistral'

assert DATABASE_URL, "DATABASE_URL missing"
assert PROVIDER in ("openai", "mistral"), "PROVIDER must be 'openai' or 'mistral'"

# Clients (chargés selon provider)
openai_client = None
mistral_client = None
if PROVIDER == "openai":
    from openai import OpenAI
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    assert OPENAI_API_KEY, "OPENAI_API_KEY missing"
    openai_client = OpenAI(api_key=OPENAI_API_KEY)
    EMBED_MODEL = "text-embedding-3-small"   # 1536 dims
    TABLE = "rag_documents"
else:
    from mistralai import Mistral
    MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")
    assert MISTRAL_API_KEY, "MISTRAL_API_KEY missing"
    mistral_client = Mistral(api_key=MISTRAL_API_KEY)
    EMBED_MODEL = "mistral-embed"            # 1024 dims
    TABLE = "rag_documents_mistral"

# -------- Utils --------
FM_RE = re.compile(r"^---\s*\n(.*?)\n---\s*\n(.*)$", re.DOTALL)

def parse_md(path: str) -> Tuple[dict, str]:
    txt = open(path, "r", encoding="utf-8").read()
    m = FM_RE.match(txt)
    if m:
        meta = yaml.safe_load(m.group(1)) or {}
        body = m.group(2).strip()
    else:
        meta, body = {}, txt
    meta.setdefault("title", os.path.basename(path))
    meta.setdefault("persona", "expert-qvt")
    meta.setdefault("tags", [])
    return meta, body

def parse_pdf(path: str) -> Tuple[dict, str]:
    reader = PdfReader(path)
    chunks = []
    for page in reader.pages:
        try:
            chunks.append(page.extract_text() or "")
        except Exception:
            chunks.append("")
    body = "\n".join(chunks).strip()
    # Nettoyage léger
    body = re.sub(r"[ \t]+", " ", body)
    body = re.sub(r"\n{3,}", "\n\n", body)
    meta = {
        "title": f"[PDF] {os.path.basename(path)}",
        "persona": "expert-qvt",
        "tags": [],
        "source_url": None,
        "published_at": None
    }
    # Tronque si énorme (optionnel)
    if len(body) > 200_000:
        body = body[:200_000]
    return meta, body

def embed(text: str) -> List[float]:
    text = text.replace("\n", " ")
    if PROVIDER == "openai":
        out = openai_client.embeddings.create(model=EMBED_MODEL, input=text)
        return out.data[0].embedding  # 1536 floats
    else:
        res = mistral_client.embeddings.create(model=EMBED_MODEL, inputs=[text])
        return res.data[0].embedding   # 1024 floats

def to_vector_param(vec: List[float]) -> str:
    return "[" + ",".join(f"{x:.7f}" for x in vec) + "]"

# -------- Ingest --------
def ingest_dir():
    base_dir = os.path.dirname(__file__)               # .../ai-service
    dirpath  = os.path.join(base_dir, "docs")          # .../ai-service/docs
    md_files  = sorted(glob.glob(os.path.join(dirpath, "*.md")))
    pdf_files = sorted(glob.glob(os.path.join(dirpath, "*.pdf")))
    files = md_files + pdf_files
    print(f"[{PROVIDER}] docs dir: {dirpath}, found {len(files)} files (md:{len(md_files)} pdf:{len(pdf_files)})")
    if not files:
        print("No docs found"); return

    with psycopg.connect(DATABASE_URL) as conn, conn.cursor() as cur:
        for p in files:
            try:
                if p.lower().endswith(".md"):
                    meta, body = parse_md(p)
                else:
                    meta, body = parse_pdf(p)

                if not body or len(body.strip()) < 50:
                    print(f"⚠️ Skipped (too short): {os.path.basename(p)}")
                    continue

                vec = embed(body)
                vec_lit = to_vector_param(vec)

                cur.execute(
                    f"""
                    insert into {TABLE}
                      (title, persona, jurisdiction, source_url, published_at, tags, body, embedding)
                    values
                      (%s,%s,%s,%s,%s,%s,%s, %s::vector)
                    """,
                    (
                        meta.get("title"),
                        meta.get("persona"),
                        meta.get("jurisdiction"),
                        meta.get("source_url"),
                        meta.get("published_at"),
                        meta.get("tags"),
                        body,
                        vec_lit,
                    ),
                )
                print(f"Inserted: {os.path.basename(p)} -> {TABLE}")
            except Exception as e:
                print(f"❌ Failed on {p}: {e}")
                traceback.print_exc()
                raise
        conn.commit()
    print(f"✅ [{PROVIDER}] Ingested {len(files)} documents into {TABLE}")

if __name__ == "__main__":
    ingest_dir()
