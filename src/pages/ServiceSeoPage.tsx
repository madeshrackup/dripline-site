import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import seoConfig from "../config/seoConfig.json";

const servicePages = seoConfig.servicePages;
const isServiceSlug = (s: string): s is keyof typeof servicePages => s in servicePages;

const PHONE = "tel:+447403767600";
const PHONE_LABEL = "07403 767600";

export function ServiceSeoPage() {
  const { serviceSlug = "" } = useParams<{
    serviceSlug: string;
  }>();

  if (!isServiceSlug(serviceSlug)) {
    return <Navigate to="/" replace />;
  }

  const data = servicePages[serviceSlug];

  useEffect(() => {
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";

    document.title = data.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", data.description);
    }
    return () => {
      document.title = prevTitle;
      if (meta) {
        meta.setAttribute("content", prevDesc);
      }
    };
  }, [data.description, data.title, serviceSlug]);

  return (
    <main id="main-content" className="bg-brand-surface">
      <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-sm font-semibold text-slate-500">Services</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {data.h1}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600">{data.lede}</p>
        <p className="mt-6 text-sm text-slate-500">
          Areas we cover: Harrow, Brent and the wider North West London zone. Questions?{" "}
          <Link to="/#faq" className="font-medium text-slate-900 underline">
            See FAQs
          </Link>{" "}
          or <Link to="/contact" className="font-medium text-slate-900 underline">get in touch</Link>.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={PHONE}
            className="inline-flex min-h-11 min-w-44 items-center justify-center rounded-full border-2 border-slate-900 bg-brand py-2.5 px-6 text-sm font-bold text-slate-900 shadow-[3px_3px_0_0_rgba(15,23,42,1)]"
          >
            Call {PHONE_LABEL}
          </a>
          <Link
            to="/#postcode"
            className="inline-flex min-h-11 min-w-44 items-center justify-center rounded-full border-2 border-slate-900 bg-white py-2.5 px-6 text-sm font-bold text-slate-900"
          >
            Book a visit
          </Link>
        </div>
        <p className="mt-8 text-sm text-slate-500">
          <Link
            to="/"
            className="font-medium text-slate-800 underline decoration-slate-300 decoration-1 underline-offset-2 hover:decoration-brand"
          >
            &larr; Back to home
          </Link>
        </p>
      </article>
    </main>
  );
}
