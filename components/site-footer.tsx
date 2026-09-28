import Link from "@/components/site-link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link className="wordmark" href="/"><span>SVARA</span><small>VILLA · BALI</small></Link>
        <p>Private tropical villas for days with less on the list.</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/villas">Villas</Link><Link href="/experience">Experience</Link><Link href="/gallery">Gallery</Link>
        <Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/my-booking">My Booking</Link>
      </nav>
      <div className="footer-contact">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
      <div className="footer-bottom"><span>2026 All Rights Reserved by Damz</span><span>Portfolio demonstration · Not a real property</span></div>
    </footer>
  );
}
