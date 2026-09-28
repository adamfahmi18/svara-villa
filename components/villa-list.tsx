"use client";

import Image from "next/image";
import Link from "@/components/site-link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { villas, formatIdr } from "@/lib/villas";

const filters = ["All", "1 Bedroom", "2 Bedrooms", "3 Bedrooms"];

export function VillaList() {
  const [filter, setFilter] = useState("All");
  const visible = useMemo(() => filter === "All" ? villas : villas.filter((villa) => `${villa.bedrooms} Bedroom${villa.bedrooms > 1 ? "s" : ""}` === filter), [filter]);

  return (
    <section className="villa-list-section">
      <div className="villa-filters" role="group" aria-label="Filter villas by bedroom count">
        {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="villa-list" aria-live="polite">
        {visible.map((villa, index) => (
          <article className="villa-listing" key={villa.slug}>
            <Link className="villa-listing-image" href={`/villas/${villa.slug}`}><Image src={villa.image} alt={villa.description} fill sizes="(max-width: 900px) 100vw, 58vw" /><span>0{index + 1}</span></Link>
            <div className="villa-listing-copy">
              <div><p className="availability"><i />{villa.availability}</p><h2>{villa.name}</h2><p>{villa.description}</p></div>
              <dl><div><dt>Guests</dt><dd>{villa.guests}</dd></div><div><dt>Bedrooms</dt><dd>{villa.bedrooms}</dd></div><div><dt>Bathrooms</dt><dd>{villa.bathrooms}</dd></div><div><dt>Pool</dt><dd>{villa.pool}</dd></div><div><dt>Size</dt><dd>{villa.size} m²</dd></div></dl>
              <div className="villa-listing-foot"><p>From <strong>{formatIdr(villa.price)}</strong> / night</p><Link className="text-link" href={`/villas/${villa.slug}`}>View villa <ArrowUpRight aria-hidden="true" /></Link></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
