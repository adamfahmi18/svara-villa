"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import type { Villa } from "@/lib/villas";
import { calculateStay, nightsBetween } from "@/lib/booking";
import { formatIdr } from "@/lib/villas";

function GuestRow({ label, hint, value, min, canIncrease, onChange }: { label: string; hint: string; value: number; min: number; canIncrease: boolean; onChange: (value: number) => void }) {
  return <div className="guest-row"><div><strong>{label}</strong><small>{hint}</small></div><div><button type="button" disabled={value <= min} aria-label={`Decrease ${label}`} onClick={() => onChange(Math.max(min, value - 1))}><Minus /></button><span>{value}</span><button type="button" disabled={!canIncrease} aria-label={`Increase ${label}`} onClick={() => onChange(value + 1)}><Plus /></button></div></div>;
}

export function BookingWidget({ villa }: { villa: Villa }) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [today, setToday] = useState("");
  const [error, setError] = useState("");
  const nights = nightsBetween(checkIn, checkOut);
  const totals = useMemo(() => calculateStay(villa.price, nights), [villa.price, nights]);
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  const reserve = () => {
    if (!checkIn || !checkOut) { setError("Choose your check-in and check-out dates."); return; }
    if (nights < 1) { setError("Check-out must be after check-in."); return; }
    setError("");
    router.push(`/booking?villa=${villa.slug}&checkin=${checkIn}&checkout=${checkOut}&adults=${adults}&children=${children}`);
  };

  return <>
    <aside className="booking-widget" aria-label="Check availability">
      <div className="booking-price"><span>From</span><strong>{formatIdr(villa.price)}</strong><small>/ night</small></div>
      <div className="date-fields"><label>Check-in<input type="date" min={today} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(""); }} /></label><label>Check-out<input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /></label></div>
      <div className="guest-selector"><GuestRow label="Adults" hint="Age 13+" value={adults} min={1} canIncrease={adults + children < villa.guests} onChange={setAdults} /><GuestRow label="Children" hint="Age 0–12" value={children} min={0} canIncrease={adults + children < villa.guests} onChange={setChildren} /></div>
      {nights > 0 ? <div className="price-breakdown"><div><span>{formatIdr(villa.price)} × {nights} nights</span><span>{formatIdr(totals.room)}</span></div><div><span>Service fee</span><span>{formatIdr(totals.serviceFee)}</span></div><div><span>Tax</span><span>{formatIdr(totals.tax)}</span></div><div className="price-total"><strong>Total</strong><strong>{formatIdr(totals.total)}</strong></div></div> : <p className="booking-note">Choose dates to see your stay total. No charge will be made in this demo.</p>}
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button className="button button-dark button-wide" type="button" onClick={reserve}>Reserve</button>
    </aside>
    <div className="mobile-booking-bar"><div><small>From</small><strong>{formatIdr(villa.price)}</strong></div><button className="button button-dark" onClick={reserve}>Check dates</button></div>
  </>;
}
