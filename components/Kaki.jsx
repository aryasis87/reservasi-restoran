import Link from 'next/link';
import { resto, nav } from '@/lib/data';

export default function Kaki() {
  return (
    <footer className="relative z-10 mt-16 border-t border-[#ddc1b3]/60 bg-[#f5ede4]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold text-amber-900">{resto.name}</p>
          <p className="mt-2 text-sm text-stone-700">{resto.tagline}. {resto.kota}.</p>
        </div>
        <div className="text-sm text-stone-700">
          <p className="font-semibold text-stone-900">Jam buka</p>
          <p className="mt-2">{resto.jamBuka}</p>
          <p className="mt-1">Meja ditahan {resto.tahanMeja} menit dari jam reservasi.</p>
        </div>
        <nav aria-label="Kaki" className="text-sm">
          <ul className="space-y-1.5">
            {nav.map((n) => <li key={n.href}><Link href={n.href} className="text-stone-700 underline-offset-4 hover:text-amber-800 hover:underline">{n.label}</Link></li>)}
          </ul>
        </nav>
      </div>
      <p className="border-t border-[#ddc1b3]/60 px-5 py-4 text-center text-xs text-stone-700">
        Purwarupa desain: restoran, menu, dan harga fiktif. Reservasi hanya disimpan di peramban ini.
      </p>
    </footer>
  );
}
