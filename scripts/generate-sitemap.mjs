/**
 * Writes public/sitemap.xml at build time (lastmod = run date) for Search Console.
 * URL list & priorities live in src/config/seoConfig.json (keep in sync with App routes).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const configPath = join(root, "src", "config", "seoConfig.json");
const outPath = join(root, "public", "sitemap.xml");

const config = JSON.parse(readFileSync(configPath, "utf8"));
const base = (config.baseUrl || "https://www.driplineplumbers.co.uk").replace(/\/$/, "");
const lastmod = new Date().toISOString().slice(0, 10);

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function locForPath(path) {
  if (path === "/") {
    return `${base}/`;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/+\/+/g, "/").replace("https:/", "https://");
}

const urlBlocks = config.sitemap
  .map((e) => {
    const loc = locForPath(e.path);
    const pr = e.priority != null ? String(e.priority) : "0.5";
    const lines = [
      "  <url>",
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <priority>${escapeXml(pr)}</priority>`,
    ];
    if (e.changefreq) {
      lines.push(`    <changefreq>${escapeXml(e.changefreq)}</changefreq>`);
    }
    lines.push("  </url>");
    return lines.join("\n");
  })
  .join("\n");

const out = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlBlocks}
</urlset>
`;

writeFileSync(outPath, out, "utf8");
console.log(`Sitemap: ${outPath} (${config.sitemap.length} URLs, lastmod=${lastmod})`);
