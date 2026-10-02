import FormRombongan from '@/components/FormRombongan';

export const metadata = {
  title: 'Rombongan',
  description: 'Pesan tempat untuk 10–30 orang di ruang belakang Pawon Lirih: pilih paket, lihat perkiraan biaya termasuk pajak, dan uang muka.',
  alternates: { canonical: '/rombongan' },
};

export default function RombonganPage() {
  return (
    <main className="relative z-10 mx-auto max-w-6xl px-5 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">10–30 orang</p>
      <h1 className="mt-1 font-display text-4xl font-bold text-stone-900 md:text-5xl">Makan bersama rombongan</h1>
      <p className="mt-3 max-w-2xl text-stone-700">Ruang belakang kami muat tiga puluh orang di dua meja panjang. Hidangan disajikan bersamaan, jadi pilih paketnya dulu.</p>
      <div className="mt-10"><FormRombongan /></div>
    </main>
  );
}
