"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { galleryItems } from "@/lib/gallery";
import { Lightbox } from "@/components/lightbox";

const categories = ["All", "Villa", "Pool", "Bedroom", "Dining", "Experience"] as const;

export function GalleryGrid({ compact = false }: { compact?: boolean }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [active, setActive] = useState<number | null>(null);
  const items = useMemo(() => {
    const list = category === "All" ? galleryItems : galleryItems.filter((item) => item.category === category);
    return compact ? list.slice(0, 5) : list;
  }, [category, compact]);

  return (
    <>
      {compact ? null : <div className="gallery-filters" role="group" aria-label="Filter gallery">
        {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => { setCategory(item); setActive(null); }}>{item}</button>)}
      </div>}
      <div className={`editorial-gallery ${compact ? "editorial-gallery-compact" : ""}`}>
        {items.map((item, index) => (
          <button key={`${item.src}-${index}`} className="gallery-item" onClick={() => setActive(index)} aria-label={`Open image: ${item.alt}`}>
            <Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 100vw, 50vw" />
            <span>{item.category}</span>
          </button>
        ))}
      </div>
      <Lightbox items={items} index={active} onIndexChange={setActive} onClose={() => setActive(null)} />
    </>
  );
}
