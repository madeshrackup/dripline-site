/**
 * Instagram Graph API — keep INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID
 * in Netlify environment variables (Site settings → Environment variables).
 *
 * Token: long-lived Page or System User token with instagram_basic / relevant
 * Instagram permissions. User ID: Instagram Business/Creator account id
 * (numeric), from Meta App Dashboard or Graph API Explorer.
 *
 * @see https://developers.facebook.com/docs/instagram-api/guides/content-publishing
 */

const GRAPH = "https://graph.facebook.com/v21.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

function jsonResponse(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, Allow: "GET, OPTIONS" },
      body: "",
    };
  }

  const userId = process.env.INSTAGRAM_USER_ID;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!userId || !token) {
    return jsonResponse(503, {
      error: "instagram_not_configured",
      message:
        "Set INSTAGRAM_USER_ID and INSTAGRAM_ACCESS_TOKEN in your host’s environment (e.g. Netlify or Vercel).",
    });
  }

  const fields = [
    "id",
    "media_type",
    "media_url",
    "thumbnail_url",
    "permalink",
    "caption",
    "timestamp",
  ].join(",");

  const url = `${GRAPH}/${encodeURIComponent(userId)}/media?fields=${fields}&access_token=${encodeURIComponent(token)}&limit=9`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data.error) {
      return jsonResponse(502, {
        error: "instagram_graph_error",
        message: data.error?.message || res.statusText,
        details: data.error,
      });
    }

    return jsonResponse(200, data, {
      "Cache-Control": "public, max-age=300",
    });
  } catch (e) {
    return jsonResponse(500, {
      error: "fetch_failed",
      message: e instanceof Error ? e.message : "Unknown error",
    });
  }
}
