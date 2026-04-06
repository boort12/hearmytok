import Link from "next/link";
import { Track } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface TrendCardProps {
  track: Track;
}

export function TrendCard({ track }: TrendCardProps) {
  const snapshot = track.latest_snapshot;
  const growth = snapshot?.growth_rate ?? 0;
  const rank = snapshot?.rank;
  const videoCount = snapshot?.video_count ?? 0;

  return (
    <Link href={`/tracks/${track.id}`}>
      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer h-full">
        <CardContent className="p-4 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            {track.cover_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={track.cover_url}
                alt={track.title}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 text-xl">
                🎵
              </div>
            )}
            <div className="min-w-0">
              {rank && <span className="text-xs text-white/40 font-mono">#{rank}</span>}
              <p className="font-semibold text-sm leading-tight truncate">{track.title}</p>
              <p className="text-white/50 text-xs truncate">{track.artist_name}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-xs text-white/40">
              {videoCount > 0 ? `${(videoCount / 1000).toFixed(0)}K videos` : "No data yet"}
            </span>
            {growth !== 0 && (
              <Badge
                className={
                  growth > 0
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-red-500/20 text-red-400 border-red-500/30"
                }
              >
                {growth > 0 ? "+" : ""}{growth.toFixed(1)}%
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
