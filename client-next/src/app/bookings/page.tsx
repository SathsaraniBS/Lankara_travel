import React from "react";
import { requireUser } from "@/lib/server/session";
import { backendJson, toList } from "@/lib/server/backend";
import { ApiBooking, toBookingView } from "@/lib/bookings";
import BookingsClient from "./BookingsClient";

export default async function BookingsPage() {
  // Signed-out visitors go to /login and come back here afterwards
  await requireUser("/bookings");

  const data = await backendJson<unknown>("/bookings/", {
    auth: true,
    cache: "no-store", // always show the latest status (e.g. right after a payment)
  });

  if (data === null) {
    return (
      <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex items-center justify-center px-6 pt-24">
        <div className="max-w-md text-center space-y-2">
          <h1 className="text-xl font-bold">We couldn&apos;t load your bookings</h1>
          <p className="text-sm text-slate-500">
            Something went wrong on our side. Please refresh the page in a moment.
          </p>
        </div>
      </div>
    );
  }

  const now = new Date();
  const bookings = toList<ApiBooking>(data).map((b) => toBookingView(b, now));
  const currency = process.env.PAYMENT_CURRENCY ?? "usd";

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between">
      <BookingsClient bookings={bookings} currency={currency} />
    </div>
  );
}
