import { useState } from "react";
import { MapPin, Star } from "lucide-react";
import { BookingModal } from "./BookingModal";
import {
  HERO_BACKGROUND_SRC,
  QUOTE_EMAIL,
  SERVICE_AREA_LABEL,
  SLOGAN,
} from "../siteConfig";
import { Section } from "./Section";

/** Loose UK postcode check (covers common formats). */
function looksLikeUkPostcode(value: string): boolean {
  const normalized = value.trim().toUpperCase().replace(/\s+/g, " ");
  return /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/.test(normalized);
}

export function Hero() {
  const [postcode, setPostcode] = useState("");
  const [bookingHint, setBookingHint] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const quoteSubject = encodeURIComponent("Quote request");
  const quoteHref = `mailto:${QUOTE_EMAIL}?subject=${quoteSubject}`;

  function openBookingModal() {
    const trimmed = postcode.trim();
    if (!trimmed) {
      setBookingHint("Enter your postcode, then tap Book now.");
      return;
    }
    if (!looksLikeUkPostcode(trimmed)) {
      setBookingHint("Please enter a valid UK postcode (e.g. HA3 4AB).");
      return;
    }
    setBookingHint(null);
    setBookingOpen(true);
  }

  return (
    <div className="relative min-h-[min(85vh,52rem)] overflow-hidden border-b-2 border-slate-200">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_BACKGROUND_SRC})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/93 via-brand-surface/90 to-white/88"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-brand"
        aria-hidden
      />
      <Section
        className="relative z-10 py-14 lg:py-20"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-3xl">
          <p className="font-display text-lg font-semibold text-brand drop-shadow-sm">
            {SLOGAN}
          </p>
          <h1
            id="hero-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-900 drop-shadow-sm sm:text-4xl lg:text-5xl"
          >
            Professional Plumbing Solutions for {SERVICE_AREA_LABEL}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-slate-700 sm:text-lg">
            Fast response, tidy workmanship, and clear pricing. Domestic and
            light commercial work across Harrow, Brent and surrounding postcodes.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border-2 border-slate-200/90 bg-white/95 p-6 sm:p-8">
          <div
            className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6"
            aria-label="Postcode and booking"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-2 md:max-w-md">
              <label
                htmlFor="postcode"
                className="text-sm font-semibold uppercase tracking-wide text-black"
              >
                Enter postcode
              </label>
              <div className="relative">
                <MapPin
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand"
                  aria-hidden
                />
                <input
                  id="postcode"
                  name="postcode"
                  type="text"
                  autoComplete="postal-code"
                  placeholder="HA3 XXX"
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                    setBookingHint(null);
                  }}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-900 placeholder:text-slate-400 transition-colors focus:border-brand focus:outline-none"
                />
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={openBookingModal}
                className="inline-flex items-center justify-center rounded-full border-2 border-red-600 bg-red-600 px-8 py-3 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-red-700 hover:bg-red-700"
              >
                Book now
              </button>
              <a
                href={quoteHref}
                className="inline-flex items-center justify-center rounded-full border-2 border-brand bg-white px-8 py-3 text-center text-sm font-bold uppercase tracking-wide text-brand transition-colors hover:bg-brand hover:text-white"
              >
                Get a quote
              </a>
            </div>
          </div>
          {bookingHint ? (
            <p
              className="mt-5 rounded-2xl border-2 border-brand/40 bg-brand-surface p-4 text-center text-sm font-medium text-slate-800"
              role="status"
            >
              {bookingHint}
            </p>
          ) : null}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 drop-shadow-sm">
          <div
            className="flex items-center gap-0.5 text-amber-500"
            aria-label="Five out of five stars"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 fill-current sm:h-7 sm:w-7"
                strokeWidth={0}
                aria-hidden
              />
            ))}
          </div>
          <p className="text-sm font-semibold text-slate-800 sm:text-base">
            Excellent reviews from all our customers!
          </p>
        </div>
      </Section>

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialPostcode={postcode}
      />
    </div>
  );
}
