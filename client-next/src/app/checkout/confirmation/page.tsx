import React from "react";
import Link from "next/link";
import { requireUser } from "@/lib/server/session";
import { backendFetch } from "@/lib/server/backend";
import { ApiBooking, formatMoney, toBookingView } from "@/lib/bookings";
import ConfirmationClient from "./ConfirmationClient";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function Message({ title, text }: { title: string; text: string }) {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex items-center justify-center px-6 pt-24">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">{text}</p>
        <Link
          href="/bookings"
          className="inline-block px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition"
        >
          Go to My Bookings
        </Link>
      </div>
    </div>
  );
}

// Stripe sends the customer here after paying: /checkout/confirmation?ref=<booking id>
export default async function ConfirmationPage({ searchParams }: PageProps) {
  const resolved = await searchParams;
  const ref = typeof resolved.ref === "string" ? resolved.ref : "";

  await requireUser(ref ? `/checkout/confirmation?ref=${encodeURIComponent(ref)}` : "/checkout/confirmation");

  if (!UUID_RE.test(ref)) {
    return <Message title="Booking not found" text="This confirmation link is not valid. Your bookings list shows the latest status of every reservation." />;
  }

  let res: Response | null = null;
  try {
    res = await backendFetch(`/bookings/${ref}`, { auth: true, cache: "no-store" });
  } catch {
    res = null;
  }

  if (res && (res.status === 404 || res.status === 403)) {
    return <Message title="Booking not found" text="We couldn't find this booking on your account." />;
  }
  if (!res || !res.ok) {
    return <Message title="We couldn't load your confirmation" text="Your payment is safe. Please check My Bookings in a moment." />;
  }

  const booking = (await res.json()) as ApiBooking;
  const view = toBookingView(booking);
  const currency = process.env.PAYMENT_CURRENCY ?? "usd";

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between">
      <ConfirmationClient
        bookingId={booking.id}
        reference={view.reference}
        title={view.title}
        dateLine={view.dateLine}
        detailLine={view.detailLine1}
        travelerName={booking.traveler_name}
        travelerEmail={booking.traveler_email}
        totalText={formatMoney(booking.total_amount, currency)}
        phase={view.phase}
        paid={view.paid}
      />
    </div>
  );
}
