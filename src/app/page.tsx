"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Compass, Search, ShieldCheck, Sparkles } from "lucide-react";
import { EligibilityFilterBar } from "@/components/EligibilityFilterBar";
import { LifeEventGrid } from "@/components/LifeEventGrid";
import { ServiceCard } from "@/components/ServiceCard";
import { useApp } from "@/context/AppContext";
import { lifeEventCategories, mockServices, type CategoryId } from "@/data/mockServices";
import { filterServices } from "@/lib/serviceFilters";

export default function HomePage() {
  const { profile, setChatOpen } = useApp();
  const [category, setCategory] = useState<CategoryId>("having-a-baby");
  const [search, setSearch] = useState("");
  const visibleServices = useMemo(() => filterServices(mockServices, profile, category, search), [profile, category, search]);
  const selectedEvent = lifeEventCategories.find((item) => item.id === category);

  const chooseCategory = (next: CategoryId) => {
    setCategory(next);
    setSearch("");
    document.getElementById("service-explorer")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="relative overflow-hidden bg-[#eaf2f4]">
        <div className="pointer-events-none absolute -right-28 -top-40 h-[500px] w-[500px] rounded-full border-[70px] border-white/30" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-[-240px] left-[40%] h-[480px] w-[480px] rounded-full border-[65px] border-[#dcebe9]/70" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-16 lg:px-8">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-navy"><Compass size={15} aria-hidden="true" /> A simpler way to find support</p>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.65rem]">Find the right support for life&apos;s next chapter<span className="text-red">.</span></h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">Explore federal, provincial and municipal services together. Start with what is happening in your life, then narrow the results to your location and household.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#life-events" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-navy px-6 text-sm font-semibold text-white hover:bg-[#0d304e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy">Explore life events <ArrowRight size={18} aria-hidden="true" /></a>
              <button type="button" onClick={() => setChatOpen(true)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-navy bg-white px-6 text-sm font-semibold text-navy hover:bg-[#f7fbfc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"><Sparkles size={18} aria-hidden="true" /> Ask the assistant</button>
            </div>
          </div>
          <div className="rounded-[28px] border border-white/90 bg-white/95 p-5 shadow-[0_24px_70px_rgba(23,61,98,0.12)] sm:p-7">
            <div className="flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">One place to explore</p><h2 className="mt-2 text-xl font-semibold text-ink">Services across Canada</h2></div><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0ee] text-red"><ShieldCheck size={24} aria-hidden="true" /></span></div>
            <div className="mt-6 space-y-3">
              {[
                ["01", "Federal programs", "Canada-wide support"],
                ["02", "Provincial programs", "Relevant to your province"],
                ["03", "Municipal services", "Help close to home"],
              ].map(([number, title, detail]) => <div key={number} className="flex items-center gap-4 rounded-xl border border-line px-4 py-3"><span className="text-sm font-bold text-red">{number}</span><div><p className="text-sm font-semibold text-ink">{title}</p><p className="text-xs text-muted">{detail}</p></div></div>)}
            </div>
            <p className="mt-5 text-xs leading-5 text-muted">Every result in this demo points to an official government page.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section id="life-events" className="scroll-mt-24 pt-14 sm:pt-20">
          <div className="mb-7 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-red">Explore by life event</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">What&apos;s happening in your life?</h2><p className="mt-3 leading-7 text-muted">Choose a moment to see the services that may be useful right now.</p></div>
          <LifeEventGrid selected={category} onSelect={chooseCategory} />
        </section>

        <section id="service-explorer" className="scroll-mt-24 pt-16 sm:pt-20">
          <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-red">Service explorer</p><h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{selectedEvent?.title}</h2><p className="mt-3 max-w-2xl leading-7 text-muted">Browse potential matches, save what matters, and continue to the official application page.</p></div>
            <div className="relative w-full md:max-w-xs"><label htmlFor="service-search" className="sr-only">Search services in this life event</label><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={19} aria-hidden="true" /><input id="service-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search these services" className="min-h-12 w-full rounded-xl border border-line bg-white pl-11 pr-4 text-sm text-ink outline-none focus:border-navy focus:ring-2 focus:ring-navy/15" /></div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <EligibilityFilterBar />
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-semibold text-muted" role="status">{visibleServices.length} {visibleServices.length === 1 ? "service" : "services"} shown</p><p className="text-xs text-muted">Potential matches only</p></div>
              {visibleServices.length > 0 ? <div className="grid gap-4 xl:grid-cols-2">{visibleServices.map((service) => <ServiceCard key={service.id} service={service} />)}</div> : <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-12 text-center"><Search size={30} className="mx-auto text-muted" aria-hidden="true" /><h3 className="mt-4 text-lg font-semibold text-ink">No services match these filters</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">Try another province, municipality, income range, or government level. This demo catalogue covers only selected regions.</p></div>}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
