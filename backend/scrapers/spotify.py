"""
Spotify API integration for enriching track/artist data.
Uses Spotipy with Client Credentials flow (no user auth needed).
"""
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from typing import Optional, Dict
import os
import logging
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)


def get_spotify_client() -> Optional[spotipy.Spotify]:
    client_id = os.getenv("SPOTIFY_CLIENT_ID")
    client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")
    if not client_id or not client_secret:
        logger.warning("Spotify credentials not set — skipping enrichment")
        return None
    auth = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    return spotipy.Spotify(auth_manager=auth)


def search_track(title: str, artist_name: str) -> Optional[Dict]:
    """Search Spotify for a track and return enriched metadata."""
    sp = get_spotify_client()
    if not sp:
        return None
    try:
        query = f"track:{title} artist:{artist_name}"
        results = sp.search(q=query, type="track", limit=1)
        items = results["tracks"]["items"]
        if not items:
            return None
        track = items[0]
        artist = track["artists"][0]
        return {
            "spotify_track_id": track["id"],
            "spotify_artist_id": artist["id"],
            "cover_url": track["album"]["images"][0]["url"] if track["album"]["images"] else None,
            "duration_ms": track["duration_ms"],
            "spotify_popularity": track["popularity"],
            "artist_spotify_followers": None,  # fetched separately to save quota
        }
    except Exception as e:
        logger.error(f"Spotify search failed for '{title}' by '{artist_name}': {e}")
        return None


def get_artist_followers(spotify_artist_id: str) -> Optional[int]:
    sp = get_spotify_client()
    if not sp:
        return None
    try:
        artist = sp.artist(spotify_artist_id)
        return artist["followers"]["total"]
    except Exception as e:
        logger.error(f"Spotify artist fetch failed: {e}")
        return None
