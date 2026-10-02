// Pawon Lirih — restoran fiktif untuk purwarupa reservasi meja.
// Posisi meja x/y dalam persen pada area denah.
import { acak } from './waktu';

export const resto = {
  name: 'Pawon Lirih',
  tagline: 'Masakan rumahan Jawa, dimasak pelan',
  kota: 'Yogyakarta',
  url: 'https://reservasi-restoran-gilt.vercel.app',
  jamBuka: 'Selasa–Minggu · 11.00–14.30 dan 17.30–21.30',
  libur: [1], // Senin tutup
  times: ['11:00', '12:00', '13:00', '18:00', '19:00', '20:00'],
  durasi: 90, // menit per meja
  tahanMeja: 15, // menit meja ditahan bila tamu terlambat
  maksTamu: 8,
  // shape: round | square | long; zona untuk keterangan
  tables: [
    { id: 'T1', x: 12, y: 16, seats: 2, shape: 'round', zona: 'Dekat jendela' },
    { id: 'T2', x: 32, y: 16, seats: 2, shape: 'round', zona: 'Dekat jendela' },
    { id: 'T3', x: 54, y: 15, seats: 4, shape: 'square', zona: 'Dekat jendela' },
    { id: 'T4', x: 80, y: 16, seats: 4, shape: 'square', zona: 'Dekat jendela' },
    { id: 'T5', x: 16, y: 44, seats: 4, shape: 'square', zona: 'Tengah' },
    { id: 'T6', x: 45, y: 45, seats: 6, shape: 'long', zona: 'Tengah' },
    { id: 'T7', x: 82, y: 44, seats: 2, shape: 'round', zona: 'Dekat dapur' },
    { id: 'T8', x: 14, y: 76, seats: 4, shape: 'square', zona: 'Pojok tenang' },
    { id: 'T9', x: 38, y: 77, seats: 2, shape: 'round', zona: 'Pojok tenang' },
    { id: 'T10', x: 64, y: 76, seats: 8, shape: 'long', zona: 'Dekat dapur' },
    { id: 'T11', x: 88, y: 77, seats: 2, shape: 'round', zona: 'Dekat dapur' },
  ],
};

export const nav = [
  { href: '/', label: 'Pesan meja' },
  { href: '/menu', label: 'Menu' },
  { href: '/rombongan', label: 'Rombongan' },
  { href: '/reservasi', label: 'Reservasi saya' },
];

// Meja yang sudah dipesan tamu lain (contoh), stabil per tanggal & jam.
const PELUANG = { '12:00': 0.35, '13:00': 0.25, '18:00': 0.3, '19:00': 0.5, '20:00': 0.35 };
export function terisiContoh(tanggal, jam) {
  const p = PELUANG[jam] ?? 0.2;
  return resto.tables.filter((t) => acak(`${tanggal}|${jam}|${t.id}`) < p).map((t) => t.id);
}

export const menu = [
  {
    kategori: 'Pembuka',
    item: [
      { nama: 'Tempe mendoan', desk: 'Tempe tipis berbalut tepung berbumbu, digoreng setengah matang. Dengan sambal kecap.', harga: 22000, tag: ['vegetarian'] },
      { nama: 'Tahu bacem', desk: 'Direbus lama dalam gula jawa dan ketumbar, lalu digoreng sebentar.', harga: 20000, tag: ['vegetarian'] },
      { nama: 'Perkedel kentang', desk: 'Kentang tumbuk, daun bawang, dan sedikit pala.', harga: 18000, tag: [] },
    ],
  },
  {
    kategori: 'Hidangan utama',
    item: [
      { nama: 'Gudeg komplit', desk: 'Gudeg nangka muda, krecek, telur pindang, dan ayam opor. Untuk satu orang.', harga: 48000, tag: ['pedas ringan'] },
      { nama: 'Brongkos daging', desk: 'Daging sapi dan kacang tolo dalam kuah kluwek bersantan.', harga: 58000, tag: ['kacang'] },
      { nama: 'Mangut lele', desk: 'Lele asap dimasak santan pedas dengan daun so.', harga: 45000, tag: ['pedas'] },
      { nama: 'Ayam kampung bumbu kuning', desk: 'Ungkep kunyit dan serai, digoreng saat dipesan. Setengah ekor.', harga: 62000, tag: [] },
      { nama: 'Oseng mercon', desk: 'Tetelan sapi dengan cabai rawit yang sungguh banyak.', harga: 42000, tag: ['sangat pedas'] },
    ],
  },
  {
    kategori: 'Sayur',
    item: [
      { nama: 'Sayur lodeh', desk: 'Labu siam, terong, kacang panjang, dan tempe dalam santan encer.', harga: 25000, tag: ['vegetarian'] },
      { nama: 'Pecel', desk: 'Sayur rebus dengan sambal kacang dan rempeyek.', harga: 28000, tag: ['vegetarian', 'kacang'] },
      { nama: 'Urap', desk: 'Sayur rebus dengan kelapa parut berbumbu kencur.', harga: 24000, tag: ['vegetarian'] },
    ],
  },
  {
    kategori: 'Nasi',
    item: [
      { nama: 'Nasi putih', desk: 'Satu bakul kecil, cukup untuk satu orang.', harga: 8000, tag: ['vegetarian'] },
      { nama: 'Nasi merah', desk: 'Beras merah pulen.', harga: 12000, tag: ['vegetarian'] },
    ],
  },
  {
    kategori: 'Minuman',
    item: [
      { nama: 'Wedang uwuh', desk: 'Seduhan kayu secang, jahe, cengkih, dan daun pala.', harga: 18000, tag: ['tanpa kafein'] },
      { nama: 'Teh tubruk gula batu', desk: 'Teh melati diseduh langsung di gelas.', harga: 12000, tag: [] },
      { nama: 'Es dawet', desk: 'Cendol beras, santan, dan gula jawa cair.', harga: 20000, tag: [] },
      { nama: 'Jeruk nipis hangat', desk: 'Dengan madu.', harga: 15000, tag: ['tanpa kafein'] },
    ],
  },
  {
    kategori: 'Penutup',
    item: [
      { nama: 'Klepon', desk: 'Bola ketan isi gula jawa, berbalut kelapa parut.', harga: 18000, tag: ['vegetarian'] },
      { nama: 'Kolak pisang', desk: 'Pisang kepok dan ubi dalam santan gula jawa, hangat.', harga: 20000, tag: ['vegetarian'] },
    ],
  },
];

export const paketRombongan = [
  { id: 'sederhana', nama: 'Paket Sederhana', harga: 115000, isi: ['Nasi putih', 'Ayam kampung bumbu kuning', 'Sayur lodeh', 'Tempe mendoan', 'Teh tubruk'] },
  { id: 'rahayu', nama: 'Paket Rahayu', harga: 145000, isi: ['Nasi putih & nasi merah', 'Gudeg komplit', 'Mangut lele', 'Pecel', 'Tahu bacem', 'Es dawet'] },
  { id: 'kenduri', nama: 'Paket Kenduri', harga: 185000, isi: ['Nasi putih & nasi merah', 'Brongkos daging', 'Ayam kampung bumbu kuning', 'Urap', 'Perkedel', 'Klepon', 'Wedang uwuh'] },
];
export const rombongan = { min: 10, maks: 30, pajak: 0.1, uangMuka: 0.3 };
