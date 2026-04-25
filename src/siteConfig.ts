/** Single source of truth for site copy and contact links. */

export const COMPANY_NAME = "Dripline Plumbers";

/** Header wordmark (PNG lockup) */
export const HEADING_IMAGE_SRC = "/heading-brand.png";

/** Hero background (London) — replace file in /public to swap image */
export const HERO_BACKGROUND_SRC = "/hero-london.jpg";

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
