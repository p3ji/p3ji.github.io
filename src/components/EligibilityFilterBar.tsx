"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { municipalitiesByProvince, provinces, type Jurisdiction, type ProvinceCode } from "@/data/mockServices";
import { useApp } from "@/context/AppContext";
import { defaultProfile, jurisdictionLabel } from "@/lib/serviceFilters";

const levels: Jurisdiction[] = ["FEDERAL", "PROVINCIAL", "MUNICIPAL"];

export function EligibilityFilterBar() {
  const { profile, updateProfile } = useApp();
  const municipalities = municipalitiesByProvince[profile.province] ?? [];

  const toggleLevel = (level: Jurisdiction) => {
    const next = profile.jurisdictions.includes(level)
      ? profile.jurisdictions.filter((item) => item !== level)
      : [...profile.jurisdictions, level];
    updateProfile({ jurisdictions: next });
  };

  return (
    <aside className="rounded-2xl border border-line bg-white p-5 shadow-card lg:sticky lg:top-24 lg:self-start" aria-label="Service filters">
      <div className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-ink"><SlidersHorizontal size={19} aria-hidden="true" /> Refine results</h3>
        <button type="button" onClick={() => updateProfile(defaultProfile)} className="inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm font-medium text-navy hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy">
          <RotateCcw size={15} aria-hidden="true" /> Reset
        </button>
      </div>
      <p className="mt-1 text-sm leading-5 text-muted">Find programs that may fit your situation.</p>

      <fieldset className="mt-6 border-t border-line pt-5">
        <legend className="text-sm font-semibold text-ink">Government level</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {levels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => toggleLevel(level)}
              aria-pressed={profile.jurisdictions.includes(level)}
              className={`min-h-11 rounded-full border px-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy ${profile.jurisdictions.includes(level) ? "border-navy bg-navy text-white" : "border-line bg-white text-ink hover:border-navy"}`}
            >
              {jurisdictionLabel[level]}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 space-y-4">
        <label className="block text-sm font-semibold text-ink">
          Province or territory
          <select
            value={profile.province}
            onChange={(event) => updateProfile({ province: event.target.value as ProvinceCode })}
            className="field-select mt-2"
          >
            {provinces.map((province) => <option key={province.code} value={province.code}>{province.name}</option>)}
          </select>
        </label>

        <label className="block text-sm font-semibold text-ink">
          Municipality
          <select
            value={profile.municipality}
            onChange={(event) => updateProfile({ municipality: event.target.value })}
            className="field-select mt-2"
          >
            <option value="">No city selected</option>
            {municipalities.map((city) => <option key={city} value={city}>{city}</option>)}
          </select>
        </label>

        <label className="block text-sm font-semibold text-ink">
          Household income (context only)
          <select
            value={profile.incomeTier}
            onChange={(event) => updateProfile({ incomeTier: event.target.value as typeof profile.incomeTier })}
            className="field-select mt-2"
          >
            <option value="all">Prefer not to say / all</option>
            <option value="low">Lower income</option>
            <option value="middle">Middle income</option>
            <option value="high">Higher income</option>
          </select>
        </label>

        <label className="block text-sm font-semibold text-ink">
          Children, including expected
          <select
            value={profile.children}
            onChange={(event) => updateProfile({ children: Number(event.target.value) })}
            className="field-select mt-2"
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3 or more</option>
          </select>
        </label>
      </div>
      <p className="mt-5 rounded-xl bg-[#f1f6f8] p-3 text-xs leading-5 text-muted">Location and household filters help explore this demo. Income tiers do not exclude programs because official thresholds differ. Answers stay in memory; the program makes the final decision.</p>
    </aside>
  );
}
