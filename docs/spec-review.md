# CivikOttawa spec review

Reviewed 2026-10-03 against the [original proposal](./specs-v1-draft.md), the frontend prototype, and the official sources linked below. This is an implementation review, not a legal opinion. The corrections are incorporated into the [current Civik Ottawa specification](./specs.md).

## Product fit

**Civik Ottawa replaces the Canada Connect brand.** Its intended public address is `civik.peji.ca`. Ottawa is the first geographic focus: a needs-first, cross-government discovery journey with transparent local rules and official handoffs. Phase 2 is the finished public showcase before agency outreach; it includes working discovery and clearly labelled future-state simulations. Real agency integrations remain a separate, optional path.

This also reconciles a current mismatch: the Phase 1 prototype saves profile filters and watchlist IDs in `localStorage`, while the spec's anonymous MVP promises no persistent storage. Define an anonymous session mode for sensitive answers, with a separate, explicit opt-in for a locally saved watchlist. Do not describe the current prototype as zero-storage.

## Corrections before publishing eligibility rules

| Draft location | Issue and required change |
| --- | --- |
| CCB rule and value summary, section 5 | The July 2026–June 2027 maximum for a child under 6 is **$679.75/month**, subject to adjusted family net income and other factors; the draft says $648.91. The residency/status rule also omits qualifying temporary residents and people registered or entitled to register under the Indian Act. Version the amount by benefit period and model the full criteria or return **needs more information**. [CRA amount](https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-much.html) · [CRA eligibility](https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/who-apply.html) |
| Ottawa child care fee subsidy rule, section 5 | “Ottawa + any child under 18” is not an eligibility decision. City guidance describes children up to age 12, a child care space at a participating provider, financial need, and a reason for care. Remove the hardcoded payout formula until its source and effective period are documented. [City overview](https://ottawa.ca/en/family-and-social-services/childrens-services/child-care-fee-subsidy/about) · [City application guidance](https://ottawa.ca/en/family-and-social-services/childrens-services/child-care-fee-subsidy/apply-child-care-fee-subsidy) |
| EquiPass rule, section 5 | The draft compares an individual's tax line 23600 with a `LICO_BEFORE_TAX_TABLE_2026`. The 2026 EquiPass materials instead describe **2024 annual net family income** and the applicable 2024 LICO table, including spouse income where applicable. Use the program's exact income definition, household calculation, exceptions, and versioned threshold table. [OC Transpo 2026 FAQ](https://www.octranspo.com/images/files/fares/EquiPass_Customer_FAQ_ENG_2026.pdf) |
| Coverage and demo, sections 2, 5–6 | The draft promises about 45 programs but lists 18 in the matrix and shows only three sample rules. Label these as targets and examples until a reviewed inventory exists. The video says 90 seconds but its timeline reaches 1:40. “Approved,” direct submission, and annual-savings claims must be marked **simulated** unless an actual agency integration or sourced calculation supports them. |

Each production record should carry an official source URL, exact rule/amount provenance, effective dates, last review, reviewer, and a status such as `verified`, `needs-review`, or `concept-only`. The browser rule engine should distinguish `potential match`, `needs more information`, and `review official criteria`. It should not declare an applicant approved.

## Legal and data-sharing claims to reframe

- **Statistics Canada:** Sections 8, 11, and 12 of the [Statistics Act](https://laws-lois.justice.gc.ca/eng/acts/S-19/FullText.html) describe Statistics Canada's requests for information and agreements with provincial statistical agencies or other bodies. They do not, by themselves, establish an intake channel or authorization for this independent site to send microdata to Statistics Canada. Section 17 has specified conditions and exceptions, so the draft's absolute confidentiality guarantee should be removed. Treat the StatCan pipeline, controller designation, consent endpoint, and receipt as **fictional demo fixtures** until an agency confirms a real program and agreement.
- **Privacy compliance:** Do not claim that client-side encryption alone makes the host compliant with PIPEDA, FIPPA, MFIPPA, or the Privacy Act. The applicable law depends on the operator, activity, data flows, and participating institutions. Map those facts and obtain qualified privacy/legal review before implementing a real vault or sharing flow. [Federal privacy commissioner on PIPEDA](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda_brief) · [Ontario IPC on FIPPA/MFIPPA](https://www.ipc.on.ca/en/fippa-mfippa-privacy-organizations)
- **Consent receipts:** A JSON example or hash does not establish conformance, immutability, or a trusted signature. Specify the applicable consent-record fields, issuer, verification method, withdrawal process, and retention rules before making a standards claim. [ISO/IEC 29184](https://www.iso.org/standard/70331.html) covers online privacy notices and consent requests; [ISO/IEC TS 27560](https://www.iso.org/standard/80392.html) addresses consent-record structures.

## Security design questions

- A 16-character alphanumeric string holds at most about **95 bits** of information, so it cannot directly represent a full 256-bit Shamir share. Redesign the recovery artifact and specify how shares are encoded, authenticated, rotated, and revoked. Support-assisted recovery also needs an identity-proofing and abuse-resistance model.
- “Zero knowledge” needs a threat model and independent cryptographic review. Encryption of stored profile data does not itself prove that the host, support process, browser delivery path, metadata, or future integrations cannot expose sensitive facts.
- `crypto.getRandomValues()` generates random bytes; it does not guarantee that every copy of a value or browser page snapshot is erased. Browser back/forward cache and operating-system behaviour make “zero residual cache” an unsafe web-app guarantee. A kiosk mode should use managed browser/device controls, short sessions, no persistence, and tested cleanup, with carefully scoped claims. [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) · [Browser back/forward cache](https://developer.mozilla.org/en-US/docs/Glossary/bfcache)

## Recommended sequence

1. **Ottawa discovery pilot:** choose a small, fully sourced set of federal, Ontario, and Ottawa services; define versioned facts and rules; run client-side triage with conditional language; link to official application pages. Test at 375px and with assistive technology.
2. **One-stop concept lab:** use fictional personas and synthetic values to show tell-me-once, suggested programs, consent review, simulated filing, and simulated status. Keep it visually distinct from live service information.
3. **Advanced architecture research:** develop a threat model, privacy/data-flow map, recovery design, and proposed API contracts for the vault and statistical pipeline. Present these as proposals until partner agencies and reviewers validate them.
4. **Possible government pilot:** pursue one supported partner integration at a time, with program-owner rules, data-sharing authority, security review, a sandbox, receipts, and a support model.

The [updated roadmap](../ROADMAP.md) puts the public showcase, marketing assets, and evidence appendix in Phase 2. The remaining work is to implement and source-review the first Ottawa program set, then produce the interactive future-state journey and presentation assets.
