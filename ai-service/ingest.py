import os, psycopg, json
from typing import List, Dict

DATABASE_URL = os.getenv("DATABASE_URL")

# TODO: remplace par ton vrai encodeur d'embeddings (retourne une liste[float] de taille 1536)
def embed(text: str) -> List[float]:
    # EXEMPLE à remplacer
    import hashlib, math
    h = hashlib.sha256(text.encode("utf-8")).digest()
    # faux vecteur (NE PAS GARDER EN PROD) – juste pour structure
    return [(b/255.0) for b in h] + [0.0]*(1536-len(h))

SAMPLES = [
  {
    "title": "Droit à la déconnexion (FR) – Synthèse",
    "persona": "expert-juridique", "jurisdiction":"FR",
    "tags": ["déconnexion","temps de travail","QVT"],
    "published_at": "2023-01-01",
    "source_url": "https://legifrance.gouv.fr/…",
    "body": "En France, le droit à la déconnexion implique… (ta synthèse interne + sources officielles)."
  },
  {
    "title": "Micro-pauses actives – Guide 10 minutes",
    "persona": "expert-qvt", "jurisdiction":"FR",
    "tags": ["microbreak","ergonomie","fatigue"],
    "published_at": "2022-06-01",
    "source_url": null,
    "body": "Les micro-pauses ≤10' améliorent la récupération perçue… Protocole 5-5-5 : …"
  },
  {
    "title": "Respiration 4-7-8 – fiche pratique",
    "persona": "prof-de-yoga",
    "tags": ["respiration","sommeil","stress"],
    "published_at": "2021-09-01",
    "source_url": null,
    "body": "Mode d’emploi 4-7-8 : inspirer 4, retenir 7, expirer 8. Contre-indications: …"
  }
]

def main():
    assert DATABASE_URL, "DATABASE_URL missing"
    with psycopg.connect(DATABASE_URL) as conn, conn.cursor() as cur:
        for doc in SAMPLES:
            vec = embed(doc["body"])
            cur.execute("""
              insert into rag_documents (title, persona, jurisdiction, source_url, published_at, tags, body, embedding)
              values (%s,%s,%s,%s,%s,%s,%s,%s)
              """,
              (doc["title"], doc["persona"], doc.get("jurisdiction"), doc.get("source_url"),
               doc.get("published_at"), doc.get("tags"), doc["body"], vec)
            )
        conn.commit()
        print("Inserted:", len(SAMPLES))

if __name__ == "__main__":
    main()
