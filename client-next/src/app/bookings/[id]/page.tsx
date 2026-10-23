import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Hotel as HotelIcon, Plane, User } from "lucide-react";
import { requireUser } from "@/lib/server/session";
import { backendFetch } from "@/lib/server/backend";
import {
  ApiBooking,
  BookingPhase,
  formatDate,
  formatDateTime,
  formatMoney,
  toBookingView,
} from "@/lib/bookings";
import BookingActions from "../BookingActions";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const PHASE_LABEL: Record<BookingPhase, { label: string; className: string }> = {
  pending: { label: "Awaiting payment", className: "bg-amber-50 text-amber-700" },
  upcoming: { label: "Confirmed", className: "bg-emerald-50 text-emerald-800" },
  completed: { label: "Completed", className: "bg-blue-50 text-blue-700" },
  cancelled: { label: "Cancelled", className: "bg-rose-50 text-rose-700" },
};

const PAYMENT_LABEL: Record<string, string> = {
  pending: "Payment not completed",
  succeeded: "Paid",
  failed: "Payment did not go through",
  refunded: "Refunded",
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900 text-right">{value}</span>
    </div>
  );
}

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  await requireUser(`/bookings/${id}`);

  let res: Response | null = null;
  try {
    res = await backendFetch(`/bookings/${id}`, { auth: true, cache: "no-store" });
  } catch {
    res = null;
  }

  // Someone else's booking looks exactly like a missing one
  if (res && (res.status === 404 || res.status === 403)) notFound();

  if (!res || !res.ok) {
    return (
      <div className="min-h-screen bg-[#faf9f6] flex items-center justify-center px-6 pt-24">
        <div className="max-w-md text-center space-y-2">
          <h1 className="text-xl font-bold text-gray-900">We couldn&apos;t load this booking</h1>
          <p className="text-sm text-gray-500">Please refresh the page in a moment.</p>
          <Link href="/bookings" className="text-sm font-semibold text-emerald-800 hover:underline">
            Back to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  const booking = (await res.json()) as ApiBooking;
  const view = toBookingView(booking);
  const currency = process.env.PAYMENT_CURRENCY ?? "usd";
  const badge = PHASE_LABEL[view.phase];
  const hotel = booking.hotel_info;
  const flight = booking.flight_info;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans">
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16 space-y-6">
        <Link href="/bookings" className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:underline">
          <ArrowLeft size={14} /> Back to My Bookings
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Booking reference</p>
            <h1 className="text-2xl font-serif font-bold text-gray-900 font-mono">{view.reference}</h1>
            <p className="text-xs text-gray-500 mt-1">Booked on {formatDate(booking.created_at)}</p>
          </div>
          <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${badge.className}`}>{badge.label}</span>
        </div>

        {hotel && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
            <h2 className="font-serif font-bold text-gray-900 flex items-center gap-2">
              <HotelIcon size={16} className="text-emerald-800" /> {hotel.name}
            </h2>
            <p className="text-xs text-gray-500">{[hotel.address, hotel.city].filter(Boolean).join(", ")}</p>
            {booking.check_in && booking.check_out && (
              <Row
                label="Stay"
                value={
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={12} className="text-emerald-700" />
                    {formatDate(booking.check_in)} – {formatDate(booking.check_out)}
                  </span>
                }
              />
            )}
            <Row label="Nights" value={booking.nights ?? "-"} />
            <Row label="Rooms" value={booking.rooms} />
            <Row label="Rate per night" value={formatMoney(hotel.price_per_night, currency)} />
            <Row
              label="Hotel subtotal"
              value={formatMoney(hotel.price_per_night * booking.rooms * (booking.nights ?? 0), currency)}
            />
          </div>
        )}

        {flight && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
            <h2 className="font-serif font-bold text-gray-900 flex items-center gap-2">
              <Plane size={16} className="text-emerald-800" /> {flight.departure_city} → {flight.destination_city}
            </h2>
            <p className="text-xs text-gray-500">
              {flight.airline} · {flight.flight_number}
            </p>
            <Row label="Departs" value={formatDateTime(flight.departure_time)} />
            <Row label="Arrives" value={formatDateTime(flight.arrival_time)} />
            <Row label="Passengers" value={booking.passengers} />
            <Row label="Fare per passenger" value={formatMoney(flight.price, currency)} />
            <Row label="Flight subtotal" value={formatMoney(flight.price * booking.passengers, currency)} />
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
          <h2 className="font-serif font-bold text-gray-900 flex items-center gap-2">
            <User size={16} className="text-emerald-800" /> Traveler details
          </h2>
          <Row label="Name" value={booking.traveler_name ?? "-"} />
          <Row label="Email" value={booking.traveler_email ?? "-"} />
          <Row label="Phone" value={booking.traveler_phone ?? "-"} />
          {booking.special_requests && <Row label="Special requests" value={booking.special_requests} />}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="font-bold text-gray-900">{view.paid ? "Total paid" : "Total"}</span>
            <span className="text-xl font-bold text-emerald-800">{formatMoney(booking.total_amount, currency)}</span>
          </div>
          <Row
            label="Payment"
            value={booking.payment_status ? PAYMENT_LABEL[booking.payment_status] : "Not started"}
          />
          <div className="flex justify-end pt-2">
            <BookingActions bookingId={booking.id} canPay={view.canPay} canCancel={view.canCancel} />
          </div>
          {view.phase === "upcoming" && (
            <p className="text-[11px] text-gray-500 text-right">
              Need to change or cancel a paid booking?{" "}
              <Link href="/contact-us" className="font-semibold text-emerald-800 hover:underline">
                Contact support
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
