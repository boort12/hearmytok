export default function SchedulerPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-3xl font-bold mb-2">Scheduler</h1>
      <p className="text-white/50 mb-8">Control the automated data collection job (runs every 6 hours).</p>

      <div className="rounded-xl border border-white/10 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <span className="font-medium text-white/50">Offline — backend not connected</span>
        </div>

        <div className="space-y-2 text-sm text-white/30">
          <div className="flex justify-between"><span>Last run</span><span>—</span></div>
          <div className="flex justify-between"><span>Next run</span><span>—</span></div>
        </div>

        <div className="flex gap-3">
          <button disabled className="px-5 py-2.5 rounded-lg font-medium text-sm bg-green-500/10 text-green-400/40 border border-green-500/20 cursor-not-allowed">
            Start Scheduler
          </button>
          <button disabled className="px-5 py-2.5 rounded-lg font-medium text-sm bg-white/5 text-white/30 cursor-not-allowed">
            Run Now
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 p-5 text-sm text-white/40 space-y-1">
        <p className="font-medium text-white/60">How it works</p>
        <p>When the backend is running, the scheduler fetches the top 100 trending TikTok sounds from Kworb.net every 6 hours and stores them in the database.</p>
        <p>Each run captures a growth snapshot — after a few runs you&apos;ll see trend lines on track pages.</p>
      </div>
    </div>
  );
}
