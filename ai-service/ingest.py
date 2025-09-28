import os, re, glob, psycopg, yaml
from typing import Dict, Any, List

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

def parse_md(path: str):
    txt = open(path, "r", encoding="utf-8").read()
    m = FM_RE.match(txt)
    meta, body = ({}, txt) if not m else (yaml.safe_load(m.group(1)) or {}, m.group(2).strip())
    meta.setdefault("title", os.path.basename(path))
    meta.setdefault("persona", "expert-qvt")
    meta.setdefault("tags", [])
    return meta, body

def embed(text: str) -> List[float]:
    text = text.replace("\n", " ")
    if PROVIDER == "openai":
        out = openai_client.embeddings.create(model=EMBED_MODEL, input=text)
        return out.data[0].embedding  # 1536 floats
    else:
        res = mistral_client.embeddings.create(model=EMBED_MODEL, inputs=[text])
        return res.data[0].embedding   # 1024 floats

# -------- Ingest --------
def ingest_dir():
    base_dir = os.path.dirname(__file__)               # .../ai-service
    dirpath  = os.path.join(base_dir, "docs")          # .../ai-service/docs
    files = sorted(glob.glob(os.path.join(dirpath, "*.md")))
    if not files:
        print("No .md files in", dirpath); return

    with psycopg.connect(DATABASE_URL) as conn, conn.cursor() as cur:
        for p in files:
            meta, body = parse_md(p)
            vec = embed(body)
            cur.execute(f"""
                insert into {TABLE} (title, persona, jurisdiction, source_url, published_at, tags, body, embedding)
                values (%s,%s,%s,%s,%s,%s,%s,%s)
            """, (
                meta.get("title"),
                meta.get("persona"),
                meta.get("jurisdiction"),
                meta.get("source_url"),
                meta.get("published_at"),
                meta.get("tags"),
                body,
                vec,
            ))
        conn.commit()
    print(f"[{PROVIDER}] Ingested {len(files)} documents into {TABLE}")

if __name__ == "__main__":
    ingest_dir()
