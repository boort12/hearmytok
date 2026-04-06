# HearMyTok

TikTok music analytics platform for A&Rs and artists to discover viral songs and emerging artists.

**Current state:** Frontend only, running on mock data. Backend TBD.

---

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui
- Recharts (growth charts)

---

## Pages

| Route | Description |
|---|---|
| `/` | Dashboard — trending track cards with growth badges |
| `/charts` | Sortable top-100 table by rank, growth %, or video count |
| `/tracks/[id]` | Track detail with growth-over-time line chart |

---

## Run it

```bash
cd frontend
npm install
npm run dev
```

No backend, no env vars needed. All data is in `frontend/lib/mockData.ts`.

---

## What's next

- Build backend (FastAPI + Postgres)
- Scrape Kworb.net for real TikTok chart data
- Enrich with Spotify (cover art, follower counts)
- Replace mock data with live API calls
- Deploy frontend to Vercel, backend to Render
