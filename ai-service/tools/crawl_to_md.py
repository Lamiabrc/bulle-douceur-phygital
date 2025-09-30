import os, re, time, yaml, tldextract
from datetime import date
import trafilatura

BASE = os.path.dirname(os.path.dirname(__file__))        # .../ai-service
DOCS = os.path.join(BASE, "docs")
SRC  = os.path.join(BASE, "sources.yaml")
os.makedirs(DOCS, exist_ok=True)

def slugify(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+","-", s).strip("-")
    return s[:80] or "page"

def domain_label(url: str) -> str:
    ext = tldextract.extract(url)
    return ".".join([p for p in [ext.domain, ext.suffix] if p])

def fetch_to_md(url: str, profile: str, tags):
    downloaded = trafilatura.fetch_url(url)
    if not downloaded:
        print(f"❌ fetch fail: {url}")
        return None
    text = trafilatura.extract(downloaded, include_comments=False, include_tables=False,
                               favor_precision=True, with_metadata=False) or ""
    text = text.strip()
    if len(text) < 200:
        print(f"⚠️ trop court: {url}")
        return None

    # Title guess
    title_guess = next((ln.strip() for ln in text.splitlines() if ln.strip()), url)[:120]

    name = f"{domain_label(url)}-{slugify(title_guess)}"
    fn = os.path.join(DOCS, f"{name}.md")

    fm = f"""---
title: "{title_guess.replace('"','')}"
profile: "{profile}"
tags: {tags or []}
published_at: "{date.today().isoformat()}"
source_url: "{url}"
---
"""

    body = re.sub(r"\n{3,}", "\n\n", text)
    with open(fn, "w", encoding="utf-8") as f:
        f.write(fm + "\n" + body + "\n")
    print(f"✅ wrote {fn}")
    return fn

def main():
    data = yaml.safe_load(open(SRC, "r", encoding="utf-8"))
    items = data.get("items", [])
    total = 0
    for it in items:
        url = it["url"]; profile = it.get("profile","expert-qvt"); tags = it.get("tags",[])
        out = fetch_to_md(url, profile, tags)
        if out: total += 1
        time.sleep(0.5)
    print(f"Done: {total}/{len(items)}")

if __name__ == "__main__":
    main()
