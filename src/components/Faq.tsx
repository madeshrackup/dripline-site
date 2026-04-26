import { Minus, Plus } from "lucide-react";
import { PHONE_DISPLAY, PHONE_E164, SERVICE_AREA_SHORT } from "../siteConfig";
import { Section } from "./Section";

const faqs = [
  {
    q: "What areas do you cover?",
    a: `We’re focused on ${SERVICE_AREA_SHORT} and nearby North West London postcodes. Enter your postcode in the hero section for a quick coverage check, or call us to confirm.`,
  },
  {
    q: "Do you offer emergency call-outs?",
    a: `Yes — we provide 24/7 emergency service. For urgent leaks, bursts, or loss of water, call ${PHONE_DISPLAY} and we’ll prioritise getting someone to you. We aim for a one-hour response across our core coverage zone where traffic and access allow.`,
  },
  {
    q: "How do you price jobs?",
    a: "We’ll explain the scope before work starts: options may include a fixed quote for defined work, or transparent time-and-materials for diagnostics and smaller repairs. You’ll know how billing works before we proceed — no surprise add-ons.",
  },
  {
    q: "What should I do before you arrive?",
    a: "If it’s safe to do so, turn off the mains stopcock for water leaks and move valuables away from the affected area. Don’t dismantle fittings yourself — photos and a clear description of the problem help us bring the right parts.",
  },
  {
    q: "Are you insured?",
    a: "Yes — we carry appropriate public liability insurance for domestic and light commercial plumbing work. We can provide details on request before larger jobs.",
  },
  {
    q: "What work don’t you take on?",
    a: "We focus on plumbing, leaks, pipework, bathrooms, and general water systems. We do not advertise gas or boiler services on this site — if you need a Gas Safe engineer for regulated work, we’ll be honest and point you in the right direction.",
  },
] as const;

export function Faq() {
  return (
    <div id="faq" className="border-t border-slate-200/80 bg-[#F4F8FB]">
      <Section
        className="py-14 lg:py-20"
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Frequently asked questions
        </h2>

        <div className="mx-auto mt-12 max-w-3xl border-y border-slate-200">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group border-b border-slate-200 last:border-b-0 open:bg-white/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 pr-1 text-left marker:hidden [&::-webkit-details-marker]:hidden sm:py-6">
                <span className="font-hero-lead text-base font-medium text-slate-900 sm:text-lg">
                  {item.q}
                </span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center text-slate-900"
                  aria-hidden
                >
                  <Plus
                    strokeWidth={2}
                    className="h-5 w-5 group-open:hidden"
                  />
                  <Minus
                    strokeWidth={2}
                    className="hidden h-5 w-5 group-open:block"
                  />
                </span>
              </summary>
              <div className="font-hero-lead border-t border-slate-100 pb-6 pt-3 text-left text-sm leading-relaxed text-slate-600 sm:text-base">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
          <span className="font-hero-headline font-bold italic text-slate-600">
            Prefer to talk it through? Call{" "}
          </span>
          <a
            href={`tel:${PHONE_E164}`}
            className="font-sans font-semibold text-brand underline decoration-2 underline-offset-2 hover:text-slate-900"
          >
            {PHONE_DISPLAY}
          </a>
          <span className="font-hero-headline font-bold italic text-slate-600">.</span>
        </p>
      </Section>
    </div>
  );
}
