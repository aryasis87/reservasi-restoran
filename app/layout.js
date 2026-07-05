import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-playfair', display: 'swap' });

const __jsonld = {"@context":"https://schema.org","@type":"Restaurant","name":"Saung Rasa","description":"Reservasi meja restoran online","url":"https://restoran.pintuweb.com","areaServed":"ID"};

export const metadata = {
  metadataBase: new URL("https://restoran.pintuweb.com"),
  title: "Saung Rasa — Reservasi Meja Restoran Online",
  description: "Reservasi meja restoran online lewat denah interaktif. Pilih meja favoritmu, tentukan waktu, dan datang tanpa menunggu.",
  applicationName: "Saung Rasa",
  keywords: ["reservasi meja", "booking restoran", "pesan meja online", "restoran", "denah meja"],
  authors: [{ name: "Saung Rasa" }],
  creator: "Saung Rasa",
  publisher: "Saung Rasa",
  alternates: { canonical: "https://restoran.pintuweb.com" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://restoran.pintuweb.com",
    siteName: "Saung Rasa",
    title: "Saung Rasa — Reservasi Meja Restoran Online",
    description: "Reservasi meja restoran online lewat denah interaktif. Pilih meja favoritmu, tentukan waktu, dan datang tanpa menunggu.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Saung Rasa — Reservasi Meja Restoran Online" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saung Rasa — Reservasi Meja Restoran Online",
    description: "Reservasi meja restoran online lewat denah interaktif. Pilih meja favoritmu, tentukan waktu, dan datang tanpa menunggu.",
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
      <body className="antialiased">{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(__jsonld) }} />
        </body>
    </html>
  );
}
