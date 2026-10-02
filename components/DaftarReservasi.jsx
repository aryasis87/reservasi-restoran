'use client';
import Link from 'next/link';
import { CalendarDays, Clock, Users, MapPin, X } from 'lucide-react';
import { resto } from '@/lib/data';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useHariIni } from '@/lib/useHariIni';
import { fmtTanggal, sudahLewat, selisihHari } from '@/lib/waktu';

export default function DaftarReservasi() {
  const [punyaku, setPunyaku, loaded] = useLocalStorage('pawonlirih.reservasi', []);
  const { hari, sekarang } = useHariIni();

  if (!loaded || !hari) return <p className="py-16 text-center text-stone-600">Memuat reservasi…</p>;

  // Reservasi dianggap lewat setelah masa tahan meja habis.
  const urut = [...punyaku].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const nanti = urut.filter((r) => !sudahLewat(r.date, r.time, -resto.tahanMeja, sekarang));
  const lalu = urut.filter((r) => sudahLewat(r.date, r.time, -resto.tahanMeja, sekarang)).reverse();
  const batal = (id) => { if (window.confirm('Batalkan reservasi ini?')) setPunyaku((p) => p.filter((r) => r.id !== id)); };

  if (!punyaku.length) {
    return (
      <div className="rounded-2xl border border-dashed border-stone-300 bg-white/70 p-10 text-center">
        <p className="font-display text-2xl font-bold text-stone-900">Belum ada reservasi</p>
        <p className="mt-2 text-stone-700">Reservasi yang kamu buat di peramban ini akan muncul di sini.</p>
        <Link href="/" className="mt-5 inline-block rounded-xl bg-amber-700 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-800">Pesan meja</Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <section aria-labelledby="h-nanti">
        <h2 id="h-nanti" className="font-display text-2xl font-bold text-stone-900">Akan datang ({nanti.length})</h2>
        {nanti.length === 0 ? <p className="mt-3 text-stone-700">Tidak ada reservasi yang akan datang.</p> : (
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {nanti.map((r) => {
              const h = selisihHari(hari, r.date);
              return (
                <li key={r.id} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">{h === 0 ? 'Hari ini' : h === 1 ? 'Besok' : `${h} hari lagi`}</p>
                      <p className="mt-1 font-display text-xl font-bold text-stone-900">Meja {r.tableId}</p>
                    </div>
                    <p className="font-mono text-sm font-semibold text-stone-800">{r.kode}</p>
                  </div>
                  <ul className="mt-3 space-y-1 text-sm text-stone-700">
                    <li className="flex items-center gap-2"><CalendarDays size={15} aria-hidden="true" /> {fmtTanggal(r.date)}</li>
                    <li className="flex items-center gap-2"><Clock size={15} aria-hidden="true" /> {r.time} WIB · meja ditahan {resto.tahanMeja} menit</li>
                    <li className="flex items-center gap-2"><Users size={15} aria-hidden="true" /> {r.guests} orang · atas nama {r.nama}</li>
                    {r.zona && <li className="flex items-center gap-2"><MapPin size={15} aria-hidden="true" /> {r.zona}</li>}
                  </ul>
                  {r.catatan && <p className="mt-3 rounded-lg bg-stone-50 px-3 py-2 text-sm text-stone-700">“{r.catatan}”</p>}
                  <button type="button" onClick={() => batal(r.id)} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-red-800 hover:underline"><X size={15} aria-hidden="true" /> Batalkan</button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {lalu.length > 0 && (
        <section aria-labelledby="h-lalu">
          <h2 id="h-lalu" className="font-display text-2xl font-bold text-stone-900">Sudah lewat</h2>
          <ul className="mt-4 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
            {lalu.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm text-stone-700">
                <span>{fmtTanggal(r.date, { day: 'numeric', month: 'short', year: 'numeric' })}, {r.time} · Meja {r.tableId} · {r.guests} orang</span>
                <button type="button" onClick={() => setPunyaku((p) => p.filter((x) => x.id !== r.id))} className="font-semibold text-stone-800 hover:underline">Hapus</button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
