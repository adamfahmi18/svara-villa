"use client";

import { useEffect } from "react";
import { BOOKING_EXTRAS, calculateStay, createBookingRecord, nightsBetween, saveBooking } from "@/lib/booking";
import { getVilla, villas } from "@/lib/villas";

type ModelContext = {
  registerTool: (tool: {
    name: string;
    title?: string;
    description: string;
    inputSchema: object;
    annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
    execute: (input: unknown) => unknown | Promise<unknown>;
  }, options?: { signal?: AbortSignal }) => void | Promise<void>;
};

type ToolInput = {
  villaSlug: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children?: number;
  guest: { fullName: string; email: string; phone: string; country: string };
  extras?: string[];
};

export function BookingWebMcp() {
  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const extraNames = BOOKING_EXTRAS.map((item) => item.name);

    const execute = (raw: unknown) => {
      const input = raw as Partial<ToolInput>;
      const villa = typeof input.villaSlug === "string" ? getVilla(input.villaSlug) : undefined;
      const children = input.children ?? 0;
      const nights = nightsBetween(input.checkIn ?? "", input.checkOut ?? "");
      const guest = input.guest;
      const extras = input.extras ?? [];
      if (!villa) throw new Error("Choose a valid villa slug.");
      if (nights < 1) throw new Error("Check-out must be after check-in.");
      if (!Number.isInteger(input.adults) || (input.adults ?? 0) < 1 || !Number.isInteger(children) || children < 0 || (input.adults ?? 0) + children > villa.guests) throw new Error(`Guests must fit ${villa.name}'s capacity of ${villa.guests}.`);
      if (!guest?.fullName?.trim() || !/^\S+@\S+\.\S+$/.test(guest.email ?? "") || !guest.phone?.trim() || !guest.country?.trim()) throw new Error("Complete all guest details with a valid email address.");
      if (!Array.isArray(extras) || extras.some((name) => !extraNames.includes(name as typeof extraNames[number]))) throw new Error("One or more extras are not available.");
      const extrasTotal = BOOKING_EXTRAS.filter((item) => extras.includes(item.name)).reduce((sum, item) => sum + item.price, 0);
      const totals = calculateStay(villa.price, nights, extrasTotal);
      const record = createBookingRecord({ villaSlug: villa.slug, villaName: villa.name, guest: guest as ToolInput["guest"], checkIn: input.checkIn!, checkOut: input.checkOut!, adults: input.adults!, children, nights, extras, subtotal: totals.subtotal, serviceFee: totals.serviceFee, tax: totals.tax, total: totals.total });
      saveBooking(record);
      window.location.assign(`/my-booking?ref=${encodeURIComponent(record.reference)}`);
      return { reference: record.reference, status: record.status, total: record.total };
    };

    try {
      void Promise.resolve(context.registerTool({
        name: "create_demo_booking",
        title: "Create demo booking",
        description: "Complete a Svara Villa portfolio-demo reservation, save it on this device, and open the visible booking record. No real payment is processed.",
        inputSchema: {
          type: "object",
          properties: {
            villaSlug: { type: "string", enum: villas.map((villa) => villa.slug) },
            checkIn: { type: "string", format: "date" },
            checkOut: { type: "string", format: "date" },
            adults: { type: "integer", minimum: 1 },
            children: { type: "integer", minimum: 0, default: 0 },
            guest: {
              type: "object",
              properties: { fullName: { type: "string", minLength: 1 }, email: { type: "string", format: "email" }, phone: { type: "string", minLength: 1 }, country: { type: "string", minLength: 1 } },
              required: ["fullName", "email", "phone", "country"],
              additionalProperties: false,
            },
            extras: { type: "array", items: { type: "string", enum: extraNames }, uniqueItems: true, default: [] },
          },
          required: ["villaSlug", "checkIn", "checkOut", "adults", "guest"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute,
      }, { signal: lifecycle.signal })).catch(() => undefined);
    } catch { /* Unsupported or unavailable browser implementation. */ }
    return () => lifecycle.abort();
  }, []);

  return null;
}
