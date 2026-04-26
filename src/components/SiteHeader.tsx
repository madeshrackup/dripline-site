import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  COMPANY_NAME,
  HEADING_IMAGE_SRC,
  PHONE_DISPLAY,
  PHONE_E164,
} from "../siteConfig";

const nav = [
  { to: "/#services", label: "Services" },
  { to: "/#faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const phoneLinkClass =
    "inline-flex shrink-0 items-center justify-center rounded-full bg-red-600 px-3 py-2 text-xs font-bold tracking-tight text-white transition-colors hover:bg-red-700 sm:px-5 sm:py-2.5 sm:text-sm md:px-6 md:text-base";

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash, location.key]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="border-b-2 border-white/15 bg-nav">
      <div className="relative w-full">
        <div className="mx-auto max-w-6xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="relative flex min-h-[4.25rem] items-center justify-center pr-14 sm:min-h-[4.5rem] sm:pr-16 lg:hidden">
            <Link
              to="/"
              className="flex max-w-[min(100%,calc(100vw-5.5rem))] justify-center no-underline"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img
                src={HEADING_IMAGE_SRC}
                alt={COMPANY_NAME}
                className="h-16 w-auto max-h-[4.75rem] max-w-full object-contain object-center sm:h-[4.25rem] sm:max-h-[5rem]"
                width={754}
                height={256}
                decoding="async"
              />
            </Link>
            <button
              type="button"
              className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg border-2 border-white/20 text-brand-light transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 shrink-0" strokeWidth={2.25} aria-hidden />
              ) : (
                <Menu className="h-6 w-6 shrink-0" strokeWidth={2.25} aria-hidden />
              )}
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="flex min-w-0 flex-1 items-center justify-between gap-6">
              <Link
                to="/"
                className="block min-w-0 shrink-0 max-w-[min(100%,440px)] no-underline"
              >
                <img
                  src={HEADING_IMAGE_SRC}
                  alt={COMPANY_NAME}
                  className="h-[4rem] w-auto max-w-full object-contain object-left"
                  width={754}
                  height={256}
                  decoding="async"
                />
              </Link>

              <nav aria-label="Primary" className="font-nav min-w-0 shrink-0">
                <ul className="flex flex-nowrap items-center justify-end gap-2.5 text-sm font-semibold uppercase tracking-wide text-brand-light sm:gap-4 sm:text-base md:gap-5 md:text-lg">
                  {nav.map((item) => (
                    <li key={item.to} className="shrink-0">
                      <Link
                        to={item.to}
                        className="rounded-full border-2 border-transparent px-0.5 py-0.5 transition-colors hover:border-brand-light/40 hover:text-white sm:px-1"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <a href={`tel:${PHONE_E164}`} className={`${phoneLinkClass} shrink-0`}>
              <span className="sr-only">Emergency line </span>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {mobileMenuOpen ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-[60] bg-slate-950/55 lg:hidden"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              id="mobile-nav-menu"
              className="absolute left-0 right-0 top-full z-[70] border-t border-white/15 bg-nav shadow-xl lg:hidden"
            >
              <nav aria-label="Menu" className="mx-auto max-w-6xl px-4 py-3 sm:px-6 sm:py-4">
                <ul className="flex flex-col gap-1 font-nav">
                  {nav.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="block rounded-lg px-3 py-3 text-center text-base font-semibold uppercase tracking-wide text-brand-light transition-colors hover:bg-white/10 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        ) : null}
      </div>

      <div
        className="mt-2 w-full border-t border-white/15 bg-red-600 py-2.5 sm:mt-4 sm:py-3 lg:hidden"
        role="region"
        aria-label="24/7 emergency call-outs"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 text-center sm:gap-1.5 sm:px-6">
          <p className="font-nav text-sm font-bold uppercase leading-snug tracking-wide text-white/90 sm:text-base">
            24/7 emergency call-outs
          </p>
          <a
            href={`tel:${PHONE_E164}`}
            className="font-nav whitespace-nowrap text-base font-bold text-white underline decoration-white/70 underline-offset-2 transition-colors hover:decoration-white sm:text-lg"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </header>
  );
}
