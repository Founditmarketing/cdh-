const path = require('path');
const fs = require('fs/promises');
const sharp = require('sharp');

const ROOT = __dirname;
const IMG = path.join(ROOT, 'img');
const WIDTHS = [480, 960, 1440, 1920];

async function ensureDirs() {
  const dirs = [
    path.join(IMG, 'hero'),
    path.join(IMG, 'plate'),
    path.join(IMG, 'og'),
    path.join(IMG, 'favicons'),
  ];
  await Promise.all(dirs.map((d) => fs.mkdir(d, { recursive: true })));
}

async function buildSet(inputPath, outDir, slug) {
  for (const width of WIDTHS) {
    const base = path.join(outDir, `${slug}-${width}`);
    await sharp(inputPath).resize({ width, withoutEnlargement: true }).jpeg({ quality: 78 }).toFile(`${base}.jpg`);
    await sharp(inputPath).resize({ width, withoutEnlargement: true }).webp({ quality: 72 }).toFile(`${base}.webp`);
    await sharp(inputPath).resize({ width, withoutEnlargement: true }).avif({ quality: 58 }).toFile(`${base}.avif`);
  }
}

function ogOverlaySvg() {
  return `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0b0d10" stop-opacity="0.96"/>
      <stop offset="58%" stop-color="#0b0d10" stop-opacity="0.42"/>
      <stop offset="100%" stop-color="#0b0d10" stop-opacity="0.78"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#fade)"/>
  <text x="76" y="86" fill="#f4c542" font-size="16" font-family="Arial" letter-spacing="4">CDH CRANE RENTALS</text>
  <text x="76" y="205" fill="#eae6dd" font-size="110" font-family="Arial Black">CRANE</text>
  <text x="76" y="315" fill="#f4c542" font-size="110" font-family="Arial Black">AUTHORITY</text>
  <text x="76" y="370" fill="#eae6dd" opacity="0.86" font-size="30" font-family="Arial">Louisiana's Crane Authority</text>
</svg>`;
}

async function buildOgImage(heroInput) {
  const output = path.join(IMG, 'og', 'og-1200x630.jpg');
  await sharp(heroInput)
    .resize(1200, 630, { fit: 'cover', position: 'right' })
    .composite([{ input: Buffer.from(ogOverlaySvg()) }])
    .jpeg({ quality: 82 })
    .toFile(output);
}

async function buildFavicons() {
  const hookSvg = await fs.readFile(path.join(ROOT, 'brand-mark-hook.svg'), 'utf8');
  const padded = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.12)}" fill="#14171c"/>
  <g transform="translate(${Math.round(size * 0.18)},${Math.round(size * 0.16)}) scale(${size / 32})">
    ${hookSvg.replace(/<svg[^>]*>/, '').replace('</svg>', '')}
  </g>
</svg>`;

  const targets = [
    { name: 'favicon-32.png', size: 32 },
    { name: 'favicon-192.png', size: 192 },
    { name: 'favicon-512.png', size: 512 },
    { name: 'apple-touch-icon-180.png', size: 180 },
  ];
  for (const target of targets) {
    const out = path.join(IMG, 'favicons', target.name);
    await sharp(Buffer.from(padded(target.size))).png().toFile(out);
  }
}

async function run() {
  await ensureDirs();
  const hero = path.join(IMG, 'src', 'hero-source.jpg');
  const plate = path.join(IMG, 'src', 'plate-source.jpg');
  await buildSet(hero, path.join(IMG, 'hero'), 'hero');
  await buildSet(plate, path.join(IMG, 'plate'), 'plate');
  await buildOgImage(hero);
  await buildFavicons();
  console.log('Asset build complete.');
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
