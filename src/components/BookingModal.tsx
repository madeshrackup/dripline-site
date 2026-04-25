import type { FormEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  BOOKING_SERVICE_OPTIONS,
  PHONE_DISPLAY,
  PHONE_E164,
  QUOTE_EMAIL,
} from "../siteConfig";

type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  initialPostcode: string;
};

function normalizeUkPostcode(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, " ");
}

export function BookingModal({
  open,
  onClose,
  initialPostcode,
}: BookingModalProps) {
  const titleId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setPostcode(normalizeUkPostcode(initialPostcode));
      setFormError(null);
      document.body.style.overflow = "hidden";
      const t = window.setTimeout(() => nameRef.current?.focus(), 50);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
    return undefined;
  }, [open, initialPostcode]);

  useEffect(() => {
    if (!open) {
      setName("");
      setPhone("");
      setEmail("");
      setService("");
      setDetails("");
      setFormError(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!phone.trim()) {
      setFormError("Please enter your contact number.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!service) {
      setFormError("Please select a service.");
      return;
    }
    const body = encodeURIComponent(
      [
        `Name: ${name.trim()}`,
        `Phone: ${phone.trim()}`,
        `Email: ${email.trim()}`,
        `Postcode: ${postcode.trim() || "—"}`,
        `Service: ${service}`,
        "",
        "Details:",
        details.trim() || "—",
      ].join("\n"),
    );
    const subject = encodeURIComponent("Booking request — Dripline Plumbers");
    window.location.href = `mailto:${QUOTE_EMAIL}?subject=${subject}&body=${body}`;
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/70"
        aria-label="Close booking form"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(92vh,860px)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border-2 border-slate-800 bg-white shadow-none"
      >
        <div className="relative shrink-0 bg-brand px-6 pb-6 pt-8 text-center text-white sm:px-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full border-2 border-white/40 p-2 text-white transition-colors hover:bg-white/15"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2.5} aria-hidden />
          </button>
          <h2
            id={titleId}
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Make a booking
          </h2>
          <p className="mt-2 text-sm text-brand-light sm:text-base">
            Prefer the phone? Call us and we’ll book you in straight away:
          </p>
          <a
            href={`tel:${PHONE_E164}`}
            className="mt-3 inline-block text-3xl font-bold tracking-tight text-white underline decoration-2 decoration-brand-light underline-offset-4 hover:text-brand-light sm:text-4xl"
          >
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-10 sm:py-8">
          <p className="text-center text-sm text-slate-600 sm:text-base">
            Can’t call right now? Send a booking request using the form below —
            we’ll confirm by phone or email.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {formError ? (
              <p
                className="rounded-2xl border-2 border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-900"
                role="alert"
              >
                {formError}
              </p>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2 text-left">
                <label
                  htmlFor="booking-name"
                  className="text-xs font-bold uppercase tracking-wide text-slate-800"
                >
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  ref={nameRef}
                  id="booking-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="First name, surname"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFormError(null);
                  }}
                  className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label
                  htmlFor="booking-phone"
                  className="text-xs font-bold uppercase tracking-wide text-slate-800"
                >
                  Contact number <span className="text-red-600">*</span>
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="07400 123456"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setFormError(null);
                  }}
                  className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label
                  htmlFor="booking-email"
                  className="text-xs font-bold uppercase tracking-wide text-slate-800"
                >
                  Email address <span className="text-red-600">*</span>
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFormError(null);
                  }}
                  className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label
                  htmlFor="booking-postcode"
                  className="text-xs font-bold uppercase tracking-wide text-slate-800"
                >
                  Postcode
                </label>
                <input
                  id="booking-postcode"
                  name="postcode"
                  type="text"
                  autoComplete="postal-code"
                  placeholder="e.g. HA1 2XY"
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                    setFormError(null);
                  }}
                  className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <label
                htmlFor="booking-service"
                className="text-xs font-bold uppercase tracking-wide text-slate-800"
              >
                Service <span className="text-red-600">*</span>
              </label>
              <select
                id="booking-service"
                name="service"
                value={service}
                onChange={(e) => {
                  setService(e.target.value);
                  setFormError(null);
                }}
                className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-brand focus:outline-none"
              >
                <option value="">Select a service</option>
                {BOOKING_SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <label
                htmlFor="booking-details"
                className="text-xs font-bold uppercase tracking-wide text-slate-800"
              >
                Details about the issue
              </label>
              <textarea
                id="booking-details"
                name="details"
                rows={4}
                placeholder="What’s going on, when it started, and anything you’ve already tried…"
                value={details}
                onChange={(e) => {
                  setDetails(e.target.value);
                  setFormError(null);
                }}
                className="resize-y rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border-2 border-slate-300 bg-white px-8 py-3 text-sm font-bold uppercase tracking-wide text-slate-800 transition-colors hover:border-slate-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full border-2 border-red-600 bg-red-600 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-red-700 hover:bg-red-700"
              >
                Send booking request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
