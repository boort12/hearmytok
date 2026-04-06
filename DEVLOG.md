# HearMyTok — Dev Log

## What It Is
TikTok music analytics platform for A&Rs and artists to discover viral songs and emerging artists before competitors.

---

## Current State (April 2026)

Frontend-only. No backend. All pages run on mock data in `frontend/lib/mockData.ts`.

**3 pages:**
- `/` — Dashboard with trending track cards
- `/charts` — Sortable top-100 table
- `/tracks/[id]` — Track detail + Recharts growth line chart

---

## Tech Stack

### Frontend

| Package | Purpose |
|---|---|
| **Next.js 16** | React framework — routing, SSR, bundling |
| **React 19** | UI |
| **TypeScript 5** | Types |
| **Tailwind CSS 4** | Utility-first styles |
| **shadcn/ui** | Card, Badge components (`@base-ui/react`) |
| **Recharts 3** | Line chart on track detail page |

### Planned Backend (not built yet)

| Package | Purpose |
|---|---|
| **FastAPI** | Python REST API |
| **SQLAlchemy** | ORM |
| **Alembic** | DB migrations |
| **APScheduler** | 6-hour data collection job |
| **BeautifulSoup4 + httpx** | Kworb.net scraper |
| **Spotipy** | Spotify API (cover art, followers) |
| **Postgres via Supabase** | Production database |

---

## Planned Data Schema

- **artists** — name, TikTok author ID, Spotify ID, follower count
- **tracks** — title, TikTok sound ID, Spotify track ID, cover URL, artist FK
- **trend_snapshots** — video count, play count, growth rate, rank, timestamp (append-only time-series)

---

## Session 1 — Initial Build

1. Installed Homebrew, Node.js, Python 3.11 on a fresh Mac
2. Initialized Git repo
3. Scaffolded Next.js frontend with TypeScript + Tailwind
4. Added shadcn/ui + Recharts
5. Built 3 frontend pages + TrendCard component
6. Wired mock data so all visuals work with no backend
7. Pushed to GitHub

---

## What's Next

- [ ] Build FastAPI backend
- [ ] Set up Postgres (Supabase)
- [ ] Scrape Kworb.net for real TikTok chart data
- [ ] Enrich via Spotify API (cover art, follower counts)
- [ ] Replace `mockData.ts` imports with live `api.*` calls
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Render
