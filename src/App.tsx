import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { PromoBanner } from "./components/PromoBanner";
import { ServiceGrid } from "./components/ServiceGrid";
import { SiteHeader } from "./components/SiteHeader";
import { TrustSignals } from "./components/TrustSignals";

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-slate-900 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <PromoBanner />
      <main id="main-content">
        <Hero />
        <TrustSignals />
        <ServiceGrid />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
