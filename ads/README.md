# CDH Crane Rentals — Google Ads program

End-to-end paid-search program for CDH Crane Rentals. The 15 landing pages at [`/lp/*`](../lp/) are the destination URLs. Account structure, keywords, ads, negatives, bidding, conversion tracking, and KPI dashboard are documented here.

- [PHASE-10-GOOGLE-ADS.md](PHASE-10-GOOGLE-ADS.md) — the master plan (account structure → KPIs).
- [keywords/](keywords/) — keyword lists per ad group, ready to bulk-upload.
- [ads/](ads/) — Responsive Search Ad copy library, ready to paste into the Google Ads UI or bulk import.
- [negatives.txt](negatives.txt) — account-wide negative keyword list, ready to upload.

## What's already shipped on-site

The build system already emits 15 conversion-optimized landing pages with:
- noindex meta + `X-Robots-Tag` header
- Lead form posting to `/api/dispatch`, hidden `lp_slug` + `ad_group` fields, and hidden UTM/gclid capture
- Google Ads gtag + GA4 dual tracking, with placeholder IDs in [`build/site-data.js`](../build/site-data.js)
- Conversion events on phone click, email click, and form submit (firing both a GA4 event and a Google Ads `conversion` with the matching label)
- Mobile sticky CTA bar, single-CTA flow, no nav distractions

See [PHASE-10-GOOGLE-ADS.md](PHASE-10-GOOGLE-ADS.md) → "Go-live owner checklist" for the placeholders that still need real IDs.
