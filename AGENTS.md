# Civik Ottawa

Free, open-source information site and interactive design proposal for a needs-based, cross-government one-stop experience. Ottawa is the first geographic focus. Intended public address: civik.peji.ca. The current app is a frontend prototype.

## Stack
Next.js App Router, React, strict TypeScript, Tailwind CSS, and lucide-react. Data and watchlist state are local to the browser.

## Run
`npm install` then `npm run dev`.

## Rules
- Mobile-first; verify layouts at 375px wide and use 44px minimum touch targets.
- Keep eligibility language conditional and link to official government pages.
- Do not add live AI, a database, or authentication in this Phase 1 scaffold.
- Clearly distinguish sourced information from simulated one-stop flows; use fictional data for concept demos.
- Keep household profile answers in memory; persist only service IDs after a visitor saves them to the local watchlist.
- Phase 2 is the finished pre-outreach public showcase and marketing package. Real agency integrations are optional later work.
