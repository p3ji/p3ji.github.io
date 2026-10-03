ARCHIVED DESIGN DRAFT — superseded by [the current Civik Ottawa specification](./specs.md). The legal, eligibility, security, and integration claims below were proposals and include known errors; do not use them as production guidance. See [the review](./spec-review.md) for corrections.

CIVIKOTTAWA: CROSS-JURISDICTIONAL BENEFIT DISCOVERY, ZERO-KNOWLEDGE CIVIC VAULT & STATCAN STATISTICAL PIPELINE
System Architecture Specification & Delivery Roadmap
Document Version: 1.0.0-PROD-SPEC
Jurisdictional Scope: City of Ottawa | Province of Ontario | Government of Canada
Security & Compliance Baseline: PIPEDA, FIPPA/MFIPPA, Privacy Act, Statistics Act (Sec 8/11/12), ISO/IEC 29184, Kantara Initiative Consent Receipt v1.1
1. Executive Summary & Problem Definition
Canadian social safety net programs are organized vertically by level of government (Federal, Provincial, Municipal), yet citizens experience economic life horizontally. In the National Capital Region (Ottawa), a single parent may be simultaneously eligible for the federal Canada Child Benefit (CCB), provincial Healthy Smiles Ontario (HSO), and the municipal OC Transpo EquiPass or Child Care Fee Subsidy. Navigating these requires visiting multiple disconnected portals, deciphering conflicting income definitions, and repeatedly disclosing sensitive personally identifiable information (PII).
Simultaneously, administrative data collection for policy research is frequently viewed as opaque and extractive. While Statistics Canada seeks to understand benefit take-up gaps, cross-jurisdictional data sharing is mired in intergovernmental complexity.
CivikOttawa resolves this by pairing client-side declarative eligibility evaluation with a zero-knowledge cloud vault and a direct, consent-driven microdata ingestion stream for Statistics Canada. The architecture is delivered across three progressive phases, combining a fully functional anonymous MVP with an interactive product demo designed for executive and public sector stakeholder engagement.
2. Progressive Phasing Strategy



┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               PHASED SYSTEM EVOLUTION                                  │
├────────────────────────────┬─────────────────────────────┬─────────────────────────────┤
│ PHASE 1: Anonymous MVP     │ PHASE 2: Core Platform &    │ PHASE 3: Future State       │
│                            │ Interactive Vision Demo     │                             │
├────────────────────────────┼─────────────────────────────┼─────────────────────────────┤
│ • 100% In-Memory Execution │ • Zero-Knowledge Cloud Vault│ • Federated Public ID       │
│ • ~45 Tri-Level Programs   │ • 2-of-3 Shamir Key Recovery│ • Verifiable Credentials    │
│ • No Storage / No Tracking │ • StatCan Sec 8/11 Pipeline │ • Zero-Knowledge Proofs     │
│ • Outbound Action Checklists│• LinkedIn Video / Live Demo│ • Direct Intake API Egress  │
└────────────────────────────┴─────────────────────────────┴─────────────────────────────┘


Phase 1: Zero-Barrier Discovery (Production MVP)
Goal: Eliminate triage friction. Any resident can discover their tri-level entitlement in under 30 seconds without an account.
Storage & Privacy: Zero persistent storage. Dynamic rule evaluation runs inside the browser sandbox using a pre-compiled JSON rule manifest.
Outputs: Prioritized qualification cards, estimated dollar yields, and deep links to official application portals.
Phase 2: The Core Product & Interactive Vision Demo (Current Deliverable)
Production Feature: Implementation of the Zero-Knowledge (ZK) Cloud Vault allowing citizens to encrypt and persist their profiles across devices, complete with a phone-support-recoverable 2-of-3 Threshold Secret Sharing model and a zero-disk Public Kiosk Mode.
StatCan Direct Channel: An explicit, granular opt-in pipeline allowing citizens to transmit coarsened demographic microdata directly to Statistics Canada under Sections 8 and 11/12 of the Statistics Act, generating cryptographic Kantara/ISO 29184 consent receipts.
Vision Demonstration: An interactive prototype and 90-second narrative walkthrough demonstrating the end-to-end journey from anonymous triage to verifiable credential filing.
Phase 3: High-Assurance Filing & Verifiable Credentials (Target Enterprise Architecture)
Federated Auth: Integration with Sign-In Canada, GCKey, and provincial digital identity wallets adhering to the Pan-Canadian Trust Framework (PCTF).
Cryptographic Verification: Generation of Zero-Knowledge Proofs (ZKPs) over Canada Revenue Agency (CRA) Notice of Assessment attestations, allowing instant qualification for municipal programs (e.g., OC Transpo EquiPass) without disclosing raw income figures or SINs.
3. Legal, Regulatory & Governance Architecture
Multi-Jurisdictional Statutory Alignment
Statistics Act (R.S.C., 1985, c. S-19):
Section 8 (Voluntary Surveys): Authorizes Statistics Canada to ingest voluntary digital microdata directly from citizens who grant explicit opt-in consent.
Section 11/12 (Joint Collection Agreements): Enables reciprocal, non-duplicative statistical sharing with provincial statistical focal points (e.g., Ontario Ministry of Finance) and municipal analytical offices, provided the citizen does not exercise their statutory right to object.
Section 17 (Confidentiality Shield): Guarantees that data transferred to StatCan cannot be accessed by compliance, audit, or enforcement bodies (e.g., CRA, Canada Border Services Agency, or municipal caseworkers).
Privacy Legislation:
Compliant with federal PIPEDA for the neutral hosting layer.
Compliant with Ontario's Freedom of Information and Protection of Privacy Act (FIPPA) and Municipal Freedom of Information and Protection of Privacy Act (MFIPPA) by ensuring the platform host never acts as an unencrypted custodian of municipal or provincial case records.
Dynamic Machine-Readable Consent Receipts
When a user opts into statistical sharing, the client generates an immutable receipt conforming to ISO/IEC 29184 and the Kantara Consent Receipt Specification v1.1.



JSON
{
  "consent_receipt_version": "1.1.0",
  "receipt_id": "cr_ott_2026_9af3be01",
  "timestamp": "2026-10-03T14:10:40Z",
  "jurisdiction": "CA-ON-OTTAWA",
  "data_controller": {
    "organization": "Statistics Canada / Statistique Canada",
    "contact": "statcan.dataprivacy-confidentialitedonnees.statcan@canada.ca",
    "statutory_authority": "Statistics Act, Section 11/12 Joint Collection"
  },
  "purposes": [
    {
      "purpose_code": "BENEFIT_TAKEUP_ANALYTICS",
      "description": "Evaluation of municipal and provincial subsidy uptake and policy threshold optimization",
      "legal_basis": "EXPLICIT_CONSENT_OPT_IN"
    }
  ],
  "shared_attributes": [
    { "attribute": "geo.fsa", "value_coarsened": "K2K" },
    { "attribute": "household.structure", "value_coarsened": "1_ADULT_2_CHILDREN" },
    { "attribute": "financials.income_band", "value_coarsened": "30000_34999" },
    { "attribute": "services.uptake_signals", "value_coarsened": ["EQUIPASS_QUALIFIED", "CCB_ACTIVE"] }
  ],
  "masked_attributes": [
    "demographics.disability_status",
    "demographics.indigenous_identity",
    "geo.exact_address"
  ],
  "linkage_authorization": false,
  "revocation_channel": "https://api.civikottawa.ca/v1/consent/revoke/cr_ott_2026_9af3be01"
}


4. End-to-End System Security & Cryptographic Blueprint



                      [ CLIENT APPLICATION LAYER (Browser / PWA) ]
                                          │
            ┌─────────────────────────────┴─────────────────────────────┐
            ▼                                                           ▼
 [ In-Memory Fact Base ]                                     [ Client WebCrypto Engine ]
 • Ephemeral demographic inputs                              • Argon2id Key Derivation
 • Versioned JSON Rules Evaluator                           • AES-GCM-256 Envelope Encryption
            │                                                           │
            ▼                                                           ▼
 [ Application Handshake ]                                   [ Zero-Knowledge Payload ]
 Direct, sandboxed egress to:                                Synchronized with neutral host:
 • City of Ottawa Intake APIs                                • Ciphertext blobs only
 • Ontario Social Assistance                                 • Zero plaintext storage
 • CRA / Service Canada Forms                                • Zero knowledge of user keys


Zero-Knowledge Cloud Storage
Passphrase Derivation: The user sets a vault passphrase. The client application uses PBKDF2 (or Argon2id via WebAssembly) with a cryptographically random salt to derive a 256-bit Key Encryption Key (KEK).
Payload Encryption: The active user profile is serialized to JSON and encrypted locally using AES-GCM-256. The resulting ciphertext and initialization vector (IV) are pushed to the cloud storage bucket.
Blinded Storage: The cloud server stores only an opaque identifier mapped to ciphertext blobs. Database administrators and infrastructure operators cannot read user income, family status, or benefit history.
The 2-of-3 Threshold Recovery Architecture (Shamir's Secret Sharing)
To support non-technical users who forget passwords without storing a backdoor master key:
Shard Generation: The vault master key is divided into three cryptographic shares ($k=2, n=3$):
Share 1 (Device/User Vault): Stored in local browser storage (IndexedDB protected by operating-system sandbox).
Share 2 (Platform Custody Escrow): Encrypted in a FIPS 140-2 Level 3 Hardware Security Module (HSM). Released only when an authorized support agent enters an out-of-band verification token following live identity validation.
Share 3 (Out-of-Band Emergency String): A 16-character alphanumeric phrase printed by the user or delivered via SMS/Voice OTP.
Recovery Workflow: A user who forgets their passphrase contacts support. The agent verifies identity and authorizes the release of Share 2. The user enters their Share 3. The browser mathematically reconstructs the master key, decrypts the vault in memory, and prompts the user to set a new passphrase, instantly generating fresh shares and voiding the old ones.
Public Kiosk & Shared Terminal Mode
For public terminals across Ottawa Public Library branches and community service centers:
Volatile Memory Only: All persistence APIs (localStorage, IndexedDB, Web Workers) are completely disabled.
Auto-Tombstoning: A hard inactivity timer executes after 3 minutes of zero input. A 30-second warning prompts the user before the application invokes crypto.getRandomValues() over the in-memory array buffers and flushes state.
Navigation Traps: Intercepts beforeunload, pagehide, and history manipulation to ensure backward navigation or tab closure leaves zero residual cache on public operating systems.
5. Ottawa Tri-Level Benefit Rule Manifest Specification
The rules engine relies on a unified, normalized fact base evaluated locally against a static, versioned JSON rule manifest.
Normalized Ottawa Fact-Base Schema



TypeScript
interface OttawaFactBase {
  geo: {
    fsa: string;               // e.g., "K2K", "K1P", "K1Z"
    municipality: "OTTAWA";
    province: "ON";
    residenceStatus: "CITIZEN" | "PR" | "PROTECTED_PERSON" | "TEMPORARY";
  };
  household: {
    familyStructure: "SINGLE" | "COUPLE" | "LONE_PARENT";
    numAdults: number;
    numDependentsUnder18: number;
    dependentAges: number[];
  };
  financials: {
    priorYearNetIncomeLine23600: number; // Net income from T1 return
    monthlyGrossEarnedIncome: number;
    liquidAssetTotal: number;
    housingTenure: "RENT" | "OWN" | "SOCIAL_HOUSING";
    monthlyShelterCost: number;
  };
  indicators: {
    hasDisabilityBarrier: boolean;
    hasChildCareReceipts: boolean;
    isEnrolledInPostSecondary: boolean;
    hasOutPocketPrescriptionCosts: boolean;
  };
}


Complete Ottawa Program Coverage Matrix



┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              OTTAWA BENEFIT INVENTORY                                  │
├────────────────────────────┬─────────────────────────────┬─────────────────────────────┤
│ MUNICIPAL (City of Ottawa) │ PROVINCIAL (Ontario)        │ FEDERAL (Canada)            │
├────────────────────────────┼─────────────────────────────┼─────────────────────────────┤
│ • OC Transpo EquiPass      │ • Healthy Smiles Ontario    │ • Canada Child Benefit      │
│ • Child Care Fee Subsidy   │ • Ontario Trillium (OTB)    │ • Canadian Dental Care Plan │
│ • Ottawa Hand-in-Hand Rec  │ • Ontario Works (OW)        │ • GST/HST Credit            │
│ • Essential Health Support │ • ODSP Income Support       │ • Canada Workers Benefit    │
│ • Emergency Shelter Assist │ • Trillium Drug Program     │ • Canada Disability Benefit │
│ • Property Tax Deferrals   │ • OHIP+ Prescription Plan   │ • GIS / OAS Pension Top-ups │
└────────────────────────────┴─────────────────────────────┴─────────────────────────────┘


Declarative Rules Manifest Sample (Ottawa Scope)



JSON
{
  "$schema": "https://specs.civikottawa.ca/v1/engine-rules.json",
  "manifest_version": "2026.10.1",
  "jurisdiction": "CA-ON-OTTAWA",
  "rules": [
    {
      "id": "OTT-MUN-EQUIPASS-2026",
      "tier": "MUNICIPAL",
      "agency": "OC Transpo / City of Ottawa",
      "title": "EquiPass (Discounted Transit Program)",
      "category": "TRANSIT",
      "value_summary": "50% off monthly adult transit pass (~$804/year savings)",
      "documentation_url": "https://www.octranspo.com/en/fares/payment-options/equipass/",
      "eligibility": {
        "all": [
          { "fact": "geo.municipality", "operator": "equal", "value": "OTTAWA" },
          {
            "fact": "financials.priorYearNetIncomeLine23600",
            "operator": "lessThanInclusive",
            "value": {
              "lookup": "LICO_BEFORE_TAX_TABLE_2026",
              "key": "household.familySize"
            }
          }
        ]
      },
      "zkp_predicate_supported": true,
      "zkp_statement": "income_less_than_family_lico"
    },
    {
      "id": "OTT-MUN-CHILDCARE-SUBSIDY",
      "tier": "MUNICIPAL",
      "agency": "City of Ottawa Children's Services",
      "title": "Child Care Fee Subsidy",
      "category": "FAMILY",
      "value_summary": "Sliding-scale subsidy up to 100% of licensed childcare costs",
      "documentation_url": "https://ottawa.ca/en/family-and-social-services/childrens-services/child-care-fee-subsidy",
      "eligibility": {
        "all": [
          { "fact": "geo.municipality", "operator": "equal", "value": "OTTAWA" },
          { "fact": "household.numDependentsUnder18", "operator": "greaterThan", "value": 0 }
        ]
      },
      "formula": {
        "type": "ONTARIO_CHILD_CARE_INCOME_TEST",
        "zero_contribution_threshold": 20000,
        "rate_tier_1": 0.10,
        "rate_tier_2": 0.20
      }
    },
    {
      "id": "CA-FED-CCB-2026",
      "tier": "FEDERAL",
      "agency": "Canada Revenue Agency",
      "title": "Canada Child Benefit (CCB)",
      "category": "FAMILY",
      "value_summary": "Tax-free monthly payment up to $648.91/mo per child under 6",
      "documentation_url": "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview.html",
      "eligibility": {
        "all": [
          { "fact": "geo.residenceStatus", "operator": "in", "value": ["CITIZEN", "PR", "PROTECTED_PERSON"] },
          { "fact": "household.numDependentsUnder18", "operator": "greaterThan", "value": 0 }
        ]
      }
    }
  ]
}


6. Implementation & Video Demo Plan
Prototype Technical Architecture
The Phase 2 prototype is structured as an interactive web deliverable built on modern web standards:
Framework: Next.js (Static Export / PWA) styled via Tailwind CSS and accessible component patterns (Radix UI / Shadcn).
Rules Engine: In-browser compilation using json-rules-engine.
Cryptographic Primitives: Native W3C Web Cryptography API (window.crypto.subtle) for PBKDF2, AES-GCM, and SHA-256 operations.
Video Demonstration Script (LinkedIn Stakeholder Presentation)
Target Duration: 90 Seconds | Aspect Ratio: 16:9 | Audio: Voiceover with burned-in high-contrast captions



┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              VIDEO PRODUCTION RUN SHEET                                │
├───────────┬───────────────────────────────┬────────────────────────────────────────────┤
│ TIMECODE  │ SCREEN VISUAL                 │ VOICE / CAPTION SCRIPT                     │
├───────────┼───────────────────────────────┼────────────────────────────────────────────┤
│ 0:00-0:18 │ Clean interface. User types   │ "Public administration shouldn't force     │
│           │ 'K2K', clicks 2 children,     │ citizens into organizational silos. Meet   │
│           │ enters $34,000 net income.    │ Sarah: an Ottawa parent in Kanata."        │
│           │                               │                                            │
│ 0:18-0:38 │ Instant render. Dashboard     │ "Instantly, our client-side engine matches │
│           │ shows categorized cards for   │ her across all three tiers: Canada Child   │
│           │ CCB, Healthy Smiles Ontario,  │ Benefit, provincial dental, and municipal  │
│           │ and OC Transpo EquiPass.      │ EquiPass—saving over $18,000 annually.     │
│           │ Total value badge pulses.     │ No tracking, no account, zero surveillance."│
│           │                               │                                            │
│ 0:38-0:58 │ User clicks 'Save to Vault'.  │ "When Sarah wants to save her profile, she │
│           │ Password entered. 2-of-3 key  │ creates a Zero-Knowledge Vault. Her data   │
│           │ shard visual indicates phone- │ is encrypted on her device. If she loses   │
│           │ support recovery status.      │ her key, our 2-of-3 threshold architecture │
│           │                               │ restores access without admin backdoors."  │
│           │                               │                                            │
│ 0:58-1:18 │ StatCan modal opens. User     │ "Unlike traditional extraction, Sarah      │
│           │ unchecks 'Disability Status'. │ exercises genuine civic agency. She shares │
│           │ An immutable Kantara consent  │ coarsened demographics with Statistics     │
│           │ receipt is generated on-screen│ Canada under Section 11/12, receiving an   │
│           │ with a SHA-256 fingerprint.   │ immutable, cryptographically signed receipt"│
│           │                               │                                            │
│ 1:18-1:30 │ EquiPass application card.    │ "For filing, the app demonstrates future-  │
│           │ A green ZKP badge triggers:   │ state Zero-Knowledge Proofs: verifying she │
│           │ 'Verified: Income ≤ LICO'.    │ meets the municipal poverty line without   │
│           │ Application shows 'Approved'. │ ever transmitting her tax return or SIN."  │
│           │                               │                                            │
│ 1:30-1:40 │ Logo slate: 'CivikOttawa:     │ "Dignity for citizens. Verifiable trust.   │
│           │ Privacy by Architecture.      │ High-fidelity statistical insight. Built   │
│           │ Built for Ottawa.'            │ for Ottawa, ready for Canada."             │
└───────────┴───────────────────────────────┴────────────────────────────────────────────┘


7. Risk Analysis & Mitigation Matrix
Domain
Risk Description
Severity
Mitigation Strategy
Legal
Provincial or municipal bodies challenge direct StatCan ingestion
Medium
Anchor pipeline strictly under Sections 8 and 11 of the Statistics Act as direct voluntary collection between the individual and the national statistical office.
Security
Accidental caching of plaintext data on shared library computers
High
Implement Public Kiosk Mode: enforce no-store HTTP headers, volatile in-memory state arrays, and hard 3-minute inactivity memory scrubbing via crypto.getRandomValues().
Accessibility
Vulnerable citizens forget vault passphrases and lose access
High
Deploy 2-of-3 Threshold Secret Sharing, enabling secure recovery through phone support without exposing plain decryption keys to agents.
Operational
Frequent statutory changes to benefit income thresholds
Medium
Decouple program logic into a declarative, versioned JSON rule manifest served from an immutable CDN, requiring zero client-code refactoring for annual indexation updates.
Equity
Users on low-end hardware unable to execute complex ZKP proofs
Low
Keep Phase 1 and 2 purely based on lightweight AES/PBKDF2 WebCrypto primitives supported natively across all budget mobile browsers.

8. Milestone Execution Schedule



+---------------------------------------------------------------------------------------+
| WEEKS 1-4: Phase 1 Engine Delivery                                                    |
| [====================]                                                                |
| • Finalize ~45 Ottawa-specific benefit JSON rule models.                              |
| • Implement client-side in-memory evaluation engine using json-rules-engine.          |
| • Deploy static, zero-tracking anonymous discovery web application.                   |
+---------------------------------------------------------------------------------------+
| WEEKS 5-8: Phase 2 Cryptographic Vault & StatCan Pipeline                             |
|                      [====================]                                           |
| • Implement client-side WebCrypto (AES-GCM-256 + PBKDF2/Argon2id).                   |
| • Build Shamir 2-of-3 threshold recovery API and agent approval console.              |
| • Develop Kantara ISO 29184-compliant consent receipt generation module.              |
| • Implement Public Kiosk Mode with aggressive buffer clearing.                        |
+---------------------------------------------------------------------------------------+
| WEEKS 9-12: Interactive Demo & Stakeholder Engagement                                 |
|                                           [====================]                      |
| • Package Next.js interactive vision prototype with simulated ZKP verification.       |
| • Record, edit, and master 90-second LinkedIn video presentation.                     |
| • Publish open technical specification to civic tech and public sector repositories.  |
+---------------------------------------------------------------------------------------+
