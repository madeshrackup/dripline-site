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
  /** When set to a known option, pre-selects Service in the form */
  initialService?: string;
};

type FieldKey = "name" | "phone" | "email" | "service";

type FieldErrors = Partial<Record<FieldKey, string>>;

/** Shown in the alert strip when any field fails validation */
const FORM_SUMMARY_MESSAGE =
  "There was a problem, have a look at the fields below.";

function normalizeUkPostcode(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, " ");
}

function isValidUkMobile(value: string): boolean {
  const d = value.replace(/[\s-]/g, "");
  return /^07\d{9}$/.test(d) || /^\+447\d{9}$/.test(d);
}

function isBookingServiceOption(value: string): value is (typeof BOOKING_SERVICE_OPTIONS)[number] {
  return (BOOKING_SERVICE_OPTIONS as readonly string[]).includes(value);
}

export function BookingModal({
  open,
  onClose,
  initialPostcode,
  initialService,
}: BookingModalProps) {
  const titleId = useId();
  const nameId = useId();
  const phoneId = useId();
  const emailId = useId();
  const serviceId = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [postcode, setPostcode] = useState("");
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");
  const [summaryError, setSummaryError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function clearFieldError(key: FieldKey) {
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  useEffect(() => {
    if (Object.keys(fieldErrors).length === 0) setSummaryError(false);
  }, [fieldErrors]);

  useEffect(() => {
    if (open) {
      setPostcode(normalizeUkPostcode(initialPostcode));
      setService(
        initialService && isBookingServiceOption(initialService) ? initialService : "",
      );
      setSummaryError(false);
      setFieldErrors({});
      document.body.style.overflow = "hidden";
      const t = window.setTimeout(() => nameRef.current?.focus(), 50);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
    return undefined;
  }, [open, initialPostcode, initialService]);

  useEffect(() => {
    if (!open) {
      setName("");
      setPhone("");
      setEmail("");
      setService("");
      setDetails("");
      setSummaryError(false);
      setFieldErrors({});
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
    const next: FieldErrors = {};

    if (!name.trim()) next.name = "Enter your full name.";
    if (!phone.trim()) {
      next.phone = "Enter your contact number.";
    } else if (!isValidUkMobile(phone)) {
      next.phone = "Use a valid UK mobile (e.g. 07403 767600).";
    }
    if (!email.trim()) {
      next.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = "Use a valid email address.";
    }
    if (!service) next.service = "Select a service from the list.";

    if (Object.keys(next).length > 0) {
      setFieldErrors(next);
      setSummaryError(true);
      return;
    }

    setFieldErrors({});
    setSummaryError(false);

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

  const inputError = (key: FieldKey) =>
    fieldErrors[key]
      ? "border border-red-500 focus:border-red-600"
      : "border border-slate-200 focus:border-brand";

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/70 focus:outline-none"
        aria-label="Close booking form"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="booking-modal relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-5xl flex-col overflow-hidden rounded border-0 bg-white shadow-none outline-none ring-0"
      >
        <div className="relative shrink-0 bg-brand px-6 pb-6 pt-8 text-center text-white sm:px-12">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded border border-white/50 p-2 text-white transition-colors hover:bg-white/15"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={2.5} aria-hidden />
          </button>
          <h2
            id={titleId}
            className="font-sans text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Make a booking
          </h2>
          <p className="mt-2 font-sans text-sm text-brand-light sm:text-base">
            Prefer the phone? Call us and we’ll book you in straight away:
          </p>
          <a
            href={`tel:${PHONE_E164}`}
            className="mt-3 inline-block font-sans text-3xl font-bold tracking-tight text-white no-underline transition-opacity hover:opacity-90 hover:text-brand-light sm:text-4xl"
          >
            {PHONE_DISPLAY}
          </a>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-12 sm:py-8">
          <p className="text-center font-sans text-sm text-slate-600 sm:text-base">
            Can’t call right now? Send a booking request using the form below —
            we’ll confirm by phone or email.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            {summaryError ? (
              <p
                className="rounded border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600"
                role="alert"
              >
                {FORM_SUMMARY_MESSAGE}
              </p>
            ) : null}

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5 text-left">
                <label
                  htmlFor={nameId}
                  className="text-xs font-bold uppercase tracking-wide text-slate-800"
                >
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  ref={nameRef}
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="First name, surname"
                  value={name}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? `${nameId}-err` : undefined}
                  onChange={(e) => {
                    setName(e.target.value);
                    clearFieldError("name");
                  }}
                  className={`rounded bg-white px-4 py-3 font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none ${inputError("name")}`}
                />
                {fieldErrors.name ? (
                  <p
                    id={`${nameId}-err`}
                    className="text-sm font-semibold text-red-600"
                  >
                    {fieldErrors.name}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label
                  htmlFor={phoneId}
                  className="text-xs font-bold uppercase tracking-wide text-slate-800"
                >
                  Contact number <span className="text-red-600">*</span>
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="07400 123456"
                  value={phone}
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? `${phoneId}-err` : undefined}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    clearFieldError("phone");
                  }}
                  className={`rounded bg-white px-4 py-3 font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none ${inputError("phone")}`}
                />
                {fieldErrors.phone ? (
                  <p
                    id={`${phoneId}-err`}
                    className="text-sm font-semibold text-red-600"
                  >
                    {fieldErrors.phone}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label
                  htmlFor={emailId}
                  className="text-xs font-bold uppercase tracking-wide text-slate-800"
                >
                  Email address <span className="text-red-600">*</span>
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? `${emailId}-err` : undefined}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  className={`rounded bg-white px-4 py-3 font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none ${inputError("email")}`}
                />
                {fieldErrors.email ? (
                  <p
                    id={`${emailId}-err`}
                    className="text-sm font-semibold text-red-600"
                  >
                    {fieldErrors.email}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5 text-left">
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
                  placeholder="HA3 XXX"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="rounded border border-slate-200 bg-white px-4 py-3 font-sans text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <label
                htmlFor={serviceId}
                className="text-xs font-bold uppercase tracking-wide text-slate-800"
              >
                Service <span className="text-red-600">*</span>
              </label>
              <select
                id={serviceId}
                name="service"
                value={service}
                aria-invalid={Boolean(fieldErrors.service)}
                aria-describedby={
                  fieldErrors.service ? `${serviceId}-err` : undefined
                }
                onChange={(e) => {
                  setService(e.target.value);
                  clearFieldError("service");
                }}
                className={`rounded bg-white px-4 py-3 font-sans text-slate-900 focus:outline-none ${inputError("service")}`}
              >
                <option value="">Select a service</option>
                {BOOKING_SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {fieldErrors.service ? (
                <p
                  id={`${serviceId}-err`}
                  className="text-sm font-semibold text-red-600"
                >
                  {fieldErrors.service}
                </p>
              ) : null}
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
                onChange={(e) => setDetails(e.target.value)}
                className="resize-y rounded border border-slate-200 bg-white px-4 py-3 font-sans text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded border border-slate-300 bg-white px-8 py-3 font-sans text-sm font-bold uppercase tracking-wide text-slate-800 transition-colors hover:border-slate-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded border border-red-600 bg-red-600 px-8 py-3 font-sans text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-red-700 hover:bg-red-700"
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
