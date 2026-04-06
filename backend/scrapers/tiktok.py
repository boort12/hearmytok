"""
TikTok trending sounds scraper.
Uses Kworb.net TikTok charts as a reliable open data source,
with optional TikTokApi integration for richer data.
"""
import httpx
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import logging

logger = logging.getLogger(__name__)

KWORB_TIKTOK_URL = "https://kworb.net/tiktok/"


async def fetch_kworb_trending() -> List[Dict]:
    """
    Scrape Kworb.net for TikTok trending songs.
    Returns list of dicts with title, artist, and chart position.
    """
    results = []
    try:
        async with httpx.AsyncClient(timeout=30, follow_redirects=True) as client:
            resp = await client.get(KWORB_TIKTOK_URL)
            resp.raise_for_status()

        soup = BeautifulSoup(resp.text, "lxml")
        table = soup.find("table")
        if not table:
            logger.warning("No table found on Kworb TikTok page")
            return results

        rows = table.find_all("tr")[1:]  # skip header
        for rank, row in enumerate(rows[:100], start=1):
            cols = row.find_all("td")
            if len(cols) < 2:
                continue
            # Kworb format: Artist - Title
            raw = cols[0].get_text(strip=True)
            link = cols[0].find("a")
            href = link["href"] if link else ""

            parts = raw.split(" - ", 1)
            artist_name = parts[0].strip() if len(parts) == 2 else "Unknown"
            title = parts[1].strip() if len(parts) == 2 else raw.strip()

            results.append({
                "rank": rank,
                "title": title,
                "artist_name": artist_name,
                "tiktok_sound_id": href.replace(".html", "").replace("track/", "").strip("/") or f"kworb_{rank}",
                "cover_url": None,
                "video_count": 0,
                "play_count": 0,
            })

    except Exception as e:
        logger.error(f"Kworb scrape failed: {e}")

    return results


async def fetch_trending_sounds() -> List[Dict]:
    """Main entry point — fetch trending TikTok sounds."""
    sounds = await fetch_kworb_trending()
    logger.info(f"Fetched {len(sounds)} trending sounds from Kworb")
    return sounds
