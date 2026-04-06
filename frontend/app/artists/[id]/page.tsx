"use client";

import { useParams } from "next/navigation";
import { mockArtists, mockTracks } from "@/lib/mockData";
import { TrendCard } from "@/components/TrendCard";
import Link from "next/link";

export default function ArtistPage() {
  const { id } = useParams<{ id: string }>();
  const artist = mockArtists.find((a) => a.id === Number(id));
  const tracks = mockTracks.filter((t) => t.artist?.id === Number(id));

  if (!artist) return <p className="text-white/40">Artist not found.</p>;

  return (
    <div>
      <Link href="/charts" className="text-white/40 hover:text-white text-sm mb-6 inline-block transition-colors">
        ← Back to Charts
      </Link>

      <div className="flex gap-4 items-center mb-8">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl">🎤</div>
        <div>
          <h1 className="text-3xl font-bold">{artist.name}</h1>
          <p className="text-white/50 text-sm mt-1">
            {(artist.tiktok_followers / 1_000_000).toFixed(1)}M TikTok followers
          </p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Trending Tracks</h2>
      {tracks.length === 0 ? (
        <p className="text-white/40">No tracks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tracks.map((track) => (
            <TrendCard key={track.id} track={track} />
          ))}
        </div>
      )}
    </div>
  );
}
