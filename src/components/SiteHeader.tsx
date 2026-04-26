import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
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
  const phoneLinkClass =
    "inline-flex shrink-0 items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold tracking-tight text-white transition-colors hover:bg-red-700 sm:px-6 sm:text-base";

  return (
    <header className="border-b-2 border-white/15 bg-nav">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center justify-start gap-4">
            <Link to="/" className="block min-w-0 max-w-[min(100%,440px)] shrink no-underline">
              <img
                src={HEADING_IMAGE_SRC}
                alt={COMPANY_NAME}
                className="h-12 w-auto max-w-full object-contain object-left sm:h-14 md:h-16 lg:h-[4.5rem]"
                width={754}
                height={256}
                decoding="async"
              />
            </Link>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/15 pt-4 sm:flex-row sm:items-center sm:justify-between sm:border-t-0 sm:pt-0 lg:flex-1 lg:justify-end lg:gap-8">
            <div className="flex items-center gap-2 text-brand-light">
              <Phone className="h-5 w-5 shrink-0" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-wide sm:text-sm">
                24/7 Emergency Service
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 sm:justify-end lg:gap-8">
              <nav aria-label="Primary">
                <ul className="flex flex-wrap gap-5 text-sm font-semibold uppercase tracking-wide text-brand-light sm:gap-6">
                  {nav.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className="rounded-full border-2 border-transparent px-1 py-0.5 transition-colors hover:border-brand-light/40 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href={`tel:${PHONE_E164}`}
                className={phoneLinkClass}
              >
                <span className="sr-only">Emergency line </span>
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
