// Konfigurasi restoran + denah meja. Posisi x/y dalam persen pada area denah.
const today = new Date().toISOString().slice(0, 10);

export const resto = {
  name: 'Saung Rasa',
  tagline: 'Masakan Nusantara dalam suasana hangat',
  times: ['11:00', '12:00', '13:00', '18:00', '19:00', '20:00'],
  // shape: round | square | long
  tables: [
    { id: 'T1', x: 12, y: 16, seats: 2, shape: 'round' },
    { id: 'T2', x: 32, y: 16, seats: 2, shape: 'round' },
    { id: 'T3', x: 54, y: 15, seats: 4, shape: 'square' },
    { id: 'T4', x: 80, y: 16, seats: 4, shape: 'square' },
    { id: 'T5', x: 16, y: 44, seats: 4, shape: 'square' },
    { id: 'T6', x: 45, y: 45, seats: 6, shape: 'long' },
    { id: 'T7', x: 82, y: 44, seats: 2, shape: 'round' },
    { id: 'T8', x: 14, y: 76, seats: 4, shape: 'square' },
    { id: 'T9', x: 38, y: 77, seats: 2, shape: 'round' },
    { id: 'T10', x: 64, y: 76, seats: 8, shape: 'long' },
    { id: 'T11', x: 88, y: 77, seats: 2, shape: 'round' },
  ],
};

// Reservasi awal (dummy) supaya denah terlihat "hidup".
export const seedReservations = [
  { id: 'r1', date: today, time: '19:00', tableId: 'T3', guests: 4, name: 'Andi', phone: '0812' },
  { id: 'r2', date: today, time: '19:00', tableId: 'T6', guests: 5, name: 'Bunga', phone: '0813' },
  { id: 'r3', date: today, time: '19:00', tableId: 'T9', guests: 2, name: 'Citra', phone: '0814' },
];
