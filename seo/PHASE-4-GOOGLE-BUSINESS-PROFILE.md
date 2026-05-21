# Phase 4 — Google Business Profile Consolidation & Optimization

This is the operational playbook for owning the Google Business Profile (GBP) program for CDH Crane Rentals. Execute this in the order shown.

## 4.1 Audit & merge duplicates (do this first)

The Google share links provided at project kickoff returned brand-name queries for three different variants:

- `CDH Crane LLC`
- `CDH Crane Rentals`
- `CDH Crane Rentals LLC`

Three names + five yards is a recipe for duplicate listings. Duplicates split reviews, dilute local relevance signals, and confuse the Google Knowledge Graph. Before doing anything else, audit and consolidate.

### Audit steps
1. Sign into Google Business Profile Manager with the account that owns the existing CDH listings: <https://business.google.com/>.
2. Catalogue every listing currently associated with CDH (live, suspended, soft-suspended, and pending). Record for each:
   - Listing name
   - Address
   - Phone number
   - Primary category
   - Verification status
   - Review count + average rating
   - Last post / photo update date
3. Search Google Maps for "CDH Crane" in each of the five yard cities (Lafayette, Baton Rouge, Lake Charles, New Orleans, Baytown). Note any listing you do not own. These may be duplicates created by users or claimed by a former employee.
4. Build a spreadsheet (one row per listing) with two columns at the end: `Keep?` (yes/no) and `Action` (verify / merge / suspend / claim).

### Merge / cleanup
- **Keep one canonical listing per yard**, named exactly `CDH Crane Rentals` (no LLC, no suffix — Google's name policy disallows legal entity descriptors except in the legal name field).
- **For confirmed duplicates you own**: mark them as permanently closed only if Google support cannot merge them into the canonical listing. Open a support case at <https://support.google.com/business/> with the canonical Place ID and the duplicate Place ID; request a merge.
- **For listings you do not own** that represent your business: file a claim ("Own this business?") and complete verification. After claiming, merge or close per the rule above.
- **For listings that misrepresent the brand** (e.g. a competitor's listing using the CDH name): file "Suggest an edit" → "Close or remove" with the duplicate evidence; escalate to Google support if not resolved in 7 days.

## 4.2 Standardize NAP (name, address, phone) across all listings

Use these exact values, byte-for-byte, on every listing and every external citation. Inconsistency is the single biggest local-SEO killer.

| Field | Canonical value |
| --- | --- |
| Display name | `CDH Crane Rentals` |
| Legal name (in GBP "legal name" field) | `CDH Crane Rentals, LLC` |
| Phone (primary, all yards) | `(337) 962-3999` |
| Phone (international format for schema) | `+1-337-962-3999` |
| Email | `office@cdhrentals.com` |
| Website (homepage) | `https://cdhcranerentals.com/` |
| Per-yard websites | See table below |

Per-yard website URLs (each yard's GBP should point to its own location page, not the homepage):

| Yard | GBP website URL |
| --- | --- |
| Lafayette (HQ) | `https://cdhcranerentals.com/locations/lafayette/` |
| Baton Rouge | `https://cdhcranerentals.com/locations/baton-rouge/` |
| Lake Charles | `https://cdhcranerentals.com/locations/lake-charles/` |
| New Orleans | `https://cdhcranerentals.com/locations/new-orleans/` |
| Baytown, TX | `https://cdhcranerentals.com/locations/baytown/` |

Addresses must match the public-facing addresses in [build/site-data.js](../build/site-data.js) once filled in (currently `REPLACE_WITH_*` placeholders). Update both at the same time and re-run `node build-pages.js`.

## 4.3 Per-yard GBP optimization checklist

Apply to every yard listing.

### Categories
- **Primary**: `Crane rental service`
- **Additional**: `Crane service`, `Equipment rental agency`, `Construction equipment supplier`, `Heavy equipment supplier`. Add `Marine cargo handling` for New Orleans; add `Industrial supplier` for Baytown, Lake Charles, Baton Rouge.

### Description (750 char max)
Write a unique description per yard. Template:

> CDH Crane Rentals operates the {city} yard with 15 to {max ton at yard}-ton cranes, NCCCO-certified operators, and 24/7 dispatch. We serve {3 nearby town names} and the wider {region descriptor} with operated and bare crane rental for {dominant industries}. {1-sentence proof statement about local work}. Call dispatch at (337) 962-3999.

Make each unique. Do not paste the same text across five listings.

### Service area
Set service area to the cities listed in `nearbyTowns` in [build/site-data.js](../build/site-data.js) for each yard. Add any additional towns where you actually take service calls. Maximum 20 service areas per listing — prioritize highest-traffic destinations.

### Hours
- Set regular hours to office hours (Mon–Fri 7a–5p; Sat/Sun closed).
- Add "More hours" → "Online service hours" set to 24/7 to reflect the dispatch line availability.
- Maintain holiday hours every quarter (Memorial Day, July 4, Labor Day, Thanksgiving + Black Friday, Christmas Eve / Day, New Year's).

### Services
Add one service entry per fleet class (15-Ton Boom Truck, 40-Ton Rough Terrain, etc.) and one per service offering (Operated Crane Rental, Bare Crane Rental, Heavy Lift, Critical Lift Engineering, Refinery Turnaround, Marine Crane, HVAC & Steel Sets, 24/7 Emergency Dispatch). Mirror the names exactly from the website pages.

### Products
Add a Product entry for each major fleet class with a photo of that crane and a link to its `/fleet/{slug}/` page.

### Photos
- Minimum 25 photos per listing at launch, 60+ within 6 months.
- Categories: cover photo (a hero shot of the yard or a flagship crane), logo, interior (office), exterior (yard gate and signage), team (operators, dispatch staff), at-work shots (cranes on real jobsites — refinery, marine, commercial), each fleet class.
- Upload new photos at least monthly.
- Geotag photos to the yard before upload (use EXIF tools or take the photo with GPS on).
- Name files descriptively: `cdh-crane-rentals-lafayette-225-ton-refinery.jpg`, not `IMG_8632.jpg`.

### Attributes
Mark applicable attributes: "Wheelchair-accessible entrance" (if your office qualifies), "Veteran-led" if true, "Identifies as women-owned" / "minority-owned" if true. These attributes can drive small ranking improvements and surface filters in Maps.

### Google Posts
Cadence: 1+ post per week per listing, every week. Rotate content types:
- **What's New**: project completed last week (with a real photo).
- **Offer**: rarely used for crane rental; consider an annual "Schedule your turnaround crane early" reminder.
- **Event**: hurricane prep events, industry trade shows (SC&RA Annual Conference, Crane Industry Services events).
- **Update**: equipment additions, certifications, milestones.

Each post should include a photo, 150–300 words of body, and a CTA button linking to a relevant `/fleet/`, `/services/`, or `/locations/` page.

### Q&A
Seed each listing with the top 10 buyer questions (use the FAQ block from the homepage as a starting point). Post the question from a personal Google account (not the business account), then answer from the business account. Always answer real customer questions within 48 hours.

## 4.4 Verification status & access

- Maintain at least 2 owners on every listing (one primary, one backup) so you can never lose access if a person leaves.
- Audit user access quarterly. Remove former employees.
- Keep the GBP Manager account email on a shared inbox so notifications don't go to one person's personal email.

## 4.5 Insights monitoring (weekly)

Review per-yard insights every Monday:
- Search queries that drove discovery (note new patterns)
- Direction requests (good proxy for in-person conversion)
- Phone calls (cross-reference with dispatch log)
- Photo views
- Posts performance

Look for week-over-week deltas above 25% and act on them (good or bad).

## 4.6 Owner-required actions before this phase can close

- [ ] Confirm canonical brand name across all GBP listings is `CDH Crane Rentals`.
- [ ] Confirm legal name in GBP is `CDH Crane Rentals, LLC`.
- [ ] Replace all `REPLACE_WITH_GOOGLE_BUSINESS_PROFILE_URL_*` placeholders in [cdh-homepage-v3.html](../cdh-homepage-v3.html) and [build/site-data.js](../build/site-data.js) with real GBP URLs (then re-run `node build-pages.js`).
- [ ] Replace all `REPLACE_WITH_GBP_REVIEW_SHORTLINK_*` placeholders in [build/site-data.js](../build/site-data.js) with the per-yard review request short URLs (generate from each GBP listing's "ask for reviews" link).
- [ ] Replace all `REPLACE_WITH_*_STREET` and `REPLACE_WITH_ZIP` placeholders with real yard addresses.
