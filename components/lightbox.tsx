"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { GalleryItem } from "@/lib/gallery";

export function Lightbox({ items, index, onIndexChange, onClose }: { items: GalleryItem[]; index: number | null; onIndexChange: (index: number) => void; onClose: () => void }) {
  const open = index !== null;
  const current = open ? items[index] : null;
  const previous = () => onIndexChange(index === null ? 0 : (index - 1 + items.length) % items.length);
  const next = () => onIndexChange(index === null ? 0 : (index + 1) % items.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <Dialog open={open} onOpenChange={(value) => { if (!value) onClose(); }}>
      <DialogContent className="lightbox" showCloseButton={false}>
        <DialogTitle className="sr-only">Gallery image</DialogTitle>
        <DialogDescription className="sr-only">Use previous and next buttons or arrow keys to browse images.</DialogDescription>
        {current ? <div className="lightbox-image"><Image src={current.src} alt={current.alt} fill sizes="100vw" /></div> : null}
        <button className="lightbox-close" onClick={onClose} aria-label="Close gallery"><X aria-hidden="true" /></button>
        <button className="lightbox-prev" onClick={previous} aria-label="Previous image"><ArrowLeft aria-hidden="true" /></button>
        <button className="lightbox-next" onClick={next} aria-label="Next image"><ArrowRight aria-hidden="true" /></button>
        <div className="lightbox-caption"><span>{current?.alt}</span><small>{index === null ? 0 : index + 1} / {items.length}</small></div>
      </DialogContent>
    </Dialog>
  );
}
