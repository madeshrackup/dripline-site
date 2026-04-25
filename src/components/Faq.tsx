import { ChevronDown } from "lucide-react";
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
    <div id="faq" className="border-t-2 border-slate-200 bg-white">
      <Section
        className="py-14 text-center lg:py-20"
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Frequently asked questions
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-slate-600">
          Straight answers on coverage, emergencies, and how we work. Call{" "}
          <a
            href={`tel:${PHONE_E164}`}
            className="font-semibold text-brand underline decoration-2 underline-offset-2 hover:text-slate-900"
          >
            {PHONE_DISPLAY}
          </a>{" "}
          if you’d rather speak to someone.
        </p>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border-2 border-slate-200 bg-brand-surface text-center open:border-brand open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-center gap-3 px-5 py-4 font-semibold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="max-w-prose">{item.q}</span>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-brand transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="mx-auto max-w-2xl border-t-2 border-slate-200 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-600 group-open:border-slate-100">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </Section>
    </div>
  );
}
