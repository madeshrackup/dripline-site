import {
  COMPANY_NAME,
  PHONE_DISPLAY,
  PHONE_E164,
  QUOTE_EMAIL,
  SERVICE_AREA_SHORT,
  SLOGAN,
} from "../siteConfig";

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t-2 border-slate-900 bg-slate-900 text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="font-hero-headline text-xl font-bold italic text-brand-light">
          {SLOGAN}
        </p>
        <p className="mt-2 text-2xl font-bold tracking-tight">{COMPANY_NAME}</p>
        <p className="mt-1 text-brand-light">{SERVICE_AREA_SHORT}</p>
        <div className="mt-8 flex flex-col gap-6 border-t-2 border-slate-700 pt-8 sm:flex-row sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Call us
            </p>
            <a
              href={`tel:${PHONE_E164}`}
              className="mt-1 inline-block text-xl font-bold text-white underline decoration-2 underline-offset-4 hover:text-brand-light"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Email
            </p>
            <a
              href={`mailto:${QUOTE_EMAIL}`}
              className="mt-1 inline-block font-medium text-brand-light underline decoration-1 underline-offset-2 hover:text-white"
            >
              {QUOTE_EMAIL}
            </a>
          </div>
        </div>
        <p className="mt-10 text-xs text-slate-500">
          © {new Date().getFullYear()} {COMPANY_NAME}. Registered in England and
          Wales (update as applicable). Emergency and scheduled plumbing
          services for domestic customers in {SERVICE_AREA_SHORT}.
        </p>
      </div>
    </footer>
  );
}
