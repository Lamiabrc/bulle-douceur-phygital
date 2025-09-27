from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import psycopg

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL missing")

app = FastAPI(title="QVT Box AI", version="0.1")

FEATURE_SQL = """
with base as (
  select ts, mood, energy, workload, strain, climate, disconnect
  from checkins
  where user_id=%(user_id)s and ts >= now() - interval '30 days'
),
win7 as (
  select avg(mood) mood_mean_7d, min(energy) energy_min_7d,
         max(workload) workload_max_7d, max(strain) strain_max_7d
  from base where ts >= now() - interval '7 days'
),
win30 as (
  select avg(climate) climate_mean_30d, min(disconnect) disconnect_min_30d
  from base
)
select * from win7, win30;
"""

LAST_SCORE_SQL = """
select score from scores
where user_id=%(user_id)s and time_window=%(tw)s
order by computed_at desc limit 1;
"""

INSERT_SCORE_SQL = """
insert into scores (user_id, time_window, score, trend, explanation)
values (%(user_id)s, %(tw)s, %(score)s, %(trend)s, %(explanation)s)
returning id, computed_at;
"""

class ScoreIn(BaseModel):
    user_id: str
    time_window: str = "7d"  # '7d' | '30d'

def compute_baseline(feats: dict):
    score = 8
    rules = []
    if feats.get('workload_max_7d') and feats['workload_max_7d'] >= 4:
        score -= 2; rules.append("workload_max_7d>=4:-2")
    if feats.get('strain_max_7d') and feats['strain_max_7d'] >= 4:
        score -= 2; rules.append("strain_max_7d>=4:-2")
    if feats.get('disconnect_min_30d') and feats['disconnect_min_30d'] <= 2:
        score -= 1; rules.append("disconnect_min_30d<=2:-1")
    if feats.get('mood_mean_7d') and feats['mood_mean_7d'] >= 4:
        score += 2; rules.append("mood_mean_7d>=4:+2")
    if feats.get('climate_mean_30d') and feats['climate_mean_30d'] >= 4:
        score += 1; rules.append("climate_mean_30d>=4:+1")
    score = max(1, min(15, int(round(score))))
    return score, rules

@app.post("/v1/score/compute")
def compute_score(p: ScoreIn):
    if p.time_window not in ("7d","30d"):
        raise HTTPException(400, "time_window must be '7d' or '30d'")
    with psycopg.connect(DATABASE_URL) as conn, conn.cursor() as cur:
        cur.execute(FEATURE_SQL, {"user_id": p.user_id})
        row = cur.fetchone()
        if not row:
            raise HTTPException(404, "No checkins in last 30 days")
        cols = [d.name for d in cur.description]
        feats = dict(zip(cols, row))
        score, rules = compute_baseline(feats)

        cur.execute(LAST_SCORE_SQL, {"user_id": p.user_id, "tw": p.time_window})
        prev = cur.fetchone()
        trend = score - int(prev[0]) if prev and prev[0] is not None else None

        cur.execute(INSERT_SCORE_SQL, {
            "user_id": p.user_id,
            "tw": p.time_window,
            "score": score,
            "trend": trend,
            "explanation": {"rules": rules, "features": feats},
        })
        _sid, ts = cur.fetchone()
        conn.commit()
        return {"score": score, "trend": trend, "explanation": {"rules": rules}, "computed_at": ts.isoformat()}
