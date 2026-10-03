"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Bookmark, Landmark, MessageCircle } from "lucide-react";
import { AppProvider, useApp } from "@/context/AppContext";
import { MockChatbotUI } from "@/components/MockChatbotUI";

function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { savedIds, setChatOpen } = useApp();

  return (
    <div className="min-h-dvh bg-cream text-ink">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-navy">Skip to main content</a>
      <div className="h-1.5 bg-red" />
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red text-white"><Landmark size={22} strokeWidth={1.8} aria-hidden="true" /></span>
            <span className="flex flex-col leading-tight"><span className="text-lg font-bold tracking-tight text-ink">Civik Ottawa</span><span className="text-[11px] font-medium tracking-wide text-muted">FIND SUPPORT BY NEED</span></span>
          </Link>
          <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-3">
            <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={`inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy ${pathname === "/" ? "bg-[#edf3f7] text-navy" : "text-muted hover:bg-slate-100 hover:text-ink"}`}>Explore</Link>
            <Link href="/watchlist" aria-current={pathname === "/watchlist" ? "page" : undefined} className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy ${pathname === "/watchlist" ? "bg-[#edf3f7] text-navy" : "text-muted hover:bg-slate-100 hover:text-ink"}`}><Bookmark size={17} aria-hidden="true" /><span>My watchlist</span><span className="rounded-full bg-navy px-2 py-0.5 text-[11px] text-white">{savedIds.length}</span></Link>
            <button type="button" onClick={() => setChatOpen(true)} className="hidden min-h-11 items-center gap-2 rounded-lg border border-line px-3 text-sm font-semibold text-navy hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy md:inline-flex"><MessageCircle size={17} aria-hidden="true" /> Ask a question</button>
          </nav>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="mt-20 border-t border-line bg-white pb-[max(2rem,env(safe-area-inset-bottom))]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div><p className="font-semibold text-ink">Civik Ottawa</p><p className="mt-1 max-w-xl leading-6">Independent, free, open-source information site and one-stop service design prototype. This is a curated demo; check official sites for current eligibility and applications.</p><p className="mt-1 text-xs">Intended public address: civik.peji.ca</p></div>
          <a href="https://www.canada.ca/en/services/benefits.html" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 self-start font-semibold text-navy underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy">Government of Canada benefits <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>
        </div>
      </footer>
      <MockChatbotUI />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return <AppProvider><AppChrome>{children}</AppChrome></AppProvider>;
}
