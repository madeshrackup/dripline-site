import { Bath, Cylinder, Droplets, Wrench } from "lucide-react";
import { Section } from "./Section";

const services = [
  {
    title: "Leak detection",
    description:
      "Trace hidden leaks, damp patches, and meter runs before they cause costly damage.",
    icon: Droplets,
  },
  {
    title: "Pipe repairs",
    description:
      "Burst pipes, corrosion, low pressure, and noisy systems — diagnosed and fixed properly.",
    icon: Cylinder,
  },
  {
    title: "Bathroom installations",
    description:
      "Full refits and upgrades with clean finishes, coordinated with your schedule.",
    icon: Bath,
  },
  {
    title: "General plumbing",
    description:
      "Taps, toilets, radiators, waste runs, and maintenance — day-to-day reliability.",
    icon: Wrench,
  },
] as const;

export function ServiceGrid() {
  return (
    <div id="services" className="bg-brand-surface">
      <Section className="py-14 lg:py-20" aria-labelledby="services-heading">
        <h2
          id="services-heading"
          className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          What we do
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:mt-10">
          {services.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="flex flex-col rounded-3xl border-2 border-slate-200 bg-white p-6 transition-colors hover:border-brand"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-slate-900 bg-brand-light text-slate-900">
                <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
