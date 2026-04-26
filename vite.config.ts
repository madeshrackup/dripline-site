import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

/**
 * Local dev: set VITE_INSTAGRAM_FEED_API=/api/instagram-feed and
 * VITE_INSTAGRAM_DEV_PROXY=https://<your-deployment>.vercel.app/api/instagram-feed
 * (www will 404 until that deployment is promoted / aliased to the custom domain).
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const devProxyFull = env.VITE_INSTAGRAM_DEV_PROXY?.trim();

  return {
    plugins: [react(), tailwindcss()],
    server: devProxyFull
      ? {
          proxy: {
            "/api/instagram-feed": {
              target: new URL(devProxyFull).origin,
              changeOrigin: true,
              rewrite: () => {
                const u = new URL(devProxyFull);
                return `${u.pathname}${u.search}`;
              },
            },
          },
        }
      : {},
  };
});
