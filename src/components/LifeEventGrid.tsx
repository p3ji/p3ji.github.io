"use client";

import { ArrowUpRight, Baby, BriefcaseBusiness, Store } from "lucide-react";
import { lifeEventCategories, type CategoryId, type LifeEventCategory } from "@/data/mockServices";

const icons = { baby: Baby, briefcase: BriefcaseBusiness, store: Store };

interface LifeEventGridProps {
  selected: CategoryId;
  onSelect: (category: CategoryId) => void;
}

export function LifeEventGrid({ selected, onSelect }: LifeEventGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {lifeEventCategories.map((event: LifeEventCategory) => {
        const Icon = icons[event.icon];
        const active = selected === event.id;
        return (
          <button
            key={event.id}
            type="button"
            onClick={() => onSelect(event.id)}
            aria-pressed={active}
            className={`group flex min-h-[190px] flex-col rounded-2xl border bg-white p-6 text-left shadow-card transition hover:-translate-y-1 hover:border-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${active ? "border-navy ring-2 ring-navy/10" : "border-line"}`}
          >
            <span className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${event.accent === "peach" ? "bg-[#fff0e9] text-[#a34b2f]" : event.accent === "blue" ? "bg-[#e8f0fb] text-[#315c92]" : "bg-teal text-[#267266]"}`}>
              <Icon size={25} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="flex w-full items-start justify-between gap-2 text-lg font-semibold text-ink">
              {event.title}
              <ArrowUpRight size={19} className="shrink-0 text-navy transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
            <span className="mt-2 text-sm leading-6 text-muted">{event.description}</span>
          </button>
        );
      })}
    </div>
  );
}
