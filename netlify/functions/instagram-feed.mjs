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

export async function handler() {
  const userId = process.env.INSTAGRAM_USER_ID;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!userId || !token) {
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "instagram_not_configured",
        message:
          "Set INSTAGRAM_USER_ID and INSTAGRAM_ACCESS_TOKEN on Netlify for this function.",
      }),
    };
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

  const url = `${GRAPH}/${encodeURIComponent(userId)}/media?fields=${fields}&access_token=${encodeURIComponent(token)}&limit=12`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data.error) {
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "instagram_graph_error",
          message: data.error?.message || res.statusText,
          details: data.error,
        }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "fetch_failed",
        message: e instanceof Error ? e.message : "Unknown error",
      }),
    };
  }
}
