"use client";

import Link from "next/link";
import { ArrowRight, Bookmark, ExternalLink, ListChecks } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { useApp } from "@/context/AppContext";
import { mockServices } from "@/data/mockServices";

export default function WatchlistPage() {
  const { savedIds, clearSaved } = useApp();
  const services = savedIds.map((id) => mockServices.find((service) => service.id === id)).filter((service) => service !== undefined);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-red">Saved on this device · Demo</p><h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">My watchlist</h1><p className="mt-4 text-base leading-7 text-muted">Only service IDs are saved in this browser when you choose to save. Household answers are not saved. There is no account or government application connection.</p></div>
      <div className="mt-8 grid gap-4 rounded-2xl border border-line bg-white p-5 sm:grid-cols-3 sm:p-6">
        <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f0f8] text-navy"><Bookmark size={21} aria-hidden="true" /></span><div><p className="text-2xl font-bold text-ink">{services.length}</p><p className="text-xs text-muted">Saved services</p></div></div>
        <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9f3e9] text-[#346c43]"><ListChecks size={21} aria-hidden="true" /></span><div><p className="text-sm font-semibold text-ink">Ready to review</p><p className="text-xs text-muted">Check each program&apos;s criteria</p></div></div>
        <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f5ebf5] text-[#805080]"><ExternalLink size={21} aria-hidden="true" /></span><div><p className="text-sm font-semibold text-ink">Apply on official sites</p><p className="text-xs text-muted">Applications are handled by governments</p></div></div>
      </div>

      {services.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf3f7] text-navy"><Bookmark size={26} aria-hidden="true" /></span><h2 className="mt-5 text-xl font-semibold text-ink">Your watchlist is empty</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">Save a service from the explorer or assistant, then come back here to review it.</p><Link href="/" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-navy px-5 text-sm font-semibold text-white hover:bg-[#0d304e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">Explore services <ArrowRight size={17} aria-hidden="true" /></Link></div>
      ) : (
        <div className="mt-10"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-bold text-ink">Saved programs</h2><button type="button" onClick={clearSaved} className="inline-flex min-h-11 items-center rounded-lg border border-line px-4 text-sm font-semibold text-navy hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy">Clear watchlist on this device</button></div><p className="mt-2 text-sm text-muted">Statuses below are local demo labels; they are not linked to application systems.</p><div className="mt-5 grid gap-4 lg:grid-cols-2">{services.map((service) => <div key={service.id}><div className="mb-2 flex items-center justify-between gap-2"><span className="rounded-full bg-[#eaf4f1] px-3 py-1 text-xs font-semibold text-[#236956]">Saved</span><span className="text-xs font-medium text-muted">Not applied · demo</span></div><ServiceCard service={service} compact /></div>)}</div></div>
      )}
    </div>
  );
}
