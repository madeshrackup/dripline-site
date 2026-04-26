/**
 * Netlify: identical behaviour to Vercel `api/booking.js` — set RESEND_API_KEY, BOOKING_FROM_EMAIL.
 * Route: /api/booking via `public/_redirects` → this function.
 */

import { parseBookingRequest, sendBookingEmail } from "../../lib/resend-booking.mjs";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

function jsonResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, Allow: "POST, OPTIONS" },
      body: JSON.stringify({ error: "method_not_allowed" }),
    };
  }

  let raw;
  if (event.isBase64Encoded && event.body) {
    raw = Buffer.from(event.body, "base64").toString("utf8");
  } else {
    raw = event.body || "";
  }

  let body;
  try {
    body = raw ? JSON.parse(raw) : null;
  } catch {
    return jsonResponse(400, { error: "invalid_json" });
  }
  if (body == null) {
    return jsonResponse(400, { error: "invalid_json" });
  }

  const parsed = parseBookingRequest(body);
  if (!parsed.ok) {
    return jsonResponse(parsed.status, { error: parsed.error });
  }

  const result = await sendBookingEmail(process.env, parsed.data);
  if (!result.ok) {
    if (result.error === "email_not_configured") {
      return jsonResponse(503, {
        error: "email_not_configured",
        message:
          "Set RESEND_API_KEY and BOOKING_FROM_EMAIL in the deployment environment. See netlify/functions/booking.mjs.",
      });
    }
    return jsonResponse(result.status, {
      error: result.error,
      details: result.details,
    });
  }

  return jsonResponse(200, { ok: true, id: result.id });
}
