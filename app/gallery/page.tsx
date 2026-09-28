import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";

export const metadata: Metadata = { title: "Gallery", description: "Explore the villas, pools, bedrooms, dining, and experiences at Svara Villa." };
export default function GalleryPage() { return <main id="main-content" className="gallery-page"><header><p className="section-kicker">Svara, in detail</p><h1>Rooms to exhale.<br /><em>Light that lingers.</em></h1><p>A closer look at the spaces, small rituals, and tropical quiet that shape a stay here.</p></header><GalleryGrid /></main>; }
