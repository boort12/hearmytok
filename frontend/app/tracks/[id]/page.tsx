"use client";

import { useParams } from "next/navigation";
import { mockTracks } from "@/lib/mockData";
import Link from "next/link";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

export default function TrackPage() {
  const { id } = useParams<{ id: string }>();
  const track = mockTracks.find((t) => t.id === Number(id));

  if (!track) return <p className="text-white/40">Track not found.</p>;

  const chartData = (track.snapshots ?? []).map((s) => ({
    time: new Date(s.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    videos: Math.round(s.video_count / 1000),
  }));

  return (
    <div className="max-w-3xl">
      <Link href="/charts" className="text-white/40 hover:text-white text-sm mb-6 inline-block transition-colors">
        ← Back to Charts
      </Link>

      <div className="flex gap-4 items-start mb-8">
        {track.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={track.cover_url} alt={track.title} className="w-20 h-20 rounded-xl object-cover" />
        ) : (
          <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center text-3xl">🎵</div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{track.title}</h1>
          <p className="text-white/50 mt-1">{track.artist_name}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Chart Rank", value: track.latest_snapshot?.rank ? `#${track.latest_snapshot.rank}` : "—" },
          { label: "Video Count", value: track.latest_snapshot?.video_count ? `${(track.latest_snapshot.video_count / 1_000_000).toFixed(1)}M` : "—" },
          { label: "Growth Rate", value: track.latest_snapshot?.growth_rate ? `+${track.latest_snapshot.growth_rate.toFixed(1)}%` : "—" },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-white/10 p-4 text-center">
            <p className="text-white/40 text-xs mb-1">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 p-6">
        <h2 className="text-sm font-medium text-white/60 mb-4">Video Count Growth (×1000)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
              labelStyle={{ color: "rgba(255,255,255,0.6)" }}
            />
            <Line type="monotone" dataKey="videos" stroke="#22c55e" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
