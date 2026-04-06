from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class TrendSnapshotOut(BaseModel):
    id: int
    video_count: int
    play_count: int
    growth_rate: float
    rank: Optional[int]
    timestamp: datetime

    model_config = {"from_attributes": True}


class ArtistOut(BaseModel):
    id: int
    name: str
    tiktok_author_id: Optional[str]
    spotify_id: Optional[str]
    tiktok_followers: int
    image_url: Optional[str]

    model_config = {"from_attributes": True}


class TrackOut(BaseModel):
    id: int
    tiktok_sound_id: str
    title: str
    artist_name: str
    cover_url: Optional[str]
    artist: Optional[ArtistOut]
    latest_snapshot: Optional[TrendSnapshotOut] = None

    model_config = {"from_attributes": True}


class TrackDetailOut(TrackOut):
    snapshots: List[TrendSnapshotOut] = []


class SchedulerStatus(BaseModel):
    running: bool
    next_run: Optional[str]
    last_run: Optional[str]
    job_count: int
