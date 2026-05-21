# CDH Crane Rentals — SEO program

The full plan lives at [`.cursor/plans/cdh_crane_seo_plan_*.plan.md`](../.cursor/plans/). This folder is the working repository of the playbooks and operational documents that put the plan into practice.

## What's shipped

### On-site (already deployed)
- **Phase 0 — Indexing foundation**: canonical URLs fixed, OG/Twitter tags, [`robots.txt`](../robots.txt), [`sitemap.xml`](../sitemap.xml), Vercel security & caching headers in [`vercel.json`](../vercel.json), GSC + Bing verification meta placeholders.
- **Phase 1 — Homepage on-page**: SEO-friendly `<title>` and `<meta description>`, geo meta, structured H1 with primary keyword, visible FAQ section + JSON-LD (Organization, WebSite, WebPage, BreadcrumbList, Service, FAQPage). See [`cdh-homepage-v3.html`](../cdh-homepage-v3.html).
- **Phase 2 — Location architecture**: 5 yard pages at [`/locations/lafayette/`](../locations/lafayette/index.html), [`/locations/baton-rouge/`](../locations/baton-rouge/index.html), [`/locations/lake-charles/`](../locations/lake-charles/index.html), [`/locations/new-orleans/`](../locations/new-orleans/index.html), [`/locations/baytown/`](../locations/baytown/index.html). Each has unique 600+ word body, embedded map, NAP, fleet stationed, nearby towns, case studies, and `LocalBusiness` schema with `parentOrganization` reference.
- **Phase 3 — Fleet + service pages**: 9 fleet tonnage pages under [`/fleet/`](../fleet/) and 8 service pages under [`/services/`](../services/). Each has `Service` + `Product` schema.
- **Phase 7 (kickoff) — Content engine**: 5 industry hub pages under [`/industries/`](../industries/) and 4 educational guides under [`/learn/`](../learn/), each with `Article` or `WebPage` schema.
- **Phase 9 (foundation) — Measurement**: GA4 placeholder snippet on every page, Vercel-preview-deployment noindex guard, KPI dashboard spec.

### Off-site (operational playbooks in this folder)
- [`PHASE-4-GOOGLE-BUSINESS-PROFILE.md`](PHASE-4-GOOGLE-BUSINESS-PROFILE.md) — GBP audit, duplicate merge, NAP standardization, per-yard optimization.
- [`PHASE-5-REVIEW-ENGINE.md`](PHASE-5-REVIEW-ENGINE.md) — request flow templates, response policy, embedding reviews on yard pages.
- [`PHASE-6-CITATIONS-AND-LINKS.md`](PHASE-6-CITATIONS-AND-LINKS.md) — citation submission tiers, local + industry link targets.
- [`PHASE-7-CONTENT-ENGINE.md`](PHASE-7-CONTENT-ENGINE.md) — case study + `/learn/` editorial pipeline, refresh cadence.
- [`PHASE-8-PERFORMANCE.md`](PHASE-8-PERFORMANCE.md) — Tailwind build replacement, font self-hosting, image migration, CWV targets.
- [`PHASE-9-MEASUREMENT.md`](PHASE-9-MEASUREMENT.md) — GA4 + GSC + Bing + rank tracking, KPI dashboard, quarterly audit.

### Paid program (parallel to SEO, separate folder)
- [`../ads/PHASE-10-GOOGLE-ADS.md`](../ads/PHASE-10-GOOGLE-ADS.md) — full Google Ads program: account structure, geo, keywords, ads, negatives, bidding, conversion tracking, budgets, QS, scaling, KPI dashboard.
- [`../ads/keywords/`](../ads/keywords/) — bulk-uploadable keyword lists per ad group.
- [`../ads/ads/`](../ads/ads/) — Responsive Search Ad copy library + account-level assets (sitelinks, callouts, structured snippets).
- [`../ads/negatives.txt`](../ads/negatives.txt) — account-wide negative keyword list.
- 15 conversion-optimized landing pages already deployed at [`/lp/*`](../lp/) — `noindex`, single-CTA, lead form above the fold, GA4 + Google Ads conversion tracking wired.

## How to make changes

All location, fleet, service, industry, and learn pages are generated from data. **Do not hand-edit the generated HTML files** — edits will be overwritten next build.

### Editing copy on a page
1. Edit the page's record in [`build/site-data.js`](../build/site-data.js).
2. Run `node build-pages.js` (or `npm run build:pages`).
3. The page is regenerated and `sitemap.xml` is refreshed.

### Adding a new page (e.g. a case study)
1. Add the data to [`build/site-data.js`](../build/site-data.js) (create a new array if a new content type).
2. Add a render function to [`build/templates.js`](../build/templates.js).
3. Wire the new render function into [`build-pages.js`](../build-pages.js).
4. Run `node build-pages.js`.

### Editing nav, footer, or shared CSS
- Nav and footer markup live in [`build/templates.js`](../build/templates.js).
- Shared subpage CSS lives in [`dist/cdh-subpages.css`](../dist/cdh-subpages.css).
- The homepage [`cdh-homepage-v3.html`](../cdh-homepage-v3.html) has its own inline CSS and its own nav/footer markup — keep them in sync manually for now (Phase 8 plan calls this out).

## Placeholder values that still need real data

Everything tagged `REPLACE_WITH_*` is a placeholder. The current placeholders are:

| Placeholder | Where | Who supplies it |
| --- | --- | --- |
| `REPLACE_WITH_GSC_VERIFICATION_TOKEN` | every `<head>` | Google Search Console |
| `REPLACE_WITH_BING_VERIFICATION_TOKEN` | every `<head>` | Bing Webmaster |
| `G-XXXXXXXXXX` | every `<head>` (GA4) | GA4 property setup |
| `REPLACE_WITH_LAFAYETTE_STREET` + 4 others | [`build/site-data.js`](../build/site-data.js) yard addresses | Owner |
| `REPLACE_WITH_ZIP` (5 yards) | [`build/site-data.js`](../build/site-data.js) | Owner |
| `REPLACE_WITH_GOOGLE_BUSINESS_PROFILE_URL_*` | homepage Organization schema + [`build/site-data.js`](../build/site-data.js) | GBP |
| `REPLACE_WITH_GBP_REVIEW_SHORTLINK_*` | [`build/site-data.js`](../build/site-data.js) per yard | GBP per-yard "ask for reviews" |
| `REPLACE_WITH_FACEBOOK_URL`, `_LINKEDIN_URL`, `_INSTAGRAM_URL` | [`build/site-data.js`](../build/site-data.js) `SITE.sameAs` | Owner |

When these are filled in, run `node build-pages.js` once and everything propagates.

## Deploy

The project deploys on Vercel. Pre-deploy command (suggested):

```bash
node build-pages.js
```

This regenerates all pages + the sitemap from the current data + templates. Add it to a Vercel build step or a pre-push git hook so the deployed pages always reflect the latest data.
