const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface TrendSnapshot {
  id: number;
  video_count: number;
  play_count: number;
  growth_rate: number;
  rank: number | null;
  timestamp: string;
}

export interface Artist {
  id: number;
  name: string;
  tiktok_author_id: string | null;
  spotify_id: string | null;
  tiktok_followers: number;
  image_url: string | null;
}

export interface Track {
  id: number;
  tiktok_sound_id: string;
  title: string;
  artist_name: string;
  cover_url: string | null;
  artist: Artist | null;
  latest_snapshot: TrendSnapshot | null;
  snapshots?: TrendSnapshot[];
}

export interface SchedulerStatus {
  running: boolean;
  next_run: string | null;
  last_run: string | null;
  job_count: number;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init);
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export const api = {
  getTrending: (limit = 50) =>
    apiFetch<Track[]>(`/api/tracks/trending?limit=${limit}`),

  getTrack: (id: number) =>
    apiFetch<Track>(`/api/tracks/${id}`),

  getArtist: (id: number) =>
    apiFetch<Artist>(`/api/artists/${id}`),

  getArtistTracks: (id: number) =>
    apiFetch<Track[]>(`/api/artists/${id}/tracks`),

  getSchedulerStatus: () =>
    apiFetch<SchedulerStatus>("/api/scheduler/status"),

  startScheduler: () =>
    apiFetch<{ status: string }>("/api/scheduler/start", { method: "POST" }),

  stopScheduler: () =>
    apiFetch<{ status: string }>("/api/scheduler/stop", { method: "POST" }),

  runNow: () =>
    apiFetch<{ status: string }>("/api/scheduler/run-now", { method: "POST" }),
};
