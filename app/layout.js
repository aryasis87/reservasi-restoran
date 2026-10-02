import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Kepala from '@/components/Kepala';
import Kaki from '@/components/Kaki';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-playfair', display: 'swap' });

const __jsonld = {"@context":"https://schema.org","@type":"WebSite","name":"Pawon Lirih","description":"Reservasi meja Pawon Lirih, restoran masakan rumahan Jawa di Yogyakarta: pilih meja langsung di denah, lihat menu, atau pesan tempat untuk rombongan.","url":"https://reservasi-restoran-gilt.vercel.app","inLanguage":"id"};

export const metadata = {
  metadataBase: new URL("https://reservasi-restoran-gilt.vercel.app"),
  title: { default: "Pawon Lirih — Pesan meja lewat denah", template: "%s — Pawon Lirih" },
  description: "Reservasi meja Pawon Lirih, restoran masakan rumahan Jawa di Yogyakarta: pilih meja langsung di denah, lihat menu, atau pesan tempat untuk rombongan.",
  applicationName: "Pawon Lirih",
  keywords: ["reservasi meja", "denah restoran", "masakan Jawa", "gudeg", "pesan meja online"],
  authors: [{ name: "Pawon Lirih" }],
  creator: "Pawon Lirih",
  publisher: "Pawon Lirih",
  alternates: { canonical: "https://reservasi-restoran-gilt.vercel.app" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://reservasi-restoran-gilt.vercel.app",
    siteName: "Pawon Lirih",
    title: "Pawon Lirih — Pesan meja lewat denah",
    description: "Reservasi meja Pawon Lirih, restoran masakan rumahan Jawa di Yogyakarta: pilih meja langsung di denah, lihat menu, atau pesan tempat untuk rombongan.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Pawon Lirih — Pesan meja lewat denah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pawon Lirih — Pesan meja lewat denah",
    description: "Reservasi meja Pawon Lirih, restoran masakan rumahan Jawa di Yogyakarta: pilih meja langsung di denah, lihat menu, atau pesan tempat untuk rombongan.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
};

export const viewport = { themeColor: '#b45309' };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Kepala />
        {children}
        <Kaki />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
