/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INSTAGRAM_FEED_API?: string;
  /** Dev only: full URL to a working JSON feed (e.g. https://proj.vercel.app/api/instagram-feed) */
  readonly VITE_INSTAGRAM_DEV_PROXY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
