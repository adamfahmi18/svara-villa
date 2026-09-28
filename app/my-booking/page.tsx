import type { Metadata } from "next";
import { BookingLookup } from "@/components/booking-lookup";

export const metadata: Metadata = { title: "My Booking", description: "Look up a Svara Villa portfolio-demo booking saved on this device." };
export default function MyBookingPage() { return <main id="main-content" className="my-booking-page"><BookingLookup /></main>; }
