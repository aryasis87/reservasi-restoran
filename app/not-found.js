import Link from 'next/link';

export const metadata = { title: 'Halaman tidak ditemukan' };

export default function NotFound() {
  return (
    <main className="relative z-10 mx-auto max-w-xl px-5 py-24 text-center">
      <p className="font-display text-7xl font-bold text-amber-800">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-stone-900">Meja ini tidak ada di denah</h1>
      <p className="mt-3 text-stone-700">Halaman yang kamu cari tidak ditemukan. Mungkin tautannya salah ketik.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-xl bg-amber-700 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800">Pesan meja</Link>
        <Link href="/menu" className="rounded-xl border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-800 hover:bg-stone-50">Lihat menu</Link>
      </div>
    </main>
  );
}
