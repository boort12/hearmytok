import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HearMyTok — TikTok Music Analytics",
  description: "Discover the hottest trending songs on TikTok before anyone else.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-black text-white flex flex-col">
        <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            🎵 HearMyTok
          </Link>
          <nav className="flex gap-6 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Dashboard</Link>
            <Link href="/charts" className="hover:text-white transition-colors">Charts</Link>
            <Link href="/admin/scheduler" className="hover:text-white transition-colors">Scheduler</Link>
          </nav>
        </header>
        <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
