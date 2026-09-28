export const BOOKING_STORAGE_KEY = "svara-villa-bookings-v1";
export const SERVICE_RATE = 0.08;
export const TAX_RATE = 0.11;

export const BOOKING_EXTRAS = [
  { name: "Airport Transfer", detail: "Private one-way airport pickup", price: 550000 },
  { name: "Floating Breakfast", detail: "Breakfast served in your villa pool", price: 380000 },
  { name: "Romantic Decoration", detail: "Flowers, candles, and an evening setup", price: 950000 },
  { name: "Extra Bed", detail: "Prepared with linen for the full stay", price: 700000 },
] as const;

export type BookingRecord = {
  reference: string;
  villaSlug: string;
  villaName: string;
  guest: { fullName: string; email: string; phone: string; country: string };
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  nights: number;
  extras: string[];
  subtotal: number;
  serviceFee: number;
  tax: number;
  total: number;
  payment: string;
  status: string;
  createdAt: string;
};

export function nightsBetween(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(`${checkIn}T12:00:00`);
  const end = new Date(`${checkOut}T12:00:00`);
  const nights = Math.round((end.getTime() - start.getTime()) / 86400000);
  return Math.max(0, nights);
}

export function calculateStay(price: number, nights: number, extras = 0) {
  const room = price * nights;
  const subtotal = room + extras;
  const serviceFee = Math.round(subtotal * SERVICE_RATE);
  const tax = Math.round((subtotal + serviceFee) * TAX_RATE);
  return { room, subtotal, serviceFee, tax, total: subtotal + serviceFee + tax };
}

export function readBookings(): BookingRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(BOOKING_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch { return []; }
}

export function saveBooking(booking: BookingRecord) {
  const bookings = readBookings();
  localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify([booking, ...bookings].slice(0, 10)));
}

export function createBookingRecord(input: Omit<BookingRecord, "reference" | "payment" | "status" | "createdAt">) {
  return {
    ...input,
    reference: `SV-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    payment: "Demo card ···· 4242",
    status: "Demo confirmed",
    createdAt: new Date().toISOString(),
  } satisfies BookingRecord;
}
