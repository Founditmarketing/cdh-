# Phase 8 — Technical Performance & Core Web Vitals

## 8.1 Current state

The homepage [cdh-homepage-v3.html](../cdh-homepage-v3.html) loads Tailwind via the JIT CDN:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

The Tailwind team is explicit that the CDN is **not for production** — it ships ~150 KB of JS and blocks render until it generates styles client-side. This is the single biggest CWV issue on the site.

The new SEO subpages (`/locations/*`, `/fleet/*`, `/services/*`, `/industries/*`, `/learn/*`) do NOT use Tailwind at all — they use a hand-tuned shared stylesheet at [dist/cdh-subpages.css](../dist/cdh-subpages.css) (~16 KB minified). They will already score well on Core Web Vitals out of the box.

The homepage performance work below is the remaining gap.

## 8.2 Homepage: replace Tailwind CDN with a compiled build

### Steps
1. Install Tailwind locally:
   ```bash
   npm install -D tailwindcss@latest
   npx tailwindcss init
   ```
2. Create `tailwind.config.js` with `content: ['./cdh-homepage-v3.html']`.
3. Create `src/tailwind-input.css` containing just `@tailwind base; @tailwind components; @tailwind utilities;`.
4. Add an npm script:
   ```json
   "build:css": "tailwindcss -i ./src/tailwind-input.css -o ./dist/tailwind.css --minify"
   ```
5. Run `npm run build:css` once. Output: `dist/tailwind.css` (typically 8–15 KB for a single-page site).
6. In [cdh-homepage-v3.html](../cdh-homepage-v3.html), replace `<script src="https://cdn.tailwindcss.com"></script>` with `<link rel="stylesheet" href="/dist/tailwind.css">`.
7. Add `npm run build:css` to a pre-deploy script so the file is always fresh:
   ```json
   "build": "node build-pages.js && npm run build:css"
   ```

Expected gain: **−150–250 ms TBT, −80–120 ms LCP** on mobile.

## 8.3 Homepage: self-host the four font families

Currently loading `Bebas Neue + JetBrains Mono + Inter Tight + Fraunces` from Google Fonts. Four families is heavy.

### Quick wins (no self-hosting yet)
- Confirm `display=swap` is set in the font URL — it is.
- Reduce Inter Tight weights to the ones actually used above the fold (300, 400, 600, 700 only). Drop 500 and 800 if unused.
- Drop Fraunces weights to one (400 italic, used for editorial-em).

### Full self-hosting (recommended for production)
1. Download the WOFF2 files for the exact weights used from <https://gwfh.mranftl.com/fonts> or equivalent.
2. Place files at `/fonts/`.
3. Inline a `@font-face` block in each page's `<head>` with `font-display: swap` and the unicode subset (`latin`).
4. Preload only the two weights used in the LCP element:
   ```html
   <link rel="preload" href="/fonts/bebas-neue-400.woff2" as="font" type="font/woff2" crossorigin>
   <link rel="preload" href="/fonts/inter-tight-300.woff2" as="font" type="font/woff2" crossorigin>
   ```
5. Drop the Google Fonts `<link>` tags entirely.

Expected gain: **−200–400 ms LCP** on mobile cold load (eliminates fonts.googleapis.com + fonts.gstatic.com handshakes).

## 8.4 Images

### Current
- Most fleet and hero imagery is served from `https://cdn.jsdelivr.net/gh/Founditmarketing/cdh-@master/`.
- AVIF + WebP picture elements exist for the hero — good.
- The fleet section uses CSS background images via `var(--fleet-photo-*)` — these don't get `loading="lazy"`, `decoding="async"`, or `fetchpriority` controls.

### Recommended
1. Move all production images to `/img/` on the production domain (Vercel will then enable its image optimizer automatically). Background: same-origin assets are faster than jsdelivr because of HTTP/2 connection coalescing and Vercel's edge cache.
2. Add `width` and `height` attributes (or aspect-ratio CSS) to every `<img>` and `<picture>` to prevent CLS.
3. Add `loading="lazy"` to every below-the-fold `<img>`.
4. Add `fetchpriority="high"` to the hero LCP image only.
5. Convert fleet background images to `<picture>` elements with AVIF + WebP fallback (so they get lazy-loading too).
6. Preload the LCP hero image:
   ```html
   <link rel="preload" as="image"
     href="/img/hero/hero-v2-1920.avif"
     imagesrcset="/img/hero/hero-v2-480.avif 480w, /img/hero/hero-v2-960.avif 960w, /img/hero/hero-v2-1440.avif 1440w, /img/hero/hero-v2-1920.avif 1920w"
     imagesizes="100vw" type="image/avif">
   ```

Expected gain: **−400–800 ms LCP** on mobile cold load + CLS → 0.

## 8.5 Subpage performance baseline

The shared stylesheet [dist/cdh-subpages.css](../dist/cdh-subpages.css) is intentionally small and dependency-free. To keep the subpages fast:

- The Google Maps iframe on each location page is `loading="lazy"` — keep it that way.
- All other images on subpages should also use `loading="lazy"` and proper `width`/`height`.
- No JavaScript ships with the subpages (no framework, no inline scripts). Keep it that way until measurement shows a reason to add any.

## 8.6 Targets

- LCP < **2.0s** on mobile 4G (mid-tier device).
- CLS < **0.05**.
- INP < **200ms**.
- TBT < **200ms**.

Verify with:
- PageSpeed Insights: <https://pagespeed.web.dev/> — run weekly on the homepage and one yard page.
- Chrome DevTools Lighthouse (mobile preset).
- Search Console > Core Web Vitals report — real-user data (CrUX), more important than lab data.

## 8.7 Cache policy

[vercel.json](../vercel.json) already sets:
- HTML: `Cache-Control: public, max-age=0, must-revalidate` (revalidate every request)
- `/img/*`: `Cache-Control: public, max-age=31536000, immutable`
- `/dist/*`: `Cache-Control: public, max-age=31536000, immutable`
- `/fonts/*`: `Cache-Control: public, max-age=31536000, immutable` + CORS

Versioning: when content of an immutable asset changes (e.g. `dist/cdh-subpages.css`), append a content-hash to the filename or query string so the browser fetches the new version: `dist/cdh-subpages.css?v=2026-05-21`. Future iteration: integrate a hash-in-filename build step.

## 8.8 Owner-required actions

- [ ] Approve the Tailwind build replacement plan (Section 8.2) — small change but requires committing a new npm dependency.
- [ ] Decide whether to self-host fonts (Section 8.3) — it is worth ~200–400 ms LCP.
- [ ] Decide whether to migrate images from jsdelivr to `/img/` on the production domain (Section 8.4) — easiest with Vercel's image optimizer.
