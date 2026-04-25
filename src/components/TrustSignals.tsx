import { Clock, Star } from "lucide-react";
import { Section } from "./Section";

export function TrustSignals() {
  return (
    <div id="trust" className="border-b-2 border-slate-200 bg-slate-50">
      <Section className="py-12 lg:py-16" aria-labelledby="trust-heading">
        <h2
          id="trust-heading"
          className="text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Trusted by homeowners
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          We’re building our public review profile — ask us for references on
          request.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex flex-1 flex-col items-center rounded-3xl border-2 border-slate-200 bg-brand-surface p-6 text-center">
            <div
              className="flex items-center gap-1 text-amber-500"
              aria-label="Five stars"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-8 w-8 fill-current"
                  strokeWidth={0}
                  aria-hidden
                />
              ))}
            </div>
            <p className="mt-3 font-slab text-lg font-semibold text-slate-900">
              Excellent
            </p>
            <p className="mt-1 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">127</span> reviews
              (placeholder)
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
              Independent feedback — coming soon
            </p>
          </div>
          <div className="flex flex-1 items-center gap-4 rounded-3xl border-2 border-brand bg-white p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-slate-900 bg-brand-light text-slate-900">
              <Clock className="h-8 w-8" strokeWidth={2} aria-hidden />
            </div>
            <div>
              <p className="font-slab text-lg font-bold uppercase tracking-wide text-brand">
                1-hour response
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Emergency call-outs: we aim to be on our way within one hour
                across our core Harrow & Brent coverage zone.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
