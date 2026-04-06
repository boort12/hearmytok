# HearMyTok — Build Summary

## What We Built
A TikTok music analytics platform to help A&Rs and artists discover viral songs and emerging artists before competitors. Built in a single session from zero to a running website with dummy data.

---

## Environment Setup

### Problem
The machine had no developer tools installed at all — no Node.js, no Homebrew, nothing.

### Steps taken
1. **Installed Homebrew** — the package manager for macOS. Lets you install developer tools from the terminal.
2. **Installed Node.js** via Homebrew — required to run the frontend (Next.js is a Node.js framework).
3. **Installed Python 3.11** via Homebrew — required to run the backend (FastAPI is a Python framework). The Mac came with Python 3.9 which is too old.
4. **Initialized a Git repository** in `hearmytok/` — Git tracks all code changes and lets you push to GitHub.

---

## Tech Stack — Full Breakdown

### Frontend

| Package / Tool | Purpose |
|---|---|
| **Next.js 14** | The main React framework. Handles routing (pages), server-side rendering, and bundling. Industry standard for modern web apps. |
| **TypeScript** | Typed version of JavaScript. Catches bugs before you run the code. |
| **Tailwind CSS** | Utility-first CSS framework. Write styles directly in your HTML/JSX instead of separate CSS files. Very fast to build with. |
| **shadcn/ui** | Pre-built UI components (cards, badges, tables, tabs) built on top of Tailwind. Free, no subscription. We used: Card, Badge, Table, Tabs. |
| **Recharts** | Chart library for React. Used to draw the line graph on track detail pages showing growth over time. |
| **Vercel** *(planned)* | Free hosting platform made by the Next.js team. Automatically deploys your frontend when you push to GitHub. |

### Backend

| Package / Tool | Purpose |
|---|---|
| **FastAPI** | Python web framework for building APIs. Very fast, modern, automatic documentation at `/docs`. |
| **Uvicorn** | The server that actually runs FastAPI. Like an engine under the hood. |
| **SQLAlchemy** | ORM (Object Relational Mapper) — lets you write Python classes instead of raw SQL to define and query your database. |
| **Alembic** | Database migration tool. When you change your database schema, Alembic tracks and applies those changes safely. |
| **APScheduler** | Scheduler library. Runs the data collection job automatically every 6 hours inside the FastAPI app. |
| **Spotipy** | Python wrapper for the Spotify Web API. Used to enrich track data with cover art, duration, and artist follower counts. |
| **httpx** | Modern async HTTP client for Python. Used to make requests to external sites (Kworb.net). |
| **BeautifulSoup4 + lxml** | HTML parser. Used to scrape and extract data from Kworb.net's TikTok chart pages. |
| **psycopg2-binary** | PostgreSQL driver for Python. Lets SQLAlchemy talk to a Postgres database. |
| **python-dotenv** | Reads your `.env` file and loads environment variables (API keys, database URLs) into Python. |
| **pydantic-settings** | Validates and manages settings/config using Pydantic models. |

### Database

| Tool | Purpose |
|---|---|
| **SQLite** *(local testing)* | Zero-install file-based database. Used for local development — creates a single `hearmytok.db` file. No server needed. |
| **PostgreSQL via Supabase** *(planned)* | Production database. Supabase gives you a free hosted Postgres instance with a web dashboard to inspect data. |

### Data Sources

| Source | Purpose |
|---|---|
| **Kworb.net** | Fan-run site that publishes TikTok music charts. Scraped with BeautifulSoup to get the top 100 trending sounds. Free, no API key needed. |
| **Spotify Web API** | Free API from Spotify. Enriches tracks with cover art, duration, and artist follower counts. Requires a free developer account. |

---

## Project Structure

```
hearmytok/
├── frontend/               # Next.js web app
│   ├── app/
│   │   ├── page.tsx                    # Dashboard — trending cards
│   │   ├── charts/page.tsx             # Sortable top-100 chart table
│   │   ├── tracks/[id]/page.tsx        # Track detail + growth chart
│   │   ├── artists/[id]/page.tsx       # Artist profile + their tracks
│   │   └── admin/scheduler/page.tsx    # Scheduler control panel
│   ├── components/
│   │   ├── TrendCard.tsx               # Reusable track card component
│   │   └── ui/                         # shadcn components
│   └── lib/
│       ├── api.ts                      # API client (typed fetch calls)
│       └── mockData.ts                 # Dummy data for testing visuals
│
├── backend/                # Python FastAPI app
│   ├── main.py                         # App entry point, CORS, startup
│   ├── api/
│   │   ├── tracks.py                   # GET /api/tracks/trending, /{id}
│   │   ├── artists.py                  # GET /api/artists/{id}
│   │   └── scheduler.py               # POST /api/scheduler/start|stop
│   ├── models/
│   │   ├── database.py                 # SQLAlchemy models (Track, Artist, TrendSnapshot)
│   │   └── schemas.py                  # Pydantic response models
│   ├── scrapers/
│   │   ├── tiktok.py                   # Kworb.net scraper
│   │   └── spotify.py                  # Spotify API integration
│   └── scheduler/
│       └── jobs.py                     # 6-hour data collection job
│
├── docker-compose.yml      # Local Postgres + backend via Docker
├── .env.example            # Template for environment variables
└── .gitignore              # Files excluded from Git
```

---

## Database Schema

Three tables:

- **artists** — artist name, TikTok author ID, Spotify ID, follower count
- **tracks** — song title, TikTok sound ID, Spotify track ID, cover art URL, linked to artist
- **trend_snapshots** — time-series data: video count, play count, growth rate, chart rank, timestamp. One row per track per scheduler run.

The snapshot table is what powers the growth charts — each time the scheduler runs it adds a new row, so you build a history over time.

---

## Pages Built

| Page | Route | What it shows |
|---|---|---|
| Dashboard | `/` | Grid of trending track cards with growth badges |
| Charts | `/charts` | Full ranked table, sortable by rank / growth % / video count |
| Track Detail | `/tracks/[id]` | Stats (rank, videos, growth) + line chart of video count over time |
| Artist Profile | `/artists/[id]` | Artist info + all their trending tracks |
| Scheduler | `/admin/scheduler` | Toggle to start/stop data collection, shows last/next run time |

---

## All Steps Taken This Session

1. Planned the full tech stack and architecture
2. Installed Homebrew, Node.js, Python 3.11 on a fresh Mac
3. Initialized Git repo in `hearmytok/`
4. Scaffolded Next.js frontend with TypeScript + Tailwind
5. Added shadcn/ui component library + Recharts
6. Created Python virtual environment in `backend/`
7. Installed all Python dependencies
8. Initialized Alembic for database migrations
9. Built database models (Artist, Track, TrendSnapshot)
10. Built Pydantic schemas for API responses
11. Built Kworb.net TikTok scraper
12. Built Spotify API integration
13. Built APScheduler job (6-hour data collection with growth tracking)
14. Built FastAPI routes: tracks, artists, scheduler control
15. Built all 5 frontend pages
16. Built reusable TrendCard component
17. Switched to SQLite for zero-install local testing
18. Replaced all API calls with dummy data so visuals work without a backend
19. Created `docker-compose.yml` for local Postgres + backend
20. Created `.env.example` template
21. Created `.gitignore`
22. Fixed frontend submodule issue (Next.js created its own `.git` folder)
23. Pushed everything to github.com/boort12/hearmytok

---

## What's Next

- [ ] Set up Supabase (free Postgres) and connect via `DATABASE_URL`
- [ ] Start the backend and run the scheduler for real data
- [ ] Deploy frontend to Vercel (free, connects to GitHub automatically)
- [ ] Deploy backend to Render (free tier)
- [ ] Register a free Spotify developer app for cover art enrichment
- [ ] Replace mock data with live API calls once backend is running
