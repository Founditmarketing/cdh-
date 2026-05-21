# Phase 9 — Measurement & Governance

## 9.1 Analytics & Search stack

### Required accounts (all free)
| Tool | Purpose |
| --- | --- |
| Google Analytics 4 | Behavior, conversions, traffic source |
| Google Search Console | Index coverage, query data, CWV, sitemap status |
| Bing Webmaster Tools | Bing query data; reaches non-Google audiences |
| Google Business Profile Manager | Per-yard insights, calls, direction requests |

### Wiring up GA4
The GA4 tag is already injected into every page (homepage + all 31 generated pages) with placeholder ID `G-XXXXXXXXXX`.

1. Create a GA4 property at <https://analytics.google.com>. Use one property for the whole site.
2. Copy the Measurement ID (format `G-XXXXXXXXXX`).
3. In [build/templates.js](../build/templates.js), find both occurrences of `G-XXXXXXXXXX` and replace with the real ID.
4. In [cdh-homepage-v3.html](../cdh-homepage-v3.html), find both occurrences of `G-XXXXXXXXXX` and replace with the real ID.
5. Re-run `node build-pages.js` to regenerate the subpages with the live ID.

### GA4 conversion events to define
| Event name | Trigger |
| --- | --- |
| `phone_click` | Click on any `tel:` link |
| `quote_submit` | Successful POST to `/api/dispatch` |
| `email_click` | Click on any `mailto:` link |
| `directions_click` | Click on a "Directions" link from a location page |
| `scroll_75` | User scrolls past 75% of page |

Mark `phone_click`, `quote_submit`, and `email_click` as **Key Events** (formerly Conversions). These are the proxies for revenue.

### Wiring up Search Console
1. Verify ownership at <https://search.google.com/search-console> using the meta tag method (the `<meta name="google-site-verification">` placeholder is already in every page; just paste the token).
2. Submit `https://cdhcranerentals.com/sitemap.xml`.
3. Set the **default property type** to `cdhcranerentals.com` (domain property, not URL prefix — covers all subdomains and protocols).
4. Configure email alerts for: indexing issues, manual actions, security issues, CWV regressions.

### Wiring up Bing Webmaster
1. Verify ownership at <https://www.bing.com/webmasters/> using the meta tag method (`msvalidate.01` placeholder is in every page).
2. Submit `https://cdhcranerentals.com/sitemap.xml`.
3. Bing's "SEO Reports" surface canonical and meta issues differently than Google — useful second opinion.

## 9.2 Rank tracking

### Keyword universe (250 priority queries)

Build a tracking list with these slots filled per city (5 cities × 50 queries = 250):

**Core local (per city)**
- `crane rental {city}`
- `crane rental near me` (run mobile, city-pinned)
- `crane company {city}`
- `crane service {city}`
- `mobile crane rental {city}`
- `heavy lift crane {city}`
- `boom truck rental {city}`
- `rough terrain crane {city}`
- `all terrain crane rental {city}`
- `crawler crane rental {city}`

**Tonnage long-tail (per city)**
- `15 ton crane rental {city}`
- `40 ton crane rental {city}`
- `90 ton crane rental {city}`
- `175 ton crane rental {city}`
- `225 ton crane rental {city}`
- `300 ton crane rental {city}`
- `500 ton crane rental {city}`

**Industry+geo (per city)**
- `refinery crane rental {city}` (Lake Charles, Baton Rouge, Baytown)
- `marine crane rental {city}` (New Orleans, Baytown)
- `petrochem crane rental {city}` (Lake Charles, Baton Rouge, Baytown)
- `HVAC crane lift {city}` (all)
- `commercial construction crane {city}` (all)
- `steeple set crane {city}` (Lafayette, Baton Rouge, New Orleans)
- `transformer crane rental {city}` (all)

**Brand & intent**
- `cdh crane`
- `cdh crane rentals`
- `cdh crane rentals llc`
- `NCCCO operator crane rental Louisiana`
- `24/7 emergency crane Louisiana`
- `bare vs operated crane rental`
- `crane rental Gulf South`

### Tooling
- **Paid**: Local Falcon (best-in-class for local-pack grid tracking, $25–$200/mo), AccuRanker, AgencyAnalytics, BrightLocal.
- **Free or cheap**: GSC's Performance report covers organic query positions (top-100 only, sampled). Plus monthly manual spot-check of the top 30 queries per yard with an incognito browser pinned to the yard city via a VPN.

### Cadence
- **Daily**: automated rank check on the top 50 priority queries per city (paid tool).
- **Weekly**: review the top 250 grid (Local Falcon-style heatmap).
- **Monthly**: full reporting cycle.

## 9.3 KPI dashboard

One shared dashboard, reviewed weekly. Suggested tool: Looker Studio (free) connected to GA4 + GSC + GBP API.

### Tiles
| KPI | Source | Target (6 mo) | Target (12 mo) |
| --- | --- | --- | --- |
| Organic sessions / month | GA4 | 4,000 | 12,000 |
| Per-yard organic sessions | GA4 + page path filter | 600 each | 1,800 each |
| Local pack visibility per yard | Local Falcon grid avg | 60% | 85% |
| Phone clicks / month (organic) | GA4 event | 250 | 700 |
| Quote submits / month (organic) | GA4 event | 30 | 90 |
| GBP-driven calls per yard / mo | GBP insights | 25 each | 60 each |
| Average GBP rating per yard | GBP | 4.7+ | 4.8+ |
| Review count per yard | GBP | 25 each | 60 each |
| Indexed pages | GSC | 32 + case studies | 60+ |
| Pages with Core Web Vitals "good" | GSC CrUX | 80% | 100% |
| Backlinks (referring domains) | Ahrefs/Semrush/Moz | 60 | 150 |
| Citation consistency score | BrightLocal/Whitespark | 90% | 98% |

### Reporting
- **Weekly snapshot** emailed every Monday to the SEO owner + business owner.
- **Monthly deep-dive** reviewing each KPI tile, attributing wins/losses, and queueing the next month's actions.
- **Quarterly audit** (full content + technical + off-page review — see Section 9.5).

## 9.4 Conversion tracking sanity

The dispatch form posts to `/api/dispatch` in [server.js](../server.js). Confirm:
- The form's success state fires the `quote_submit` event (add the event call to the existing form submit handler in [cdh-homepage-v3.html](../cdh-homepage-v3.html)).
- The phone numbers in the nav, hero, FAQ, and CTAs all wear an `onclick="gtag('event', 'phone_click', {location: '<where>'})"` so we can attribute which placement drives calls.

Treat call tracking as Tier 2 (when budget allows): wrap the dispatch number in CallRail or similar to attribute organic vs paid vs GBP-driven calls. CallRail also feeds back into GA4 as `phone_call_session_call` events.

## 9.5 Quarterly audit checklist

Run every 90 days. Owner: SEO lead.

### Technical
- [ ] Run PageSpeed Insights on homepage + 1 yard + 1 fleet + 1 service. Note any CWV regression vs last quarter.
- [ ] Verify Search Console index coverage. Any new "Crawled — not indexed" pages?
- [ ] Verify sitemap.xml is current (`node build-pages.js` regenerates it).
- [ ] Verify robots.txt still allows what it should.
- [ ] Verify canonical URLs render correctly on a sample of pages (use a tool like Screaming Frog).
- [ ] Test all major schema with Google's Rich Results Test (<https://search.google.com/test/rich-results>): LocalBusiness on a yard page, Service on a fleet page, FAQPage on the homepage, Article on a `/learn/` page.

### Content
- [ ] Republish the 4 oldest content pages with fresh photos and links (Phase 7.5).
- [ ] Add the 2 case studies for the quarter.
- [ ] Add the 3 `/learn/` articles for the quarter.

### Off-page
- [ ] Citation NAP consistency audit. Any old listings showing the wrong phone or address?
- [ ] Backlink delta: new links earned, lost links investigated.
- [ ] GBP photo refresh (5+ new photos per yard, ideally from real recent jobs).

### Reviews
- [ ] Review velocity hitting target (3+/yard/month)?
- [ ] Response rate at 100%? Any review >7 days unanswered?
- [ ] Average rating per yard staying above 4.7?

### Governance
- [ ] Confirm at least 2 owners on every GBP listing.
- [ ] Confirm sitemap.xml is referenced in robots.txt.
- [ ] Confirm GA4 + GSC + Bing alerts still going to the right inbox.

## 9.6 Owner-required actions

- [ ] Create the GA4 property and paste the measurement ID into both [build/templates.js](../build/templates.js) and [cdh-homepage-v3.html](../cdh-homepage-v3.html); re-run `node build-pages.js`.
- [ ] Verify the site in Google Search Console (paste the verification token).
- [ ] Verify the site in Bing Webmaster Tools (paste the verification token).
- [ ] Submit `/sitemap.xml` to both.
- [ ] Pick the rank-tracking tool (paid or manual) and lock in the cadence.
- [ ] Assign one accountable role to weekly + monthly + quarterly reporting.
