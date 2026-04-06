import { mockTracks } from "@/lib/mockData";
import { TrendCard } from "@/components/TrendCard";

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Trending Now</h1>
        <p className="text-white/50 mt-1">Top TikTok sounds ranked by growth rate</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockTracks.map((track) => (
          <TrendCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}
