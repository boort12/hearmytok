import { Track, Artist } from "./api";

export const mockArtists: Artist[] = [
  { id: 1, name: "Sabrina Carpenter", tiktok_author_id: "sabrinacarpenter", spotify_id: "74KM79TiuVKeVCqs8QtB0B", tiktok_followers: 12400000, image_url: null },
  { id: 2, name: "Chappell Roan", tiktok_author_id: "chappellroan", spotify_id: "7GlBOeep6PqTfFi59PTUUN", tiktok_followers: 8900000, image_url: null },
  { id: 3, name: "Doechii", tiktok_author_id: "doechii", spotify_id: "6Xgp2XMz1fhVYe7i6yNAax", tiktok_followers: 5100000, image_url: null },
  { id: 4, name: "Benson Boone", tiktok_author_id: "bensonboone", spotify_id: "2R21vXR83lH98kGeO99Y66", tiktok_followers: 7300000, image_url: null },
  { id: 5, name: "Gracie Abrams", tiktok_author_id: "gracieabrams", spotify_id: "4tuJ0bMpJh75OH1StFzkwm", tiktok_followers: 3200000, image_url: null },
  { id: 6, name: "Tommy Richman", tiktok_author_id: "tommyrichman", spotify_id: "3NbBNL9AusnUfvgmKCxhvG", tiktok_followers: 2800000, image_url: null },
  { id: 7, name: "Charli xcx", tiktok_author_id: "charlixcx", spotify_id: "25uiPmTg16RbhZWAqwLBy5", tiktok_followers: 9600000, image_url: null },
  { id: 8, name: "Noah Kahan", tiktok_author_id: "noahkahan", spotify_id: "2RQXRUsr4IW1f3mKyKsy4B", tiktok_followers: 4500000, image_url: null },
];

const makeSnapshots = (baseVideos: number, baseGrowth: number) =>
  Array.from({ length: 10 }, (_, i) => ({
    id: i,
    video_count: Math.round(baseVideos * (1 + (i * baseGrowth) / 100)),
    play_count: Math.round(baseVideos * 3.2 * (1 + (i * baseGrowth) / 100)),
    growth_rate: baseGrowth + Math.random() * 2 - 1,
    rank: null,
    timestamp: new Date(Date.now() - (9 - i) * 6 * 3600 * 1000).toISOString(),
  }));

export const mockTracks: Track[] = [
  {
    id: 1, tiktok_sound_id: "s1", title: "Espresso", artist_name: "Sabrina Carpenter",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273c6f7af36bdf41b8e9b9a7f3c",
    artist: mockArtists[0],
    latest_snapshot: { id: 99, video_count: 4200000, play_count: 13400000, growth_rate: 18.4, rank: 1, timestamp: new Date().toISOString() },
    snapshots: makeSnapshots(4200000, 18.4),
  },
  {
    id: 2, tiktok_sound_id: "s2", title: "Pink Pony Club", artist_name: "Chappell Roan",
    cover_url: null, artist: mockArtists[1],
    latest_snapshot: { id: 98, video_count: 3100000, play_count: 9800000, growth_rate: 14.2, rank: 2, timestamp: new Date().toISOString() },
    snapshots: makeSnapshots(3100000, 14.2),
  },
  {
    id: 3, tiktok_sound_id: "s3", title: "Denial Is A River", artist_name: "Doechii",
    cover_url: null, artist: mockArtists[2],
    latest_snapshot: { id: 97, video_count: 2700000, play_count: 8600000, growth_rate: 22.1, rank: 3, timestamp: new Date().toISOString() },
    snapshots: makeSnapshots(2700000, 22.1),
  },
  {
    id: 4, tiktok_sound_id: "s4", title: "Beautiful Things", artist_name: "Benson Boone",
    cover_url: null, artist: mockArtists[3],
    latest_snapshot: { id: 96, video_count: 5800000, play_count: 18500000, growth_rate: 9.7, rank: 4, timestamp: new Date().toISOString() },
    snapshots: makeSnapshots(5800000, 9.7),
  },
  {
    id: 5, tiktok_sound_id: "s5", title: "That's So True", artist_name: "Gracie Abrams",
    cover_url: null, artist: mockArtists[4],
    latest_snapshot: { id: 95, video_count: 1900000, play_count: 6100000, growth_rate: 31.5, rank: 5, timestamp: new Date().toISOString() },
    snapshots: makeSnapshots(1900000, 31.5),
  },
  {
    id: 6, tiktok_sound_id: "s6", title: "Million Dollar Baby", artist_name: "Tommy Richman",
    cover_url: null, artist: mockArtists[5],
    latest_snapshot: { id: 94, video_count: 3400000, play_count: 10900000, growth_rate: 7.3, rank: 6, timestamp: new Date().toISOString() },
    snapshots: makeSnapshots(3400000, 7.3),
  },
  {
    id: 7, tiktok_sound_id: "s7", title: "360", artist_name: "Charli xcx",
    cover_url: null, artist: mockArtists[6],
    latest_snapshot: { id: 93, video_count: 2200000, play_count: 7000000, growth_rate: 12.8, rank: 7, timestamp: new Date().toISOString() },
    snapshots: makeSnapshots(2200000, 12.8),
  },
  {
    id: 8, tiktok_sound_id: "s8", title: "Stick Season", artist_name: "Noah Kahan",
    cover_url: null, artist: mockArtists[7],
    latest_snapshot: { id: 92, video_count: 1600000, play_count: 5100000, growth_rate: 5.1, rank: 8, timestamp: new Date().toISOString() },
    snapshots: makeSnapshots(1600000, 5.1),
  },
  {
    id: 9, tiktok_sound_id: "s9", title: "Good Luck Babe!", artist_name: "Chappell Roan",
    cover_url: null, artist: mockArtists[1],
    latest_snapshot: { id: 91, video_count: 2900000, play_count: 9300000, growth_rate: 16.9, rank: 9, timestamp: new Date().toISOString() },
    snapshots: makeSnapshots(2900000, 16.9),
  },
  {
    id: 10, tiktok_sound_id: "s10", title: "Please Please Please", artist_name: "Sabrina Carpenter",
    cover_url: null, artist: mockArtists[0],
    latest_snapshot: { id: 90, video_count: 3800000, play_count: 12100000, growth_rate: 4.2, rank: 10, timestamp: new Date().toISOString() },
    snapshots: makeSnapshots(3800000, 4.2),
  },
];
