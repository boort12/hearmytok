"""
APScheduler job definitions.
Main job: fetch trending TikTok sounds and upsert to DB.
"""
import logging
from typing import Optional
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from models.database import SessionLocal, Track, Artist, TrendSnapshot
from scrapers.tiktok import fetch_trending_sounds
from scrapers.spotify import search_track

logger = logging.getLogger(__name__)

last_run: Optional[str] = None  # noqa: F821 — set at runtime


async def collect_trending_data():
    """Fetch trending sounds and upsert into the database with growth tracking."""
    global last_run
    logger.info("Starting trending data collection...")

    sounds = await fetch_trending_sounds()
    if not sounds:
        logger.warning("No sounds fetched — skipping DB write")
        return

    db: Session = SessionLocal()
    try:
        for sound in sounds:
            # Upsert artist
            artist = db.query(Artist).filter_by(name=sound["artist_name"]).first()
            if not artist:
                artist = Artist(name=sound["artist_name"])
                db.add(artist)
                db.flush()

            # Upsert track
            track = db.query(Track).filter_by(tiktok_sound_id=sound["tiktok_sound_id"]).first()
            if not track:
                # Enrich with Spotify
                spotify_data = search_track(sound["title"], sound["artist_name"])
                track = Track(
                    tiktok_sound_id=sound["tiktok_sound_id"],
                    title=sound["title"],
                    artist_name=sound["artist_name"],
                    artist_id=artist.id,
                    cover_url=spotify_data.get("cover_url") if spotify_data else sound.get("cover_url"),
                    spotify_track_id=spotify_data.get("spotify_track_id") if spotify_data else None,
                    duration_seconds=spotify_data.get("duration_ms", 0) // 1000 if spotify_data else None,
                )
                db.add(track)
                db.flush()

            # Calculate growth rate vs last snapshot
            last_snapshot = (
                db.query(TrendSnapshot)
                .filter_by(track_id=track.id)
                .order_by(TrendSnapshot.timestamp.desc())
                .first()
            )
            growth_rate = 0.0
            if last_snapshot and last_snapshot.video_count > 0:
                new_count = sound.get("video_count", 0)
                growth_rate = ((new_count - last_snapshot.video_count) / last_snapshot.video_count) * 100

            snapshot = TrendSnapshot(
                track_id=track.id,
                video_count=sound.get("video_count", 0),
                play_count=sound.get("play_count", 0),
                growth_rate=growth_rate,
                rank=sound.get("rank"),
            )
            db.add(snapshot)

        db.commit()
        last_run = datetime.now(timezone.utc).isoformat()
        logger.info(f"Upserted {len(sounds)} trending sounds. Last run: {last_run}")

    except Exception as e:
        db.rollback()
        logger.error(f"DB write failed: {e}")
        raise
    finally:
        db.close()
