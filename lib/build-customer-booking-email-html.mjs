/**
 * Branded customer booking confirmation (HTML) — static preview: public/TEST.html (npm run dev → /TEST.html).
 * Logo: use an absolute https URL in real sends (Gmail, etc.); set BOOKING_EMAIL_LOGO_URL or default live URL below.
 */

const DEFAULT_LOGO = "https://www.driplineplumbers.co.uk/nav-wordmark.png";
const FONTS_LINK = `https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Manrope:wght@600;700&display=swap`;

const BORDER = "#1d1d1d";
const MUTED = "#334155";
const NAMED = "#0f172a";
const CTA = "#3981d3";
const SURFACE = "#f4f7f9";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * @param {Record<string, string>} data name, phone, email, postcode, service, details
 * @param {{ logoUrl?: string }} [opts]
 */
export function buildCustomerBookingEmailHtml(data, opts) {
  const logoUrl = (opts?.logoUrl && opts.logoUrl.trim()) || process.env.BOOKING_EMAIL_LOGO_URL?.trim() || DEFAULT_LOGO;
  const firstName = data.name.split(/\s+/)[0] || data.name;
  const post = data.postcode || "—";
  const summaryLine = `${data.service} in ${post} | ${data.phone} | ${data.name}`;
  const preheader = `Thanks, ${data.name} — we received your request for ${data.service} in ${post}. ${summaryLine}`;

  const row = (label, value) => {
    const v = value ? escapeHtml(value) : "—";
    return `<tr>
<td style="font-family:'Inter',-apple-system,Segoe UI,sans-serif;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;padding:0 0 6px 0;vertical-align:top;width:100px;">${escapeHtml(
      label,
    )}</td>
<td style="font-family:'Inter',-apple-system,Segoe UI,sans-serif;font-size:15px;font-weight:600;color:${NAMED};padding:0 0 12px 0;">${v}</td>
</tr>`;
  };

  const bodyHtml = `Hi ${escapeHtml(firstName)}`;
  const details = data.details ? escapeHtml(data.details) : "—";

  return `<!doctype html>
<html lang="en-GB" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS_LINK}">
<title>We got your request</title>
</head>
<body style="margin:0;padding:0;background-color:${SURFACE};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<!-- preheader: improves inbox preview -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;visibility:hidden;mso-hide:all;" aria-hidden="true">${escapeHtml(
    preheader,
  )}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${SURFACE};border:0;border-collapse:collapse;">
<tr>
<td align="center" style="padding:20px 12px;font-family:'Inter',-apple-system,Segoe UI,sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;border:1px solid ${BORDER};border-radius:8px;overflow:hidden;background:#ffffff;border-collapse:separate;">
<!-- header / logo -->
<tr>
<td style="background:#ffffff;padding:28px 24px 20px 24px;text-align:center;border-bottom:1px solid #e2e8f0;">
<a href="https://www.driplineplumbers.co.uk/" style="text-decoration:none;" target="_blank" rel="noopener">
<img src="${escapeHtml(logoUrl)}" width="200" height="" alt="Dripline Plumbers" style="display:block;margin:0 auto;max-width:200px;height:auto;border:0;outline:none;">
</a>
</td>
</tr>
<tr>
<td style="padding:28px 28px 8px 28px;">
<p style="font-family:'Manrope','Inter',-apple-system,Segoe UI,sans-serif;font-size:20px;font-weight:700;letter-spacing:-0.02em;margin:0 0 4px 0;color:${NAMED};">We got your request</p>
<p style="font-family:'Inter',-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;margin:0;color:${MUTED};">${bodyHtml},</p>
</td>
</tr>
<tr>
<td style="padding:8px 28px 0 28px;">
<p style="font-family:'Inter',-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;margin:0 0 0 0;color:${MUTED};">Thanks for reaching out to <strong style="color:${NAMED}">Dripline Plumbers</strong>. We&rsquo;ve received your request and a member of the team will review the details and get back to you shortly. Below is a copy of what you sent us.</p>
</td>
</tr>
<!-- summary band -->
<tr>
<td style="padding:20px 28px 0 28px;">
<div style="font-family:'Inter',-apple-system,Segoe UI,sans-serif;font-size:13px;font-weight:600;color:#64748b;letter-spacing:0.04em;margin:0 0 6px 0;">Summary</div>
<div style="font-family:'Inter',-apple-system,Segoe UI,sans-serif;font-size:14px;font-weight:600;color:${NAMED};line-height:1.45;">${escapeHtml(
    summaryLine,
  )}</div>
</td>
</tr>
<!-- details card -->
<tr>
<td style="padding:20px 28px 8px 28px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f9fafb;border-radius:6px;border:1px solid #e2e8f0;border-left:4px solid ${BORDER};">
<tr>
<td style="padding:20px 20px 8px 20px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
${row("Name", data.name)}${row("Phone", data.phone)}${row("Postcode", data.postcode || "")}${row("Service", data.service)}</table>
</td>
</tr>
<tr>
<td style="padding:0 20px 4px 20px;font-family:'Inter',-apple-system,Segoe UI,sans-serif;font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.04em;">Message</td>
</tr>
<tr>
<td style="padding:0 20px 20px 20px;">
<div style="font-family:'Inter',-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.5;color:${MUTED};font-style:italic;border:1px solid #e2e8f0;border-radius:4px;padding:12px 14px;background:#ffffff;white-space:pre-wrap;word-wrap:break-word;">${details}</div>
</td>
</tr>
</table>
</td>
</tr>
<!-- CTA -->
<tr>
<td style="padding:8px 28px 28px 28px;">
<p style="font-family:'Manrope','Inter',-apple-system,Segoe UI,sans-serif;font-size:15px;font-weight:700;margin:0 0 10px 0;color:${NAMED};">Need an emergency plumber right now?</p>
<table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
<tr>
<td style="background-color:${CTA};border-radius:5px;padding:0;">
<a href="tel:+447403767600" style="font-family:'Inter',-apple-system,Segoe UI,sans-serif;display:inline-block;padding:12px 26px;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;">Call 07403 767600</a>
</td>
</tr>
</table>
</td>
</tr>
<!-- footer -->
<tr>
<td style="background-color:#f1f5f9;padding:22px 28px;text-align:center;border-top:1px solid #e2e8f0;">
<p style="font-family:'Inter',-apple-system,Segoe UI,sans-serif;font-size:13px;line-height:1.5;margin:0;color:#64748b;">Dripline Plumbers &middot; Harrow, Brent &amp; North West London</p>
<p style="font-family:'Inter',-apple-system,Segoe UI,sans-serif;font-size:13px;margin:10px 0 0 0;">
<a href="https://www.driplineplumbers.co.uk" style="color:#64748b;" target="_blank" rel="noopener">www.driplineplumbers.co.uk</a>
</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`;
}

/** @returns {string} default public logo URL (for tests / docs) */
export function getDefaultCustomerEmailLogoUrl() {
  return DEFAULT_LOGO;
}
