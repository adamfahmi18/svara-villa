export type Villa = {
  slug: string;
  name: string;
  label: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  pool: string;
  size: number;
  price: number;
  availability: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
};

export const villas: Villa[] = [
  {
    slug: "svara-one",
    name: "Svara One",
    label: "One bedroom hideaway",
    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    pool: "Private plunge pool",
    size: 118,
    price: 4200000,
    availability: "Available this week",
    description: "A private garden villa made for two, with a pool just beyond the bedroom doors.",
    longDescription: "Svara One keeps everything close: a king bedroom opening onto its own garden, a shaded terrace, and a stone pool that catches the morning light. It is quiet, private, and intentionally simple—the sort of place where shoes become optional.",
    image: "/images/svara-bedroom.png",
    gallery: ["/images/svara-bedroom.png", "/images/garden.jpg", "/images/bathroom.jpg", "/images/breakfast.jpg", "/images/spa.jpg"],
  },
  {
    slug: "svara-two",
    name: "Svara Two",
    label: "Two bedroom pool villa",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    pool: "Infinity pool",
    size: 242,
    price: 6800000,
    availability: "Limited dates",
    description: "Two ensuite bedrooms around a long pool, with generous spaces to gather and disappear.",
    longDescription: "Designed for slow days with people you know well, Svara Two pairs two private suites with an open living pavilion and an infinity pool facing the palms. Breakfast drifts into lunch here; the terrace tends to keep everyone a little longer.",
    image: "/images/svara-pool.png",
    gallery: ["/images/svara-pool.png", "/images/interior.jpg", "/images/bedroom.jpg", "/images/dining.jpg", "/images/pool.jpg"],
  },
  {
    slug: "svara-residence",
    name: "Svara Residence",
    label: "Three bedroom private residence",
    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 3,
    pool: "18m infinity pool",
    size: 410,
    price: 10500000,
    availability: "Available from Oct 2",
    description: "Our most generous residence, with three suites, a forest-edge pool, and space for everyone.",
    longDescription: "Set slightly apart, the Residence is for long lunches, shared holidays, and quiet corners. Three suites frame an airy central pavilion while the infinity pool looks out across the valley. A dedicated host keeps the days easy without making them feel scheduled.",
    image: "/images/svara-hero.png",
    gallery: ["/images/svara-hero.png", "/images/villa-residence.jpg", "/images/villa-one.jpg", "/images/interior.jpg", "/images/svara-bedroom.png"],
  },
];

export const amenities = [
  "High-speed Wi-Fi", "Air conditioning", "Private pool", "Daily breakfast", "Smart TV",
  "Stone bathtub", "Full kitchen", "Daily housekeeping", "Private parking", "Airport pickup",
];

export function getVilla(slug: string) {
  return villas.find((villa) => villa.slug === slug);
}

export function formatIdr(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}
