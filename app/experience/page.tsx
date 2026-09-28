import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/site-link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Experiences", description: "Private dining, wellness, island journeys, and small rituals at Svara Villa." };

const experiences = [
  { title: "Private dining", note: "At your table", copy: "A menu made for the evening, served wherever you feel most at home—the terrace, garden, or beside the pool.", image: "/images/dining.jpg" },
  { title: "Floating breakfast", note: "A slow start", copy: "Fresh fruit, warm pastries, good coffee, and nowhere to rush to. We will bring it when the pool is ready for you.", image: "/images/breakfast.jpg" },
  { title: "Spa & wellness", note: "Return to quiet", copy: "Balinese bodywork, botanical oils, and an open-air treatment pavilion a few steps from your room.", image: "/images/spa.jpg" },
  { title: "Island journey", note: "Beyond the villa", copy: "A private car, a host who knows the quieter roads, and a day shaped around what draws your attention.", image: "/images/pool.jpg" },
  { title: "Yoga session", note: "Move with morning", copy: "A private guided practice in the garden, adapted to your pace and experience.", image: "/images/garden.jpg" },
  { title: "Airport transfer", note: "An easy arrival", copy: "A driver waiting when you land, chilled water in the car, and a direct journey to Svara.", image: "/images/svara-hero.png" },
];

export default function ExperiencePage() {
  return <main id="main-content"><section className="page-hero experience-hero"><Image src="/images/breakfast.jpg" alt="A table of fresh food prepared for a private breakfast" fill priority sizes="100vw" /><div className="page-hero-shade" /><div><p className="eyebrow">The pleasure of an open day</p><h1>Made for<br /><em>your pace.</em></h1></div></section>
  <section className="experience-intro"><p className="section-kicker">While you&apos;re here</p><h2>Nothing is scheduled. Everything is possible.</h2><p>Tell us what sounds good—or wait until the day decides for you. Our hosts can arrange each experience with a little notice.</p></section>
  <section className="experience-stories">{experiences.map((item, index) => <article key={item.title} className={index % 2 ? "reverse" : ""}><div className="experience-story-image"><Image src={item.image} alt={item.title} fill sizes="(max-width: 800px) 100vw, 58vw" /></div><Reveal className="experience-story-copy"><p className="section-kicker">0{index + 1} · {item.note}</p><h2>{item.title}</h2><p>{item.copy}</p><Link href="/contact" className="text-link">Arrange this experience</Link></Reveal></article>)}</section>
  <section className="simple-cta"><p className="section-kicker">Something else in mind?</p><h2>Ask your host.</h2><p>The best days rarely come from a fixed menu.</p><Link className="button button-light" href="/contact">Start a conversation</Link></section></main>;
}
