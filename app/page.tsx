import Image from "next/image";
import Link from "@/components/site-link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { GalleryGrid } from "@/components/gallery-grid";
import { villas } from "@/lib/villas";

const experiences = [
  ["Floating breakfast", "Breakfast drifts to your pool whenever the morning feels ready.", "/images/breakfast.jpg"],
  ["Private dining", "A table set in the villa, with a menu shaped around the season.", "/images/dining.jpg"],
  ["Spa & wellness", "Unhurried treatments in the privacy of your garden pavilion.", "/images/spa.jpg"],
  ["Island journeys", "Quiet beaches, temple courtyards, and the roads between them.", "/images/pool.jpg"],
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero-shell">
        <Image src="/images/svara-hero.png" alt="A secluded tropical villa and infinity pool above a Balinese forest at dusk" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow hero-enter">Private villas · Bali, Indonesia</p>
          <h1 className="hero-enter hero-enter-2">A slower kind<br />of luxury.</h1>
          <p className="hero-lede hero-enter hero-enter-3">Quiet mornings, long swims, and nowhere else you need to be.</p>
          <div className="hero-actions hero-enter hero-enter-4">
            <Link className="button button-light" href="/villas">Explore our villas</Link>
            <Link className="text-link text-link-light" href="/booking">Book your stay</Link>
          </div>
        </div>
        <a className="hero-scroll" href="#introduction"><ArrowDown aria-hidden="true" /><span>Scroll to wander</span></a>
        <p className="hero-index">08°39&apos;S · 115°13&apos;E</p>
      </section>

      <section className="intro-shell" id="introduction">
        <Reveal><p className="section-kicker">The Svara pace</p></Reveal>
        <div className="intro-grid">
          <Reveal><h2>Some trips are made for doing everything.</h2></Reveal>
          <Reveal className="intro-copy" delay={120}>
            <p className="intro-emphasis">This isn&apos;t one of them.</p>
            <p>Svara is a place to swim before breakfast, disappear into a book, and let the afternoon decide what happens next.</p>
            <Link className="text-link" href="/about">Our story</Link>
          </Reveal>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading"><div><p className="section-kicker">Three ways to stay</p><h2>Find your<br /><em>own quiet.</em></h2></div><p>Each villa has its own rhythm. All share private pools, considered service, and enough room to forget the time.</p></div>
        <div className="villa-editorial-list">
          {villas.map((villa, index) => (
            <Reveal className={`villa-editorial villa-editorial-${index + 1}`} key={villa.slug}>
              <Link className="villa-photo" href={`/villas/${villa.slug}`}>
                <Image src={villa.image} alt={villa.description} fill sizes="(max-width: 800px) 100vw, 70vw" />
                <span>0{index + 1}</span>
              </Link>
              <div className="villa-copy">
                <p>{villa.bedrooms} {villa.bedrooms === 1 ? "Bedroom" : "Bedrooms"} · {villa.pool} · {villa.guests} Guests</p>
                <h3>{villa.name}</h3>
                <span>{villa.description}</span>
                <Link className="text-link" href={`/villas/${villa.slug}`}>View villa <ArrowUpRight aria-hidden="true" /></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="experience-preview">
        <div className="section-heading section-heading-light"><div><p className="section-kicker">Made around you</p><h2>Days with<br /><em>no agenda.</em></h2></div><Link className="text-link" href="/experience">All experiences</Link></div>
        <div className="experience-list">
          {experiences.map(([title, copy, image], index) => (
            <Link href="/experience" className="experience-row" key={title}>
              <small>0{index + 1}</small><h3>{title}</h3><p>{copy}</p><ArrowUpRight aria-hidden="true" />
              <span className="experience-thumb"><Image src={image} alt="" fill sizes="260px" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="philosophy-section">
        <div className="philosophy-photo"><Image src="/images/svara-pool.png" alt="A stone courtyard and pool among tropical palms" fill sizes="(max-width: 900px) 100vw, 62vw" /></div>
        <Reveal className="philosophy-copy">
          <p className="section-kicker">Built to belong</p>
          <h2>Architecture that listens to the land.</h2>
          <p>Walls open to gardens. Local stone keeps rooms cool. Rooflines follow the palms rather than compete with them. Svara was designed to feel settled—not placed.</p>
          <Link className="text-link" href="/about">Inside our approach</Link>
        </Reveal>
      </section>

      <section className="gallery-preview-section">
        <div className="section-heading"><div><p className="section-kicker">A glimpse of Svara</p><h2>Light, water,<br /><em>stillness.</em></h2></div><Link className="text-link" href="/gallery">View full gallery</Link></div>
        <GalleryGrid compact />
      </section>

      <section className="testimonial-section">
        <p className="section-kicker">Guest notes</p>
        <Reveal><blockquote>“We came with a list of places to visit. By the second morning, we had quietly abandoned it.”</blockquote></Reveal>
        <div className="testimonial-meta"><span>Amelia & James</span><span>Singapore · 5 nights</span></div>
      </section>

      <section className="location-section">
        <div className="location-copy">
          <p className="section-kicker">Find us</p><h2>Close to the coast.<br />Far from the noise.</h2>
          <p>Svara sits in a quiet pocket of Bali, with the beach and local tables within easy reach.</p>
          <dl><div><dt>Airport</dt><dd>35 min</dd></div><div><dt>Beach</dt><dd>8 min</dd></div><div><dt>Restaurant area</dt><dd>10 min</dd></div></dl>
          <a className="button button-dark" href="https://maps.google.com/?q=Bali,Indonesia" target="_blank" rel="noreferrer">Open in Maps</a>
        </div>
        <div className="map-frame"><iframe title="Map showing Bali, Indonesia" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=115.02%2C-8.82%2C115.34%2C-8.48&layer=mapnik" /></div>
      </section>

      <section className="final-cta">
        <Image src="/images/svara-bedroom.png" alt="A quiet bedroom opening onto a private tropical pool" fill sizes="100vw" />
        <div className="final-cta-shade" /><div><p className="section-kicker">Your stay, when you&apos;re ready</p><h2>Stay a little longer.</h2><Link className="button button-light" href="/booking">Check availability</Link></div>
      </section>
    </main>
  );
}
