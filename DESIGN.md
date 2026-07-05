# Saung Rasa — Design System (Reservasi Restoran)

> Concept: **fine-dining editorial** — a digital à-la-carte menu meets a maître d's table planner. Warm, tactile, appetizing. Platform: responsive web (desktop-first). Bahasa: Indonesia.

## Brand voice
Hangat, ramah, sedikit elegan. Seperti host restoran yang menyambut. Contoh: "Pilih meja favoritmu", "Sampai jumpa di Saung Rasa".

## Color tokens
| Token | Hex | Pakai |
|---|---|---|
| `bg` | `#faf7f2` | latar utama (krem) |
| `surface` | `#ffffff` | kartu, panel |
| `ink` | `#292524` | teks utama (stone-800) |
| `muted` | `#78716c` | teks sekunder |
| `primary` | `#b45309` | aksi utama (amber-700) |
| `primary-hover` | `#92400e` | hover |
| `gold` | `#c9a14a` | aksen/garis dekoratif |
| `available` | `#059669` | meja tersedia |
| `selected` | `#b45309` | meja dipilih |
| `booked` | `#e7e5e4` / teks `#a8a29e` | meja terisi |
| `border` | `#e7e2da` | garis |

Tekstur halus: pola garis kertas/linen sangat tipis pada area denah.

## Typography
- Display/heading: **Playfair Display** (600–700) — judul, nama meja, harga besar.
- Body/UI: **Inter** (400–600).
- Skala: H1 30–36, H2 22–24, body 14–16, label 11 uppercase tracking-wide.

## Shape & elevation
- Radius: kartu `16px` (rounded-2xl), input `12px`, meja bulat = full / kotak = 12px.
- Shadow: lembut & rendah (`0 1px 3px rgba(0,0,0,.06)`); meja terpilih sedikit terangkat + scale 1.05.

## Components
- **Field control** (Tanggal/Jam/Tamu): kartu putih, ikon + label kapital kecil + value tebal.
- **FloorMap (signature)**: kanvas rasio ~16/11, meja diposisikan absolut; warna ikut status; klik untuk memilih; legenda (Tersedia/Pilihanmu/Terisi/Kursi kurang).
- **Booking panel**: ringkasan meja + form Nama & No. WhatsApp + tombol primary penuh.
- **Buttons**: primary = bg amber, teks krem, radius-xl; ghost = border stone.

## States
Empty (belum pilih meja) → ajakan pilih meja hijau. Hover meja tersedia → bg emerald-50 + scale. Disabled = booked / kursi kurang. Success = modal centang emerald + detail reservasi.

## Motion
Halus & elegan (200ms). Highlight meja, fade-in panel, modal scale-in. Hormati `prefers-reduced-motion`.

## Layout
Desktop: dua-pane (kontrol + denah besar). Mobile: tumpuk vertikal, denah bisa di-scroll.
