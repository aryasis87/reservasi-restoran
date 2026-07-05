export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://reservasi-restoran.vercel.app/sitemap.xml",
    host: "https://reservasi-restoran.vercel.app",
  };
}
