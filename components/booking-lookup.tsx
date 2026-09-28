"use client";

import { useEffect, useState } from "react";
import Link from "@/components/site-link";
import { Search } from "lucide-react";
import { readBookings, type BookingRecord } from "@/lib/booking";
import { formatIdr } from "@/lib/villas";

export function BookingLookup() {
  const [reference, setReference] = useState(""); const [result, setResult] = useState<BookingRecord | null>(null); const [searched, setSearched] = useState(false);
  const lookup = (value = reference) => { const normalized = value.trim().toUpperCase(); setReference(normalized); setResult(readBookings().find((item) => item.reference.toUpperCase() === normalized) ?? null); setSearched(true); };
  useEffect(() => { const query = new URLSearchParams(window.location.search); const ref = query.get("ref"); if (ref) lookup(ref); }, []);
  return <div className="lookup-shell"><header><p className="section-kicker">Your stay, this device</p><h1>Find my booking.</h1><p>Enter the reference created by the demo booking flow.</p></header><div className="lookup-form"><label htmlFor="reference">Booking reference</label><div><input id="reference" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="SV-2026-XXXXXX" /><button className="button button-dark" onClick={() => lookup()}><Search />Find booking</button></div></div>
  {result ? <section className="booking-found"><div className="booking-found-head"><div><p className="section-kicker">{result.status}</p><h2>{result.villaName}</h2><span>{result.reference}</span></div><Link className="text-link" href={`/villas/${result.villaSlug}`}>View villa</Link></div><dl><div><dt>Guest</dt><dd>{result.guest.fullName}</dd></div><div><dt>Dates</dt><dd>{result.checkIn} — {result.checkOut}</dd></div><div><dt>Guests</dt><dd>{result.adults} adults{result.children ? ` · ${result.children} children` : ""}</dd></div><div><dt>Nights</dt><dd>{result.nights}</dd></div><div><dt>Extras</dt><dd>{result.extras.length ? result.extras.join(", ") : "None"}</dd></div><div><dt>Payment</dt><dd>{result.payment}</dd></div><div className="booking-found-total"><dt>Total</dt><dd>{formatIdr(result.total)}</dd></div></dl><p className="demo-disclaimer">This is a local portfolio-demo record, not a real hotel reservation.</p></section> : searched ? <div className="booking-not-found"><h2>No booking found.</h2><p>Check the reference and try again. Demo bookings are stored only in this browser.</p><Link href="/booking" className="text-link">Make a demo booking</Link></div> : null}</div>;
}
