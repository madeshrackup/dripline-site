import { CustomerJourneySection } from "../components/CustomerJourneySection";
import { Faq } from "../components/Faq";
import { Hero } from "../components/Hero";
import { InstagramFeed } from "../components/InstagramFeed";
import { ServiceGrid } from "../components/ServiceGrid";
import { TestimonialsSection } from "../components/TestimonialsSection";

export function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <ServiceGrid />
      <TestimonialsSection />
      <CustomerJourneySection />
      <InstagramFeed />
      <Faq />
    </main>
  );
}
