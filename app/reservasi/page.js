import DaftarReservasi from '@/components/DaftarReservasi';

export const metadata = {
  title: 'Reservasi saya',
  description: 'Lihat dan batalkan reservasi meja Pawon Lirih yang tersimpan di peramban ini.',
  alternates: { canonical: '/reservasi' },
  robots: { index: false, follow: true },
};

export default function ReservasiPage() {
  return (
    <main className="relative z-10 mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-4xl font-bold text-stone-900 md:text-5xl">Reservasi saya</h1>
      <p className="mt-3 max-w-2xl text-stone-700">Tersimpan di peramban ini saja. Membuka situs dari perangkat lain atau menghapus data peramban akan mengosongkan daftar ini.</p>
      <div className="mt-10"><DaftarReservasi /></div>
    </main>
  );
}
