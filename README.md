# Civik Ottawa

A free, open-source information site and interactive design proposal for discovering federal, Ontario, and Ottawa services by life need. The Phase 1 frontend is published at **[civik.peji.ca](https://civik.peji.ca/)**. It remains a prototype: its catalogue is curated demo data, the assistant is scripted, and saved service IDs stay on this device. Household filters stay in memory for the current visit.

See [ROADMAP.md](ROADMAP.md) for the two-phase path to the public showcase, [docs/specs.md](docs/specs.md) for the corrected product specification, and [docs/phase-2-showcase.md](docs/phase-2-showcase.md) for the marketing package.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Use `npm run typecheck` and `npm run build` to verify the scaffold.

## Publish

The public site deploys to GitHub Pages through [the deployment workflow](.github/workflows/deploy.yml) when `main` is pushed. Verify the [live site](https://civik.peji.ca/) after each deployment. The GitHub Pages project address is [p3ji.github.io](https://p3ji.github.io/).

## Scope

The prototype does not determine eligibility or submit applications. Program matches are conditional and most amounts are shown as variable. Each service links to an official government page for current rules and applications. Phase 2 will demonstrate future-state one-stop flows with fictional data and visible simulation labels; agency outreach follows that finished showcase.

## Licence

The original code and project documentation are released under the [MIT Licence](LICENSE). Linked government pages and third-party material retain their own terms; the site links to them for current program information.
