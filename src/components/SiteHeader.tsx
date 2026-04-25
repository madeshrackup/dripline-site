import { Phone } from "lucide-react";
import {
  COMPANY_NAME,
  HEADING_IMAGE_SRC,
  PHONE_DISPLAY,
  PHONE_E164,
} from "../siteConfig";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#trust", label: "Why us" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const phoneLinkClass =
    "inline-flex shrink-0 items-center justify-center rounded-full bg-red-600 px-5 py-2.5 text-sm font-bold tracking-tight text-white transition-colors hover:bg-red-700 sm:px-6 sm:text-base";

  return (
    <header className="border-b-2 border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center justify-between gap-4">
            <a href="#" className="block shrink-0 no-underline">
              <img
                src={HEADING_IMAGE_SRC}
                alt={COMPANY_NAME}
                className="h-10 w-auto max-w-[min(100%,240px)] object-contain object-left sm:h-12 md:h-14"
                width={280}
                height={56}
                decoding="async"
              />
            </a>
            <a
              href={`tel:${PHONE_E164}`}
              className={`${phoneLinkClass} lg:hidden`}
            >
              <span className="sr-only">Emergency line </span>
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-800 pt-4 sm:flex-row sm:items-center sm:justify-between sm:border-t-0 sm:pt-0 lg:flex-1 lg:justify-end lg:gap-8">
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
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="rounded-full border-2 border-transparent px-1 py-0.5 transition-colors hover:border-brand-light/40 hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href={`tel:${PHONE_E164}`}
                className={`${phoneLinkClass} hidden lg:inline-flex`}
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
