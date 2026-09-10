/* Tailwind is used on the homepage only. The other pages are served by
 * dist/cdh-subpages.css, which is hand-written.
 *
 * Regenerate after editing index.html:
 *   npm run build:css
 *
 * The output must stay linked at the END of <head>, after the inline
 * <style> block. The old play CDN injected its rules at runtime, which
 * put them last in source order; a <link> placed earlier loses that
 * cascade fight and silently drops same-specificity utilities such as
 * tracking-[0.18em].
 */
module.exports = {
  content: ['./index.html'],
  theme: { extend: {} },
  plugins: [],
};
