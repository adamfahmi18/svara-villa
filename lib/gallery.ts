export type GalleryItem = { src: string; alt: string; category: "Villa" | "Pool" | "Bedroom" | "Dining" | "Experience" };

export const galleryItems: GalleryItem[] = [
  { src: "/images/svara-hero.png", alt: "Svara villa and infinity pool at dusk", category: "Villa" },
  { src: "/images/svara-bedroom.png", alt: "Bedroom opening to a tropical pool garden", category: "Bedroom" },
  { src: "/images/svara-pool.png", alt: "Private tropical pool courtyard at golden hour", category: "Pool" },
  { src: "/images/garden.jpg", alt: "Secluded garden villa with a reflecting pool", category: "Villa" },
  { src: "/images/breakfast.jpg", alt: "Fresh breakfast prepared for a slow morning", category: "Dining" },
  { src: "/images/spa.jpg", alt: "A quiet spa ritual", category: "Experience" },
  { src: "/images/interior.jpg", alt: "Modern villa interior in natural tones", category: "Villa" },
  { src: "/images/bathroom.jpg", alt: "Calm stone bathroom with natural light", category: "Bedroom" },
  { src: "/images/pool.jpg", alt: "Tropical infinity pool overlooking the sea", category: "Pool" },
  { src: "/images/dining.jpg", alt: "Open-plan dining room with garden light", category: "Dining" },
];
