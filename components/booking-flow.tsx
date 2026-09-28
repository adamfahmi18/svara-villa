"use client";

import Image from "next/image";
import Link from "@/components/site-link";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { BOOKING_EXTRAS, calculateStay, createBookingRecord, nightsBetween, saveBooking, type BookingRecord } from "@/lib/booking";
import { formatIdr, getVilla, villas } from "@/lib/villas";

const steps = ["Dates & Guests", "Guest Details", "Extras", "Review", "Payment", "Confirmed"];

type Guest = { fullName: string; email: string; phone: string; country: string };

export function BookingFlow() {
  const [step, setStep] = useState(1);
  const [villaSlug, setVillaSlug] = useState(villas[0].slug);
  const [checkIn, setCheckIn] = useState(""); const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2); const [children, setChildren] = useState(0);
  const [guest, setGuest] = useState<Guest>({ fullName: "", email: "", phone: "", country: "Indonesia" });
  const [extras, setExtras] = useState<string[]>([]); const [error, setError] = useState("");
  const [today, setToday] = useState(""); const [booking, setBooking] = useState<BookingRecord | null>(null);
  const villa = getVilla(villaSlug) ?? villas[0]; const nights = nightsBetween(checkIn, checkOut);
  const extrasTotal = BOOKING_EXTRAS.filter((item) => extras.includes(item.name)).reduce((sum, item) => sum + item.price, 0);
  const totals = useMemo(() => calculateStay(villa.price, nights, extrasTotal), [villa.price, nights, extrasTotal]);

  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    const query = new URLSearchParams(window.location.search);
    const requestedVilla = query.get("villa"); if (requestedVilla && getVilla(requestedVilla)) setVillaSlug(requestedVilla);
    setCheckIn(query.get("checkin") ?? ""); setCheckOut(query.get("checkout") ?? "");
    setAdults(Number(query.get("adults")) || 2); setChildren(Number(query.get("children")) || 0);
  }, []);

  const next = () => {
    if (step === 1 && (!checkIn || !checkOut || nights < 1)) { setError("Choose valid check-in and check-out dates."); return; }
    if (step === 2 && (!guest.fullName.trim() || !/^\S+@\S+\.\S+$/.test(guest.email) || !guest.phone.trim() || !guest.country.trim())) { setError("Complete all guest details with a valid email address."); return; }
    setError(""); setStep((value) => Math.min(6, value + 1)); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirm = () => {
    const record = createBookingRecord({ villaSlug: villa.slug, villaName: villa.name, guest, checkIn, checkOut, adults, children, nights, extras, subtotal: totals.subtotal, serviceFee: totals.serviceFee, tax: totals.tax, total: totals.total });
    saveBooking(record); setBooking(record); setStep(6); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const guestControl = (label: string, value: number, setValue: (value: number) => void, min: number, canIncrease: boolean) => <div className="guest-row"><div><strong>{label}</strong><small>{label === "Adults" ? "Age 13+" : "Age 0–12"}</small></div><div><button type="button" onClick={() => setValue(Math.max(min, value - 1))} aria-label={`Decrease ${label}`} disabled={value <= min}><Minus /></button><span>{value}</span><button type="button" onClick={() => setValue(value + 1)} aria-label={`Increase ${label}`} disabled={!canIncrease}><Plus /></button></div></div>;

  return <div className="booking-flow-shell">
    <header className="booking-flow-header"><p className="section-kicker">Secure reservation · Portfolio demo</p><h1>{step === 6 ? "Your stay is saved." : "Plan your stay."}</h1><p>This demonstration stores your booking only on this device. No payment is processed.</p></header>
    <div className="booking-progress" aria-label={`Booking step ${step} of 6`}>{steps.map((label, index) => <div key={label} className={step >= index + 1 ? "active" : ""}><span>{step > index + 1 ? <Check /> : index + 1}</span><small>{label}</small></div>)}</div>
    {step === 6 && booking ? <section className="booking-success"><div className="success-mark"><Check /></div><p className="section-kicker">Booking reference</p><h2>{booking.reference}</h2><p>Thanks, {booking.guest.fullName.split(" ")[0]}. Your demo stay at {booking.villaName} has been saved on this device.</p><dl><div><dt>Villa</dt><dd>{booking.villaName}</dd></div><div><dt>Dates</dt><dd>{booking.checkIn} — {booking.checkOut}</dd></div><div><dt>Guests</dt><dd>{booking.adults} adults{booking.children ? `, ${booking.children} children` : ""}</dd></div><div><dt>Total</dt><dd>{formatIdr(booking.total)}</dd></div></dl><div className="success-actions"><Link className="button button-dark" href={`/my-booking?ref=${booking.reference}`}>View booking</Link><Link className="text-link" href="/">Back home</Link></div></section> :
    <div className="booking-flow-layout">
      <section className="booking-step-panel">
        <div className="booking-step-label"><span>0{step}</span><p>{steps[step - 1]}</p></div>
        {step === 1 ? <div className="booking-fields"><label>Choose villa<select value={villaSlug} onChange={(e) => { const nextVilla = getVilla(e.target.value); setVillaSlug(e.target.value); if (nextVilla && adults + children > nextVilla.guests) { setAdults(Math.min(adults, nextVilla.guests)); setChildren(Math.max(0, nextVilla.guests - Math.min(adults, nextVilla.guests))); } }}>{villas.map((item) => <option key={item.slug} value={item.slug}>{item.name} · up to {item.guests} guests</option>)}</select></label><div className="date-fields"><label>Check-in<input type="date" min={today} value={checkIn} onChange={(e) => { setCheckIn(e.target.value); if (checkOut && e.target.value >= checkOut) setCheckOut(""); }} /></label><label>Check-out<input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /></label></div><div className="guest-selector">{guestControl("Adults", adults, setAdults, 1, adults + children < villa.guests)}{guestControl("Children", children, setChildren, 0, adults + children < villa.guests)}</div></div> : null}
        {step === 2 ? <div className="booking-fields two-column"><label>Full name<input type="text" autoComplete="name" value={guest.fullName} onChange={(e) => setGuest({ ...guest, fullName: e.target.value })} /></label><label>Email<input type="email" autoComplete="email" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} /></label><label>Phone<input type="tel" autoComplete="tel" value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} /></label><label>Country<input type="text" autoComplete="country-name" value={guest.country} onChange={(e) => setGuest({ ...guest, country: e.target.value })} /></label></div> : null}
        {step === 3 ? <div className="extras-list">{BOOKING_EXTRAS.map((extra) => { const selected = extras.includes(extra.name); return <label key={extra.name} className={selected ? "selected" : ""}><input type="checkbox" checked={selected} onChange={() => setExtras((current) => current.includes(extra.name) ? current.filter((item) => item !== extra.name) : [...current, extra.name])} /><span><strong>{extra.name}</strong><small>{extra.detail}</small></span><b>{formatIdr(extra.price)}</b></label>; })}</div> : null}
        {step === 4 ? <div className="review-grid"><div><small>Villa</small><strong>{villa.name}</strong></div><div><small>Dates</small><strong>{checkIn} — {checkOut}</strong></div><div><small>Stay</small><strong>{nights} nights · {adults + children} guests</strong></div><div><small>Guest</small><strong>{guest.fullName}</strong><span>{guest.email}</span></div><div className="review-extras"><small>Extras</small><strong>{extras.length ? extras.join(" · ") : "No extras selected"}</strong></div></div> : null}
        {step === 5 ? <div className="payment-demo"><div className="demo-notice"><strong>Demo payment</strong><span>No card data is transmitted or charged.</span></div><label>Name on card<input type="text" defaultValue={guest.fullName} /></label><label>Card number<input type="text" inputMode="numeric" defaultValue="4242 4242 4242 4242" maxLength={19} /></label><div><label>Expiry<input type="text" defaultValue="12 / 30" /></label><label>CVC<input type="text" inputMode="numeric" defaultValue="123" maxLength={4} /></label></div></div> : null}
        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <div className="booking-step-actions">{step > 1 ? <button className="text-button" type="button" onClick={() => setStep((value) => value - 1)}><ChevronLeft />Back</button> : <span />}{step < 5 ? <button className="button button-dark" type="button" onClick={next}>Continue <ChevronRight /></button> : <button className="button button-dark" type="button" onClick={confirm}>Complete demo booking</button>}</div>
      </section>
      <aside className="booking-summary"><div className="booking-summary-image"><Image src={villa.image} alt={villa.name} fill sizes="380px" /></div><div><p className="section-kicker">Your stay</p><h2>{villa.name}</h2><span>{villa.label}</span></div><dl><div><dt>Dates</dt><dd>{checkIn && checkOut ? `${checkIn} — ${checkOut}` : "Not selected"}</dd></div><div><dt>Guests</dt><dd>{adults} adults{children ? ` · ${children} children` : ""}</dd></div><div><dt>Extras</dt><dd>{extras.length || "None"}</dd></div></dl><div className="price-breakdown"><div><span>Villa · {nights || 0} nights</span><span>{formatIdr(totals.room)}</span></div><div><span>Extras</span><span>{formatIdr(extrasTotal)}</span></div><div><span>Service fee</span><span>{formatIdr(totals.serviceFee)}</span></div><div><span>Tax</span><span>{formatIdr(totals.tax)}</span></div><div className="price-total"><strong>Total</strong><strong>{formatIdr(totals.total)}</strong></div></div></aside>
    </div>}
  </div>;
}
