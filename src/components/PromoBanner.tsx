import { Tag } from "lucide-react";
import { PHONE_E164, PROMO_ENABLED, PROMO_FINE_PRINT, PROMO_HEADLINE } from "../siteConfig";

export function PromoBanner() {
  if (!PROMO_ENABLED) return null;

  return (
    <aside
      aria-label="Current promotion"
      className="bg-brand text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-2.5 text-center sm:flex-row sm:justify-center sm:gap-4 sm:py-3">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-3">
          <Tag
            className="h-5 w-5 shrink-0 text-brand-light"
            strokeWidth={2.5}
            aria-hidden
          />
          <div>
            <p className="text-sm font-bold leading-snug sm:text-base">
              <span className="uppercase tracking-wide text-brand-light">
                Flash offer —{" "}
              </span>
              {PROMO_HEADLINE}
            </p>
            <p className="mt-0.5 text-xs font-medium leading-snug text-white/90 sm:text-sm">
              {PROMO_FINE_PRINT}{" "}
              <a
                href={`tel:${PHONE_E164}`}
                className="font-bold text-white underline-offset-2 hover:text-brand-light hover:underline hover:decoration-2 hover:decoration-white"
              >
                Call to lock it in
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
