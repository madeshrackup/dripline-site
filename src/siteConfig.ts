/** Single source of truth for site copy and contact links. */

export const COMPANY_NAME = "Dripline Plumbers";

/** Header wordmark — /nav-wordmark.png. Favicon: index.html `/logo.jpg?v=` (increment after icon swap). */
export const HEADING_IMAGE_SRC = "/nav-wordmark.png";

/** Hero background (London) — replace file in /public to swap image */
export const HERO_BACKGROUND_SRC = "/hero-london.jpg";

/** Featured on-site clip (e.g. .mov in /public/media) — re-encode to MP4 for smaller files if load feels slow */
export const TESTIMONIAL_VIDEO_SRC = "/media/homeowner-story.mov";

/** Headline / SEO-friendly area label */
export const SERVICE_AREA_LABEL = "Harrow, Brent & North West London";

/** Shorter label for tight UI */
export const SERVICE_AREA_SHORT = "Harrow & Brent, London";

export const PHONE_DISPLAY = "07403 767600";

/** E.164 for tel: links (UK mobile) */
export const PHONE_E164 = "+447403767600";

export const SLOGAN = "Spot a drip? Call our line.";

/** Prefilled quote email — replace with your real enquiries address when ready */
export const QUOTE_EMAIL = "quotes@driplineplumbers.co.uk";

/** Form POSTs here (Vercel `api/booking` / Netlify `booking` function); email goes to info@driplineplumbers.co.uk unless BOOKING_TO_EMAIL is set. */
export const BOOKING_API_PATH = "/api/booking";

/** Booking modal service dropdown — align with ServiceGrid + catch-all */
export const BOOKING_SERVICE_OPTIONS = [
  "Leak detection",
  "Pipe repairs",
  "Bathroom installations",
  "General plumbing",
  "Emergency / not sure",
] as const;

/** Flash promo under the header — edit or clear PROMO_ENABLED to hide */
export const PROMO_ENABLED = true;

export const PROMO_HEADLINE =
  "Under 1 hour on site? You won’t pay more than £79 labour.";

/** Shown smaller next to headline; keep aligned with how you actually bill */
export const PROMO_FINE_PRINT =
  "Materials & parts extra. Fair-use & access rules apply — we’ll confirm before we start.";

/** Instagram @ handle (no @) */
export const INSTAGRAM_USERNAME = "driplineplumbers";

export const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/driplineplumbers/";

function normalizeQuotedEnv(value: string | undefined): string {
  if (!value) return "";
  let s = value.trim();
  if (s.length >= 2) {
    const q = s[0];
    if ((q === '"' || q === "'") && s.at(-1) === q) {
      s = s.slice(1, -1).trim();
    }
  }
  return s;
}

/** If VITE_INSTAGRAM_FEED_API is only origin (path `/`), append the feed route. */
function resolveInstagramFeedApiUrl(configured: string): string {
  if (!configured || configured.startsWith("/")) return configured;
  try {
    const u = new URL(configured);
    if (u.pathname === "/" || u.pathname === "") {
      u.pathname = "/api/instagram-feed";
    }
    return u.toString();
  } catch {
    return configured;
  }
}

/**
 * Client fetches this URL (never put Instagram tokens here).
 * Production defaults to same-origin `/api/instagram-feed` (Vercel `api/` route; Netlify `_redirects`).
 * VITE_INSTAGRAM_FEED_API may be your site origin only — `/api/instagram-feed` is appended automatically.
 */
const instagramFeedFromEnv = resolveInstagramFeedApiUrl(
  normalizeQuotedEnv(
    import.meta.env.VITE_INSTAGRAM_FEED_API as string | undefined,
  ),
);

export const INSTAGRAM_FEED_API_URL: string =
  instagramFeedFromEnv ||
  (import.meta.env.PROD ? "/api/instagram-feed" : "");
