"use client";

import Link from "@/components/site-link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  ["Home", "/"], ["Villas", "/villas"], ["Experience", "/experience"],
  ["Gallery", "/gallery"], ["About", "/about"], ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lightTop = pathname.startsWith("/booking") || pathname.startsWith("/my-booking");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`global-header ${scrolled || lightTop ? "global-header-solid" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Svara Villa home">
        <span>SVARA</span><small>VILLA · BALI</small>
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav">
        {links.map(([label, href]) => <Link key={href} className={pathname === href ? "active" : ""} href={href}>{label}</Link>)}
      </nav>
      <Link className="nav-book" href="/booking">Book your stay</Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="menu-button" type="button" aria-label="Open navigation"><Menu aria-hidden="true" /></button>
        </SheetTrigger>
        <SheetContent side="right" className="mobile-sheet" showCloseButton={false}>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">Browse the Svara Villa website</SheetDescription>
          <div className="mobile-sheet-top">
            <span className="wordmark"><span>SVARA</span><small>VILLA · BALI</small></span>
            <SheetClose asChild><button className="menu-close" aria-label="Close navigation"><X aria-hidden="true" /></button></SheetClose>
          </div>
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {links.map(([label, href], index) => (
              <SheetClose asChild key={href}><Link href={href}><small>0{index + 1}</small>{label}</Link></SheetClose>
            ))}
          </nav>
          <div className="mobile-menu-foot"><span>Bali, Indonesia</span><div><SheetClose asChild><Link href="/booking">Book your stay</Link></SheetClose><SheetClose asChild><Link href="/my-booking">My booking</Link></SheetClose></div></div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
