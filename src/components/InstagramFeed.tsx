import { useEffect, useMemo, useState } from "react";
import { Instagram } from "lucide-react";
import {
  INSTAGRAM_FEED_API_URL,
  INSTAGRAM_PROFILE_URL,
  INSTAGRAM_USERNAME,
} from "../siteConfig";
import { Section } from "./Section";

type IgMedia = {
  id: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  caption?: string;
};

type IgMediaResponse = { data?: IgMedia[] };

function pickImageUrl(m: IgMedia): string | undefined {
  if (m.media_type === "VIDEO") return m.thumbnail_url || m.media_url;
  return m.media_url || m.thumbnail_url;
}

function truncateCaption(text: string | undefined, max = 80): string {
  if (!text) return "Instagram post";
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : `${t.slice(0, max)}…`;
}

function formatFeedFetchError(e: unknown): string {
  const raw = e instanceof Error ? e.message : "Could not load feed.";
  if (
    /load failed|failed to fetch|networkerror|network error|aborted|timed out/i.test(
      raw,
    )
  ) {
    return "Could not reach the feed API from this page (often a browser block or cross-origin from localhost). Set VITE_INSTAGRAM_DEV_PROXY in .env.local to a full JSON feed URL, or open the deployed site.";
  }
  return raw;
}

export function InstagramFeed() {
  const [rawPosts, setRawPosts] = useState<IgMedia[] | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    INSTAGRAM_FEED_API_URL ? "loading" : "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const posts = useMemo(() => {
    if (!rawPosts) return [];
    return rawPosts
      .filter((m) => Boolean(pickImageUrl(m)))
      .slice(0, 9);
  }, [rawPosts]);

  useEffect(() => {
    if (!INSTAGRAM_FEED_API_URL) {
      setStatus("idle");
      return;
    }

    let cancelled = false;
    setStatus("loading");
    setErrorMessage(null);

    (async () => {
      try {
        const res = await fetch(INSTAGRAM_FEED_API_URL);
        const bodyText = await res.text();
        const trimmed = bodyText.trim();
        let json: IgMediaResponse & { error?: string; message?: string };
        try {
          json = JSON.parse(trimmed) as typeof json;
        } catch {
          if (res.status === 404) {
            throw new Error(
              "Instagram API returned 404 — /api/instagram-feed is not deployed on this domain yet. Deploy the latest code to Vercel (include the api/ folder), then redeploy. For npm run dev, set VITE_INSTAGRAM_DEV_PROXY in .env.local to a URL that already returns JSON (e.g. your-project.vercel.app/api/instagram-feed).",
            );
          }
          const looksLikePage =
            trimmed.startsWith("<") ||
            trimmed.includes("NOT_FOUND") ||
            trimmed.includes("could not be found");
          throw new Error(
            looksLikePage
              ? "Instagram feed URL returned a web page instead of JSON. Your custom domain may not be wired to a deployment that includes api/instagram-feed.js yet — deploy, then set VITE_INSTAGRAM_DEV_PROXY to a working preview URL for local dev."
              : "Feed response was not valid JSON.",
          );
        }

        if (!res.ok) {
          throw new Error(json.message || json.error || res.statusText);
        }

        if (json.error && !json.data) {
          throw new Error(json.message || json.error);
        }

        const list = json.data ?? [];
        if (!cancelled) {
          setRawPosts(list);
          setStatus("ok");
        }
      } catch (e) {
        if (!cancelled) {
          setRawPosts(null);
          setStatus("error");
          setErrorMessage(formatFeedFetchError(e));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const showGrid = status === "ok" && posts.length > 0;

  const fallbackBody =
    status === "error"
      ? errorMessage || "The Instagram feed could not be loaded."
      : status === "ok" && posts.length === 0 && INSTAGRAM_FEED_API_URL
        ? "No posts were returned from Instagram yet."
        : "Connect your Instagram Business account via the secure feed API to show posts here.";

  return (
    <div id="instagram" className="border-b-2 border-slate-200 bg-slate-50">
      <Section className="py-12 lg:py-16" aria-labelledby="instagram-heading">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-3">
          <Instagram className="h-8 w-8 text-brand" strokeWidth={2} aria-hidden />
          <h2
            id="instagram-heading"
            className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            @{INSTAGRAM_USERNAME}
          </h2>
        </div>
        <p className="mx-auto mt-2 max-w-2xl text-center text-slate-600">
          Recent jobs, deals, and other behind the scenes! Drop us a follow.
        </p>

        {status === "loading" ? (
          <div
            className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-3 sm:gap-4"
            aria-busy="true"
            aria-label="Loading Instagram posts"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-sm bg-slate-200"
              />
            ))}
          </div>
        ) : null}

        {showGrid ? (
          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-3 sm:gap-4">
            {posts.map((item) => {
              const src = pickImageUrl(item)!;
              const href = item.permalink || INSTAGRAM_PROFILE_URL;
              return (
                <li key={item.id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block aspect-square overflow-hidden rounded-sm border border-slate-200 bg-white transition-shadow hover:ring-2 hover:ring-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                  >
                    <img
                      src={src}
                      alt={truncateCaption(item.caption)}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}

        {status !== "loading" && !showGrid ? (
          <div className="mx-auto mt-10 max-w-xl rounded-sm border-2 border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <p className="text-sm text-slate-600">{fallbackBody}</p>
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm border-2 border-brand bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand/90"
            >
              <Instagram className="h-5 w-5" aria-hidden />
              View @{INSTAGRAM_USERNAME} on Instagram
            </a>
            {!INSTAGRAM_FEED_API_URL ? (
              <p className="mt-4 text-xs text-slate-500">
                For local <code className="rounded bg-slate-100 px-1 font-mono text-slate-800">npm run dev</code>
                , either set{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-slate-800">
                  VITE_INSTAGRAM_FEED_API
                </code>{" "}
                to your full feed URL, or use{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-slate-800">
                  /api/instagram-feed
                </code>{" "}
                plus{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-slate-800">
                  VITE_INSTAGRAM_DEV_PROXY
                </code>{" "}
                (see <code className="rounded bg-slate-100 px-1 font-mono text-slate-800">vite.config.ts</code>
                ). Production defaults to{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-slate-800">/api/instagram-feed</code>
                . Server env:{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-slate-800">
                  INSTAGRAM_USER_ID
                </code>
                ,{" "}
                <code className="rounded bg-slate-100 px-1 font-mono text-slate-800">
                  INSTAGRAM_ACCESS_TOKEN
                </code>
                .
              </p>
            ) : null}
          </div>
        ) : null}
      </Section>
    </div>
  );
}
