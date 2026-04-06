from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc
from models.database import get_db, Artist, Track, TrendSnapshot
from models.schemas import ArtistOut, TrackOut
from typing import List

router = APIRouter(prefix="/api/artists", tags=["artists"])


@router.get("/{artist_id}", response_model=ArtistOut)
def get_artist(artist_id: int, db: Session = Depends(get_db)):
    artist = db.query(Artist).filter(Artist.id == artist_id).first()
    if not artist:
        raise HTTPException(status_code=404, detail="Artist not found")
    return artist


@router.get("/{artist_id}/tracks", response_model=List[TrackOut])
def get_artist_tracks(artist_id: int, db: Session = Depends(get_db)):
    tracks = (
        db.query(Track)
        .options(joinedload(Track.artist), joinedload(Track.snapshots))
        .filter(Track.artist_id == artist_id)
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


@router.get("/search/{name}", response_model=List[ArtistOut])
def search_artists(name: str, db: Session = Depends(get_db)):
    artists = (
        db.query(Artist)
        .filter(Artist.name.ilike(f"%{name}%"))
        .limit(20)
        .all()
    )
    return artists
