import { Star } from "lucide-react";
import { SERVICE_AREA_LABEL, TESTIMONIAL_VIDEO_SRC } from "../siteConfig";
import { Section } from "./Section";

function FiveStars() {
  return (
    <span
      className="flex shrink-0 items-center gap-0.5 text-amber-500"
      aria-label="Five out of five stars"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" strokeWidth={0} aria-hidden />
      ))}
    </span>
  );
}

export function TestimonialsSection() {
  return (
    <div id="testimonials" className="border-b-2 border-slate-200 bg-white">
      <Section className="py-10 lg:py-12" aria-labelledby="testimonials-heading">
        {/*
          Mobile: DOM order = heading → video → reviews (heading above clip).
          lg+: CSS grid — video column 1 spans both rows; heading row 1 col 2; reviews row 2 col 2.
        */}
        <div className="flex flex-col gap-5 sm:gap-6 lg:grid lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-x-6 lg:gap-y-4 xl:gap-x-8">
          <h2
            id="testimonials-heading"
            className="text-balance text-center text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:col-start-2 lg:row-start-1 lg:self-start lg:pt-0.5 lg:text-left lg:text-[clamp(2.25rem,4vw+1.5rem,3.5rem)] xl:text-[clamp(2.5rem,4.5vw+1rem,3.75rem)]"
          >
            Straight from site!
          </h2>

          {/* Video — left on large screens, portrait / vertical */}
          <div className="mx-auto flex w-full max-w-[min(100%,320px)] shrink-0 justify-center lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-[min(100%,min(360px,38vw))] lg:justify-start">
            <video
              className="block h-auto max-h-[min(68dvh,620px)] w-auto max-w-full rounded-2xl border-2 border-slate-200 shadow-lg ring-1 ring-slate-900/5"
              controls
              playsInline
              preload="metadata"
              aria-label={`Short on-site clip from work in ${SERVICE_AREA_LABEL}`}
            >
              <source src={TESTIMONIAL_VIDEO_SRC} type="video/quicktime" />
            </video>
          </div>

          <div
            className="flex min-w-0 flex-col gap-3 sm:gap-3.5 lg:col-start-2 lg:row-start-2"
            role="group"
            aria-label="Customer reviews"
          >
              <figure className="rounded-2xl border-2 border-slate-200/90 bg-slate-50/90 px-4 py-3.5 shadow-sm ring-1 ring-slate-900/[0.04] sm:px-5 sm:py-4">
                <blockquote className="text-pretty text-sm leading-snug text-slate-800 sm:text-base sm:leading-relaxed">
                  <p>
                    &ldquo;Mert was really professional. I needed an emergency fix in my
                    kitchen and the job was done incredibly quick at an incredible price! Look
                    no further than the Dripline team.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm">
                  <FiveStars />
                  <span>— Daniel, Greenford</span>
                </figcaption>
              </figure>

              <figure className="rounded-2xl border-2 border-slate-200/90 bg-slate-50/90 px-4 py-3.5 shadow-sm ring-1 ring-slate-900/[0.04] sm:px-5 sm:py-4">
                <blockquote className="text-pretty text-sm leading-snug text-slate-800 sm:text-base sm:leading-relaxed">
                  <p>
                    &ldquo;I was worried about a leaking radiator ruining my new floors. Mert
                    arrived within the hour, explained exactly what was wrong, and fixed it
                    without any fuss. It&apos;s rare to find a plumber who is this honest and
                    reliable. 10/10 service.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm">
                  <FiveStars />
                  <span>— Sarah, Ealing</span>
                </figcaption>
              </figure>

              <figure className="rounded-2xl border-2 border-slate-200/90 bg-slate-50/90 px-4 py-3.5 shadow-sm ring-1 ring-slate-900/[0.04] sm:px-5 sm:py-4">
                <blockquote className="text-pretty text-sm leading-snug text-slate-800 sm:text-base sm:leading-relaxed">
                  <p>
                    &ldquo;The only plumber I&apos;ll be calling from now on. He was incredibly
                    tidy, wore shoe covers, and didn&apos;t leave a single drop of water behind
                    after fixing our bathroom tap. Great communication and a top-tier job at a
                    great price.&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm">
                  <FiveStars />
                  <span>— Priya, Perivale</span>
                </figcaption>
              </figure>
          </div>
        </div>
      </Section>
    </div>
  );
}
