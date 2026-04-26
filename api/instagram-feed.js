/**
 * Instagram Graph API (Vercel serverless).
 * Set INSTAGRAM_USER_ID and INSTAGRAM_ACCESS_TOKEN in Vercel → Environment Variables.
 * Client: production build defaults to same-origin /api/instagram-feed; optional VITE_INSTAGRAM_FEED_API override.
 *
 * @see https://developers.facebook.com/docs/instagram-api
 */

const GRAPH = "https://graph.facebook.com/v21.0";

/** Allow the SPA on localhost (or any origin) to call this JSON endpoint cross-origin. */
function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const userId = process.env.INSTAGRAM_USER_ID;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!userId || !token) {
    return res.status(503).json({
      error: "instagram_not_configured",
      message:
        "Set INSTAGRAM_USER_ID and INSTAGRAM_ACCESS_TOKEN in the project environment (Vercel → Environment Variables).",
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

  const url = `${GRAPH}/${encodeURIComponent(userId)}/media?fields=${fields}&access_token=${encodeURIComponent(token)}&limit=12`;

  try {
    const igRes = await fetch(url);
    const data = await igRes.json();

    if (!igRes.ok || data.error) {
      return res.status(502).json({
        error: "instagram_graph_error",
        message: data.error?.message || igRes.statusText,
        details: data.error,
      });
    }

    res.setHeader("Cache-Control", "public, max-age=300");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({
      error: "fetch_failed",
      message: e instanceof Error ? e.message : "Unknown error",
    });
  }
}
