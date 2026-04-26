/**
 * Receives booking form POSTs and emails details via Resend to info@driplineplumbers.co.uk (or BOOKING_TO_EMAIL).
 *
 * Environment (Vercel / Netlify) — all server-side, never use the VITE_ prefix:
 *   RESEND_API_KEY        — from https://resend.com
 *   BOOKING_FROM_EMAIL    — required: a Resend-verified sender, e.g. bookings@driplineplumbers.co.uk
 *   BOOKING_TO_EMAIL         — optional; defaults to info@driplineplumbers.co.uk
 *   BOOKING_EMAIL_LOGO_URL  — optional; full https URL to the wordmark image in emails
 */

import { parseBookingRequest, sendBookingEmail } from "../lib/resend-booking.mjs";

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

function readJsonBody(req) {
  if (req.body != null && typeof req.body === "object" && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === "string" && req.body) {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch {
      return Promise.resolve(null);
    }
  }
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : null);
      } catch {
        resolve(null);
      }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return res.status(400).json({ error: "invalid_json" });
  }
  if (body == null) {
    return res.status(400).json({ error: "invalid_json" });
  }

  const parsed = parseBookingRequest(body);
  if (!parsed.ok) {
    return res.status(parsed.status).json({ error: parsed.error });
  }

  const result = await sendBookingEmail(process.env, parsed.data);
  if (!result.ok) {
    if (result.error === "email_not_configured") {
      return res.status(503).json({
        error: "email_not_configured",
        missing: result.missing,
        message:
          "Resend needs RESEND_API_KEY and BOOKING_FROM_EMAIL (a Resend-verified from address) on the server. Use plain names, not VITE_ — and redeploy after changes.",
      });
    }
    return res.status(result.status).json({
      error: result.error,
      details: result.details,
    });
  }

  return res.status(200).json({
    ok: true,
    teamId: result.teamId,
    customerId: result.customerId,
    customerEmailSent: result.customerEmailSent,
  });
}
