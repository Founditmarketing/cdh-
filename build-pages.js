#!/usr/bin/env node
/*
 * CDH Crane Rentals — Static page generator
 *
 * Reads build/site-data.js + build/templates.js and writes:
 *   /locations/{slug}/index.html
 *   /fleet/{slug}/index.html
 *   /services/{slug}/index.html
 *   /industries/{slug}/index.html
 *   /learn/{slug}/index.html
 *   /sitemap.xml
 *
 * Run from the project root:
 *   node build-pages.js
 */

const fs = require('fs');
const path = require('path');
const { LOCATIONS, FLEET, SERVICES, INDUSTRIES, LEARN, LANDING_PAGES } = require('./build/site-data.js');
const {
  renderLocationPage,
  renderFleetPage,
  renderServicePage,
  renderIndustryPage,
  renderLearnPage,
  renderLandingPage,
  renderSitemap,
} = require('./build/templates.js');

const ROOT = __dirname;

function writeFile(relPath, contents) {
  const fullPath = path.join(ROOT, relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, contents, 'utf8');
  return fullPath;
}

function run() {
  let count = 0;
  const written = [];

  console.log('--- Building location pages ---');
  for (const loc of LOCATIONS) {
    const p = writeFile(path.join('locations', loc.slug, 'index.html'), renderLocationPage(loc));
    written.push(p);
    count += 1;
    console.log('  +', path.relative(ROOT, p));
  }

  console.log('--- Building fleet pages ---');
  for (const f of FLEET) {
    const p = writeFile(path.join('fleet', f.slug, 'index.html'), renderFleetPage(f));
    written.push(p);
    count += 1;
    console.log('  +', path.relative(ROOT, p));
  }

  console.log('--- Building service pages ---');
  for (const s of SERVICES) {
    const p = writeFile(path.join('services', s.slug, 'index.html'), renderServicePage(s));
    written.push(p);
    count += 1;
    console.log('  +', path.relative(ROOT, p));
  }

  console.log('--- Building industry pages ---');
  for (const i of INDUSTRIES) {
    const p = writeFile(path.join('industries', i.slug, 'index.html'), renderIndustryPage(i));
    written.push(p);
    count += 1;
    console.log('  +', path.relative(ROOT, p));
  }

  console.log('--- Building learn pages ---');
  for (const l of LEARN) {
    const p = writeFile(path.join('learn', l.slug, 'index.html'), renderLearnPage(l));
    written.push(p);
    count += 1;
    console.log('  +', path.relative(ROOT, p));
  }

  console.log('--- Building Google Ads landing pages (noindex) ---');
  for (const lp of LANDING_PAGES) {
    const p = writeFile(path.join('lp', lp.slug, 'index.html'), renderLandingPage(lp));
    written.push(p);
    count += 1;
    console.log('  +', path.relative(ROOT, p));
  }

  console.log('--- Regenerating sitemap.xml ---');
  const p = writeFile('sitemap.xml', renderSitemap());
  written.push(p);
  console.log('  +', path.relative(ROOT, p));

  console.log(`\nDone. Wrote ${count} pages + sitemap.xml.`);
}

if (require.main === module) {
  run();
}

module.exports = { run };
