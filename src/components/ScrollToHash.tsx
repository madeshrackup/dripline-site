import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router client navigations to `/#faq`, `/#services`, etc. do not always
 * trigger native hash scrolling — scroll the target into view after route + paint.
 */
export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash || hash === "#") return;
    const id = hash.slice(1);
    let cancelled = false;

    function tryScroll(): boolean {
      const el = document.getElementById(id);
      if (!el || cancelled) return false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }

    if (tryScroll()) return () => {
      cancelled = true;
    };

    const t = window.setTimeout(() => {
      if (!cancelled) tryScroll();
    }, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [pathname, hash]);

  return null;
}
