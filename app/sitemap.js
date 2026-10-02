const URL = 'https://reservasi-restoran-gilt.vercel.app';

export default function sitemap() {
  const now = new Date();
  return ['', '/menu', '/rombongan'].map((p) => ({ url: URL + p, lastModified: now, changeFrequency: 'monthly', priority: p ? 0.7 : 1 }));
}
