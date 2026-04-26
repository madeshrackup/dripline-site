import { Faq } from "../components/Faq";
import { Hero } from "../components/Hero";
import { InstagramFeed } from "../components/InstagramFeed";
import { ServiceGrid } from "../components/ServiceGrid";

export function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <InstagramFeed />
      <ServiceGrid />
      <Faq />
    </main>
  );
}
