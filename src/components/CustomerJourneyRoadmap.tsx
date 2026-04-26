import type { LucideIcon } from "lucide-react";
import {
  CalendarCheck,
  ClipboardCheck,
  MessagesSquare,
  Phone,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";

type Step = {
  Icon: LucideIcon;
  title: string;
  tag: string;
  body: string;
};

const steps: Step[] = [
  {
    Icon: Phone,
    title: "You reach out",
    tag: "Book in",
    body: "Call, email, or the site — tell us what’s wrong and where you are.",
  },
  {
    Icon: MessagesSquare,
    title: "We call you back",
    tag: "Callback",
    body: "We confirm details, agree scope and timing in plain English — no jargon.",
  },
  {
    Icon: CalendarCheck,
    title: "Your slot",
    tag: "Diary",
    body: "You get a clear arrival window that fits around work, school, or tenants.",
  },
  {
    Icon: Truck,
    title: "We’re on the way",
    tag: "En route",
    body: "Van stocked, sheets down, and we aim to land when we said we would.",
  },
  {
    Icon: Wrench,
    title: "On site",
    tag: "The visit",
    body: "We protect floors, explain what we’re seeing, then crack on with the fix.",
  },
  {
    Icon: ClipboardCheck,
    title: "Job done",
    tag: "Sign-off",
    body: "Walkthrough together, space left tidy, and we don’t leave until you’re happy.",
  },
  {
    Icon: Sparkles,
    title: "Afterwards",
    tag: "After",
    body: "Invoice, guarantees where they apply, and we’re still at the end of the line if anything feels off.",
  },
];

type CustomerJourneyRoadmapProps = {
  /** Section `h2` id for accessible list labelling */
  ariaLabelledBy: string;
};

export function CustomerJourneyRoadmap({ ariaLabelledBy }: CustomerJourneyRoadmapProps) {
  return (
    <div className="w-full min-w-0">
      <div className="relative mt-6 lg:mt-8">
        {/* Desktop: 2-column grid; final step spans two columns (two “pill” widths) */}
        <ol
          className="hidden list-none lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-3 lg:pl-0 xl:gap-x-4 2xl:grid-cols-3 2xl:gap-y-3"
          aria-labelledby={ariaLabelledBy}
        >
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <li
                key={step.title}
                className={
                  isLast ? "min-w-0 lg:col-span-2 2xl:col-span-2" : "min-w-0"
                }
              >
                <div
                  className={`flex h-full min-w-0 gap-2.5 rounded-2xl border-2 border-brand/30 bg-gradient-to-br from-brand-surface via-white to-brand-surface/80 px-4 py-3 shadow-sm ring-1 ring-slate-900/[0.04] ${
                    isLast
                      ? "flex-col lg:flex-row lg:items-center lg:gap-5 lg:px-5 lg:py-4"
                      : "flex-col"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-sm ring-2 ring-brand/20">
                    <step.Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-xs font-bold uppercase tracking-wide text-brand">
                      {step.tag}
                    </p>
                    <p className="mt-1 text-base font-bold leading-snug text-slate-900">
                      {step.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.body}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Mobile / tablet: vertical timeline */}
        <div className="relative lg:hidden">
          <div
            className="pointer-events-none absolute left-[1.5rem] top-4 bottom-4 w-1 rounded-full bg-gradient-to-b from-brand via-brand/50 to-brand/25"
            aria-hidden
          />
          <ol
            className="relative m-0 list-none space-y-0 p-0"
            aria-labelledby={ariaLabelledBy}
          >
            {steps.map((step) => (
              <li key={step.title} className="relative flex gap-3.5 pb-9 last:pb-0">
                <div className="relative z-[1] flex shrink-0 justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-brand text-white shadow-md ring-2 ring-brand/25">
                    <step.Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                  </div>
                </div>
                <div className="min-w-0 flex-1 rounded-2xl border-2 border-brand/25 bg-gradient-to-br from-brand-surface/95 to-white px-4 py-3 shadow-sm">
                  <p className="font-display text-xs font-bold uppercase tracking-wide text-brand">
                    {step.tag}
                  </p>
                  <p className="mt-1 text-base font-bold text-slate-900">{step.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
