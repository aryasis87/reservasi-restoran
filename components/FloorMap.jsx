'use client';
import { Users } from 'lucide-react';

const SIZE = {
  round: 'h-14 w-14 rounded-full',
  square: 'h-16 w-16 rounded-xl',
  long: 'h-14 w-28 rounded-xl',
};

// Denah meja: tiap meja diposisikan absolut (persen). Klik meja tersedia untuk memilih.
export default function FloorMap({ tables, bookedIds, guests, selectedId, onSelect }) {
  return (
    <div>
      <div className="relative mx-auto aspect-[16/11] w-full overflow-hidden rounded-2xl border border-stone-200 bg-[repeating-linear-gradient(45deg,#f5efe6,#f5efe6_14px,#f2ebe0_14px,#f2ebe0_28px)] shadow-inner">
        {/* Label area */}
        <span className="absolute left-3 top-3 rounded-md bg-white/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-stone-400">
          Pintu Masuk
        </span>

        {tables.map((t) => {
          const booked = bookedIds.includes(t.id);
          const tooSmall = t.seats < guests;
          const selected = selectedId === t.id;
          const disabled = booked || tooSmall;

          const cls = selected
            ? 'border-amber-600 bg-amber-600 text-white shadow-lg scale-105'
            : booked
            ? 'border-stone-300 bg-stone-200 text-stone-400 cursor-not-allowed'
            : tooSmall
            ? 'border-stone-200 bg-white/60 text-stone-300 cursor-not-allowed'
            : 'border-emerald-500 bg-white text-emerald-700 hover:bg-emerald-50 hover:scale-105 cursor-pointer';

          return (
            <button
              key={t.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(t.id)}
              style={{ left: `${t.x}%`, top: `${t.y}%`, transform: 'translate(-50%, -50%)' }}
              aria-label={`Meja ${t.id}, ${t.seats} kursi${booked ? ', sudah dipesan' : tooSmall ? ', terlalu kecil' : ', tersedia'}`}
              aria-pressed={selected}
              className={`absolute flex flex-col items-center justify-center border-2 text-center transition-all duration-200 ${SIZE[t.shape]} ${cls}`}
            >
              <span className="text-xs font-bold leading-none">{t.id}</span>
              <span className="mt-0.5 flex items-center gap-0.5 text-[10px] font-medium leading-none">
                <Users size={9} /> {t.seats}
              </span>
            </button>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-stone-500">
        <Legend className="border-emerald-500 bg-white" label="Tersedia" />
        <Legend className="border-amber-600 bg-amber-600" label="Pilihanmu" />
        <Legend className="border-stone-300 bg-stone-200" label="Terisi" />
        <Legend className="border-stone-200 bg-white/60" label="Kursi kurang" />
      </div>
    </div>
  );
}

function Legend({ className, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-4 w-4 rounded border-2 ${className}`} /> {label}
    </span>
  );
}
