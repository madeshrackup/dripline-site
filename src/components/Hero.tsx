import { useState } from "react";
import { ChevronDown, Crosshair, Search, Star } from "lucide-react";
import { BookingModal } from "./BookingModal";
import {
  BOOKING_SERVICE_OPTIONS,
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
  const [bookingService, setBookingService] = useState("");
  const [bookingHint, setBookingHint] = useState<string | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const quoteSubject = encodeURIComponent("Quote request");
  const quoteHref = `mailto:${QUOTE_EMAIL}?subject=${quoteSubject}`;

  function openBookingModal() {
    if (!bookingService.trim()) {
      setBookingHint("Choose what you need help with from the list.");
      return;
    }
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
      <Section
        className="relative z-10 py-14 lg:py-20"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-3xl">
          <p className="font-hero-headline text-lg font-bold italic text-brand drop-shadow-sm">
            {SLOGAN}
          </p>
          <h1
            id="hero-heading"
            className="font-hero-headline mt-3 text-3xl font-bold italic leading-tight tracking-tight text-slate-900 drop-shadow-sm sm:text-4xl lg:text-5xl"
          >
            Professional Plumbing Solutions for {SERVICE_AREA_LABEL}
          </h1>
          <p className="font-hero-lead mt-4 max-w-2xl text-base text-slate-700 sm:text-lg">
            Fast response, tidy workmanship, and clear pricing. Domestic and
            light commercial work across Harrow, Brent and surrounding postcodes.
          </p>
        </div>

        <div className="mt-10 max-w-4xl">
          <div
            className="overflow-hidden rounded-lg border-2 border-slate-900 bg-white shadow-md"
            role="search"
            aria-label="Service and postcode booking"
          >
            <div className="flex flex-col sm:flex-row sm:items-stretch">
              <div className="relative flex min-h-[3.25rem] min-w-0 flex-1 items-center gap-2 border-b border-slate-900 px-3 py-2 sm:border-b-0 sm:border-r sm:py-0 sm:pl-4 sm:pr-2">
                <Search
                  className="pointer-events-none h-5 w-5 shrink-0 text-slate-900"
                  strokeWidth={2.25}
                  aria-hidden
                />
                <label htmlFor="hero-booking-service" className="sr-only">
                  I need help with
                </label>
                <select
                  id="hero-booking-service"
                  name="booking-service"
                  value={bookingService}
                  onChange={(e) => {
                    setBookingService(e.target.value);
                    setBookingHint(null);
                  }}
                  className="font-hero-lead min-w-0 flex-1 cursor-pointer appearance-none border-0 bg-transparent py-2 pl-1 pr-9 text-sm text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-0 sm:text-base [&>option]:text-slate-900"
                >
                  <option value="">I need help with…</option>
                  {BOOKING_SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-900 sm:right-4"
                  strokeWidth={2.25}
                  aria-hidden
                />
              </div>

              <div className="flex min-h-[3.25rem] min-w-0 flex-1 items-center gap-2 px-2 py-2 sm:gap-3 sm:px-3 sm:py-2 sm:pr-2">
                <Crosshair
                  className="h-5 w-5 shrink-0 text-slate-900"
                  strokeWidth={2.25}
                  aria-hidden
                />
                <label htmlFor="postcode" className="sr-only">
                  Enter postcode
                </label>
                <input
                  id="postcode"
                  name="postcode"
                  type="text"
                  autoComplete="postal-code"
                  inputMode="text"
                  placeholder="Enter postcode"
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                    setBookingHint(null);
                  }}
                  className="font-hero-lead min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-0 sm:text-base"
                />
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="shrink-0 rounded-md bg-red-600 px-3 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700 sm:px-5 sm:text-sm"
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>

          {bookingHint ? (
            <p
              className="mt-3 font-sans text-left text-sm font-semibold text-red-600"
              role="alert"
            >
              {bookingHint}
            </p>
          ) : null}
          <div className="mt-3 flex justify-center sm:justify-end">
            <a
              href={quoteHref}
              className="text-sm font-semibold uppercase tracking-wide text-brand underline decoration-2 underline-offset-4 transition-colors hover:text-slate-900"
            >
              Get a quote
            </a>
          </div>
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
            Ratings from all across London!
          </p>
        </div>
      </Section>

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialPostcode={postcode}
        initialService={bookingService || undefined}
      />
    </div>
  );
}
