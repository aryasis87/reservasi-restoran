# Saung Rasa — Reservasi Meja Restoran Online

Reservasi meja restoran online lewat denah interaktif. Pilih meja favoritmu, tentukan waktu, dan datang tanpa menunggu.

**Demo live:** https://reservasi-restoran-gilt.vercel.app

![Tangkapan layar Saung Rasa](public/og.jpg)

> Aplikasi reservasi contoh. Data tersimpan di browser (localStorage), tanpa backend.

## Konsep

Paradigma **denah meja**: pilih tanggal, jam, dan jumlah tamu, lalu klik meja yang masih kosong langsung di denah restoran.

## Halaman

`/`

## Teknologi

- Next.js 15.5 (App Router) dan React 19
- Tailwind CSS v4
- JavaScript
- Framer Motion, Lucide (ikon)
- Font: Inter, Playfair Display (next/font)
- SEO: metadata per halaman, Open Graph, JSON-LD, sitemap.xml, dan robots.txt

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000. Untuk build produksi: `npm run build` lalu `npm start`.

---

Bagian dari koleksi 5 aplikasi reservasi di [PortalReservasi](https://portal-reservasi-nu.vercel.app). Dibuat oleh [PintuWeb](https://pintuweb.com), jasa pembuatan website.
