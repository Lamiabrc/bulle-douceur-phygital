from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os, trafilatura, re
from typing import List

router = APIRouter()

class WebAdviseIn(BaseModel):
    question: str
    urls: List[str]
    provider: str = "openai"   # 'openai' | 'mistral'
    max_chars_per_source: int = 5000

def _fetch_clean(url: str) -> str:
    downloaded = trafilatura.fetch_url(url)
    if not downloaded:
        return ""
    txt = trafilatura.extract(downloaded, include_comments=False, include_tables=False,
                              favor_precision=True, with_metadata=False) or ""
    txt = re.sub(r"\n{3,}", "\n\n", (txt or "").strip())
    return txt

def _llm_summarize(question: str, sources, provider: str) -> str:
    sys = "Tu es un expert QVCT. Réponds de façon concise, structurée, avec puces. Ajoute des références [1], [2]… correspondant aux URLs fournies. Pas d'invention."
    context = ""
    for i, s in enumerate(sources, start=1):
        snippet = s["text"][:s["limit"]]
        context += f"\n\n[SOURCE {i}] {s['url']}\n{snippet}"
    prompt = f"Question: {question}\n\nContexte:{context}\n\nRéponse avec références entre crochets:"

    if provider == "mistral":
        from mistralai import Mistral
        key = os.getenv("MISTRAL_API_KEY")
        if not key: raise HTTPException(500, "MISTRAL_API_KEY missing")
        client = Mistral(api_key=key)
        resp = client.chat.complete(
            model="mistral-large-latest",
            messages=[{"role":"system","content":sys},{"role":"user","content":prompt}],
            temperature=0.2,
        )
        return resp.choices[0].message.content
    else:
        from openai import OpenAI
        key = os.getenv("OPENAI_API_KEY")
        if not key: raise HTTPException(500, "OPENAI_API_KEY missing")
        client = OpenAI(api_key=key)
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role":"system","content":sys},{"role":"user","content":prompt}],
            temperature=0.2,
        )
        return resp.choices[0].message.content

@router.post("/v1/advise/web")
def web_advise(input: WebAdviseIn):
    if not input.urls:
        raise HTTPException(400, "Fournis au moins une URL dans 'urls'")
    sources = []
    for u in input.urls[:5]:
        txt = _fetch_clean(u)
        if txt and len(txt) > 400:
            sources.append({"url": u, "text": txt, "limit": input.max_chars_per_source})
    if not sources:
        raise HTTPException(422, "Impossible d'extraire du texte des URLs fournies")
    answer = _llm_summarize(input.question, sources, input.provider)
    refs = {str(i+1): s["url"] for i, s in enumerate(sources)}
    return {"answer": answer, "refs": refs}
