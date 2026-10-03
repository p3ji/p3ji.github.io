# Civik Ottawa — roadmap to the public showcase

**Updated:** 2026-10-03
**Identity:** Independent, free, open-source information site and interactive design proposal
**Public address:** https://civik.peji.ca/ (GitHub Pages; DNS and HTTPS verified 2026-10-03)
**First geography:** Ottawa, Ontario, and federal services
**Finish line before government outreach:** **Phase 2**, a usable public discovery product plus a polished, evidence-backed future-state showcase and marketing package.

The [product specification](docs/specs.md) defines the boundaries and corrected pilot rules. The [Phase 2 showcase brief](docs/phase-2-showcase.md) lists the public assets and draft 90-second narrative. The [original architecture draft](docs/specs-v1-draft.md) remains available as design history.

## Why the project exists

A resident should describe a need and see relevant federal, Ontario, and Ottawa services without identifying the government level or department first. Civik Ottawa can independently provide curated information, preliminary matching, and official application links. It can also demonstrate—with fictional data—how a genuine cross-government one-stop service might reuse information, ask for consent, suggest services, submit applications, and show status.

Visitors must always be able to tell **source-backed information** from a **simulation**. The site does not claim government affiliation, make official eligibility decisions, send data to Statistics Canada, or submit applications.

## Delivery overview

| Stage | Target window | Public result | Release gate |
| --- | --- | --- | --- |
| **Current frontend prototype** | Now | Life-event catalogue, local filters, scripted assistant, watchlist, published site | Clearly marked demo; rebrand and browser-storage changes implemented |
| **Phase 1 — Ottawa discovery** | Weeks 1–6 | Anonymous needs-first exploration, reviewed Ottawa/Ontario/federal records, local conditional rules, official handoffs | Source provenance, correct rules, accessible mobile journey, and no sensitive profile persistence |
| **Phase 2 — public showcase** | Weeks 7–12 | Working Phase 1 site, synthetic one-stop experience, video, five-minute demo, one-pager, diagrams, evidence appendix, open-source release | Visitors distinguish working features from concepts; claims reviewed; public package usable without any agency integration |
| **Optional agency adoption** | After Phase 2 | A partner may pilot one approved integration | Separate program authority, agreements, security/privacy review, supported APIs, and operational ownership |

The windows are planning ranges, not commitments. The Phase 2 package is the intended final product **before** engaging government agencies.

## Phase 1 — Ottawa discovery

### 1. Frame and test the service

- Put **Civik Ottawa** and the independent open-source identity in the interface, repository, and public materials. The prototype is live at civik.peji.ca.
- Start with “Having a baby or caring for a young child in Ottawa.” Map the journey from need → federal/Ontario/municipal suggestions → reasons and unknowns → official links.
- Test the labels, questions, and trust cues with Ottawa residents, including French speakers, people using assistive technology, newcomers, and people with low digital confidence.
- Target WCAG 2.2 AA and test 375px layouts and 44px touch targets. [WCAG 2.2](https://www.w3.org/TR/WCAG22/)

### 2. Make the content verifiable

- Build a small initial inventory rather than claiming 45 verified programs. Treat the original 18-row matrix as a research queue.
- For each listing, record the official owner, source and application URLs, jurisdiction, geography, effective period, retrieval/review dates, reviewer, and evidence for each rule and amount.
- Review source changes, closures, deadlines, and link failures before publishing rule updates. A simple version-controlled content store is enough initially; a database or crawler is a later scaling choice.
- First source checks: **CCB**, **Ottawa child care fee subsidy**, and **EquiPass**. Apply the corrections in [the spec](docs/specs.md); do not use the original sample thresholds or hardcoded subsidy formula.
- Use result states **potential match**, **needs more information**, and **review official criteria**. Link to the official administrator for the final decision. Avoid estimated payouts when the inputs or current source do not support one.

### 3. Protect the anonymous path

- Keep household filters in memory. Do not persist location, income tier, child count, or status from discovery.
- Save only service IDs when the visitor actively chooses “Save on this device”; provide remove/clear controls and explain that the watchlist is local.
- Remove old prototype profile data from browser storage during migration.
- No live AI, identity service, government submission, or statistical transmission is needed for Phase 1.

**Phase 1 exit evidence:** a visitor can find relevant tri-level services from a life need, understand why each appeared and what remains uncertain, and reach the official next step on mobile and with assistive technology. Records are reviewed and changes are traceable.

## Phase 2 — finished showcase and marketing package

### 4. Demonstrate what works now

- Publish the Phase 1 Ottawa journey as a polished public site with an independent-service disclosure, source links, dates, coverage limits, privacy explanation, accessibility statement, and open-source link.
- Offer a five-minute guided demo that performs a real local search and official handoff.
- Make the current architecture legible: browser-only facts, source-backed records, conditional matching, on-device saved IDs, and official external applications.

### 5. Demonstrate the proposed one-stop future

- Build a visually separate route using a fictional Ottawa persona and synthetic values.
- Show a fact entered once and reused across suggested services; a person can inspect, change, and delete it.
- Show proposed sharing recipients and purpose, explicit review, a **simulated** application receipt, and a **simulated** cross-government status timeline. No screen may imply that an agency actually received a submission or approved a benefit.
- Explain which future steps require program-owner rules, an identity arrangement, authority/consent, application and status APIs, and a support model.
- Treat the vault, assisted recovery, kiosk, and Statistics Canada pipeline as **architecture proposals or synthetic prototypes** until their threat models, legal roles, and integrations are validated.

### 6. Package the evidence

- Produce the **90-second captioned video**, **five-minute live walkthrough**, **one-page brief**, **architecture/data-flow sheet**, **source and claims appendix**, and reproducible **open-source release** described in the [showcase brief](docs/phase-2-showcase.md).
- Classify each public claim as **working**, **synthetic demonstration**, or **partner required**. Link every factual program claim to an official source and benefit period.
- Exclude unsupported savings totals, blanket privacy/compliance guarantees, fictional government endpoints presented as live, and “approved” application states.
- Keep civik.peji.ca and HTTPS working through each public release.

**Phase 2 exit evidence:** the public can use the discovery site, understand the one-stop proposal, view a captioned demonstration, inspect its sources and code, and distinguish actual capabilities from future requirements. This completes the pre-outreach product.

## Optional path after the public showcase

Engage one program owner at a time with the live demo, evidence appendix, threat model, and a specific proposed integration. A real submission or status feed requires a supported partner API, roles and authority, privacy/security review, consent and correction paths, receipts, reconciliation, human help, and an incident process. A real Statistics Canada data channel additionally requires a confirmed collection program and appropriate institutional arrangement; the [Statistics Act](https://laws-lois.justice.gc.ca/eng/acts/S-19/FullText.html) does not itself create one for this site.

Civik Ottawa remains a useful information site and design proposal even if no agency adopts the future-state architecture.

## Immediate implementation backlog

1. Implement a versioned service record and reviewer workflow for the first small pilot set.
2. Expand source-reviewed Ottawa coverage while keeping conditional matches and official handoffs.
3. Create the separate synthetic future-state route and the Phase 2 assets.
4. Run mobile, accessibility, source, privacy, and claim checks for each release.
