# Civik Ottawa — product and architecture specification

**Version:** 1.1 working specification · **Updated:** 2026-10-03
**Scope:** Ottawa, Ontario, and federal service discovery
**Public identity:** Civik Ottawa, an independent, free, open-source information site and one-stop service design proposal. Intended address: civik.peji.ca (DNS and hosting unverified).
**History:** The [original proposal](./specs-v1-draft.md) is preserved. The [spec review](./spec-review.md) records the source checks behind this revision.

## 1. Product promise and boundaries

People start with a need, such as raising a child, losing work, or paying for transit, and discover relevant services across governments without knowing which department owns them. Civik Ottawa provides preliminary matching, clear explanations, and direct official links. It does not make official eligibility decisions, submit applications, or read government account status.

The project has **two deliverable phases before agency outreach**:

| Phase | Working output | Simulated output |
| --- | --- | --- |
| **1 — Ottawa discovery** | Anonymous, browser-based exploration; source-linked program records; conditional local matching; official handoffs; optional on-device watchlist. | None required. |
| **2 — public showcase** | A polished, accessible site demonstrating the working Phase 1 journey, with open-source code, a 90-second video, a five-minute live demo, a one-page brief, architecture/data-flow diagrams, and an evidence appendix. | Fictional tell-me-once, consent review, vault, cross-agency filing, status timeline, and statistical-sharing scenarios. Every simulated receipt, submission, endpoint, and status is labelled. |

**Pre-outreach finish line:** Phase 2 is the finished public product and marketing package. Government adoption is a later, optional route to make specific transactions real. The showcase must distinguish what already works independently from what requires agency agreements, approved rules, and APIs.

## 2. Phase 1: Ottawa discovery

### Visitor journey

1. Start with a life need. The first case study is **having a baby or caring for a young child in Ottawa**; transit affordability can appear as related household support.
2. Optionally provide coarse location and household facts. Avoid address, tax return, immigration document, SIN, or exact income when a useful referral needs none of them.
3. Evaluate source-backed rules locally and return **potential match**, **needs more information**, or **review official criteria**. Never display “approved.”
4. Explain why a service appeared, what remains unknown, when its source was reviewed, and where to find the official program and application.
5. Keep household answers in memory during anonymous discovery. Save service IDs on the visitor's device only when they choose to save; provide removal controls. Never persist income or status answers in the watchlist.

### Coverage and source record

The 18 programs listed in the original proposal are a **research queue**, not a verified inventory. Start with a small, fully reviewed federal/Ontario/Ottawa set and expand toward approximately 45 only as source review allows. Do not claim complete coverage until inclusions and exclusions are documented.

Each published program record needs a stable ID, owner, official information and application URLs, geography, effective period, source retrieval date, last review date, reviewer, and provenance for every rule or amount. Give records a status such as verified, needs-review, or concept-only. Changed or broken sources queue re-review; unsupported rules return **needs more information** or direct visitors to the official page.

### Corrected initial program notes

| Program | Verified source facts | Safe preliminary result |
| --- | --- | --- |
| **Canada Child Benefit** | For **July 2026–June 2027**, the maximum for a child under 6 is **$8,157/year ($679.75/month)** before income reductions. CRA uses adjusted family net income, which may include a spouse's income and adjustments. Status categories include qualifying temporary residents and people registered or entitled to register under the Indian Act, as well as citizens, permanent residents, and protected persons. Other care and residence conditions apply. [CRA amount](https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-much.html) · [CRA eligibility](https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/who-apply.html) | Show potential match when known facts align. Ask for missing details rather than excluding someone or estimating their payment from a single income field. |
| **Ottawa child care fee subsidy** | City guidance describes eligible licensed care for children **up to age 12**, a secured space, financial need, reason for care, and further conditions. For ages 0–5, the application guidance says the space must be in a CWELCC-participating program. [City overview](https://ottawa.ca/en/family-and-social-services/childrens-services/child-care-fee-subsidy/about) · [City application guidance](https://ottawa.ca/en/family-and-social-services/childrens-services/child-care-fee-subsidy/apply-child-care-fee-subsidy) | Ottawa plus any child under 18 is insufficient. Ask about age, space, financial need, and reason for care. Do not use the draft's unverified fee formula. |
| **OC Transpo EquiPass** | The 2026 materials use **2024 annual net family income** and a published **2024 LICO** table, including applicable spouse income and program exceptions. [2026 FAQ](https://www.octranspo.com/images/files/fares/EquiPass_Customer_FAQ_ENG_2026.pdf) · [Application](https://www.octranspo.com/images/files/fares/EquiPass_Application_2026_EN.pdf) | A coarse income tier cannot verify the threshold. Give a conditional referral and official instructions. Do not compare one person's line 23600 against a before-tax 2026 table. |

The rules format must preserve unknown facts. A CCB rule needs its benefit period and source IDs; child care needs age and care-space facts; EquiPass needs the program's family-income definition and threshold version. No rule may infer those facts from a general “low income” choice. Program administrators make the final decisions.

## 3. Phase 2: public showcase and marketing

Show two adjacent journeys with persistent labels:

- **Works now:** search by need, source-linked preliminary results, missing-fact prompts, on-device saved links, official application handoff.
- **Proposed one-stop future:** a fictional Ottawa resident gives a fact once; the interface reuses it, explains suggestions, reviews proposed sharing, and walks through simulated filing and status. No agency receives data and no benefit is approved.

Publish a **90-second captioned video** with a feasible run sheet, a **five-minute live demo**, a **one-page public brief**, a **technical architecture and data-flow sheet**, a **source/claim appendix**, and the **open-source repository**. Show a real Phase 1 interaction before the future-state sequence. Avoid unsupported total-savings figures, “zero surveillance,” “approved,” or claimed Statistics Canada transmission. The [showcase brief](./phase-2-showcase.md) provides a production checklist and draft narrative.

An on-device encrypted-profile experiment may use synthetic data, a passphrase, and a deletion path. A cloud vault, assisted recovery, kiosk deployment, or direct statistical channel remains an **architecture prototype** until threat modelling, independent review, operational design, and any needed partner participation. Do not describe such a prototype as a deployed zero-knowledge service.

## 4. Legal, privacy, and data sharing

The [Statistics Act](https://laws-lois.justice.gc.ca/eng/acts/S-19/FullText.html) does not itself create a Civik Ottawa intake channel. Section 8 concerns whether a Statistics Canada information request is voluntary or mandatory. Section 11 addresses agreements with provincial statistical agencies. Section 12 addresses agreements with departments or municipal/other corporations, including respondent notice and objection conditions. Section 17 sets confidentiality rules with conditions and exceptions. These sections do not establish automatic authority for this independent site to transmit microdata or an absolute confidentiality shield.

No real Statistics Canada controller, endpoint, consent receipt, revocation channel, or transmission may be represented as active without a confirmed collection program, institutional roles, agreement, approved notices, and security review. Phase 2 samples must be **fictional, non-transmitting fixtures** using synthetic values and a visibly fictional recipient. A hash alone is not a signature or proof of legal consent. [ISO/IEC 29184](https://www.iso.org/standard/70331.html) concerns online privacy notices and consent requests; [ISO/IEC TS 27560](https://www.iso.org/standard/80392.html) concerns consent records. Do not assert conformance until the applicable standard and full consent lifecycle are implemented and assessed.

Privacy-law applicability depends on the operator, activity, and data flows. Encryption alone does not establish compliance with PIPEDA, FIPPA, MFIPPA, or the Privacy Act. Before handling real sensitive profiles, document legal roles, purposes, collection authority or consent basis, minimization, retention/deletion, access and correction, incident response, processors, and cross-border flows; obtain qualified review. [OPC PIPEDA overview](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda_brief) · [Ontario IPC FIPPA/MFIPPA overview](https://www.ipc.on.ca/en/fippa-mfippa-privacy-organizations)

## 5. Security design questions and release gates

| Question | Work required before a real claim or feature |
| --- | --- |
| **What can the host learn?** | Threat-model browser plaintext, delivered JavaScript, metadata, support access, logs, backups, and compromised devices. Define the exact scope of “zero knowledge” and get independent review. |
| **How would a key be recovered?** | The draft's 16-character alphanumeric string cannot directly encode a full 256-bit Shamir share: it contains at most about 95 bits. Specify share encoding, entropy, custody, authentication, rotation, revocation, loss scenarios, and support-agent abuse controls. Do not build escrow or claim safe recovery without a reviewed design. |
| **What could kiosk mode guarantee?** | A web page cannot promise zero residual data on an unmanaged public computer. Web Crypto random-byte generation cannot prove all memory copies or browser snapshots are erased. Use managed-device/browser controls, no persistence, short sessions, clear exit instructions, and tested cleanup; publish only testable claims. [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) · [Browser back/forward cache](https://developer.mozilla.org/en-US/docs/Glossary/bfcache) |
| **How are rules protected?** | Version and review sources and thresholds; validate provenance, effective dates, and links. Keep unreviewed changes out of published matching logic. |
| **How is exposure limited now?** | Keep discovery facts in memory, persist only explicitly saved service IDs on the device, avoid sensitive analytics, and remove previous prototype profile storage during migration. |

## 6. Delivery sequence and acceptance evidence

| Window | Milestone | Evidence |
| --- | --- | --- |
| **Weeks 1–2** | Rebrand, source inventory, privacy map, corrected pilot rules | Civik Ottawa identity; official links and source owners; no misleading production claim. |
| **Weeks 3–6 — Phase 1** | Ottawa discovery and local matching | 375px and assistive-tech task tests; conditional results and official handoffs; no exact income retained; saved IDs only after action. |
| **Weeks 7–10 — Phase 2 build** | Working-now showcase plus synthetic future-state flow | Visitors distinguish local working steps from simulation; no outbound agency transmission. |
| **Weeks 11–12 — Phase 2 release** | Video, live demo, brief, technical sheet, evidence appendix, open-source release | Claims checked; 90-second captioned cut; five-minute demo; accessible public link; reproducible setup. |

**Final pre-outreach gate:** Phase 2 is published and independently usable. Its evidence appendix classifies each claim as **working**, **demonstrated with synthetic data**, or **requires government partnership**. Agency engagement follows with concrete evidence rather than unverified operational promises.
