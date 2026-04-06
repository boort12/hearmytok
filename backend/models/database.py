from sqlalchemy import create_engine, Column, Integer, String, BigInteger, DateTime, Float, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime, timezone
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./hearmytok.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Artist(Base):
    __tablename__ = "artists"

    id = Column(Integer, primary_key=True, index=True)
    tiktok_author_id = Column(String, unique=True, index=True, nullable=True)
    spotify_id = Column(String, unique=True, index=True, nullable=True)
    name = Column(String, nullable=False)
    tiktok_followers = Column(BigInteger, default=0)
    spotify_followers = Column(BigInteger, default=0)
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    tracks = relationship("Track", back_populates="artist")


class Track(Base):
    __tablename__ = "tracks"

    id = Column(Integer, primary_key=True, index=True)
    tiktok_sound_id = Column(String, unique=True, index=True)
    spotify_track_id = Column(String, nullable=True, index=True)
    title = Column(String, nullable=False)
    artist_id = Column(Integer, ForeignKey("artists.id"), nullable=True)
    artist_name = Column(String, nullable=False)
    cover_url = Column(String, nullable=True)
    duration_seconds = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    artist = relationship("Artist", back_populates="tracks")
    snapshots = relationship("TrendSnapshot", back_populates="track")


class TrendSnapshot(Base):
    __tablename__ = "trend_snapshots"

    id = Column(Integer, primary_key=True, index=True)
    track_id = Column(Integer, ForeignKey("tracks.id"), nullable=False)
    video_count = Column(BigInteger, default=0)
    play_count = Column(BigInteger, default=0)
    growth_rate = Column(Float, default=0.0)  # % change vs previous snapshot
    rank = Column(Integer, nullable=True)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)

    track = relationship("Track", back_populates="snapshots")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    Base.metadata.create_all(bind=engine)
