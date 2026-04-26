import { CustomerJourneyRoadmap } from "./CustomerJourneyRoadmap";
import { Section } from "./Section";

const JOURNEY_HEADING_ID = "journey-section-heading";

export function CustomerJourneySection() {
  return (
    <div id="your-journey" className="border-b-2 border-slate-200 bg-slate-50">
      <Section className="py-14 lg:py-20" aria-labelledby={JOURNEY_HEADING_ID}>
        <h2
          id={JOURNEY_HEADING_ID}
          className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-left"
        >
          Your journey with us
        </h2>
        <CustomerJourneyRoadmap ariaLabelledBy={JOURNEY_HEADING_ID} />
      </Section>
    </div>
  );
}
