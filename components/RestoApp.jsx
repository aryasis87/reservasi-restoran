'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Minus, Plus, Check, Clock, User, Phone, MessageSquare, MapPin } from 'lucide-react';
import { resto, terisiContoh } from '@/lib/data';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { useHariIni } from '@/lib/useHariIni';
import { tambahHari, hariKe, fmtTanggal, sudahLewat, kodePesan } from '@/lib/waktu';
import FloorMap from './FloorMap';

const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const KOSONG = { nama: '', hp: '', catatan: '' };

export default function RestoApp() {
  const { hari, sekarang } = useHariIni(60);
  const [punyaku, setPunyaku] = useLocalStorage('pawonlirih.reservasi', []);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [guests, setGuests] = useState(2);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(KOSONG);
  const [done, setDone] = useState(null);

  const lewat = (d, t) => (sekarang ? sudahLewat(d, t, 30, sekarang) : false);
  const libur = (d) => resto.libur.includes(hariKe(d));
  const bisaDipesan = (d) => !libur(d) && resto.times.some((t) => !lewat(d, t));

  // 10 hari ke depan, dihitung di peramban dalam WIB.
  const kartuHari = useMemo(() => (hari ? Array.from({ length: 10 }, (_, i) => tambahHari(hari, i)) : []), [hari]);

  // Pilih otomatis hari dan jam pertama yang masih bisa dipesan.
  useEffect(() => {
    if (!hari || date) return;
    const d = kartuHari.find(bisaDipesan);
    if (d) setDate(d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hari, kartuHari]);
  useEffect(() => {
    if (!date) return;
    if (!time || lewat(date, time)) setTime(resto.times.find((t) => !lewat(date, t)) || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, sekarang]);

  const bookedIds = useMemo(() => {
    if (!date || !time) return [];
    return [...terisiContoh(date, time), ...punyaku.filter((r) => r.date === date && r.time === time).map((r) => r.tableId)];
  }, [punyaku, date, time]);
  const selected = resto.tables.find((t) => t.id === selectedId) || null;

  useEffect(() => {
    if (selectedId && (bookedIds.includes(selectedId) || (selected && selected.seats < guests))) setSelectedId(null);
  }, [bookedIds, guests, selectedId, selected]);

  const confirm = (e) => {
    e.preventDefault();
    if (!selected || !form.nama.trim() || !form.hp.trim()) return;
    const id = `r-${Date.now()}`;
    const booking = { id, kode: kodePesan('PL', id), date, time, tableId: selected.id, zona: selected.zona, guests, ...form, dibuat: new Date().toISOString() };
    setPunyaku((p) => [...p, booking]);
    setDone(booking);
    setSelectedId(null);
    setForm(KOSONG);
  };

  const pilihan = (aktif) => `transition ${aktif ? 'border-amber-700 bg-amber-700 text-white shadow-md' : 'border-stone-200 bg-white text-stone-800 hover:bg-stone-50'}`;

  return (
    <div className="relative">
      <div className="bg-linen pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden="true" />

      <main className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-[5fr_7fr]">
        <div className="flex min-w-0 flex-col gap-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">{resto.kota}</p>
            <h1 className="mt-1 font-display text-4xl font-bold leading-tight text-stone-900 md:text-5xl">Pesan meja</h1>
            <p className="mt-2 text-stone-700">Pilih hari, jam, dan jumlah tamu — lalu meja yang kamu suka langsung di denah. Satu meja untuk {resto.durasi} menit.</p>
          </div>

          <section aria-labelledby="h-tanggal">
            <h2 id="h-tanggal" className="mb-3 text-lg font-semibold text-stone-900">Tanggal</h2>
            {!hari ? <p className="text-sm text-stone-600">Memuat tanggal…</p> : (
              <div className="relative flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {kartuHari.map((d) => {
                  const tutup = libur(d);
                  const habis = !tutup && !bisaDipesan(d);
                  return (
                    <button key={d} type="button" disabled={tutup || habis} onClick={() => { setDate(d); setSelectedId(null); }} aria-pressed={date === d}
                      aria-label={`${fmtTanggal(d)}${tutup ? ', tutup' : habis ? ', jam reservasi sudah lewat' : ''}`}
                      className={`flex w-16 shrink-0 flex-col items-center gap-1 rounded-xl border py-3 disabled:cursor-not-allowed disabled:border-dashed disabled:bg-transparent disabled:text-stone-500 ${pilihan(date === d)}`}>
                      <span className="text-xs uppercase">{HARI[hariKe(d)]}</span>
                      <span className="font-display text-xl font-bold">{Number(d.slice(8))}</span>
                      {tutup && <span className="text-[10px] font-semibold">Tutup</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section aria-labelledby="h-waktu">
            <h2 id="h-waktu" className="mb-3 text-lg font-semibold text-stone-900">Jam datang</h2>
            <div className="grid grid-cols-3 gap-3">
              {resto.times.map((t) => {
                const habis = date ? lewat(date, t) : true;
                return (
                  <button key={t} type="button" disabled={habis} onClick={() => setTime(t)} aria-pressed={time === t}
                    className={`rounded-lg border py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-500 disabled:line-through ${pilihan(time === t)}`}>
                    {t}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-stone-600">Siang 11.00–14.30, malam 17.30–21.30. Jam yang tinggal kurang dari 30 menit tidak bisa dipesan.</p>
          </section>

          <section aria-labelledby="h-tamu">
            <h2 id="h-tamu" className="mb-3 text-lg font-semibold text-stone-900">Jumlah tamu</h2>
            <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4">
              <span className="flex items-center gap-2 text-stone-700"><Users size={18} aria-hidden="true" /> Dewasa &amp; anak</span>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100" aria-label="Kurangi tamu"><Minus size={16} /></button>
                <span className="w-5 text-center font-display text-xl font-bold text-stone-900" aria-live="polite">{guests}</span>
                <button type="button" onClick={() => setGuests((g) => Math.min(resto.maksTamu, g + 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100" aria-label="Tambah tamu"><Plus size={16} /></button>
              </div>
            </div>
            {guests >= resto.maksTamu && (
              <p className="mt-2 text-sm text-stone-700">Lebih dari {resto.maksTamu} orang? <Link href="/rombongan" className="font-semibold text-amber-800 underline underline-offset-4">Pesan sebagai rombongan</Link>.</p>
            )}
          </section>
        </div>

        <div className="flex min-w-0 flex-col">
          <h2 className="mb-3 text-lg font-semibold text-stone-900">Pilih meja{date && time ? <span className="font-normal text-stone-600"> · {fmtTanggal(date, { weekday: 'short', day: 'numeric', month: 'short' })}, {time}</span> : null}</h2>
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
            {date && time ? (
              <FloorMap tables={resto.tables} bookedIds={bookedIds} guests={guests} selectedId={selectedId} onSelect={setSelectedId} />
            ) : (
              <p className="py-16 text-center text-sm text-stone-600">{hari ? 'Tidak ada jam yang tersisa dalam sepuluh hari ke depan.' : 'Memuat denah…'}</p>
            )}
          </div>

          <div className="mt-5">
            {!selected ? (
              <p className="rounded-2xl border border-dashed border-stone-300 bg-white/60 py-6 text-center text-sm text-stone-700">
                Pilih meja bertepi <span className="font-semibold text-emerald-800">hijau</span> di denah untuk melanjutkan.
              </p>
            ) : (
              <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={confirm} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
                  <p className="font-display text-xl font-bold text-amber-800">Meja {selected.id}</p>
                  <p className="flex items-center gap-3 text-sm text-stone-700">
                    <span className="flex items-center gap-1"><MapPin size={14} aria-hidden="true" />{selected.zona}</span>
                    <span className="flex items-center gap-1"><Users size={14} aria-hidden="true" />{selected.seats} kursi</span>
                    <span className="flex items-center gap-1"><Clock size={14} aria-hidden="true" />{time}</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-2 rounded-xl border border-stone-300 px-3 py-2.5 focus-within:border-amber-600">
                    <User size={16} className="text-stone-500" aria-hidden="true" />
                    <span className="sr-only">Nama</span>
                    <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} placeholder="Nama" autoComplete="name" required className="w-full bg-transparent text-sm outline-none" />
                  </label>
                  <label className="flex items-center gap-2 rounded-xl border border-stone-300 px-3 py-2.5 focus-within:border-amber-600">
                    <Phone size={16} className="text-stone-500" aria-hidden="true" />
                    <span className="sr-only">Nomor HP</span>
                    <input type="tel" value={form.hp} onChange={(e) => setForm({ ...form, hp: e.target.value })} placeholder="Nomor HP" autoComplete="tel" required className="w-full bg-transparent text-sm outline-none" />
                  </label>
                  <label className="flex items-start gap-2 rounded-xl border border-stone-300 px-3 py-2.5 focus-within:border-amber-600 sm:col-span-2">
                    <MessageSquare size={16} className="mt-0.5 text-stone-500" aria-hidden="true" />
                    <span className="sr-only">Catatan</span>
                    <textarea value={form.catatan} onChange={(e) => setForm({ ...form, catatan: e.target.value })} placeholder="Catatan: alergi, kursi bayi, ulang tahun (opsional)" rows={2} className="w-full resize-none bg-transparent text-sm outline-none" />
                  </label>
                </div>
                <button type="submit" className="mt-4 w-full rounded-xl bg-amber-700 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-800">Simpan reservasi</button>
                <p className="mt-2 text-center text-xs text-stone-600">Purwarupa: reservasi disimpan di peramban ini, tidak dikirim ke restoran.</p>
              </motion.form>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {done && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDone(null)}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="judul-selesai" initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white"><Check size={28} /></div>
              <h2 id="judul-selesai" className="mt-4 font-display text-2xl font-bold text-stone-900">Reservasi tersimpan</h2>
              <p className="mt-1 text-sm text-stone-700">Kode <span className="font-mono font-semibold text-stone-900">{done.kode}</span> · atas nama {done.nama}</p>
              <dl className="mt-5 space-y-1.5 rounded-xl bg-stone-50 p-4 text-left text-sm text-stone-700">
                <div className="flex justify-between gap-4"><dt>Meja</dt><dd className="font-semibold text-stone-900">{done.tableId} · {done.zona}</dd></div>
                <div className="flex justify-between gap-4"><dt>Tanggal</dt><dd className="font-semibold text-stone-900">{fmtTanggal(done.date)}</dd></div>
                <div className="flex justify-between gap-4"><dt>Jam</dt><dd className="font-semibold text-stone-900">{done.time} WIB</dd></div>
                <div className="flex justify-between gap-4"><dt>Tamu</dt><dd className="font-semibold text-stone-900">{done.guests} orang</dd></div>
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-stone-600">Ini purwarupa: tidak ada yang dikirim ke restoran. Reservasi ini tersimpan di peramban dan bisa dilihat atau dibatalkan di Reservasi saya.</p>
              <div className="mt-5 grid grid-cols-2 gap-2">
                <Link href="/reservasi" className="rounded-xl bg-amber-700 py-3 text-sm font-semibold text-white transition hover:bg-amber-800">Reservasi saya</Link>
                <button type="button" onClick={() => setDone(null)} className="rounded-xl border border-stone-300 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-50">Tutup</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
