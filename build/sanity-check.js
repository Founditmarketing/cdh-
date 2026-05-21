#!/usr/bin/env node
/* Quick post-build sanity check — verifies the SEO-critical bits made it into the homepage and a sample subpage. */
const fs = require('fs');
const path = require('path');

function check(label, condition) {
  const status = condition ? 'OK ' : 'FAIL';
  console.log(`  [${status}] ${label}`);
  return condition;
}

function checkFile(relPath, checks) {
  const full = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(full)) {
    console.log(`MISSING ${relPath}`);
    return false;
  }
  console.log(`\n${relPath}`);
  const html = fs.readFileSync(full, 'utf8');
  let allPass = true;
  for (const [label, predicate] of checks) {
    if (!check(label, predicate(html))) allPass = false;
  }
  return allPass;
}

const results = [];

results.push(checkFile('index.html', [
  ['Title rewritten with city + service combo', (h) => /Crane Rental in Louisiana/.test(h)],
  ['Canonical points to cdhcranerentals.com', (h) => /<link rel="canonical" href="https:\/\/cdhcranerentals\.com\/"/.test(h)],
  ['OG URL points to cdhcranerentals.com', (h) => /og:url" content="https:\/\/cdhcranerentals\.com\/"/.test(h)],
  ['Twitter card present', (h) => /twitter:card/.test(h)],
  ['Organization schema present', (h) => /"@type": "Organization"/.test(h)],
  ['WebSite schema present', (h) => /"@type": "WebSite"/.test(h)],
  ['FAQPage schema present', (h) => /"@type": "FAQPage"/.test(h)],
  ['Service schema present', (h) => /"@type": "Service"/.test(h)],
  ['Geo meta present', (h) => /geo\.region/.test(h)],
  ['Visible FAQ section present', (h) => /id="faq"/.test(h)],
  ['Footer links to /locations/lafayette/', (h) => /href="\/locations\/lafayette\/"/.test(h)],
  ['Footer links to /fleet/15-ton-boom-truck/', (h) => /href="\/fleet\/15-ton-boom-truck\/"/.test(h)],
  ['H1 contains "crane rental"', (h) => /<h1[^>]*>[\s\S]*?crane rental[\s\S]*?<\/h1>/i.test(h)],
  ['GA4 placeholder present', (h) => /G-XXXXXXXXXX/.test(h)],
  ['Vercel-preview noindex guard present', (h) => /vercel\.app/.test(h)],
  ['No localhost canonical/OG remaining', (h) => !/localhost:8000\/cdh-homepage-v3\.html/.test(h)],
]));

results.push(checkFile('locations/lafayette/index.html', [
  ['Title is "Lafayette Crane Rental | ..."', (h) => /<title>Lafayette Crane Rental/.test(h)],
  ['Canonical points to /locations/lafayette/', (h) => /<link rel="canonical" href="https:\/\/cdhcranerentals\.com\/locations\/lafayette\/"/.test(h)],
  ['LocalBusiness schema present', (h) => /"@type": "LocalBusiness"/.test(h)],
  ['parentOrganization reference present', (h) => /parentOrganization/.test(h)],
  ['BreadcrumbList schema present', (h) => /"@type": "BreadcrumbList"/.test(h)],
  ['Geo meta present', (h) => /geo\.position" content="30\.2241/.test(h)],
  ['Embedded Google Map present', (h) => /google\.com\/maps/.test(h)],
  ['Internal link to a fleet page', (h) => /href="\/fleet\//.test(h)],
  ['Phone number in tel: link', (h) => /href="tel:\+13379623999"/.test(h) || /href="tel:13379623999"/.test(h)],
  ['Shared subpage CSS linked', (h) => /\/dist\/cdh-subpages\.css/.test(h)],
  ['GA4 placeholder present', (h) => /G-XXXXXXXXXX/.test(h)],
  ['Vercel-preview noindex guard present', (h) => /vercel\.app/.test(h)],
]));

results.push(checkFile('fleet/500-ton/index.html', [
  ['Title is "500-Ton ..."', (h) => /<title>500-Ton Heavy Lift Rental/.test(h)],
  ['Canonical correct', (h) => /<link rel="canonical" href="https:\/\/cdhcranerentals\.com\/fleet\/500-ton\/"/.test(h)],
  ['Service schema present', (h) => /"@type": "Service"/.test(h)],
  ['Product schema present', (h) => /"@type": "Product"/.test(h)],
  ['BreadcrumbList schema present', (h) => /"@type": "BreadcrumbList"/.test(h)],
  ['Lists Lafayette as available yard', (h) => /Lafayette, LA/.test(h)],
  ['Lists Baytown as available yard', (h) => /Baytown, TX/.test(h)],
]));

results.push(checkFile('services/refinery-turnaround/index.html', [
  ['Title contains Refinery Turnaround', (h) => /<title>Refinery Turnaround Crane Services/.test(h)],
  ['Service schema with all 5 cities', (h) => {
    return ['Lafayette', 'Baton Rouge', 'Lake Charles', 'New Orleans', 'Baytown'].every((c) => h.includes(`"${c},`));
  }],
]));

results.push(checkFile('industries/refining-petrochem/index.html', [
  ['Title contains Refining & Petrochem', (h) => /Refining &(amp;)? Petrochem/.test(h) || /Refining &amp; Petrochem/.test(h) || /Refining & Petrochem/.test(h)],
]));

results.push(checkFile('learn/how-to-pick-the-right-crane-tonnage/index.html', [
  ['Article schema present', (h) => /"@type": "Article"/.test(h)],
]));

results.push(checkFile('robots.txt', [
  ['References sitemap URL', (h) => /Sitemap: https:\/\/cdhcranerentals\.com\/sitemap\.xml/.test(h)],
]));

results.push(checkFile('sitemap.xml', [
  ['Contains all 5 locations', (h) => ['lafayette', 'baton-rouge', 'lake-charles', 'new-orleans', 'baytown'].every((s) => h.includes(`/locations/${s}/`))],
  ['Contains all 9 fleet pages', (h) => ['15-ton-boom-truck', '40-ton-rough-terrain', '65-ton', '90-ton-all-terrain', '130-ton', '175-ton', '225-ton', '300-ton', '500-ton'].every((s) => h.includes(`/fleet/${s}/`))],
  ['Contains all 8 service pages', (h) => ['operated-crane-rental', 'bare-crane-rental', 'heavy-lift', 'critical-lift-engineering', 'refinery-turnaround', 'marine-crane', 'hvac-and-steel-sets', 'emergency-24-7-dispatch'].every((s) => h.includes(`/services/${s}/`))],
  ['Contains all 5 industry pages', (h) => ['refining-petrochem', 'marine-and-dock', 'commercial-construction', 'utilities-and-power', 'emergency-response'].every((s) => h.includes(`/industries/${s}/`))],
  ['Contains all 4 learn pages', (h) => ['how-to-pick-the-right-crane-tonnage', 'operated-vs-bare-rental', 'what-nccco-certification-means', 'crane-permits-louisiana'].every((s) => h.includes(`/learn/${s}/`))],
  ['Does NOT contain /lp/ pages (landing pages must not be in sitemap)', (h) => !/\/lp\//.test(h)],
]));

/* --- Landing pages (Google Ads) --- */
console.log('\n--- Google Ads landing pages ---');
const LP_SLUGS = [
  'crane-rental-louisiana-east-texas',
  'crane-rental-lafayette',
  'crane-rental-baton-rouge',
  'crane-rental-lake-charles',
  'crane-rental-new-orleans',
  'crane-rental-baytown-tx',
  'operated-crane-rental',
  'emergency-24-7-crane-rental',
  'heavy-lift-crane-rental',
  'refinery-turnaround-crane-rental',
  'marine-crane-rental',
  '15-50-ton-crane-rental',
  '90-150-ton-crane-rental',
  '200-300-ton-crane-rental',
  '500-ton-crane-rental',
];
for (const slug of LP_SLUGS) {
  results.push(checkFile(`lp/${slug}/index.html`, [
    ['noindex meta robots', (h) => /<meta name="robots" content="noindex/.test(h)],
    ['noindex googlebot', (h) => /<meta name="googlebot" content="noindex/.test(h)],
    ['canonical points to /lp/{slug}/', (h) => new RegExp(`<link rel="canonical" href="https://cdhcranerentals\\.com/lp/${slug.replace(/[-/]/g, '\\$&')}/"`).test(h)],
    ['body has class="lp"', (h) => /<body class="lp">/.test(h)],
    ['Google Ads gtag present', (h) => /googletagmanager\.com\/gtag\/js\?id=AW-/.test(h)],
    ['GA4 gtag present', (h) => /googletagmanager\.com\/gtag\/js\?id=G-/.test(h)],
    ['Lead form with data-lp-form attribute', (h) => /data-lp-form/.test(h)],
    ['Lead form posts to /api/dispatch', (h) => /action="\/api\/dispatch"/.test(h)],
    ['Hidden lp_slug input', (h) => new RegExp(`name="lp_slug" value="${slug}"`).test(h)],
    ['Conversion JS wired (phone_click)', (h) => /phone_click/.test(h) && /data-lp-phone/.test(h)],
    ['UTM capture inputs present', (h) => /data-utm="campaign"/.test(h) && /data-utm="gclid"/.test(h)],
    ['No schema/JSON-LD (LP should not compete with SEO)', (h) => !/application\/ld\+json/.test(h)],
    ['No GSC verification meta on LPs', (h) => !/google-site-verification/.test(h)],
    ['Mobile sticky CTA bar present', (h) => /mobile-cta-bar/.test(h)],
    ['Final CTA section present', (h) => /lp-final/.test(h)],
    ['Form redirects to /lp/thanks/ on success', (h) => /\/lp\/thanks\/'/.test(h) || /\/lp\/thanks\//.test(h)],
    ['Footer links to /privacy/', (h) => /href="\/privacy\/"/.test(h)],
  ]));
}

/* --- LP thank-you page --- */
console.log('\n--- LP thank-you page ---');
results.push(checkFile('lp/thanks/index.html', [
  ['noindex meta robots', (h) => /<meta name="robots" content="noindex/.test(h)],
  ['canonical points to /lp/thanks/', (h) => /<link rel="canonical" href="https:\/\/cdhcranerentals\.com\/lp\/thanks\/"/.test(h)],
  ['body has class="lp"', (h) => /<body class="lp">/.test(h)],
  ['Google Ads gtag present', (h) => /googletagmanager\.com\/gtag\/js\?id=AW-/.test(h)],
  ['GA4 gtag present', (h) => /googletagmanager\.com\/gtag\/js\?id=G-/.test(h)],
  ['Fires conversion on page load (quote_submit event)', (h) => /quote_submit/.test(h) && /lp_thanks/.test(h)],
  ['Reads ?lp= param for attribution', (h) => /\[\?&\]lp=/.test(h)],
  ['No lead form on thanks page', (h) => !/data-lp-form/.test(h)],
  ['Phone CTA still present + tracked', (h) => /data-lp-phone/.test(h)],
  ['No JSON-LD (LP page)', (h) => !/application\/ld\+json/.test(h)],
]));

/* --- Legal pages (privacy + terms) --- */
console.log('\n--- Legal pages ---');
for (const slug of ['privacy', 'terms']) {
  results.push(checkFile(`${slug}/index.html`, [
    ['Title contains page name', (h) => new RegExp(slug === 'privacy' ? 'Privacy Policy' : 'Terms of Service', 'i').test(h)],
    ['canonical points to /{slug}/', (h) => new RegExp(`<link rel="canonical" href="https://cdhcranerentals\\.com/${slug}/"`).test(h)],
    ['indexable (no noindex)', (h) => !/<meta name="robots" content="noindex/.test(h)],
    ['WebPage schema present', (h) => /"@type": "WebPage"/.test(h)],
    ['BreadcrumbList schema present', (h) => /"@type": "BreadcrumbList"/.test(h)],
    ['GA4 + Google Ads tags present', (h) => /googletagmanager\.com\/gtag\/js\?id=G-/.test(h) && /googletagmanager\.com\/gtag\/js\?id=AW-/.test(h)],
    ['Contact info in body', (h) => /office@cdhrentals\.com/.test(h)],
  ]));
}

/* --- Site-wide remarketing tag (Google Ads gtag on every public page) --- */
console.log('\n--- Site-wide Google Ads remarketing tag ---');
const REMARKETING_PAGES = [
  'index.html',
  'locations/lafayette/index.html',
  'fleet/500-ton/index.html',
  'services/refinery-turnaround/index.html',
  'industries/refining-petrochem/index.html',
  'learn/how-to-pick-the-right-crane-tonnage/index.html',
];
for (const f of REMARKETING_PAGES) {
  results.push(checkFile(f, [
    ['Google Ads gtag present (remarketing audience signal)', (h) => /googletagmanager\.com\/gtag\/js\?id=AW-/.test(h)],
  ]));
}

/* --- Sitemap update --- */
console.log('\n--- Sitemap includes legal pages ---');
results.push(checkFile('sitemap.xml', [
  ['Privacy in sitemap', (h) => /\/privacy\//.test(h)],
  ['Terms in sitemap', (h) => /\/terms\//.test(h)],
  ['Thanks page NOT in sitemap', (h) => !/\/lp\/thanks\//.test(h)],
]));

const ok = results.every(Boolean);
console.log(`\n${ok ? 'All sanity checks passed.' : 'Some checks failed — see [FAIL] lines above.'}`);
process.exit(ok ? 0 : 1);
