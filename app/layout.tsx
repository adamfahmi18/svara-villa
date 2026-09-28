import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { PageLoader } from "@/components/page-loader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://svara-villa-damz.bnnwifi.chatgpt.site"),
  title: { default: "Svara Villa — Private Villas in Bali", template: "%s — Svara Villa" },
  description: "Private tropical villas in Bali for slow mornings, long swims, and unhurried stays. Portfolio demo by Damz.",
  openGraph: { title: "Svara Villa", description: "A slower kind of luxury in Bali.", type: "website" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><PageLoader /><SiteHeader />{children}<SiteFooter /></body></html>;
}
