import type { Metadata } from "next";
import Image from "next/image";
import { VillaList } from "@/components/villa-list";

export const metadata: Metadata = { title: "Private Villas", description: "Explore Svara Villa's one, two, and three-bedroom private pool villas in Bali." };

export default function VillasPage() {
  return <main id="main-content"><section className="page-hero"><Image src="/images/svara-pool.png" alt="Svara's private tropical pool courtyard" fill priority sizes="100vw" /><div className="page-hero-shade" /><div><p className="eyebrow">Three private villas · One quiet address</p><h1>Your own<br /><em>corner of Bali.</em></h1></div></section><VillaList /></main>;
}
