"use client";

import { useState } from "react";
import { mockTracks } from "@/lib/mockData";
import { Track } from "@/lib/api";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type SortKey = "rank" | "growth" | "videos";

export default function ChartsPage() {
  const [sort, setSort] = useState<SortKey>("rank");

  const sorted = [...mockTracks].sort((a, b) => {
    const sa = a.latest_snapshot;
    const sb = b.latest_snapshot;
    if (sort === "rank") return (sa?.rank ?? 999) - (sb?.rank ?? 999);
    if (sort === "growth") return (sb?.growth_rate ?? 0) - (sa?.growth_rate ?? 0);
    if (sort === "videos") return (sb?.video_count ?? 0) - (sa?.video_count ?? 0);
    return 0;
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Charts</h1>
          <p className="text-white/50 mt-1">Top trending TikTok sounds</p>
        </div>
        <div className="flex gap-2">
          {(["rank", "growth", "videos"] as SortKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSort(key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                sort === key ? "bg-white text-black" : "bg-white/10 text-white/60 hover:bg-white/20"
              }`}
            >
              {key === "rank" ? "Chart Rank" : key === "growth" ? "Growth %" : "Video Count"}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-white/40 text-left">
              <th className="px-4 py-3 w-12">#</th>
              <th className="px-4 py-3">Track</th>
              <th className="px-4 py-3">Artist</th>
              <th className="px-4 py-3 text-right">Videos</th>
              <th className="px-4 py-3 text-right">Growth</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((track: Track, i) => {
              const snap = track.latest_snapshot;
              const growth = snap?.growth_rate ?? 0;
              return (
                <tr key={track.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white/30 font-mono">{i + 1}</td>
                  <td className="px-4 py-3">
                    <Link href={`/tracks/${track.id}`} className="font-medium hover:text-white/70 transition-colors">
                      {track.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    {track.artist ? (
                      <Link href={`/artists/${track.artist.id}`} className="text-white/60 hover:text-white transition-colors">
                        {track.artist_name}
                      </Link>
                    ) : (
                      <span className="text-white/40">{track.artist_name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right text-white/60">
                    {snap?.video_count ? `${(snap.video_count / 1_000_000).toFixed(1)}M` : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Badge
                      className={
                        growth > 0
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }
                    >
                      {growth > 0 ? "+" : ""}{growth.toFixed(1)}%
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
