from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc
from models.database import get_db, Track, TrendSnapshot
from models.schemas import TrackOut, TrackDetailOut
from typing import List

router = APIRouter(prefix="/api/tracks", tags=["tracks"])


@router.get("/trending", response_model=List[TrackOut])
def get_trending(limit: int = Query(50, le=100), db: Session = Depends(get_db)):
    """Return tracks ranked by latest snapshot rank, with latest snapshot attached."""
    # Get distinct tracks with their latest snapshot
    subq = (
        db.query(TrendSnapshot.track_id, TrendSnapshot.id.label("latest_id"))
        .order_by(TrendSnapshot.track_id, desc(TrendSnapshot.timestamp))
        .distinct(TrendSnapshot.track_id)
        .subquery()
    )

    tracks = (
        db.query(Track)
        .join(subq, Track.id == subq.c.track_id)
        .join(TrendSnapshot, TrendSnapshot.id == subq.c.latest_id)
        .options(joinedload(Track.artist))
        .order_by(TrendSnapshot.rank.asc().nulls_last())
        .limit(limit)
        .all()
    )

    result = []
    for track in tracks:
        latest = (
            db.query(TrendSnapshot)
            .filter_by(track_id=track.id)
            .order_by(desc(TrendSnapshot.timestamp))
            .first()
        )
        out = TrackOut.model_validate(track)
        out.latest_snapshot = latest
        result.append(out)
    return result


@router.get("/{track_id}", response_model=TrackDetailOut)
def get_track(track_id: int, db: Session = Depends(get_db)):
    track = (
        db.query(Track)
        .options(joinedload(Track.artist), joinedload(Track.snapshots))
        .filter(Track.id == track_id)
        .first()
    )
    if not track:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Track not found")

    latest = sorted(track.snapshots, key=lambda s: s.timestamp, reverse=True)
    out = TrackDetailOut.model_validate(track)
    out.latest_snapshot = latest[0] if latest else None
    out.snapshots = latest[:30]  # last 30 data points for chart
    return out
