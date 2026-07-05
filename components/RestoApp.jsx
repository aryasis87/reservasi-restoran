'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, Users, Minus, Plus, Check, Clock, User, Phone } from 'lucide-react';
import { resto, seedReservations } from '@/lib/data';
import { useLocalStorage } from '@/lib/useLocalStorage';
import FloorMap from './FloorMap';

const today = new Date().toISOString().slice(0, 10);
const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
// 10 hari ke depan untuk kartu tanggal.
const dayCards = Array.from({ length: 10 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() + i);
  return { iso: d.toISOString().slice(0, 10), day: DAYS[d.getDay()], num: d.getDate() };
});

export default function RestoApp() {
  const [reservations, setReservations] = useLocalStorage('resto.reservations', seedReservations);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(resto.times[3]);
  const [guests, setGuests] = useState(2);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [done, setDone] = useState(null);

  const bookedIds = useMemo(
    () => reservations.filter((r) => r.date === date && r.time === time).map((r) => r.tableId),
    [reservations, date, time]
  );
  const selected = resto.tables.find((t) => t.id === selectedId) || null;

  useEffect(() => {
    if (selectedId && (bookedIds.includes(selectedId) || (selected && selected.seats < guests))) setSelectedId(null);
  }, [bookedIds, guests, selectedId, selected]);

  const confirm = (e) => {
    e.preventDefault();
    if (!selected || !form.name.trim() || !form.phone.trim()) return;
    const booking = { id: `r-${Date.now()}`, date, time, tableId: selected.id, guests, ...form };
    setReservations((p) => [...p, booking]);
    setDone(booking);
    setSelectedId(null);
    setForm({ name: '', phone: '' });
  };

  return (
    <div className="relative min-h-screen">
      <div className="bg-linen pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden="true" />

      {/* Top app bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-center border-b border-[#ddc1b3]/40 bg-[#fff8f6]/90 backdrop-blur">
        <span className="flex items-center gap-2 font-display text-2xl font-bold text-amber-800">
          <UtensilsCrossed size={22} /> {resto.name}
        </span>
      </header>

      <main className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-[5fr_7fr]">
        {/* Kolom kiri: setup */}
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="font-display text-4xl font-bold leading-tight text-stone-900 md:text-5xl">Reservasi Meja</h1>
            <p className="mt-2 text-stone-500">Rencanakan kunjungan Anda untuk pengalaman kuliner yang autentik.</p>
          </div>

          {/* Tanggal */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-stone-800">Tanggal</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {dayCards.map((d) => {
                const active = date === d.iso;
                return (
                  <button key={d.iso} onClick={() => setDate(d.iso)}
                    className={`flex w-16 shrink-0 flex-col items-center gap-1 rounded-xl border py-3 transition ${
                      active ? 'border-amber-700 bg-amber-700 text-white shadow-md' : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}>
                    <span className="text-xs uppercase">{d.day}</span>
                    <span className="font-display text-xl font-bold">{d.num}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Waktu */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-stone-800">Waktu</h3>
            <div className="grid grid-cols-3 gap-3">
              {resto.times.map((t) => {
                const active = time === t;
                return (
                  <button key={t} onClick={() => setTime(t)}
                    className={`rounded-lg border py-3 text-sm font-semibold transition ${
                      active ? 'border-amber-700 bg-amber-50 text-amber-800 shadow-sm' : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                    }`}>
                    {t}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Tamu */}
          <section>
            <h3 className="mb-3 text-lg font-semibold text-stone-800">Jumlah Tamu</h3>
            <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4">
              <span className="flex items-center gap-2 text-stone-600"><Users size={18} /> Dewasa &amp; Anak</span>
              <div className="flex items-center gap-4">
                <button onClick={() => setGuests((g) => Math.max(1, g - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100" aria-label="Kurangi"><Minus size={16} /></button>
                <span className="w-5 text-center font-display text-xl font-bold text-stone-900">{guests}</span>
                <button onClick={() => setGuests((g) => Math.min(12, g + 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-200 text-stone-600 hover:bg-stone-100" aria-label="Tambah"><Plus size={16} /></button>
              </div>
            </div>
          </section>
        </div>

        {/* Kolom kanan: denah */}
        <div className="flex flex-col">
          <h3 className="mb-3 text-lg font-semibold text-stone-800">Pilih Meja</h3>
          <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
            <FloorMap tables={resto.tables} bookedIds={bookedIds} guests={guests} selectedId={selectedId} onSelect={setSelectedId} />
          </div>

          {/* Panel pemesanan */}
          <div className="mt-5">
            {!selected ? (
              <p className="rounded-2xl border border-dashed border-stone-300 bg-white/60 py-6 text-center text-sm text-stone-500">
                Pilih meja <span className="font-semibold text-emerald-600">hijau</span> di denah untuk melanjutkan.
              </p>
            ) : (
              <motion.form initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={confirm} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-3">
                  <p className="font-display text-xl font-bold text-amber-800">Meja {selected.id}</p>
                  <p className="flex items-center gap-3 text-sm text-stone-500">
                    <span className="flex items-center gap-1"><Users size={14} />{selected.seats}</span>
                    <span className="flex items-center gap-1"><Clock size={14} />{time}</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2.5 focus-within:border-amber-500">
                    <User size={16} className="text-stone-400" />
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama" required className="w-full bg-transparent text-sm outline-none" />
                  </label>
                  <label className="flex items-center gap-2 rounded-xl border border-stone-200 px-3 py-2.5 focus-within:border-amber-500">
                    <Phone size={16} className="text-stone-400" />
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="No. WhatsApp" required className="w-full bg-transparent text-sm outline-none" />
                  </label>
                </div>
                <button type="submit" className="mt-4 w-full rounded-xl bg-amber-700 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-800">Konfirmasi Reservasi</button>
              </motion.form>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {done && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDone(null)}>
            <motion.div initial={{ scale: 0.9, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white p-7 text-center shadow-xl">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white"><Check size={28} /></div>
              <h3 className="mt-4 font-display text-2xl font-bold text-stone-800">Reservasi Berhasil!</h3>
              <p className="mt-1 text-sm text-stone-500">Sampai jumpa, {done.name} 🍽️</p>
              <div className="mt-5 space-y-1.5 rounded-xl bg-stone-50 p-4 text-left text-sm text-stone-600">
                <p className="flex justify-between"><span>Meja</span><span className="font-semibold text-stone-800">{done.tableId}</span></p>
                <p className="flex justify-between"><span>Tanggal</span><span className="font-semibold text-stone-800">{done.date}</span></p>
                <p className="flex justify-between"><span>Jam</span><span className="font-semibold text-stone-800">{done.time} WIB</span></p>
                <p className="flex justify-between"><span>Tamu</span><span className="font-semibold text-stone-800">{done.guests} orang</span></p>
              </div>
              <button onClick={() => setDone(null)} className="mt-5 w-full rounded-xl border border-stone-300 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-50">Selesai</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
