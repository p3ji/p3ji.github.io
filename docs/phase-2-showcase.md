# Civik Ottawa — Phase 2 showcase brief

**Purpose:** Give residents and prospective public partners a concrete demonstration of needs-first discovery today and a credible vision of a true one-stop service. This is the **final public deliverable before agency outreach**. The intended address is civik.peji.ca, pending domain setup.

## Audience and core message

- **Residents and civic technologists:** A free, independent information tool can already connect Ottawa residents with relevant federal, Ontario, and municipal services and official next steps.
- **Service and policy teams:** The same needs-based interface can illustrate how tell-me-once, consent, proactive matching, filing, and status could work when public bodies provide authority and integrations.
- **Press and community organizations:** The live product and open source repo show what works; synthetic demos make proposed capabilities understandable without implying government endorsement.

The message on every asset: **“Find support by need today. Explore how one-stop public services could work tomorrow.”**

## Public package

| Asset | What it must show | Production gate |
| --- | --- | --- |
| Live Phase 1 product | An Ottawa need, conditional cross-government results, official sources and handoffs, optional on-device saved links | Source and accessibility review; no unsupported eligibility decisions |
| Interactive future-state demo | Fictional persona, one fact reused, program suggestions, sharing review, simulated application and timeline | Persistent “Simulation — no submission” label and synthetic values |
| 90-second video | Screen capture of the real journey followed by labelled future-state scenes | Captioned, transcript supplied, claims checked |
| Five-minute live walkthrough | Two minutes on working discovery, two on concept flow, one on prerequisites and questions | Reliable reset to synthetic starting state |
| One-page brief | Problem, working solution, proposed next step, open-source link, official-source policy | Plain language, no implied agency endorsement |
| Architecture and data-flow sheet | Browser-only matching now; proposed partner APIs and consent boundary later | Each arrow labelled “live,” “synthetic,” or “partner required” |
| Evidence appendix | Source links, review dates, working feature list, known limits, and claims register | An owner checks every public factual claim |

## Draft 90-second run sheet

| Time | Screen | Voiceover / caption |
| --- | --- | --- |
| **0:00–0:12** | Ottawa resident starts with “Having a baby,” not a department list. | “A life event touches several governments. Finding support should start with the need.” |
| **0:12–0:30** | **WORKS NOW** label. Select Ottawa; show federal, Ontario, and City results with “potential match” or “needs more information.” | “Civik Ottawa brings official service information together and explains what may be relevant.” |
| **0:30–0:42** | Open source link, then save one service on this device. | “The current product links to the responsible program. A visitor can save links locally without creating an account.” |
| **0:42–0:57** | **SIMULATED FUTURE** label. Fictional Sarah supplies one household fact; two program cards reuse it. | “Now imagine giving a fact once, and seeing how it could help across services.” |
| **0:57–1:12** | Show explicit sharing review, proposed recipients, and a simulated application receipt. | “A future one-stop service would show what goes where and ask the person to review it. This screen sends nothing.” |
| **1:12–1:23** | Simulated status timeline; show a visible “agency integration required” tag. | “A real status timeline needs agreements and supported connections to each participating service.” |
| **1:23–1:30** | Civik Ottawa logo, domain, open-source and source links. | “Explore what works today and help design what comes next.” |

## Demo narrative and claims register

Use a fictional Ottawa household. Do not show exact income, disability, immigration, or tax records from a real person. Source-backed amounts, when needed, must include benefit period and caveat. Do not total unrelated maximums into a “savings” claim.

| Claim or screen | Classification | Evidence or condition |
| --- | --- | --- |
| Local service filtering and official handoff | **Working now** | Demonstrate in the live app; verify each linked official page |
| Browser-only household answers; optional saved IDs | **Working now after implementation check** | Inspect storage and test new/returning visitor behaviour |
| Cross-government tell-me-once | **Synthetic demonstration** | Fictional data only; no agency exchange |
| Consent review and receipt | **Synthetic demonstration** | Clearly fictional recipient and non-transmitting receipt |
| Cloud vault and assisted recovery | **Architecture proposal** | Threat model and independent cryptographic review needed |
| Statistics Canada data channel | **Partner required** | Confirmed program, legal roles, agreement, endpoint, notices, and security review needed |
| Automatic application or status | **Partner required** | Program-specific authority, APIs, reconciliation, and support needed |

## Release checklist

1. Complete and source-review the Phase 1 Ottawa program set; mark coverage gaps.
2. Test the working product and demo at 375px, by keyboard, and with a screen reader; provide video captions and transcript.
3. Check that synthetic screens have permanent labels and cannot transmit to an agency.
4. Check every video line and brief claim against the evidence appendix.
5. Verify domain, HTTPS, public links, and open-source setup.
6. Record the 90-second cut and prepare the five-minute walkthrough.
