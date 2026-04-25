/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_INSTAGRAM_FEED_API?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
