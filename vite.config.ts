import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

/**
 * Local dev: point env vars at a deployed Vercel preview (functions under /api/):
 *   VITE_INSTAGRAM_DEV_PROXY=https://<deploy>.vercel.app/api/instagram-feed
 *   VITE_BOOKING_DEV_PROXY=https://<deploy>.vercel.app/api/booking
 * Then use VITE_INSTAGRAM_FEED_API=/api/instagram-feed; form posts to /api/booking (same-origin in dev).
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const igProxy = env.VITE_INSTAGRAM_DEV_PROXY?.trim();
  const bookingProxy = env.VITE_BOOKING_DEV_PROXY?.trim();

  const proxy: Record<string, { target: string; changeOrigin: boolean; rewrite: (path: string) => string }> = {};
  if (igProxy) {
    const u = new URL(igProxy);
    proxy["/api/instagram-feed"] = {
      target: u.origin,
      changeOrigin: true,
      rewrite: () => `${u.pathname}${u.search}`,
    };
  }
  if (bookingProxy) {
    const u = new URL(bookingProxy);
    proxy["/api/booking"] = {
      target: u.origin,
      changeOrigin: true,
      rewrite: () => `${u.pathname}${u.search}`,
    };
  }

  return {
    plugins: [react(), tailwindcss()],
    server: Object.keys(proxy).length
      ? {
          proxy,
        }
      : {},
  };
});
