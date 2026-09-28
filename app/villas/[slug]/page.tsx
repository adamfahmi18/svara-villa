import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/site-link";
import { notFound } from "next/navigation";
import { Bath, BedDouble, Car, CookingPot, Droplets, House, Snowflake, Sparkles, Tv, Wifi } from "lucide-react";
import { BookingWidget } from "@/components/booking-widget";
import { Faq } from "@/components/faq";
import { getVilla, villas, amenities } from "@/lib/villas";

export function generateStaticParams() { return villas.map((villa) => ({ slug: villa.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const villa = getVilla(slug);
  return villa ? { title: villa.name, description: villa.description } : {};
}

const amenityIcons = [Wifi, Snowflake, Droplets, CookingPot, Tv, Bath, House, Sparkles, Car, BedDouble];

export default async function VillaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const villa = getVilla(slug); if (!villa) notFound();
  const related = villas.find((item) => item.slug !== villa.slug)!;
  return <main id="main-content" className="villa-detail-page">
    <section className="detail-hero">
      <div className="detail-hero-main"><Image src={villa.gallery[0]} alt={`${villa.name} hero view`} fill priority sizes="(max-width: 800px) 100vw, 72vw" /></div>
      <div className="detail-hero-side"><Image src={villa.gallery[1]} alt={`${villa.name} pool and garden`} fill priority sizes="28vw" /></div>
      <div className="detail-hero-side"><Image src={villa.gallery[2]} alt={`${villa.name} interior detail`} fill sizes="28vw" /></div>
      <Link href="/gallery" className="detail-gallery-link">View full gallery · {villa.gallery.length} photos</Link>
    </section>
    <div className="detail-layout">
      <div className="detail-content">
        <header className="detail-title"><p className="section-kicker">{villa.label}</p><h1>{villa.name}</h1><p>{villa.description}</p></header>
        <dl className="detail-facts"><div><dt>Guests</dt><dd>{villa.guests}</dd></div><div><dt>Bedrooms</dt><dd>{villa.bedrooms}</dd></div><div><dt>Beds</dt><dd>{villa.beds}</dd></div><div><dt>Bathrooms</dt><dd>{villa.bathrooms}</dd></div><div><dt>Villa size</dt><dd>{villa.size} m²</dd></div><div><dt>Pool</dt><dd>{villa.pool}</dd></div></dl>
        <section className="detail-copy-section"><p className="section-kicker">The villa</p><h2>Room to settle in.</h2><p>{villa.longDescription}</p></section>
        <section className="room-section"><div className="room-image"><Image src={villa.gallery[2]} alt={`Bedroom at ${villa.name}`} fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div><p className="section-kicker">Sleep well</p><h2>Bedrooms made for unhurried mornings.</h2><p>Cool linen, blackout curtains, a generous bed, and doors that open to the garden. Each suite has its own bathroom and a quiet place to read.</p></div></section>
        <section className="amenities-section"><p className="section-kicker">What&apos;s included</p><h2>Everything you need. Nothing you don&apos;t.</h2><div className="amenities-grid">{amenities.map((amenity, index) => { const Icon = amenityIcons[index]; return <div key={amenity}><Icon aria-hidden="true" /><span>{amenity}</span></div>; })}</div></section>
        <section className="rules-section"><div><p className="section-kicker">The practical things</p><h2>Good to know.</h2></div><dl><div><dt>Check-in</dt><dd>From 3:00 PM</dd></div><div><dt>Check-out</dt><dd>By 11:00 AM</dd></div><div><dt>House rules</dt><dd>No smoking indoors · Quiet hours after 10 PM · Registered guests only</dd></div><div><dt>Cancellation</dt><dd>This is a demonstration booking. No real payment or reservation is processed.</dd></div></dl></section>
        <section className="detail-location"><div><p className="section-kicker">Location</p><h2>Bali, Indonesia</h2><p>A quiet setting with the coast, restaurants, and airport all within easy reach.</p><a className="text-link" href="https://maps.google.com/?q=Bali,Indonesia" target="_blank" rel="noreferrer">Open in Maps</a></div><div className="map-frame"><iframe title="Map showing Bali, Indonesia" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=115.02%2C-8.82%2C115.34%2C-8.48&layer=mapnik" /></div></section>
        <section className="faq-section"><div><p className="section-kicker">Before you arrive</p><h2>Questions, answered.</h2></div><Faq /></section>
      </div>
      <BookingWidget villa={villa} />
    </div>
    <section className="related-villa"><div><p className="section-kicker">You may also like</p><h2>{related.name}</h2><p>{related.description}</p><Link className="text-link" href={`/villas/${related.slug}`}>View villa</Link></div><Link href={`/villas/${related.slug}`} className="related-image"><Image src={related.image} alt={related.description} fill sizes="(max-width: 800px) 100vw, 58vw" /></Link></section>
  </main>;
}
