import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking-flow";
import { BookingWebMcp } from "@/components/booking-webmcp";

export const metadata: Metadata = { title: "Book Your Stay", description: "Complete a demonstration reservation at Svara Villa." };
export default function BookingPage() { return <main id="main-content" className="booking-page"><BookingWebMcp /><BookingFlow /></main>; }
