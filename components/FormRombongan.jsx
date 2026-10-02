'use client';
import { useEffect, useMemo, useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import { paketRombongan, rombongan, resto } from '@/lib/data';
import { useHariIni } from '@/lib/useHariIni';
import { tambahHari, hariKe, fmtTanggal, rupiah, kodePesan } from '@/lib/waktu';

const KOSONG = { nama: '', hp: '', acara: '' };

export default function FormRombongan() {
  const { hari } = useHariIni();
  const [pax, setPax] = useState(15);
  const [paket, setPaket] = useState(paketRombongan[1].id);
  const [tanggal, setTanggal] = useState('');
  const [sesi, setSesi] = useState('malam');
  const [form, setForm] = useState(KOSONG);
  const [selesai, setSelesai] = useState(null);

  // Rombongan dipesan paling cepat 3 hari ke depan, maksimal 60 hari.
  const minTgl = hari ? tambahHari(hari, 3) : '';
  const maksTgl = hari ? tambahHari(hari, 60) : '';
  useEffect(() => {
    if (!minTgl || tanggal) return;
    let d = minTgl;
    while (resto.libur.includes(hariKe(d))) d = tambahHari(d, 1);
    setTanggal(d);
  }, [minTgl, tanggal]);

  const p = paketRombongan.find((x) => x.id === paket);
  const hitung = useMemo(() => {
    const sub = p.harga * pax;
    const pajak = sub * rombongan.pajak;
    const total = sub + pajak;
    return { sub, pajak, total, dp: total * rombongan.uangMuka };
  }, [p, pax]);
  const libur = tanggal && resto.libur.includes(hariKe(tanggal));
  const siap = tanggal && !libur && form.nama.trim() && form.hp.trim();

  const kirim = (e) => {
    e.preventDefault();
    if (!siap) return;
    const id = `g-${Date.now()}`;
    setSelesai({ kode: kodePesan('RB', id), pax, paket: p.nama, tanggal, sesi, ...hitung, nama: form.nama });
  };

  if (selesai) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-7 shadow-sm" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white"><Check size={24} /></span>
        <h2 className="mt-4 font-display text-2xl font-bold text-stone-900">Permintaan rombongan tercatat</h2>
        <p className="mt-2 text-stone-700">Kode <span className="font-mono font-semibold">{selesai.kode}</span> · {selesai.pax} orang, {selesai.paket}, {fmtTanggal(selesai.tanggal)} sesi {selesai.sesi}.</p>
        <p className="mt-4 rounded-xl bg-stone-50 p-4 text-sm leading-relaxed text-stone-700">Ini purwarupa, jadi tidak ada yang dikirim. Di restoran sungguhan, pengelola akan menghubungi {selesai.nama} untuk konfirmasi dan meminta uang muka {rupiah(selesai.dp)} agar ruangan ditahan.</p>
        <button type="button" onClick={() => { setSelesai(null); setForm(KOSONG); }} className="mt-5 rounded-xl border border-stone-300 px-5 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50">Buat permintaan lain</button>
      </div>
    );
  }

  const field = 'mt-1 w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none focus:border-amber-600';
  return (
    <form onSubmit={kirim} className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
      <div className="space-y-6">
        <fieldset>
          <legend className="text-lg font-semibold text-stone-900">Paket</legend>
          <div className="mt-3 space-y-3">
            {paketRombongan.map((x) => (
              <label key={x.id} className="relative block cursor-pointer">
                <input type="radio" name="paket" checked={paket === x.id} onChange={() => setPaket(x.id)} className="peer sr-only" />
                <span className="block rounded-2xl border border-stone-200 bg-white p-5 transition peer-checked:border-amber-700 peer-checked:ring-2 peer-checked:ring-amber-700/30 peer-focus-visible:ring-2 peer-focus-visible:ring-amber-700">
                  <span className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-xl font-bold text-stone-900">{x.nama}</span>
                    <span className="font-semibold text-amber-800">{rupiah(x.harga)}<span className="text-sm font-normal text-stone-600">/orang</span></span>
                  </span>
                  <span className="mt-2 block text-sm text-stone-700">{x.isi.join(' · ')}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-stone-900" id="l-pax">Jumlah orang</p>
            <div className="mt-1 flex items-center justify-between rounded-xl border border-stone-300 bg-white px-3 py-2" role="group" aria-labelledby="l-pax">
              <button type="button" onClick={() => setPax((n) => Math.max(rombongan.min, n - 1))} aria-label="Kurangi orang" className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100"><Minus size={14} /></button>
              <span className="font-display text-xl font-bold text-stone-900" aria-live="polite">{pax}</span>
              <button type="button" onClick={() => setPax((n) => Math.min(rombongan.maks, n + 1))} aria-label="Tambah orang" className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100"><Plus size={14} /></button>
            </div>
            <p className="mt-1 text-xs text-stone-600">{rombongan.min}–{rombongan.maks} orang, di ruang belakang.</p>
          </div>
          <label className="text-sm font-semibold text-stone-900">Tanggal
            <input type="date" value={tanggal} min={minTgl} max={maksTgl} onChange={(e) => setTanggal(e.target.value)} required className={field} />
            {libur && <span className="mt-1 block text-xs font-normal text-red-800">Senin kami tutup — pilih hari lain.</span>}
          </label>
          <label className="text-sm font-semibold text-stone-900">Sesi
            <select value={sesi} onChange={(e) => setSesi(e.target.value)} className={field}>
              <option value="siang">Siang (11.30–14.00)</option>
              <option value="malam">Malam (18.00–21.00)</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-stone-900">Acara (opsional)
            <input value={form.acara} onChange={(e) => setForm({ ...form, acara: e.target.value })} placeholder="Arisan, syukuran, reuni…" className={field} />
          </label>
          <label className="text-sm font-semibold text-stone-900">Nama pemesan
            <input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} autoComplete="name" required className={field} />
          </label>
          <label className="text-sm font-semibold text-stone-900">Nomor HP
            <input type="tel" value={form.hp} onChange={(e) => setForm({ ...form, hp: e.target.value })} autoComplete="tel" required className={field} />
          </label>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold text-stone-900">Perkiraan biaya</h2>
          <dl className="mt-4 space-y-2 text-sm text-stone-700">
            <div className="flex justify-between gap-4"><dt>{p.nama} × {pax}</dt><dd className="font-semibold text-stone-900">{rupiah(hitung.sub)}</dd></div>
            <div className="flex justify-between gap-4"><dt>Pajak restoran {rombongan.pajak * 100}%</dt><dd className="font-semibold text-stone-900">{rupiah(hitung.pajak)}</dd></div>
            <div className="flex justify-between gap-4 border-t border-stone-200 pt-3 text-base"><dt className="font-semibold text-stone-900">Total</dt><dd className="font-display text-2xl font-bold text-amber-800" aria-live="polite">{rupiah(hitung.total)}</dd></div>
            <div className="flex justify-between gap-4"><dt>Uang muka {rombongan.uangMuka * 100}% untuk menahan ruangan</dt><dd className="font-semibold text-stone-900">{rupiah(hitung.dp)}</dd></div>
          </dl>
          <button type="submit" disabled={!siap} className="mt-6 w-full rounded-xl bg-amber-700 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-50">Kirim permintaan</button>
          <p className="mt-2 text-center text-xs text-stone-600">Purwarupa: tidak ada data yang dikirim.</p>
        </div>
      </aside>
    </form>
  );
}
