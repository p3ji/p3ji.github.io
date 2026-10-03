"use client";

import { ArrowUpRight, Bookmark, BookmarkCheck, CheckCircle2 } from "lucide-react";
import type { GovernmentService } from "@/data/mockServices";
import { useApp } from "@/context/AppContext";
import { jurisdictionLabel } from "@/lib/serviceFilters";

const badgeStyle = {
  FEDERAL: "bg-[#e8f0f8] text-[#24527c]",
  PROVINCIAL: "bg-[#e9f3e9] text-[#346c43]",
  MUNICIPAL: "bg-[#f5ebf5] text-[#805080]",
};

interface ServiceCardProps {
  service: GovernmentService;
  compact?: boolean;
}

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  const { isSaved, toggleSaved } = useApp();
  const saved = isSaved(service.id);

  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle[service.jurisdiction]}`}>{jurisdictionLabel[service.jurisdiction]}</span>
          <span className="text-xs font-medium text-muted">{service.regionCode === "CA" ? "Across Canada" : service.regionCode}</span>
        </div>
        <button
          type="button"
          onClick={() => toggleSaved(service.id)}
          aria-label={`${saved ? "Remove" : "Save"} ${service.title} ${saved ? "from" : "to"} watchlist`}
          aria-pressed={saved}
          className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${saved ? "bg-[#eaf4f1] text-[#236956]" : "bg-[#f2f5f6] text-navy hover:bg-[#e8eef2]"}`}
        >
          {saved ? <BookmarkCheck size={17} aria-hidden="true" /> : <Bookmark size={17} aria-hidden="true" />}
          {saved ? "Saved on this device" : "Save on this device"}
        </button>
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">{service.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>

      <div className="mt-5 rounded-xl bg-[#f5f8f7] px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted">Potential value</p>
        <p className="mt-1 text-sm font-semibold text-ink">{service.estimatedBenefit}</p>
      </div>

      {!compact && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-muted">Key criteria</p>
          <ul className="mt-2 space-y-2">
            {service.eligibilityCriteria.slice(0, 3).map((criterion) => (
              <li key={criterion} className="flex gap-2 text-sm leading-5 text-ink">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#317a68]" aria-hidden="true" />
                {criterion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {service.applicationNote && <p className="mt-4 text-xs leading-5 text-muted">{service.applicationNote}</p>}
      {service.reviewedOn && <p className="mt-3 text-xs text-muted">Official source checked: {service.reviewedOn}. Confirm current details with the program.</p>}

      <a
        href={service.officialUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-navy underline underline-offset-4 hover:text-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
      >
        View official program <ArrowUpRight size={17} aria-hidden="true" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
      {service.sourceLinks?.map((source) => (
        <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="ml-0 mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-navy underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy sm:ml-4">
          {source.label} <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </article>
  );
}
