import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { QUOTE_EMAIL } from "../siteConfig";
import { Section } from "../components/Section";

const mailHref = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent("Non-plumbing enquiry")}`;

export function NonPlumbingContactPage() {
  return (
    <main
      id="main-content"
      className="min-h-[60vh] border-b-2 border-slate-200 bg-brand-surface"
    >
      <Section className="py-14 lg:py-20" aria-labelledby="business-contact-heading">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
        <h1
          id="business-contact-heading"
          className="mt-8 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          Need to get in touch about non-plumbing business?
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-slate-700">
          <p>
            This page is for anything that isn’t a customer plumbing job — for
            example accounts and invoicing, supplier or subcontractor enquiries,
            partnerships, press and media, careers, or general company
            administration.
          </p>
          <p>
            Please email us with a clear subject line and as much detail as you
            can. We’ll route your message to the right person and respond when
            we can.
          </p>
        </div>
        <p className="mt-8">
          <a
            href={mailHref}
            className="inline-flex rounded-sm border-2 border-brand bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand/90"
          >
            Email us about non-plumbing matters
          </a>
        </p>
        <p className="mt-4 text-sm text-slate-600">
          For leaks, emergencies, quotes, and bookings, use the phone number in
          the header or the booking options on the{" "}
          <Link to="/" className="font-semibold text-brand underline hover:no-underline">
            homepage
          </Link>
          .
        </p>
      </Section>
    </main>
  );
}
