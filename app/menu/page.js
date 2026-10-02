import Link from 'next/link';
import { menu, resto } from '@/lib/data';
import { rupiah } from '@/lib/waktu';

export const metadata = {
  title: 'Menu',
  description: 'Menu Pawon Lirih: gudeg, brongkos, mangut lele, sayur lodeh, wedang uwuh, dan jajanan pasar — dengan tanda pedas, vegetarian, dan kacang.',
  alternates: { canonical: '/menu' },
};

const WARNA = {
  pedas: 'bg-red-50 text-red-800', 'sangat pedas': 'bg-red-100 text-red-900', 'pedas ringan': 'bg-orange-50 text-orange-900',
  vegetarian: 'bg-emerald-50 text-emerald-900', kacang: 'bg-amber-100 text-amber-900', 'tanpa kafein': 'bg-sky-50 text-sky-900',
};

export default function MenuPage() {
  return (
    <main className="relative z-10 mx-auto max-w-4xl px-5 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">{resto.name}</p>
      <h1 className="mt-1 font-display text-4xl font-bold text-stone-900 md:text-5xl">Menu</h1>
      <p className="mt-3 max-w-2xl text-stone-700">Porsi dimasak untuk berbagi di tengah meja. Harga sudah termasuk nasi untuk gudeg; belum termasuk pajak restoran 10%.</p>

      <nav aria-label="Kategori menu" className="mt-6 flex flex-wrap gap-2">
        {menu.map((k) => (
          <a key={k.kategori} href={`#${k.kategori.toLowerCase().replace(/\s+/g, '-')}`} className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-sm font-semibold text-stone-800 transition hover:border-amber-700 hover:text-amber-800">{k.kategori}</a>
        ))}
      </nav>

      <div className="mt-10 space-y-12">
        {menu.map((k) => (
          <section key={k.kategori} id={k.kategori.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-24">
            <h2 className="flex items-center gap-4 font-display text-2xl font-bold text-amber-900">
              {k.kategori}<span className="h-px flex-1 bg-[#ddc1b3]" aria-hidden="true" />
            </h2>
            <ul className="mt-4 divide-y divide-stone-200">
              {k.item.map((m) => (
                <li key={m.nama} className="flex items-baseline justify-between gap-6 py-4">
                  <div className="min-w-0">
                    <p className="font-semibold text-stone-900">{m.nama}</p>
                    <p className="mt-0.5 text-sm text-stone-700">{m.desk}</p>
                    {m.tag.length > 0 && (
                      <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Keterangan">
                        {m.tag.map((t) => <li key={t} className={`rounded-full px-2 py-0.5 text-xs font-semibold ${WARNA[t] || 'bg-stone-100 text-stone-800'}`}>{t}</li>)}
                      </ul>
                    )}
                  </div>
                  <p className="shrink-0 font-display text-lg font-bold text-stone-900">{rupiah(m.harga)}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-[#ddc1b3] bg-white p-6 text-center">
        <p className="font-display text-2xl font-bold text-stone-900">Sudah tahu mau pesan apa?</p>
        <p className="mt-1 text-sm text-stone-700">Menu dipesan di meja. Yang perlu dipesan dulu hanya tempat duduknya.</p>
        <Link href="/" className="mt-4 inline-block rounded-xl bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-800">Pesan meja</Link>
      </div>
    </main>
  );
}
