from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.database import create_tables
from api.tracks import router as tracks_router
from api.artists import router as artists_router
from api.scheduler import router as scheduler_router

app = FastAPI(title="HearMyTok API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tracks_router)
app.include_router(artists_router)
app.include_router(scheduler_router)


@app.on_event("startup")
async def startup():
    create_tables()


@app.get("/health")
def health():
    return {"status": "ok"}
