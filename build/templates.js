/*
 * CDH Crane Rentals — Page templates
 * Pure-JS template functions returning HTML strings.
 * Imported and orchestrated by ../build-pages.js.
 */

const { SITE, LOCATIONS, FLEET, SERVICES, INDUSTRIES, LEARN, LANDING_PAGES, TESTIMONIALS, LANDING_FAQ_LIBRARY } = require('./site-data.js');

/* ---------- helpers ---------- */
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const byFleetSlug = (slug) => FLEET.find((f) => f.slug === slug);
const byLocationSlug = (slug) => LOCATIONS.find((l) => l.slug === slug);
const byServiceSlug = (slug) => SERVICES.find((s) => s.slug === slug);
const byIndustrySlug = (slug) => INDUSTRIES.find((i) => i.slug === slug);

const fleetUrl = (slug) => `/fleet/${slug}/`;
const locationUrl = (slug) => `/locations/${slug}/`;
const serviceUrl = (slug) => `/services/${slug}/`;
const industryUrl = (slug) => `/industries/${slug}/`;
const learnUrl = (slug) => `/learn/${slug}/`;

/* ---------- shared head ---------- */
function renderHead({
  title,
  description,
  canonical,
  ogImage = SITE.defaultOgImage,
  schema = [],
  geo,
  extraMeta = '',
  noindex = false,
  includeGoogleAds = false,
  bodyClass = '',
}) {
  const schemaBlocks = schema.length
    ? schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s, null, 2)}</script>`).join('\n')
    : '';
  const geoMeta = geo
    ? `
<meta name="geo.region" content="US-${esc(geo.region || 'LA')}" />
<meta name="geo.placename" content="${esc(geo.placename || '')}" />
<meta name="geo.position" content="${geo.lat};${geo.lng}" />
<meta name="ICBM" content="${geo.lat}, ${geo.lng}" />`
    : '';

  const robotsContent = noindex
    ? 'noindex, nofollow, noarchive, nosnippet'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const googlebotContent = noindex ? 'noindex, nofollow' : 'index, follow';

  // Verification meta only on indexable pages (not landing pages).
  const verificationMeta = noindex
    ? ''
    : `
<!-- TODO: Replace with real Google Search Console verification token -->
<meta name="google-site-verification" content="REPLACE_WITH_GSC_VERIFICATION_TOKEN" />
<!-- TODO: Replace with real Bing Webmaster Tools verification token -->
<meta name="msvalidate.01" content="REPLACE_WITH_BING_VERIFICATION_TOKEN" />`;

  // Google Ads conversion tracking — only on landing pages (where paid traffic lands).
  const googleAdsTag = includeGoogleAds
    ? `

<!-- ==================== Google Ads conversion tracking ====================
     TODO: replace ${SITE.googleAdsId} with the real Google Ads account ID.
     TODO: replace the conversion labels in SITE.conversions inside build/site-data.js.
     The conversion fires below are wired in cdh-lp.js (see body footer). -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${esc(SITE.googleAdsId)}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', '${esc(SITE.googleAdsId)}');
</script>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!-- Block preview deployments from indexing while keeping production indexable. -->
<script>(function(){if(location.hostname.endsWith('.vercel.app')){var m=document.createElement('meta');m.name='robots';m.content='noindex,nofollow';document.head.appendChild(m);}})();</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<meta name="robots" content="${robotsContent}" />
<meta name="googlebot" content="${googlebotContent}" />
<meta name="author" content="${esc(SITE.legalName)}" />
<link rel="canonical" href="${esc(canonical)}" />${verificationMeta}
<meta name="theme-color" content="#0b0d10" />${geoMeta}
<meta property="og:site_name" content="${esc(SITE.brand)}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />
<meta property="og:url" content="${esc(canonical)}" />
<meta property="og:image" content="${esc(ogImage)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${esc(ogImage)}" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="https://cdn.jsdelivr.net/gh/Founditmarketing/cdh-@master/img/favicons/apple-touch-icon-180.png" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=JetBrains+Mono:wght@400;500;700&family=Inter+Tight:wght@300;400;500;600;700;800&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&display=swap">
<link rel="stylesheet" href="/dist/cdh-subpages.css">
${extraMeta}
${schemaBlocks}

<!-- ==================== GA4 ====================
     TODO: replace G-XXXXXXXXXX with the real GA4 measurement ID.
     Until replaced, no data is sent. -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true, send_page_view: true });
</script>${googleAdsTag}
</head>
<body${bodyClass ? ` class="${esc(bodyClass)}"` : ''}>`;
}

/* ---------- shared nav ---------- */
function renderUtilBar() {
  return `<div class="util-bar">
  <div class="container util-bar-inner">
    <span class="util-bar-live">
      <span class="util-bar-dot" aria-hidden="true"></span>
      <span style="color: var(--safety); font-weight: 700; letter-spacing: 0.22em;">DISPATCH · LIVE</span>
    </span>
    <span class="util-bar-credentials">
      <span>NCCCO</span><span style="color: var(--rebar);">·</span>
      <span>OSHA</span><span style="color: var(--rebar);">·</span>
      <span>ISN</span><span style="color: var(--rebar);">·</span>
      <span>AVETTA</span><span style="color: var(--rebar);">·</span>
      <span style="color: var(--safety);">EST. ${SITE.founded}</span>
    </span>
  </div>
</div>`;
}

function renderNav() {
  return `<nav class="site-nav">
  <div class="container site-nav-inner">
    <a href="/" class="brand-lockup" aria-label="${esc(SITE.brand)} home">
      <span class="brand-badge" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <line x1="9" y1="2.5" x2="9" y2="13.5" />
          <line x1="13" y1="2.5" x2="13" y2="13.5" />
          <polygon points="6.5,13.5 15.5,13.5 11,18.4" fill="currentColor" stroke="none" />
          <path d="M11 18.4v1.7c0 1.45 1.2 2.4 2.6 2.4s2.6-.95 2.6-2.3" />
        </svg>
      </span>
      <span class="brand-text">
        <span class="brand-title">${esc(SITE.shortBrand)}</span>
        <span class="brand-sub">Crane Rentals</span>
      </span>
    </a>
    <div class="nav-links">
      <a href="/#fleet">Fleet</a>
      <a href="/#industries">Industries</a>
      <a href="/#locations">Locations</a>
      <a href="/#faq">FAQ</a>
      <a href="/learn/how-to-pick-the-right-crane-tonnage/">Learn</a>
    </div>
    <div class="nav-actions">
      <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" class="nav-phone">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${esc(SITE.phoneDisplay)}
      </a>
      <a href="/#quote" class="btn-primary">Request Quote</a>
    </div>
  </div>
</nav>`;
}

/* ---------- shared footer ---------- */
function renderFooter() {
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <a href="/" class="brand-lockup" aria-label="${esc(SITE.brand)} home" style="margin-bottom: 20px;">
          <span class="brand-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <line x1="9" y1="2.5" x2="9" y2="13.5" />
              <line x1="13" y1="2.5" x2="13" y2="13.5" />
              <polygon points="6.5,13.5 15.5,13.5 11,18.4" fill="currentColor" stroke="none" />
              <path d="M11 18.4v1.7c0 1.45 1.2 2.4 2.6 2.4s2.6-.95 2.6-2.3" />
            </svg>
          </span>
          <span class="brand-text">
            <span class="brand-title">${esc(SITE.shortBrand)}</span>
            <span class="brand-sub">Crane Rentals</span>
          </span>
        </a>
        <p style="font-size: 14px; color: rgba(234,230,221,0.6); line-height: 1.7; max-width: 360px; margin-top: 18px;">
          ${esc(SITE.stateName || 'Louisiana')}-owned crane rental since ${SITE.founded}. Lafayette, Baton Rouge, Lake Charles, New Orleans, and Baytown, TX.
        </p>
      </div>
      <div class="footer-col">
        <h4>Fleet</h4>
        <ul>
          ${FLEET.slice(0, 6).map((f) => `<li><a href="${fleetUrl(f.slug)}">${esc(f.name)}</a></li>`).join('\n          ')}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Locations</h4>
        <ul>
          ${LOCATIONS.map((l) => `<li><a href="${locationUrl(l.slug)}">${esc(l.city)}${l.isHQ ? ' · HQ' : ''}</a></li>`).join('\n          ')}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Dispatch · 24/7</h4>
        <ul>
          <li><a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" style="font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 0.04em; color: var(--safety);">${esc(SITE.phoneDisplay)}</a></li>
          <li><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></li>
          <li style="margin-top: 18px;"><a href="/#quote" class="btn-primary" style="padding: 12px 18px; font-size: 11px;">Request Quote</a></li>
        </ul>
      </div>
    </div>
    <div class="stripe-tape" style="margin-bottom: 24px;"></div>
    <div class="footer-bottom">
      <div>© ${new Date().getFullYear()} ${esc(SITE.legalName).toUpperCase()} · ALL RIGHTS RESERVED</div>
      <div class="footer-legal-links">
        <a href="/">Privacy</a>
        <a href="/">Terms</a>
        <a href="/">Safety</a>
        <a href="/">Careers</a>
      </div>
    </div>
  </div>
</footer>
<div class="mobile-cta-bar" aria-hidden="false">
  <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" class="call">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f4c542" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    Call Dispatch
  </a>
  <a href="/#quote" class="quote">Get Quote</a>
</div>
</body>
</html>`;
}

/* ---------- breadcrumb ---------- */
function renderBreadcrumbs(items) {
  return `<nav class="breadcrumbs container" aria-label="Breadcrumb">
${items.map((it, idx) => {
  const isLast = idx === items.length - 1;
  return isLast
    ? `<span aria-current="page">${esc(it.name)}</span>`
    : `<a href="${esc(it.url)}">${esc(it.name)}</a><span class="sep">/</span>`;
}).join('\n')}
</nav>`;
}

function breadcrumbSchema(items, baseUrl = SITE.domain) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${baseUrl}${it.url}`,
    })),
  };
}

/* ---------- shared org reference ---------- */
function organizationRef() {
  return { '@id': `${SITE.domain}/#organization` };
}

/* ---------- CTA band ---------- */
function renderCtaBand(headline = 'Have a lift in mind?', subhead = 'Call dispatch around the clock or send a quote request. We will get back to you fast.') {
  return `<section class="cta-band">
  <div class="container">
    <h2>${esc(headline)}</h2>
    <p>${esc(subhead)}</p>
    <div class="cta-band-actions">
      <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" class="btn-phone">Call ${esc(SITE.phoneDisplay)}</a>
      <a href="/#quote" class="btn-on-yellow">Request Quote</a>
    </div>
  </div>
</section>`;
}

/* ============================================================
   LOCATION PAGE
============================================================ */
function renderLocationPage(loc) {
  const canonical = `${SITE.domain}${locationUrl(loc.slug)}`;
  const title = `${loc.city} Crane Rental | 15–500 Ton | ${SITE.brand}`;
  const description = `Crane rental in ${loc.city}, ${loc.state} — 15 to 500 ton cranes, NCCCO operators, 24/7 dispatch. ${loc.yardCharacter}. Serving ${loc.nearbyTowns.slice(0, 3).join(', ')} and surrounding ${loc.stateName}.`;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${canonical}#localbusiness`,
    name: `${SITE.brand} — ${loc.city}${loc.isHQ ? ' (HQ)' : ''}`,
    legalName: SITE.legalName,
    parentOrganization: organizationRef(),
    url: canonical,
    image: SITE.defaultOgImage,
    logo: SITE.logo,
    telephone: SITE.phoneTel,
    email: SITE.email,
    priceRange: '$$$',
    description: `${SITE.brand} ${loc.city} yard — ${loc.yardCharacter}. ${loc.intro.slice(0, 180)}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: loc.address.street,
      addressLocality: loc.address.city,
      addressRegion: loc.address.state,
      postalCode: loc.address.zip,
      addressCountry: loc.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
    areaServed: [
      { '@type': 'City', name: `${loc.city}, ${loc.state}` },
      ...loc.nearbyTowns.map((t) => ({ '@type': 'City', name: `${t}, ${loc.state}` })),
    ],
    openingHoursSpecification: loc.openingHoursSpec.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      ...spec,
    })),
    sameAs: [loc.gbpUrl].filter(Boolean),
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Locations', url: '/#locations' },
    { name: loc.city, url: locationUrl(loc.slug) },
  ];

  const head = renderHead({
    title,
    description,
    canonical,
    schema: [localBusinessSchema, breadcrumbSchema(breadcrumbs)],
    geo: { region: loc.state, placename: `${loc.city}, ${loc.stateName}`, lat: loc.geo.lat, lng: loc.geo.lng },
  });

  return `${head}
${renderUtilBar()}
${renderNav()}
${renderBreadcrumbs(breadcrumbs)}

<section class="page-hero">
  <div class="container">
    <div class="page-hero-eyebrow">
      <span class="tag">Yard ${esc(loc.yardNumber)}${loc.isHQ ? ' · HQ' : ''}</span>
      <span class="bar"></span>
      <span class="tag" style="color: var(--safety);">${esc(loc.yardCharacter)}</span>
    </div>
    <h1>${esc(loc.city)}<br/><span class="editorial-em">crane rental.</span></h1>
    <p class="lede">${esc(loc.intro)}</p>
    <div class="hero-cta-row">
      <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" class="btn-primary">Call ${esc(SITE.phoneDisplay)}</a>
      <a href="/#quote" class="btn-secondary">Request Quote</a>
    </div>
    <div class="hero-meta">
      <div class="hero-meta-item">
        <div class="label">Service Radius</div>
        <div class="value">~${loc.serviceRadiusMi}<span class="accent">mi</span></div>
      </div>
      <div class="hero-meta-item">
        <div class="label">Fleet On-Site</div>
        <div class="value">${loc.fleetStationed.length}<span class="accent"> classes</span></div>
      </div>
      <div class="hero-meta-item">
        <div class="label">Dispatch</div>
        <div class="value">24<span class="accent">/7</span></div>
      </div>
      <div class="hero-meta-item">
        <div class="label">Yard Type</div>
        <div class="value" style="font-size: 18px;">${esc(loc.yardCharacter)}</div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div style="display: grid; grid-template-columns: 1fr; gap: 56px;">
      <div>
        <div class="section-eyebrow">
          <span class="section-marker">§ 01</span>
          <span class="bar"></span>
          <span class="tag">Why ${esc(loc.city)}</span>
        </div>
        <h2>${esc(loc.introHeadline.split('·')[1] ? loc.introHeadline.split('·')[1].trim() : loc.introHeadline)}<br/><span class="editorial-em">Built for the work.</span></h2>
        <div class="prose" style="max-width: 780px; margin-top: 28px;">
          ${loc.proofParagraphs.map((p) => `<p>${esc(p)}</p>`).join('\n          ')}
        </div>
      </div>

      <div>
        <div class="section-eyebrow">
          <span class="section-marker">§ 02</span>
          <span class="bar"></span>
          <span class="tag">Yard details</span>
        </div>
        <div class="grid-2">
          <div class="nap-card">
            <h3>${esc(loc.city)} yard</h3>
            <div class="nap-row">
              <div class="label">Address</div>
              <div class="value">${esc(loc.address.street)}<br/>${esc(loc.address.city)}, ${esc(loc.address.state)} ${esc(loc.address.zip)}</div>
            </div>
            <div class="nap-row">
              <div class="label">Dispatch</div>
              <div class="value"><a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" style="color: var(--safety);">${esc(SITE.phoneDisplay)}</a></div>
            </div>
            <div class="nap-row">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></div>
            </div>
            <div class="nap-row">
              <div class="label">Hours</div>
              <div class="value">${esc(loc.hours)}</div>
            </div>
            <div class="nap-row">
              <div class="label">Yard type</div>
              <div class="value">${esc(loc.yardCharacter)}</div>
            </div>
            <div class="nap-row">
              <div class="label">Radius</div>
              <div class="value">~${loc.serviceRadiusMi} miles</div>
            </div>
          </div>
          <div class="map-frame" aria-label="Map of ${esc(loc.city)} yard">
            <iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=${esc(loc.mapEmbedQuery)}&output=embed"
              title="${esc(SITE.brand)} ${esc(loc.city)} yard map"></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 03</span>
      <span class="bar"></span>
      <span class="tag">Fleet stationed here</span>
    </div>
    <h2>Fleet at the ${esc(loc.city)} yard.</h2>
    <p class="lead" style="margin-bottom: 40px;">Cranes available from this yard. Other yards within reach if a specialty pick needs a different rig.</p>
    <div class="grid-3">
      ${loc.fleetStationed.map((fSlug) => {
        const f = byFleetSlug(fSlug);
        if (!f) return '';
        return `<a href="${fleetUrl(f.slug)}" class="card card-link">
          <div class="tag" style="margin-bottom: 10px; color: var(--safety);">${f.tonnage} ton · ${esc(f.classType)}</div>
          <h3>${esc(f.name)}</h3>
          <p>${esc(f.shortDescription)}</p>
          <div class="arrow">Spec sheet <span>→</span></div>
        </a>`;
      }).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 04</span>
      <span class="bar"></span>
      <span class="tag">Service area</span>
    </div>
    <h2>Cities and towns we serve from ${esc(loc.city)}.</h2>
    <p class="lead" style="margin-bottom: 28px;">Routine coverage runs roughly ${loc.serviceRadiusMi} miles from yard. We mobilize farther when the project supports it.</p>
    <div class="chip-row">
      <span class="chip" style="background: var(--safety); color: var(--ink); border-color: var(--safety);">${esc(loc.city)}, ${esc(loc.state)}</span>
      ${loc.nearbyTowns.map((t) => `<span class="chip">${esc(t)}</span>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 05</span>
      <span class="bar"></span>
      <span class="tag">Recent work</span>
    </div>
    <h2>What we have lifted out of ${esc(loc.city)}.</h2>
    <div class="grid-3" style="margin-top: 40px;">
      ${loc.caseStudies.map((c) => `<div class="card">
        <div class="tag" style="margin-bottom: 10px; color: var(--safety);">${esc(c.industry)} · ${esc(c.crane)}</div>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.summary)}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>

${renderCtaBand(`Need a crane in ${loc.city}?`, `Dispatch is staffed 24/7. Two-minute call to scope the pick, same-day quote in most cases.`)}

${renderFooter()}`;
}

/* ============================================================
   FLEET PAGE
============================================================ */
function renderFleetPage(item) {
  const canonical = `${SITE.domain}${fleetUrl(item.slug)}`;
  const title = `${item.name} Rental | Louisiana & East Texas | ${SITE.brand}`;
  const description = `${item.shortDescription} Available at ${item.availableAtYards.length} CDH yards across Louisiana and East Texas. NCCCO operators, 24/7 dispatch.`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical}#service`,
    serviceType: `${item.name} Rental`,
    name: `${item.name} Rental`,
    description: item.longDescription,
    provider: organizationRef(),
    areaServed: item.availableAtYards.map((slug) => {
      const l = byLocationSlug(slug);
      return l ? { '@type': 'City', name: `${l.city}, ${l.state}` } : null;
    }).filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${item.name} availability`,
      itemListElement: item.availableAtYards.map((slug) => {
        const l = byLocationSlug(slug);
        return l ? { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${item.name} rental in ${l.city}, ${l.state}` }, url: `${SITE.domain}${locationUrl(l.slug)}` } : null;
      }).filter(Boolean),
    },
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonical}#product`,
    name: `${item.name} Rental — ${SITE.brand}`,
    description: item.longDescription,
    brand: { '@type': 'Brand', name: SITE.brand },
    category: 'Crane Rental',
    image: `${SITE.domain}${item.imagePath}`,
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Fleet', url: '/#fleet' },
    { name: item.name, url: fleetUrl(item.slug) },
  ];

  const head = renderHead({
    title,
    description,
    canonical,
    schema: [serviceSchema, productSchema, breadcrumbSchema(breadcrumbs)],
  });

  return `${head}
${renderUtilBar()}
${renderNav()}
${renderBreadcrumbs(breadcrumbs)}

<section class="page-hero">
  <div class="container">
    <div class="page-hero-eyebrow">
      <span class="tag">Fleet</span>
      <span class="bar"></span>
      <span class="tag" style="color: var(--safety);">${item.tonnage} ton · ${esc(item.classType)}</span>
    </div>
    <h1>${esc(item.name)}<br/><span class="editorial-em">rental.</span></h1>
    <p class="lede">${esc(item.shortDescription)}</p>
    <div class="hero-cta-row">
      <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" class="btn-primary">Call ${esc(SITE.phoneDisplay)}</a>
      <a href="/#quote" class="btn-secondary">Get quote</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div style="display: grid; grid-template-columns: 1fr; gap: 56px;">
      <div>
        <div class="section-eyebrow">
          <span class="section-marker">§ 01</span>
          <span class="bar"></span>
          <span class="tag">Overview</span>
        </div>
        <h2>What the ${esc(item.name.toLowerCase())} is good for.</h2>
        <div class="prose" style="max-width: 780px; margin-top: 24px;">
          <p>${esc(item.longDescription)}</p>
        </div>
      </div>

      <div>
        <div class="section-eyebrow">
          <span class="section-marker">§ 02</span>
          <span class="bar"></span>
          <span class="tag">Specs</span>
        </div>
        <div class="grid-2">
          <div>
            <table class="spec-table">
              ${Object.entries(item.specs).map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('\n              ')}
            </table>
          </div>
          <div>
            <h3 class="font-display" style="font-size: 22px; text-transform: uppercase; margin: 0 0 18px;">Typical uses</h3>
            <ul class="prose" style="padding-left: 22px;">
              ${item.typicalUses.map((u) => `<li>${esc(u)}</li>`).join('\n              ')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 03</span>
      <span class="bar"></span>
      <span class="tag">Available at</span>
    </div>
    <h2>Yards where this crane is stationed.</h2>
    <p class="lead" style="margin-bottom: 32px;">Cranes rotate between yards as the work demands. Call dispatch to confirm availability for your date.</p>
    <div class="grid-3">
      ${item.availableAtYards.map((slug) => {
        const l = byLocationSlug(slug);
        if (!l) return '';
        return `<a href="${locationUrl(l.slug)}" class="card card-link">
          <div class="tag" style="margin-bottom: 10px; color: var(--safety);">Yard ${esc(l.yardNumber)}${l.isHQ ? ' · HQ' : ''}</div>
          <h3>${esc(l.city)}, ${esc(l.state)}</h3>
          <p>${esc(l.yardCharacter)} · ~${l.serviceRadiusMi} mi radius</p>
          <div class="arrow">Yard details <span>→</span></div>
        </a>`;
      }).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 04</span>
      <span class="bar"></span>
      <span class="tag">Related services</span>
    </div>
    <h2>Often paired with.</h2>
    <div class="grid-3" style="margin-top: 32px;">
      ${item.relatedServices.map((slug) => {
        const s = byServiceSlug(slug);
        if (!s) return '';
        return `<a href="${serviceUrl(s.slug)}" class="card card-link">
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.shortDescription)}</p>
          <div class="arrow">Read more <span>→</span></div>
        </a>`;
      }).join('\n      ')}
    </div>
  </div>
</section>

${renderCtaBand(`Need a ${item.tonnage}-ton crane?`, `Two-minute call and we can quote a date, a rate, and a yard.`)}

${renderFooter()}`;
}

/* ============================================================
   SERVICE PAGE
============================================================ */
function renderServicePage(item) {
  const canonical = `${SITE.domain}${serviceUrl(item.slug)}`;
  const title = `${item.name} | Louisiana & East Texas | ${SITE.brand}`;
  const description = `${item.shortDescription} Available across all five CDH yards: Lafayette, Baton Rouge, Lake Charles, New Orleans, and Baytown.`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical}#service`,
    serviceType: item.name,
    name: item.name,
    description: item.longDescription,
    provider: organizationRef(),
    areaServed: LOCATIONS.map((l) => ({ '@type': 'City', name: `${l.city}, ${l.state}` })),
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/' },
    { name: item.name, url: serviceUrl(item.slug) },
  ];

  const head = renderHead({
    title,
    description,
    canonical,
    schema: [serviceSchema, breadcrumbSchema(breadcrumbs)],
  });

  return `${head}
${renderUtilBar()}
${renderNav()}
${renderBreadcrumbs(breadcrumbs)}

<section class="page-hero">
  <div class="container">
    <div class="page-hero-eyebrow">
      <span class="tag">Service</span>
      <span class="bar"></span>
      <span class="tag" style="color: var(--safety);">Louisiana · East Texas</span>
    </div>
    <h1>${esc(item.name.split(' ')[0])}<br/><span class="editorial-em">${esc(item.name.split(' ').slice(1).join(' ') || 'services.')}</span></h1>
    <p class="lede">${esc(item.shortDescription)}</p>
    <div class="hero-cta-row">
      <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" class="btn-primary">Call ${esc(SITE.phoneDisplay)}</a>
      <a href="/#quote" class="btn-secondary">Get quote</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div style="display: grid; grid-template-columns: 1fr; gap: 56px;">
      <div>
        <div class="section-eyebrow">
          <span class="section-marker">§ 01</span>
          <span class="bar"></span>
          <span class="tag">What it is</span>
        </div>
        <h2>${esc(item.headline)}</h2>
        <div class="prose" style="max-width: 780px; margin-top: 24px;">
          <p>${esc(item.longDescription)}</p>
        </div>
      </div>

      <div class="grid-2">
        <div>
          <div class="section-eyebrow">
            <span class="section-marker">§ 02</span>
            <span class="bar"></span>
            <span class="tag">What is included</span>
          </div>
          <ul class="prose" style="padding-left: 22px; margin-top: 20px;">
            ${item.whatsIncluded.map((u) => `<li>${esc(u)}</li>`).join('\n            ')}
          </ul>
        </div>
        <div>
          <div class="section-eyebrow">
            <span class="section-marker">§ 03</span>
            <span class="bar"></span>
            <span class="tag">When you need it</span>
          </div>
          <div class="prose" style="margin-top: 20px;">
            <p>${esc(item.whenYouNeedIt)}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 04</span>
      <span class="bar"></span>
      <span class="tag">Relevant fleet</span>
    </div>
    <h2>Cranes commonly used.</h2>
    <div class="grid-3" style="margin-top: 32px;">
      ${item.relevantFleet.slice(0, 6).map((slug) => {
        const f = byFleetSlug(slug);
        if (!f) return '';
        return `<a href="${fleetUrl(f.slug)}" class="card card-link">
          <div class="tag" style="margin-bottom: 10px; color: var(--safety);">${f.tonnage} ton</div>
          <h3>${esc(f.name)}</h3>
          <p>${esc(f.shortDescription)}</p>
          <div class="arrow">Spec sheet <span>→</span></div>
        </a>`;
      }).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 05</span>
      <span class="bar"></span>
      <span class="tag">Where we work</span>
    </div>
    <h2>Available across every CDH yard.</h2>
    <div class="grid-3" style="margin-top: 32px;">
      ${LOCATIONS.map((l) => `<a href="${locationUrl(l.slug)}" class="card card-link">
        <div class="tag" style="margin-bottom: 10px; color: var(--safety);">Yard ${esc(l.yardNumber)}${l.isHQ ? ' · HQ' : ''}</div>
        <h3>${esc(l.city)}, ${esc(l.state)}</h3>
        <p>${esc(l.yardCharacter)}</p>
        <div class="arrow">Yard details <span>→</span></div>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

${renderCtaBand('Talk through your project.', 'Dispatch is staffed 24/7. We can scope, quote, and book your pick on the same call.')}

${renderFooter()}`;
}

/* ============================================================
   INDUSTRY PAGE
============================================================ */
function renderIndustryPage(item) {
  const canonical = `${SITE.domain}${industryUrl(item.slug)}`;
  const title = `${item.name} Crane Services | Louisiana & East Texas | ${SITE.brand}`;
  const description = `${item.shortDescription} 20+ years of ${item.name.toLowerCase()} crane work across the Gulf South.`;

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': canonical,
    name: title,
    description,
    isPartOf: { '@id': `${SITE.domain}/#website` },
    about: { '@type': 'Thing', name: item.name },
    inLanguage: 'en-US',
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Industries', url: '/#industries' },
    { name: item.name, url: industryUrl(item.slug) },
  ];

  const head = renderHead({
    title,
    description,
    canonical,
    schema: [aboutSchema, breadcrumbSchema(breadcrumbs)],
  });

  return `${head}
${renderUtilBar()}
${renderNav()}
${renderBreadcrumbs(breadcrumbs)}

<section class="page-hero">
  <div class="container">
    <div class="page-hero-eyebrow">
      <span class="tag">Industry</span>
      <span class="bar"></span>
      <span class="tag" style="color: var(--safety);">${esc(item.name)}</span>
    </div>
    <h1>${esc(item.name.split(' & ')[0])}<br/><span class="editorial-em">${esc(item.name.split(' & ')[1] || 'lifts.')}</span></h1>
    <p class="lede">${esc(item.intro)}</p>
    <div class="hero-cta-row">
      <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" class="btn-primary">Call ${esc(SITE.phoneDisplay)}</a>
      <a href="/#quote" class="btn-secondary">Request quote</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 01</span>
      <span class="bar"></span>
      <span class="tag">How we work</span>
    </div>
    <h2>${esc(item.headline)}</h2>
    <div class="prose" style="max-width: 780px; margin-top: 24px;">
      <p>${esc(item.body)}</p>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 02</span>
      <span class="bar"></span>
      <span class="tag">Where we work in this industry</span>
    </div>
    <h2>Typical scopes.</h2>
    <div class="grid-2" style="margin-top: 32px;">
      <ul class="prose" style="padding-left: 22px;">
        ${item.subSegments.slice(0, Math.ceil(item.subSegments.length / 2)).map((s) => `<li>${esc(s)}</li>`).join('\n        ')}
      </ul>
      <ul class="prose" style="padding-left: 22px;">
        ${item.subSegments.slice(Math.ceil(item.subSegments.length / 2)).map((s) => `<li>${esc(s)}</li>`).join('\n        ')}
      </ul>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 03</span>
      <span class="bar"></span>
      <span class="tag">Cranes we send</span>
    </div>
    <h2>Equipment commonly dispatched.</h2>
    <div class="grid-3" style="margin-top: 32px;">
      ${item.typicalCranes.slice(0, 6).map((slug) => {
        const f = byFleetSlug(slug);
        if (!f) return '';
        return `<a href="${fleetUrl(f.slug)}" class="card card-link">
          <div class="tag" style="margin-bottom: 10px; color: var(--safety);">${f.tonnage} ton</div>
          <h3>${esc(f.name)}</h3>
          <p>${esc(f.shortDescription)}</p>
          <div class="arrow">Spec sheet <span>→</span></div>
        </a>`;
      }).join('\n      ')}
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 04</span>
      <span class="bar"></span>
      <span class="tag">Services</span>
    </div>
    <h2>How we package the work.</h2>
    <div class="grid-3" style="margin-top: 32px;">
      ${item.typicalServices.map((slug) => {
        const s = byServiceSlug(slug);
        if (!s) return '';
        return `<a href="${serviceUrl(s.slug)}" class="card card-link">
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.shortDescription)}</p>
          <div class="arrow">Read more <span>→</span></div>
        </a>`;
      }).join('\n      ')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§ 05</span>
      <span class="bar"></span>
      <span class="tag">Yards in your area</span>
    </div>
    <h2>Closest CDH yards for ${esc(item.name.toLowerCase())} work.</h2>
    <div class="grid-3" style="margin-top: 32px;">
      ${item.primaryLocations.map((slug) => {
        const l = byLocationSlug(slug);
        if (!l) return '';
        return `<a href="${locationUrl(l.slug)}" class="card card-link">
          <div class="tag" style="margin-bottom: 10px; color: var(--safety);">Yard ${esc(l.yardNumber)}${l.isHQ ? ' · HQ' : ''}</div>
          <h3>${esc(l.city)}, ${esc(l.state)}</h3>
          <p>${esc(l.yardCharacter)}</p>
          <div class="arrow">Yard details <span>→</span></div>
        </a>`;
      }).join('\n      ')}
    </div>
  </div>
</section>

${renderCtaBand(`Have ${item.name.toLowerCase()} work coming up?`, 'Two-minute call to scope the pick. Same-day quote in most cases.')}

${renderFooter()}`;
}

/* ============================================================
   LEARN PAGE
============================================================ */
function renderLearnPage(item) {
  const canonical = `${SITE.domain}${learnUrl(item.slug)}`;
  const title = `${item.title} | Crane Rental Guides | ${SITE.brand}`;
  const description = item.summary;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonical}#article`,
    headline: item.title,
    description: item.summary,
    author: { '@id': `${SITE.domain}/#organization` },
    publisher: { '@id': `${SITE.domain}/#organization` },
    inLanguage: 'en-US',
    image: SITE.defaultOgImage,
    mainEntityOfPage: canonical,
  };

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Learn', url: '/' },
    { name: item.title, url: learnUrl(item.slug) },
  ];

  const head = renderHead({
    title,
    description,
    canonical,
    schema: [articleSchema, breadcrumbSchema(breadcrumbs)],
  });

  return `${head}
${renderUtilBar()}
${renderNav()}
${renderBreadcrumbs(breadcrumbs)}

<section class="page-hero">
  <div class="container">
    <div class="page-hero-eyebrow">
      <span class="tag">Learn</span>
      <span class="bar"></span>
      <span class="tag" style="color: var(--safety);">Crane rental guide</span>
    </div>
    <h1>${esc(item.title.split(' ').slice(0, 4).join(' '))}<br/><span class="editorial-em">${esc(item.title.split(' ').slice(4).join(' ') || '')}</span></h1>
    <p class="lede">${esc(item.summary)}</p>
  </div>
</section>

<section class="section">
  <div class="container" style="max-width: 820px;">
    <div class="prose">
      ${item.bodyParagraphs.map((p) => `<p>${esc(p)}</p>`).join('\n      ')}
      ${item.sections.map((s) => `<h2>${esc(s.h2)}</h2><p>${esc(s.body)}</p>`).join('\n      ')}
      <div class="quote-block" style="margin-top: 40px;">
        <p>${esc(item.cta)}</p>
        <cite>${esc(SITE.brand)} dispatch · 24/7</cite>
      </div>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="container">
    <div class="section-eyebrow">
      <span class="section-marker">§</span>
      <span class="bar"></span>
      <span class="tag">More guides</span>
    </div>
    <div class="grid-3" style="margin-top: 32px;">
      ${LEARN.filter((l) => l.slug !== item.slug).slice(0, 3).map((l) => `<a href="${learnUrl(l.slug)}" class="card card-link">
        <h3>${esc(l.title)}</h3>
        <p>${esc(l.summary)}</p>
        <div class="arrow">Read <span>→</span></div>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>

${renderCtaBand('Ready for a quote?', 'Call dispatch for a two-minute scope. Same-day quote in most cases.')}

${renderFooter()}`;
}

/* ============================================================
   LANDING PAGE (Google Ads)
============================================================ */
function lpUrl(slug) { return `/lp/${slug}/`; }

// Stripped-down nav for landing pages: logo + phone only, no nav links.
function renderLpNav() {
  return `<nav class="site-nav" aria-label="Primary">
  <div class="container site-nav-inner">
    <a href="/" class="brand-lockup" aria-label="${esc(SITE.brand)} home">
      <span class="brand-badge" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <line x1="9" y1="2.5" x2="9" y2="13.5" />
          <line x1="13" y1="2.5" x2="13" y2="13.5" />
          <polygon points="6.5,13.5 15.5,13.5 11,18.4" fill="currentColor" stroke="none" />
          <path d="M11 18.4v1.7c0 1.45 1.2 2.4 2.6 2.4s2.6-.95 2.6-2.3" />
        </svg>
      </span>
      <span class="brand-text">
        <span class="brand-title">${esc(SITE.shortBrand)}</span>
        <span class="brand-sub">Crane Rentals</span>
      </span>
    </a>
    <div class="nav-actions">
      <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" class="nav-phone" data-lp-phone>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${esc(SITE.phoneDisplay)}
      </a>
    </div>
  </div>
</nav>`;
}

function renderLpFooter() {
  return `<footer class="lp-footer">
  <div class="container lp-footer-grid">
    <div>© ${new Date().getFullYear()} ${esc(SITE.legalName).toUpperCase()} · ALL RIGHTS RESERVED</div>
    <div>
      <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" data-lp-phone>${esc(SITE.phoneDisplay)}</a>
      &nbsp;·&nbsp;
      <a href="mailto:${esc(SITE.email)}" data-lp-email>${esc(SITE.email)}</a>
      &nbsp;·&nbsp;
      <a href="/">Full site</a>
    </div>
  </div>
</footer>
<div class="mobile-cta-bar" aria-hidden="false">
  <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" class="call" data-lp-phone>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f4c542" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    Call Dispatch
  </a>
  <a href="#lp-form" class="quote">Get Quote</a>
</div>`;
}

function renderLpHero(lp) {
  const tonnageDefaults = lp.kind === 'tonnage' && /^(15|40|65)/.test(lp.h1Top) ? '40 – 65 ton' : '90 – 175 ton';
  const regionDefault = lp.cityRef ? byLocationSlug(lp.cityRef).city : 'Gulf South';
  return `<section class="lp-hero">
  <div class="container">
    <div class="lp-hero-grid">
      <div>
        <span class="lp-hero-eyebrow"><span class="live-dot" aria-hidden="true"></span>${esc(lp.eyebrow)}</span>
        <h1>
          <span>${esc(lp.h1Top)}</span>
          <span class="row-2">${esc(lp.h1Bottom)}</span>
        </h1>
        <p class="lp-lede">${esc(lp.lede)}</p>
        <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" class="lp-cta-card" data-lp-phone aria-label="Call dispatch ${esc(SITE.phoneDisplay)}">
          <span class="icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </span>
          <span class="copy">
            <span class="label">Call dispatch · 24/7</span>
            <span class="num">${esc(SITE.phoneDisplay)}</span>
          </span>
        </a>
        <div class="lp-trust-row">
          ${(lp.trustChips || []).map((c) => `<span class="lp-trust-chip">${esc(c)}</span>`).join('\n          ')}
        </div>
      </div>

      <div class="lp-form-card" id="lp-form">
        <div class="lp-form-card-top" aria-hidden="true"></div>
        <div class="lp-form-card-body">
          <span class="tag" style="color: var(--safety);">Dispatch · Same-day quote</span>
          <h2>Get a <span class="accent">quote.</span></h2>
          <p class="sub">Tell us the lift and the date. We will reply with a price and an availability window — typically the same business day.</p>
          <form action="/api/dispatch" method="post" class="lp-form-grid" data-lp-form data-lp-slug="${esc(lp.slug)}" novalidate>
            <input type="hidden" name="lp_slug" value="${esc(lp.slug)}">
            <input type="hidden" name="ad_group" value="${esc(lp.adGroupTheme)}">
            <input type="hidden" name="utm_source" data-utm="source">
            <input type="hidden" name="utm_medium" data-utm="medium">
            <input type="hidden" name="utm_campaign" data-utm="campaign">
            <input type="hidden" name="utm_term" data-utm="term">
            <input type="hidden" name="utm_content" data-utm="content">
            <input type="hidden" name="gclid" data-utm="gclid">
            <div>
              <label for="lp-name" class="lp-field-label">Your name</label>
              <input class="lp-field" id="lp-name" name="name" type="text" autocomplete="name" required>
            </div>
            <div>
              <label for="lp-phone" class="lp-field-label">Phone</label>
              <input class="lp-field" id="lp-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(${esc(SITE.phone.split('-')[0])}) ${esc(SITE.phone.split('-')[1])}-${esc(SITE.phone.split('-')[2])}" required>
            </div>
            <div>
              <label for="lp-tonnage" class="lp-field-label">Tonnage needed</label>
              <select class="lp-field" id="lp-tonnage" name="tonnage" required>
                <option value="">Choose tonnage</option>
                <option>15 – 50 ton</option>
                <option>65 – 90 ton</option>
                <option>130 – 175 ton</option>
                <option>200 – 300 ton</option>
                <option>500 ton</option>
                <option>Not sure — help me size it</option>
              </select>
            </div>
            <div>
              <label for="lp-city" class="lp-field-label">Jobsite city</label>
              <input class="lp-field" id="lp-city" name="city" type="text" required>
            </div>
            <div>
              <label for="lp-date" class="lp-field-label">Needed by</label>
              <input class="lp-field" id="lp-date" name="neededBy" type="date" required>
            </div>
            <div>
              <label for="lp-brief" class="lp-field-label">Brief description</label>
              <textarea class="lp-field" id="lp-brief" name="description" rows="2" placeholder="HVAC roof set, 3-story commercial, ~4 hr pick"></textarea>
            </div>
            <button class="lp-form-submit" type="submit" data-lp-submit>Request quote</button>
            <div class="lp-form-trust">No spam. Quotes only. We respect your time.</div>
            <div class="lp-form-success" data-lp-success>Thanks — we've got it. Dispatch will call you within the next business hour. For anything urgent, call ${esc(SITE.phoneDisplay)}.</div>
            <div class="lp-form-error" data-lp-error>We couldn't send your request — call dispatch at ${esc(SITE.phoneDisplay)} or try again.</div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function renderLpTrustBand() {
  return `<section class="lp-trust-band" aria-label="Credentials and stats">
  <div class="container lp-trust-band-inner">
    <span class="lp-trust-band-item"><span class="stat">22+</span>Years lifting</span>
    <span class="lp-trust-band-item"><span class="stat">5</span>Yards</span>
    <span class="lp-trust-band-item"><span class="stat">500T</span>Max capacity</span>
    <span class="lp-trust-band-item"><span class="stat">24/7</span>Dispatch</span>
    <span class="lp-trust-band-item">NCCCO · ISN · Avetta · OSHA 30</span>
  </div>
</section>`;
}

function renderLpFeatures(lp) {
  return `<section class="lp-section">
  <div class="container">
    <h2>Why ${esc(SITE.brand)} <span class="accent">for this job.</span></h2>
    <p class="lp-section-lead">Built for the Gulf South. Sized for your pick. Available when you call.</p>
    <div class="lp-feature-grid">
      ${(lp.serviceBullets || []).map((b, i) => `<div class="lp-feature${i % 2 === 0 ? '' : ' alt'}">
        <span class="check" aria-hidden="true"><svg viewBox="0 0 24 24"><polyline points="4,12 10,18 20,6"/></svg></span>
        <p>${esc(b)}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function renderLpTestimonials(lp) {
  const items = (lp.testimonialIndexes || []).map((i) => TESTIMONIALS[i]).filter(Boolean);
  if (!items.length) return '';
  return `<section class="lp-section alt">
  <div class="container">
    <h2>What customers <span class="accent">have said.</span></h2>
    <div class="lp-testimonial-grid">
      ${items.map((t) => `<figure class="lp-testimonial">
        <div class="stars" aria-label="5 out of 5 stars">★★★★★</div>
        <blockquote><p>${esc(t.body)}</p></blockquote>
        <figcaption>
          <cite>${esc(t.attribution)}</cite>
          <div class="detail">${esc(t.detail)}</div>
        </figcaption>
      </figure>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function renderLpFleet(lp) {
  const fleet = (lp.fleetRefs || []).map(byFleetSlug).filter(Boolean);
  if (!fleet.length) return '';
  return `<section class="lp-section">
  <div class="container">
    <h2>Cranes on this <span class="accent">project type.</span></h2>
    <p class="lp-section-lead">We rotate equipment between yards as the work demands. Call to confirm availability for your date.</p>
    <div class="lp-mini-grid">
      ${fleet.map((f) => `<div class="lp-mini">
        <div class="tag">${f.tonnage} ton · ${esc(f.classType)}</div>
        <h3>${esc(f.name)}</h3>
        <p>${esc(f.shortDescription)}</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function renderLpYards(lp) {
  const yards = (lp.yardCoverage || []).map(byLocationSlug).filter(Boolean);
  if (!yards.length || yards.length === 1) {
    // For single-yard city pages, skip this section (yard info is implied by the H1).
    return '';
  }
  return `<section class="lp-section alt">
  <div class="container">
    <h2>Yards we can dispatch <span class="accent">from.</span></h2>
    <p class="lp-section-lead">Closest yard works the job. Specialty cranes swing in from a sister yard when the pick calls for it.</p>
    <div class="lp-mini-grid">
      ${yards.map((y) => `<div class="lp-mini">
        <div class="tag">Yard ${esc(y.yardNumber)}${y.isHQ ? ' · HQ' : ''}</div>
        <h3>${esc(y.city)}, ${esc(y.state)}</h3>
        <p>${esc(y.yardCharacter)} · ~${y.serviceRadiusMi} mi radius</p>
      </div>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function renderLpFaq(lp) {
  const items = (lp.faqIndexes || []).map((id) => ({ id, ...LANDING_FAQ_LIBRARY[id] })).filter((x) => x.q);
  if (!items.length) return '';
  return `<section class="lp-section">
  <div class="container" style="max-width: 880px;">
    <h2>Frequently <span class="accent">asked.</span></h2>
    <div style="margin-top: 28px;">
      ${items.map((it, idx) => `<details class="faq"${idx === 0 ? ' open' : ''}>
        <summary><h3>${esc(it.q)}</h3><span class="plus" aria-hidden="true">+</span></summary>
        <div class="answer"><p>${esc(it.a)}</p></div>
      </details>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

function renderLpFinalCta(lp) {
  return `<section class="lp-final">
  <div class="container">
    <h2>Have a lift coming up?<br/><span class="accent">Call dispatch.</span></h2>
    <p>Two-minute call to scope the pick. Same-day quote in most cases. Dispatch is staffed every hour of every day.</p>
    <div class="lp-final-cta-row">
      <a href="tel:${esc(SITE.phoneTel.replace(/[^0-9+]/g, ''))}" class="lp-final-phone" data-lp-phone>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b0d10" stroke-width="2.4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${esc(SITE.phoneDisplay)}
      </a>
      <a href="#lp-form" class="lp-final-quote">Get a Quote</a>
    </div>
  </div>
</section>`;
}

function renderLpConversionScript() {
  // Inline conversion + UTM script. Lightweight, no framework.
  // Wires:
  //   - data-lp-phone -> phone_click GA4 event + Google Ads conversion
  //   - data-lp-email -> email_click GA4 event + Google Ads conversion
  //   - data-lp-form  -> async POST to /api/dispatch; on success fires form_submit conversion
  //   - hidden UTM inputs populated from URL params (utm_*, gclid)
  return `<script>
(function(){
  function get(name){
    var m = location.search.match(new RegExp('[?&]' + name + '=([^&#]*)'));
    return m ? decodeURIComponent(m[1].replace(/\\+/g, ' ')) : '';
  }
  // Persist UTM/gclid across pages in this session.
  var keys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid'];
  try {
    keys.forEach(function(k){
      var v = get(k);
      if (v) sessionStorage.setItem('cdh_' + k, v);
    });
  } catch(e){}
  // Hydrate hidden form inputs.
  document.querySelectorAll('[data-utm]').forEach(function(el){
    var k = el.getAttribute('data-utm');
    var key = k === 'source' ? 'utm_source' :
              k === 'medium' ? 'utm_medium' :
              k === 'campaign' ? 'utm_campaign' :
              k === 'term' ? 'utm_term' :
              k === 'content' ? 'utm_content' :
              k === 'gclid' ? 'gclid' : null;
    if (!key) return;
    try { el.value = sessionStorage.getItem('cdh_' + key) || ''; } catch(e){}
  });

  function fire(eventName, params){
    if (typeof gtag !== 'function') return;
    try { gtag('event', eventName, params || {}); } catch(e){}
  }
  function fireConversion(label){
    if (!label) return;
    if (typeof gtag !== 'function') return;
    try { gtag('event', 'conversion', { send_to: label }); } catch(e){}
  }
  var CONVERSIONS = {
    phone: ${JSON.stringify(SITE.conversions.phoneClick)},
    email: ${JSON.stringify(SITE.conversions.emailClick)},
    form:  ${JSON.stringify(SITE.conversions.formSubmit)}
  };

  // Phone clicks
  document.querySelectorAll('[data-lp-phone]').forEach(function(el){
    el.addEventListener('click', function(){
      fire('phone_click', { placement: 'lp', page_path: location.pathname });
      fireConversion(CONVERSIONS.phone);
    });
  });
  // Email clicks
  document.querySelectorAll('[data-lp-email]').forEach(function(el){
    el.addEventListener('click', function(){
      fire('email_click', { placement: 'lp', page_path: location.pathname });
      fireConversion(CONVERSIONS.email);
    });
  });
  // Form submit
  var form = document.querySelector('[data-lp-form]');
  if (form){
    var submit = form.querySelector('[data-lp-submit]');
    var success = form.querySelector('[data-lp-success]');
    var error = form.querySelector('[data-lp-error]');
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      if (success) success.classList.remove('is-shown');
      if (error) error.classList.remove('is-shown');
      var data = {};
      new FormData(form).forEach(function(v, k){ data[k] = v; });
      if (submit){ submit.setAttribute('disabled','disabled'); submit.textContent = 'Sending...'; }
      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(function(r){
        if (!r.ok) throw new Error('bad-status');
        return r.json();
      }).then(function(){
        fire('quote_submit', { placement: 'lp', page_path: location.pathname, lp_slug: data.lp_slug });
        fireConversion(CONVERSIONS.form);
        form.reset();
        if (success) success.classList.add('is-shown');
        if (submit){ submit.textContent = 'Submitted'; setTimeout(function(){ submit.removeAttribute('disabled'); submit.textContent = 'Request quote'; }, 4000); }
      }).catch(function(){
        if (error) error.classList.add('is-shown');
        if (submit){ submit.removeAttribute('disabled'); submit.textContent = 'Request quote'; }
      });
    });
  }
  // Scroll depth (proxy engagement signal)
  var fired75 = false;
  window.addEventListener('scroll', function(){
    if (fired75) return;
    var pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    if (pct >= 0.75){ fired75 = true; fire('scroll_75', { page_path: location.pathname }); }
  }, { passive: true });
})();
</script>`;
}

function renderLandingPage(lp) {
  const canonical = `${SITE.domain}${lpUrl(lp.slug)}`;
  const cityForTitle = lp.cityRef ? byLocationSlug(lp.cityRef).city : null;
  const titleParts = [lp.h1Top.replace(/\.$/, '').trim(), lp.h1Bottom.replace(/\.$/, '').trim(), SITE.brand];
  const title = `${titleParts[0]} — ${titleParts[1]} | ${SITE.brand}`;
  const description = `${lp.lede.slice(0, 155).trim()}${lp.lede.length > 155 ? '...' : ''}`;
  const geo = cityForTitle
    ? { region: byLocationSlug(lp.cityRef).state, placename: `${cityForTitle}, ${byLocationSlug(lp.cityRef).stateName}`, lat: byLocationSlug(lp.cityRef).geo.lat, lng: byLocationSlug(lp.cityRef).geo.lng }
    : undefined;

  const head = renderHead({
    title,
    description,
    canonical,
    schema: [], // Landing pages are noindex; no SEO schema needed.
    geo,
    noindex: true,
    includeGoogleAds: true,
    bodyClass: 'lp',
  });

  return `${head}
${renderUtilBar()}
${renderLpNav()}
${renderLpHero(lp)}
${renderLpTrustBand()}
${renderLpFeatures(lp)}
${renderLpTestimonials(lp)}
${renderLpFleet(lp)}
${renderLpYards(lp)}
${renderLpFaq(lp)}
${renderLpFinalCta(lp)}
${renderLpFooter()}
${renderLpConversionScript()}
</body>
</html>`;
}

/* ============================================================
   SITEMAP
============================================================ */
function renderSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${SITE.domain}/`, priority: '1.0', changefreq: 'weekly' },
    ...LOCATIONS.map((l) => ({ loc: `${SITE.domain}${locationUrl(l.slug)}`, priority: '0.9', changefreq: 'monthly' })),
    ...FLEET.map((f) => ({ loc: `${SITE.domain}${fleetUrl(f.slug)}`, priority: '0.8', changefreq: 'monthly' })),
    ...SERVICES.map((s) => ({ loc: `${SITE.domain}${serviceUrl(s.slug)}`, priority: '0.85', changefreq: 'monthly' })),
    ...INDUSTRIES.map((i) => ({ loc: `${SITE.domain}${industryUrl(i.slug)}`, priority: '0.75', changefreq: 'monthly' })),
    ...LEARN.map((l) => ({ loc: `${SITE.domain}${learnUrl(l.slug)}`, priority: '0.6', changefreq: 'quarterly' })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by build-pages.js -->
<urlset xmlns="http://www.w3.org/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
}

module.exports = {
  renderLocationPage,
  renderFleetPage,
  renderServicePage,
  renderIndustryPage,
  renderLearnPage,
  renderLandingPage,
  renderSitemap,
};
