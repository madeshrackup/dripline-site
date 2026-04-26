/**
 * Resend: https://resend.com/docs/api-reference/emails/send-email
 * Set RESEND_API_KEY, BOOKING_FROM_EMAIL (domain verified in Resend; optional: onboarding@resend.dev for dev).
 */

const DEFAULT_TO = "info@driplineplumbers.co.uk";

/** @type {readonly string[]} Keep in sync with `BOOKING_SERVICE_OPTIONS` in `src/siteConfig.ts`. */
export const BOOKING_SERVICE_CHOICES = [
  "Leak detection",
  "Pipe repairs",
  "Bathroom installations",
  "General plumbing",
  "Emergency / not sure",
];

const MAX = { name: 200, phone: 40, email: 200, postcode: 20, details: 5000 };

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidUkMobile(phone) {
  const d = String(phone).replace(/[\s-]/g, "");
  return /^07\d{9}$/.test(d) || /^\+447\d{9}$/.test(d);
}

/**
 * @param {unknown} body
 * @returns {{ ok: true, data: Record<string, string> } | { ok: false, error: string, status: number }}
 */
export function parseBookingRequest(body) {
  if (body == null || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, status: 400, error: "expected_json_object" };
  }
  const o = /** @type {Record<string, unknown>} */ (body);

  const name = typeof o.name === "string" ? o.name.trim() : "";
  const phone = typeof o.phone === "string" ? o.phone.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const postcode = typeof o.postcode === "string" ? o.postcode.trim() : "";
  const service = typeof o.service === "string" ? o.service.trim() : "";
  const details = typeof o.details === "string" ? o.details.trim() : "";

  if (!name || name.length > MAX.name) {
    return { ok: false, status: 400, error: "invalid_name" };
  }
  if (!phone || !isValidUkMobile(phone) || phone.length > MAX.phone) {
    return { ok: false, status: 400, error: "invalid_phone" };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > MAX.email) {
    return { ok: false, status: 400, error: "invalid_email" };
  }
  if (postcode.length > MAX.postcode) {
    return { ok: false, status: 400, error: "invalid_postcode" };
  }
  if (!BOOKING_SERVICE_CHOICES.includes(service)) {
    return { ok: false, status: 400, error: "invalid_service" };
  }
  if (details.length > MAX.details) {
    return { ok: false, status: 400, error: "invalid_details" };
  }

  return {
    ok: true,
    data: { name, phone, email, postcode, service, details },
  };
}

/**
 * @param {Record<string, string>} data
 */
export function buildBookingMessage(data) {
  const subject = "Booking request — Dripline Plumbers";
  const lines = [
    "BOOKING REQUEST",
    "----------------",
    `Name:     ${data.name}`,
    `Phone:    ${data.phone}`,
    `Email:    ${data.email}`,
    `Postcode: ${data.postcode || "—"}`,
    `Service:  ${data.service}`,
    "",
    "Details:",
    data.details || "—",
  ];
  const text = lines.join("\n");

  const h = (label, value) => {
    const v = value ? escapeHtml(value) : "—";
    return `<tr><th align="left" style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top;white-space:nowrap;color:#0f172a;">${escapeHtml(
      label,
    )}</th><td style="padding:4px 0;vertical-align:top;color:#334155;">${v}</td></tr>`;
  };

  const html = `<!doctype html>
<html><body style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.5;color:#0f172a;">
<p style="margin:0 0 16px;font-size:12px;letter-spacing:0.12em;font-weight:700;text-transform:uppercase;color:#64748b;">Booking request</p>
<table cellspacing="0" style="max-width:560px;">${h("Name", data.name)}${h("Phone", data.phone)}${h("Email", data.email)}${h("Postcode", data.postcode)}${h("Service", data.service)}</table>
<p style="margin:20px 0 6px;font-weight:600;color:#0f172a;">Details</p>
<p style="margin:0;white-space:pre-wrap;color:#334155;">${
    data.details ? escapeHtml(data.details) : "—"
  }</p>
</body></html>`;

  return { subject, text, html };
}

/**
 * @param {{ RESEND_API_KEY?: string, BOOKING_FROM_EMAIL?: string, BOOKING_TO_EMAIL?: string }} env
 * @param {Record<string, string>} data
 */
export async function sendBookingEmail(env, data) {
  const key = env.RESEND_API_KEY;
  const from = env.BOOKING_FROM_EMAIL;
  if (!key?.trim() || !from?.trim()) {
    return {
      ok: false,
      status: 503,
      error: "email_not_configured",
    };
  }

  const to = (env.BOOKING_TO_EMAIL || DEFAULT_TO).trim() || DEFAULT_TO;
  const { subject, text, html } = buildBookingMessage(data);

  const payload = {
    from: `Dripline Plumbers <${from}>`,
    to: [to],
    reply_to: data.email,
    subject,
    text,
    html,
  };

  const headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });

  const j = await res.json().catch(() => ({}));

  if (!res.ok) {
    return {
      ok: false,
      status: 502,
      error: "resend_error",
      details: j,
    };
  }

  return { ok: true, id: j.id };
}
