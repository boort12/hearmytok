from fastapi import APIRouter
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger
from models.schemas import SchedulerStatus
from scheduler.jobs import collect_trending_data, last_run
import scheduler.jobs as jobs_module

router = APIRouter(prefix="/api/scheduler", tags=["scheduler"])

scheduler = AsyncIOScheduler()
JOB_ID = "collect_trending"
INTERVAL_HOURS = 6


@router.post("/start")
async def start_scheduler():
    if not scheduler.running:
        scheduler.start()
    if not scheduler.get_job(JOB_ID):
        scheduler.add_job(
            collect_trending_data,
            trigger=IntervalTrigger(hours=INTERVAL_HOURS),
            id=JOB_ID,
            replace_existing=True,
        )
        # Run immediately on start
        await collect_trending_data()
    return {"status": "started"}


@router.post("/stop")
async def stop_scheduler():
    if scheduler.get_job(JOB_ID):
        scheduler.remove_job(JOB_ID)
    return {"status": "stopped"}


@router.post("/run-now")
async def run_now():
    """Manually trigger a data collection run."""
    await collect_trending_data()
    return {"status": "done"}


@router.get("/status", response_model=SchedulerStatus)
async def get_status():
    job = scheduler.get_job(JOB_ID)
    next_run = str(job.next_run_time) if job and job.next_run_time else None
    return SchedulerStatus(
        running=bool(job),
        next_run=next_run,
        last_run=jobs_module.last_run,
        job_count=len(scheduler.get_jobs()),
    )
