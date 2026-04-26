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
    "inline-flex shrink-0 items-center justify-center rounded-full bg-red-600 px-3 py-2 text-xs font-bold tracking-tight text-white transition-colors hover:bg-red-700 sm:px-5 sm:py-2.5 sm:text-sm md:px-6 md:text-base";

  return (
    <header className="border-b-2 border-white/15 bg-nav">
      <div className="mx-auto max-w-6xl px-3 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex flex-col gap-2 sm:gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex w-full min-w-0 flex-nowrap items-center justify-between gap-2 sm:gap-4 lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:justify-between lg:gap-6">
            <Link
              to="/"
              className="block min-w-0 shrink-0 max-w-[min(100%,46vw)] no-underline sm:max-w-[min(100%,440px)]"
            >
              <img
                src={HEADING_IMAGE_SRC}
                alt={COMPANY_NAME}
                className="h-9 w-auto max-w-full object-contain object-left sm:h-12 md:h-14 lg:h-[4rem]"
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

          <a
            href={`tel:${PHONE_E164}`}
            className={`${phoneLinkClass} hidden shrink-0 lg:inline-flex`}
          >
            <span className="sr-only">Emergency line </span>
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      <div
        className="mt-2 w-full border-t border-white/15 bg-red-600 py-2.5 sm:mt-4 sm:py-3 lg:hidden"
        role="region"
        aria-label="24/7 emergency call-outs"
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 text-center sm:px-6">
          <p className="font-nav text-sm font-bold leading-snug text-white sm:text-base">
            <span className="uppercase tracking-wide text-white/90">
              24/7 emergency call-outs
            </span>{" "}
            <a
              href={`tel:${PHONE_E164}`}
              className="font-bold text-white underline decoration-white/70 underline-offset-2 transition-colors hover:decoration-white"
            >
              {PHONE_DISPLAY}
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}
