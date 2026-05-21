# Phase 10 — Google Ads program

The plan for a world-class Google Ads program for CDH Crane Rentals. Targets Louisiana + East Texas, all five yards, with landing pages already shipped at [`/lp/*`](../lp/).

---

## 10.1 Account structure (campaigns → ad groups → keywords)

One Google Ads account. Eight Search campaigns + one Performance Max + one Display remarketing campaign at maturity. Start lean (Phase A below), expand on data.

### Campaign architecture

| # | Campaign | Type | Why a separate campaign |
| --- | --- | --- | --- |
| 1 | **CDH · Brand** | Search | Defend the brand SERP. Bid low, exact match, fast wins. |
| 2 | **CDH · Lafayette** | Search | Per-yard geo targeting + landing page (`/lp/crane-rental-lafayette/`). |
| 3 | **CDH · Baton Rouge** | Search | Same — per-yard discipline. |
| 4 | **CDH · Lake Charles** | Search | Same. |
| 5 | **CDH · New Orleans** | Search | Same. |
| 6 | **CDH · Baytown** | Search | Same. East Texas geo + bid by Houston ship channel intent. |
| 7 | **CDH · Service & Intent** | Search | Service-led keywords (operated, emergency, heavy lift, refinery TA, marine), routed to service LPs with broader geo. |
| 8 | **CDH · Tonnage** | Search | Tonnage queries with weaker geo intent ("500 ton crane rental"), routed to tonnage LPs. |
| 9 | **CDH · PMax · Lead Gen** | Performance Max | Cross-channel for low-funnel leads once you have ≥ 30 conversions/month. |
| 10 | **CDH · Remarketing** | Display | RLSA / Display retargeting to LP visitors who did not convert. |

Per-yard campaigns are separated (rather than ad-group-only segmentation) because:
- Each yard has a different conversion rate, CPC, and CPA — you need budget control per yard.
- Geo radii around different yards overlap; campaign-level geo targeting prevents conflicts.
- Reporting + executive review is cleaner per-yard.

### Ad group structure within each yard campaign

Five ad groups per yard campaign (1:1 with intent themes):

| Ad group | Match the LP |
| --- | --- |
| `{City} · Generic` | `/lp/crane-rental-{city}/` |
| `{City} · Operated` | `/lp/operated-crane-rental/` |
| `{City} · Emergency` | `/lp/emergency-24-7-crane-rental/` |
| `{City} · Heavy Lift` | `/lp/heavy-lift-crane-rental/` |
| `{City} · Industry` (Refinery for LC/BR/Baytown, Marine for NOLA, Commercial for Lafayette) | `/lp/refinery-turnaround-crane-rental/` or `/lp/marine-crane-rental/` |

Service & Intent campaign uses single-theme ad groups (Operated / Emergency / Heavy Lift / Refinery TA / Marine), each mapped 1:1 to its LP.

Tonnage campaign uses single-theme ad groups per tonnage cluster (15-50T / 90-150T / 200-300T / 500T), each mapped 1:1 to its LP.

---

## 10.2 Geo targeting

### Per-yard radius
Use **location targeting (people in or regularly in)** — never "interested in" (that floods leads from people just researching online).

| Campaign | Geo target | Bid modifier |
| --- | --- | --- |
| CDH · Brand | All of LA + East TX | n/a |
| CDH · Lafayette | 60-mile radius around the Lafayette yard | +20% inside 25 mi, baseline 25–60 mi |
| CDH · Baton Rouge | 60-mile radius around BR yard | +20% inside the industrial corridor (Geismar, Plaquemine, Gonzales) |
| CDH · Lake Charles | 60-mile radius around LC yard | +25% in Sulphur/Westlake/Calcasieu Parish |
| CDH · New Orleans | 60-mile radius around NOLA yard | +20% in Orleans, Jefferson, St. Bernard, Plaquemines |
| CDH · Baytown | 50-mile radius around Baytown yard | +25% in Baytown, La Porte, Pasadena, Deer Park, Channelview |
| CDH · Service & Intent | All of LA + East TX (Lake Charles → Houston corridor) | n/a |
| CDH · Tonnage | All of LA + East TX | n/a |

### Exclusions
- Block expensive ZIPs that drive no business — review monthly via Locations report.
- Block outside the U.S. at the account level. Use "people in" only, never "interested in".

### Ad scheduling
- **CDH · Brand**: 24/7. People search the brand at all hours; brand CPC is cheap.
- **All other Search campaigns**: 24/7 with **bid +30% Mon–Fri 6a–7p**, baseline nights/weekends. Dispatch is 24/7, but the lion's share of paid traffic converts in business hours.
- **CDH · Emergency** ad group (across all yard campaigns): 24/7 baseline; **+40% bid 7p–7a Mon–Sun** and **+50% on weekends**. This is when emergency search intent spikes (after-hours upsets, storm response).

### Device bid modifiers
- Start at parity. After 30 days, look at conversion rate by device and adjust. Crane B2B leans heavily mobile (operators and project managers from the truck), so expect mobile to win — but verify with data.

---

## 10.3 Keyword strategy

### Match types
- **Phrase match** is the workhorse — better than broad, less restrictive than exact.
- **Exact match** for high-intent / brand and any keyword that has earned its place via search-term reports.
- **Broad match** ONLY when paired with Smart Bidding (Maximize Conversions / Target CPA) AND with a tight conversion goal AND with aggressive negative keyword hygiene. Otherwise, broad will burn the budget on irrelevant queries. Plan to introduce it in Phase B only.

### Per-ad-group keyword lists
Maintained in [`ads/keywords/`](keywords/). Below is an example for one ad group; the full lists for all ad groups are in that folder.

**Ad group: `Lafayette · Generic`** (mapped to `/lp/crane-rental-lafayette/`)
```
"crane rental lafayette"
"crane rental lafayette la"
"crane rental lafayette louisiana"
"crane company lafayette"
"crane company lafayette la"
"crane service lafayette"
"crane service lafayette la"
"mobile crane lafayette"
"mobile crane rental lafayette"
"hire crane lafayette"
[crane rental lafayette]
[crane rental lafayette la]
[crane company lafayette]
```

(See [`keywords/lafayette.txt`](keywords/lafayette.txt) for the full list, including operated / emergency / heavy lift / industry variants.)

### Forecasted CPCs (US Gulf South crane rental market, 2026)

| Keyword theme | Expected CPC (USD) |
| --- | --- |
| Brand | $1–$3 |
| City + generic ("crane rental {city}") | $8–$18 |
| City + tonnage | $6–$14 |
| Service ("operated crane rental") | $7–$15 |
| Industry ("refinery crane rental") | $10–$22 |
| Emergency / 24/7 | $12–$25 |
| Heavy lift / 500 ton | $9–$18 |

Use the [Google Keyword Planner](https://ads.google.com/aw/keywordplanner/home) to confirm at launch — these are sector benchmarks.

---

## 10.4 Negative keywords

Account-wide negative keyword list — applied at the campaign level on every Search campaign except Brand. Full list in [`ads/negatives.txt`](negatives.txt). Highlights:

```
# Toys / hobby / not-our-business
toy
toys
remote control
rc
hobby
diy
model
playset
playground
paper crane
origami

# Job seeking / employment
jobs
employment
salary
hiring
careers
nccco training
nccco school
nccco certification course
crane operator training
crane operator school
how to become a crane operator
how much do crane operators make

# Purchase / sales (not rental)
buy
sell
sale
for sale
purchase
used crane
new crane

# Wrong industry / unrelated
bird
crane bird
sandhill
whooping
paper
folding

# Wrong geo (only on Service & Intent + Tonnage campaigns)
chicago
new york
florida
arizona
california
canada
```

The bird/origami/employment negatives are the single biggest source of wasted spend in the crane category. Apply them on day one.

---

## 10.5 Ad copy

### Responsive Search Ads (RSAs)

Every ad group ships with **one RSA**. Each RSA has up to 15 headlines (we use 12–13 of them) and 4 descriptions (use all 4). Add 4–5 sitelinks, 6–8 callouts, structured snippets, call extensions, location extensions, lead form extension, and image extensions.

#### Example RSA — Ad group: `Lafayette · Generic`

**Final URL**: `https://cdhcranerentals.com/lp/crane-rental-lafayette/`

**Headlines** (use {City:Lafayette} dynamic insertion where you want to flex):
1. `Crane Rental in Lafayette, LA`
2. `15 to 500 Ton Crane Rental`
3. `NCCCO-Certified Operators`
4. `Same-Day Quotes · Call 337-962-3999`
5. `Lafayette's Crane Authority Since 2003`
6. `24/7 Emergency Crane Dispatch`
7. `Operated & Bare Crane Rental`
8. `HVAC, Steel, Refinery, Marine`
9. `Pre-Qualified Industrial Crane Co.`
10. `Same-Day Crane Quote · Acadiana`
11. `Crane Company Serving All of Acadiana`
12. `Trusted by GCs Across {City:Louisiana}`
13. `From {City:Lafayette} HQ Yard`

**Descriptions**:
1. `Crane rental in Lafayette from 15 to 500 ton. NCCCO operators. ISN + Avetta. 24/7 dispatch. Call 337-962-3999.`
2. `Founded in Lafayette in 2003. Full fleet at our HQ yard for HVAC, oilfield, refinery, and commercial picks.`
3. `Same-day quote on most jobs. Operated rentals include crane, operator, fuel, and insurance.`
4. `Two minutes to scope your pick. Quote back fast. Call Acadiana's crane authority.`

**Sitelink assets** (account level, eligible on every Search campaign):
- `Fleet · 15 to 500 Ton` → `/fleet/15-ton-boom-truck/` (sets the breadcrumb)
- `Our Yards · 5 Locations` → `/#locations`
- `24/7 Emergency Dispatch` → `/lp/emergency-24-7-crane-rental/`
- `NCCCO Operators` → `/learn/what-nccco-certification-means/`
- `Refinery Turnaround Crane` → `/lp/refinery-turnaround-crane-rental/`

**Callout assets** (account level):
- `NCCCO Certified Operators`
- `ISN + Avetta Compliant`
- `EST. 2003 · Louisiana-Owned`
- `15 to 500 Ton Fleet`
- `24/7 Emergency Dispatch`
- `Same-Day Quotes`
- `Engineered Lift Plans`
- `OSHA 30 Crew`

**Structured snippets**:
- Header: *Services* → `Operated Crane Rental, Bare Rental, Heavy Lift, Critical Lift Engineering, Refinery Turnaround, Marine, HVAC & Steel Sets, 24/7 Emergency Dispatch`
- Header: *Brands* → `15-Ton Boom Truck, 40-Ton RT, 65-Ton, 90-Ton AT, 130-Ton, 175-Ton, 225-Ton, 300-Ton, 500-Ton`
- Header: *Service catalog* → `Refinery, Petrochem, LNG, Marine, Commercial, Utilities, Emergency`

**Call extension**: `337-962-3999`, schedule 24/7, mobile-only enabled.
**Location extension**: linked to each yard's Google Business Profile (after Phase 4 GBP work is complete).
**Lead form extension**: enabled at the campaign level; questions match the landing page form (name, phone, tonnage, city, date, description). Form is a fallback when the landing page is not the right fit; the LP form remains primary.

All ad copy variations for all ad groups are templated in [`ads/ads/`](ads/).

---

## 10.6 Bidding strategy

### Phased approach

| Phase | Bidding | When to switch |
| --- | --- | --- |
| **Phase A — Learning (0–30 days, < 15 conversions/mo)** | Manual CPC with Enhanced CPC | Always start manual. You need to learn what queries convert before handing it to Google's smart bidding. |
| **Phase B — Volume (30–90 days, 15–30 conversions/mo)** | Maximize Conversions | Switch once each campaign has 15+ conversions in 30 days. |
| **Phase C — Efficiency (90+ days, ≥ 30 conv/mo per campaign)** | Maximize Conversions with **Target CPA** set | Set tCPA to your real lead cost target (Section 10.10). |
| **Phase D — Maturity** | Maximize Conversion Value with **Target ROAS** | Only after value-based conversions are wired (different lead types valued differently). |

### Bid caps
- During Phase A, cap CPC at 1.5× the expected median CPC for each ad group theme (Section 10.3 table). Prevents single-keyword runaways.
- During Phase B+ Smart Bidding, **do not set a Max CPC cap unless Smart Bidding is mis-bidding** — caps fight the algorithm and reduce volume.

### Brand campaign
- Always Manual CPC. Bid the minimum that holds position 1.0–1.2 avg. Do not let Smart Bidding bid up brand traffic.
- Add brand keywords as exact-match negatives in non-brand campaigns to prevent self-cannibalization.

---

## 10.7 Conversion tracking

The landing pages already fire these events; the Ads side needs the conversion actions created.

### Conversion actions to create (in Google Ads UI)

| Action name | Category | Count | Value | Conversion window | Source |
| --- | --- | --- | --- | --- | --- |
| `LP · Lead Form Submit` | Submit lead form | Every | $150 (lead value) | 30 days | Website (gtag) |
| `LP · Phone Click` | Contact | One | $50 | 1 day | Website (gtag) |
| `LP · Email Click` | Contact | One | $30 | 1 day | Website (gtag) |
| `LP · Scroll 75%` (micro) | Other | One | $0 | 1 day | Website (gtag) — micro signal for smart bidding only |
| `Call from Ads · Call Extension` | Phone calls | Every | $150 | 60 sec min duration | Google Ads native (call extension) |

### Wiring it up
1. In Google Ads → Tools → Conversions → New conversion action → Website. Use **gtag.js** (already on every landing page).
2. After Google generates the conversion ID + label, replace the placeholders in [`build/site-data.js`](../build/site-data.js):
   ```js
   googleAdsId: 'AW-1234567890',  // your account ID
   conversions: {
     formSubmit: 'AW-1234567890/AbCdEfGhIjKl',
     phoneClick: 'AW-1234567890/MnOpQrStUvWx',
     emailClick: 'AW-1234567890/YzAbCdEfGhIj',
   },
   ```
3. Re-run `node build-pages.js`. The conversion script on every LP picks up the new labels.
4. Test using the [Google Tag Assistant](https://tagassistant.google.com/) on a real LP.
5. Mark the form submit and phone-click conversions as **Primary** for bidding. Mark scroll_75 as **Secondary** (Google uses secondary signals to help Smart Bidding without bidding against them directly).

### Imported offline conversions (Phase D)
Once dispatch has a CRM with deal stages, import "Qualified Lead → Quote Sent → Job Booked → Job Completed" back into Google Ads using offline conversion import. This is how you teach Smart Bidding to find *paying customers*, not just *form fillers*.

### Call tracking
Plan to add CallRail (or equivalent) within the first 60 days. Replaces the static phone number on the LPs with a dynamic number, attributes the call back to source / campaign / ad group / keyword, and imports calls > 60 seconds into Google Ads as conversions. Until then, the on-LP `phone_click` event is the proxy.

---

## 10.8 Landing page → ad group mapping (message-match table)

| Campaign | Ad group | Landing page | H1 the user sees |
| --- | --- | --- | --- |
| CDH · Brand | Brand | `/` (homepage) | "Louisiana crane rental authority." |
| CDH · Lafayette | Lafayette · Generic | `/lp/crane-rental-lafayette/` | "Lafayette crane rental." |
| CDH · Lafayette | Lafayette · Operated | `/lp/operated-crane-rental/` | "Operated crane rental." |
| CDH · Lafayette | Lafayette · Emergency | `/lp/emergency-24-7-crane-rental/` | "24/7 emergency crane." |
| CDH · Lafayette | Lafayette · Heavy Lift | `/lp/heavy-lift-crane-rental/` | "Heavy lift crane rental." |
| CDH · Lafayette | Lafayette · Industry (Commercial) | `/lp/crane-rental-lafayette/` | "Lafayette crane rental." |
| CDH · Baton Rouge | BR · Generic | `/lp/crane-rental-baton-rouge/` | "Baton Rouge crane rental." |
| CDH · Baton Rouge | BR · Operated | `/lp/operated-crane-rental/` | "Operated crane rental." |
| CDH · Baton Rouge | BR · Emergency | `/lp/emergency-24-7-crane-rental/` | "24/7 emergency crane." |
| CDH · Baton Rouge | BR · Heavy Lift | `/lp/heavy-lift-crane-rental/` | "Heavy lift crane rental." |
| CDH · Baton Rouge | BR · Industry (Refinery) | `/lp/refinery-turnaround-crane-rental/` | "Refinery turnaround cranes." |
| CDH · Lake Charles | LC · Generic | `/lp/crane-rental-lake-charles/` | "Lake Charles crane rental." |
| CDH · Lake Charles | LC · Operated | `/lp/operated-crane-rental/` | "Operated crane rental." |
| CDH · Lake Charles | LC · Emergency | `/lp/emergency-24-7-crane-rental/` | "24/7 emergency crane." |
| CDH · Lake Charles | LC · Heavy Lift | `/lp/heavy-lift-crane-rental/` | "Heavy lift crane rental." |
| CDH · Lake Charles | LC · Industry (Refinery) | `/lp/refinery-turnaround-crane-rental/` | "Refinery turnaround cranes." |
| CDH · New Orleans | NOLA · Generic | `/lp/crane-rental-new-orleans/` | "New Orleans crane rental." |
| CDH · New Orleans | NOLA · Operated | `/lp/operated-crane-rental/` | "Operated crane rental." |
| CDH · New Orleans | NOLA · Emergency | `/lp/emergency-24-7-crane-rental/` | "24/7 emergency crane." |
| CDH · New Orleans | NOLA · Heavy Lift | `/lp/heavy-lift-crane-rental/` | "Heavy lift crane rental." |
| CDH · New Orleans | NOLA · Industry (Marine) | `/lp/marine-crane-rental/` | "Marine crane rental." |
| CDH · Baytown | Baytown · Generic | `/lp/crane-rental-baytown-tx/` | "Baytown crane rental." |
| CDH · Baytown | Baytown · Operated | `/lp/operated-crane-rental/` | "Operated crane rental." |
| CDH · Baytown | Baytown · Emergency | `/lp/emergency-24-7-crane-rental/` | "24/7 emergency crane." |
| CDH · Baytown | Baytown · Heavy Lift | `/lp/heavy-lift-crane-rental/` | "Heavy lift crane rental." |
| CDH · Baytown | Baytown · Industry (Refinery) | `/lp/refinery-turnaround-crane-rental/` | "Refinery turnaround cranes." |
| CDH · Service & Intent | Operated | `/lp/operated-crane-rental/` | "Operated crane rental." |
| CDH · Service & Intent | Emergency | `/lp/emergency-24-7-crane-rental/` | "24/7 emergency crane." |
| CDH · Service & Intent | Heavy Lift | `/lp/heavy-lift-crane-rental/` | "Heavy lift crane rental." |
| CDH · Service & Intent | Refinery TA | `/lp/refinery-turnaround-crane-rental/` | "Refinery turnaround cranes." |
| CDH · Service & Intent | Marine | `/lp/marine-crane-rental/` | "Marine crane rental." |
| CDH · Tonnage | 15-50T | `/lp/15-50-ton-crane-rental/` | "15 to 50 ton crane rental." |
| CDH · Tonnage | 90-150T | `/lp/90-150-ton-crane-rental/` | "90 to 150 ton all-terrain crane rental." |
| CDH · Tonnage | 200-300T | `/lp/200-300-ton-crane-rental/` | "200 to 300 ton heavy lift crane rental." |
| CDH · Tonnage | 500T | `/lp/500-ton-crane-rental/` | "500-ton crane rental." |
| CDH · Tonnage | Generic regional | `/lp/crane-rental-louisiana-east-texas/` | "Crane rental across Louisiana & East Texas." |

Message-match scoring (the user's search query ↔ ad headline ↔ LP H1) is the single biggest driver of Quality Score, which directly compounds CPC discounts.

---

## 10.9 Quality Score plan

### What drives QS
- **Expected CTR** (40% of weight) — driven by ad relevance + copy quality
- **Ad relevance** (30% of weight) — driven by keyword ↔ ad copy match
- **Landing page experience** (30% of weight) — driven by message match, page speed, mobile, content match

### Targeting 8+ QS on every keyword
- 1:1:1 (keyword ↔ ad ↔ LP) discipline is already enforced by the ad group structure above.
- Each LP includes the primary keyword in the H1, the meta title, the meta description, and the trust bullet copy.
- All LPs use the same fast shared CSS (no Tailwind, no framework), should hit < 1.5s LCP on mobile after Phase 8 finalization.
- Mobile-first design already in place (sticky CTA bar, big phone CTA above fold).

### Monthly QS audit
- Run the Keyword report with the QS column added.
- Any keyword < 7 QS: investigate. Usually one of: weak ad copy (rewrite), wrong LP (re-route), too broad a match type (tighten).
- Pause / archive any keyword that stays at QS 5 or below after 30 days of optimization.

---

## 10.10 Budgets & scaling

### Recommended phased budget

Pick based on appetite and operational capacity to handle lead volume.

| Phase | Months | Monthly spend | Daily | Allocation |
| --- | --- | --- | --- | --- |
| **A — Starter** | 1–2 | **$3,500** | ~$117/day | 60% per-yard, 20% Service & Intent, 10% Tonnage, 10% Brand |
| **B — Growth** | 3–6 | **$7,500** | ~$250/day | 55% per-yard, 25% Service & Intent, 12% Tonnage, 5% Brand, 3% Remarketing |
| **C — Scale** | 6–12 | **$15,000** | ~$500/day | 45% per-yard, 25% Service & Intent, 15% Tonnage, 5% Brand, 5% Remarketing, 5% PMax |
| **D — Mature** | 12+ | **$25,000+** | ~$833/day | Re-allocated to whatever's converting; pull from underperformers, push to winners |

### Target unit economics
- **Average lead value** (conservative): **$150** — based on average crane rental gross margin and historical close rate. Refine with real CRM data after 60 days.
- **Target CPA** (Phase B onward): **$60 per form/phone lead**.
- **Target CAC** (Phase D, post-call tracking and offline conversion import): **$300 per booked job**.

### Daily budget per campaign (Phase B reference)
| Campaign | Daily budget |
| --- | --- |
| CDH · Brand | $12 |
| CDH · Lafayette | $35 |
| CDH · Baton Rouge | $35 |
| CDH · Lake Charles | $45 (industrial premium) |
| CDH · New Orleans | $35 |
| CDH · Baytown | $50 (highest CPC market) |
| CDH · Service & Intent | $25 |
| CDH · Tonnage | $13 |

### Scaling discipline
- Increase per-campaign budget by **no more than 20% per week**. Aggressive budget jumps reset Smart Bidding learning and create CPA volatility.
- Don't push budget into a campaign that's CPA > target. Fix QS / copy / LP first; then re-test.

---

## 10.11 Performance Max & Remarketing (Phase C onward)

### Performance Max — `CDH · PMax · Lead Gen`
Launch once total monthly conversions ≥ 30. PMax uses signals across YouTube, Display, Discover, Gmail, Maps, and Search. Configure with:
- **Asset group themes** matched to ad groups (e.g. one asset group per yard).
- **Audience signals**: customer match list (uploaded from dispatch CRM), website visitors (last 540 days), competitor URL signals (Buckner, Sims Crane, Maxim Crane, Coast Crane, McCloskey Crane).
- **Image assets**: at least 20 per asset group — yard photos, crane action shots, branded compositions.
- **Video assets**: at least 3 short (15-sec) videos per asset group; Google generates one for you if you don't provide it (use yours, hers will be generic).
- **Final URL expansion**: disabled at launch (force traffic to LPs; expansion can include irrelevant SEO pages).

PMax should run at **20-30% of total budget at maturity**, not more. Above that ratio you lose attribution clarity and Search starts cannibalizing.

### Remarketing — `CDH · Remarketing`
Display campaign targeting:
- Anyone who visited a `/lp/*` page in the last 30 days AND did not convert.
- Anyone who visited any SEO page in the last 60 days AND did not convert.
- Excludes converters from the last 90 days.

Creative: hand-built static banners + a Responsive Display Ad. Headlines and descriptions stay tight to the brand + the "call dispatch" CTA.

---

## 10.12 RLSA — Remarketing Lists for Search Ads

Layer audience lists onto every Search campaign:
- "Site visitors (last 30 days)": bid modifier **+25%**.
- "Previous converters (last 180 days)": bid modifier **+50%** on every campaign except Brand.
- "Site visitors who hit a `/learn/` article": observation only (don't bid up; learn from this audience's behavior).

Build these lists in Google Ads → Tools → Audience Manager → New audience source → website visitors.

---

## 10.13 Conversion-rate optimization (CRO) for LPs

After 60 days of data per LP, run controlled A/B tests:

| Variable | Test idea |
| --- | --- |
| H1 copy | "Lafayette crane rental." vs "Crane rental in Lafayette, LA" |
| Form fields | 6-field (current) vs 3-field (name, phone, date) |
| Phone vs form | Form-first vs phone-first ordering above the fold |
| Trust chips | NCCCO/ISN/Avetta vs review-stars trust |
| CTA copy | "Request quote" vs "Get pricing" vs "Talk to dispatch" |
| Hero image | Plain dark hero vs photographed crane background |

Tooling: **Google Optimize sunset in 2023**. Use Microsoft Clarity (free heatmaps + session recordings) + GA4 experiments or VWO/Optimizely (paid). Test one variable at a time, 95% statistical confidence, minimum 2-week test windows.

---

## 10.14 KPI dashboard (paid)

Looker Studio dashboard, weekly cadence. Tiles:

| KPI | Source | Phase B target | Phase C target |
| --- | --- | --- | --- |
| Total leads / mo | GA4 conv events | 80 | 200 |
| Cost per lead | Google Ads | $60 | $50 |
| Lead-to-quote rate | CRM | 70% | 80% |
| Quote-to-book rate | CRM | 40% | 50% |
| Cost per booked job | derived | $300 | $200 |
| Per-yard leads / mo | GA4 (by LP path) | 12 each | 30 each |
| Avg position (Search Lost IS Budget %) | Google Ads | < 30% | < 15% |
| Avg Quality Score | Google Ads | 7.5 | 8.5 |
| Avg LP CWV "good" | GSC + PSI | 90% | 100% |
| Click-share | Google Ads | 60% | 75% |

---

## 10.15 Launch checklist (week-by-week)

### Week 0 — pre-launch (1–2 weeks before money goes live)
- [ ] Create Google Ads account; link to GA4 + GMC + GBP.
- [ ] Set up conversion actions (Section 10.7).
- [ ] Replace placeholder IDs in [`build/site-data.js`](../build/site-data.js) and run `node build-pages.js`.
- [ ] Verify with Google Tag Assistant on each LP.
- [ ] Build conversion goal in GA4 and import into Google Ads.
- [ ] Stand up Microsoft Clarity on every LP (small JS tag, no perf impact) — needed for CRO Phase.
- [ ] Build account-wide negative keyword list ([`negatives.txt`](negatives.txt)) and apply to every Search campaign.
- [ ] Build all 8 Search campaigns from the structure in Section 10.1; do NOT launch yet.
- [ ] Test that each ad's Final URL resolves to a live LP and that the LP form posts successfully to `/api/dispatch`.

### Week 1 — launch
- [ ] Set Phase A daily budgets per the table.
- [ ] Start Brand + all 5 per-yard campaigns on the same day.
- [ ] Service & Intent campaign launches +1 week (let yard campaigns settle first).
- [ ] Tonnage campaign launches +2 weeks.
- [ ] Daily check the Search Terms report for the first 14 days; add new negative keywords aggressively.

### Week 2–4 — optimize
- [ ] Pause keywords with 100+ clicks and 0 conversions.
- [ ] Pause headlines/descriptions marked "Low" performance in the asset report.
- [ ] Add new variants to keep RSA asset count at 12+ headlines and 4 descriptions.
- [ ] Confirm Quality Score is trending up week-over-week.

### Month 2 — Phase B graduation
- [ ] Each campaign hitting 15+ conversions / 30 days? → switch that campaign to Maximize Conversions.
- [ ] Launch lead form extensions on every campaign.
- [ ] Add RLSA audiences as Observation on every campaign for one week, then convert to Targeting + bid modifier.

### Month 3–6 — scale
- [ ] Increase budget per Section 10.10 cadence.
- [ ] Launch Remarketing campaign.
- [ ] Stand up CallRail or equivalent call tracking; replace static phone with dynamic number in [`build/site-data.js`](../build/site-data.js).
- [ ] Start LP A/B tests (Section 10.13).

### Month 6+ — maturity
- [ ] Launch PMax campaign with audience signals.
- [ ] Import offline conversions from CRM.
- [ ] Move primary campaigns to Target CPA, then Target ROAS as value data accumulates.

---

## 10.16 Go-live owner checklist (placeholders that block launch)

| Placeholder | Where | Replace with |
| --- | --- | --- |
| `AW-XXXXXXXXXX` | `SITE.googleAdsId` in [`build/site-data.js`](../build/site-data.js) + LP head | Real Google Ads account ID |
| `AW-XXXXXXXXXX/REPLACE_FORM_LABEL` | `SITE.conversions.formSubmit` | Form-submit conversion label |
| `AW-XXXXXXXXXX/REPLACE_PHONE_LABEL` | `SITE.conversions.phoneClick` | Phone-click conversion label |
| `AW-XXXXXXXXXX/REPLACE_EMAIL_LABEL` | `SITE.conversions.emailClick` | Email-click conversion label |
| `G-XXXXXXXXXX` | LP head + homepage head | Real GA4 measurement ID (shared with Phase 9) |

After replacing, run `node build-pages.js && node build/sanity-check.js` and deploy.

---

## 10.17 Bing Ads (a footnote — out of scope for "world class Google Ads")

Don't sleep on Bing. The same campaign structure can be imported to Microsoft Ads (built-in Google import tool). Bing typically has 30–40% lower CPCs and reaches an older demographic that skews B2B procurement. Plan to import everything to Bing in Month 3, allocate ~15% of total paid spend there, and let it run on the same conversion goals.
