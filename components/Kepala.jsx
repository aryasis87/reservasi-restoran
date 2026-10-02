'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UtensilsCrossed } from 'lucide-react';
import { resto, nav } from '@/lib/data';

export default function Kepala() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-30 border-b border-[#ddc1b3]/50 bg-[#fff8f6]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold text-amber-800">
          <UtensilsCrossed size={22} aria-hidden="true" /> {resto.name}
        </Link>
        <nav aria-label="Utama" className="-mx-1 flex gap-1 overflow-x-auto text-sm font-semibold">
          {nav.map((n) => {
            const aktif = n.href === '/' ? path === '/' : path?.startsWith(n.href);
            return (
              <Link key={n.href} href={n.href} aria-current={aktif ? 'page' : undefined}
                className={`shrink-0 rounded-full px-3 py-1.5 transition ${aktif ? 'bg-amber-700 text-white' : 'text-stone-700 hover:bg-amber-50 hover:text-amber-800'}`}>
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
