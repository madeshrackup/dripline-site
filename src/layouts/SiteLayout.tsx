import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { PromoBanner } from "../components/PromoBanner";
import { ScrollToHash } from "../components/ScrollToHash";
import { SiteHeader } from "../components/SiteHeader";

export function SiteLayout() {
  return (
    <>
      <ScrollToHash />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-slate-900 focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900"
      >
        Skip to main content
      </a>
      <SiteHeader />
      <PromoBanner />
      <Outlet />
      <Footer />
    </>
  );
}
