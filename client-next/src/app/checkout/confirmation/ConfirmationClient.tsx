"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Download, Calendar, ArrowRight, Loader2, XCircle } from "lucide-react";
import type { BookingPhase } from "@/lib/bookings";

interface ConfirmationClientProps {
  bookingId: string;
  reference: string;
  title: string;
  dateLine: string;
  detailLine: string;
  travelerName: string | null;
  travelerEmail: string | null;
  totalText: string;
  phase: BookingPhase;
  paid: boolean;
}

const MAX_CHECKS = 10; // about 30 seconds
const CHECK_EVERY_MS = 3000;

export default function ConfirmationClient(props: ConfirmationClientProps) {
  const router = useRouter();
  const { phase, paid } = props;
  const isConfirmed = phase === "upcoming" || phase === "completed";
  const isCancelled = phase === "cancelled";
  const isWaiting = phase === "pending";

  // Stripe tells our server about the payment a moment after redirecting the customer back,
  // so ask the server again until the booking flips to confirmed.
  const [checks, setChecks] = useState(0);
  useEffect(() => {
    if (!isWaiting || checks >= MAX_CHECKS) return;
    const timer = setTimeout(() => {
      setChecks((c) => c + 1);
      router.refresh();
    }, CHECK_EVERY_MS);
    return () => clearTimeout(timer);
  }, [isWaiting, checks, router]);

  const gaveUp = isWaiting && checks >= MAX_CHECKS;

  return (
    <div className="max-w-3xl mx-auto px-6 pt-28 pb-16 w-full space-y-8">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center space-y-4">
        {isConfirmed && (
          <>
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                {paid ? "Payment confirmed" : "Booking confirmed"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">Booking Confirmed!</h1>
              {props.travelerEmail && (
                <p className="text-xs text-gray-500 mt-1">
                  Your receipt is also sent to <span className="font-bold text-gray-700">{props.travelerEmail}</span> by Stripe.
                </p>
              )}
            </div>
          </>
        )}

        {isWaiting && (
          <>
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
              {gaveUp ? <Calendar size={32} /> : <Loader2 size={32} className="animate-spin" />}
            </div>
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                {gaveUp ? "Still confirming" : "Confirming your payment"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">
                {gaveUp ? "This is taking longer than usual" : "Just a moment…"}
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                {gaveUp
                  ? "If you completed the payment, your booking will be confirmed shortly. Check My Bookings in a few minutes."
                  : "We are waiting for your bank to confirm the payment. This page updates by itself."}
              </p>
            </div>
          </>
        )}

        {isCancelled && (
          <>
            <div className="w-16 h-16 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto">
              <XCircle size={36} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">This booking was cancelled</h1>
              <p className="text-xs text-gray-500 mt-1">
                If you were charged, please contact support with the reference below.
              </p>
            </div>
          </>
        )}

        <div className="inline-block bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl text-xs font-bold text-emerald-900">
          Booking Reference: <span className="font-mono text-emerald-800">{props.reference}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4 text-xs">
        <h2 className="font-serif font-bold text-sm text-gray-900 border-b border-gray-100 pb-3">Reservation Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Reserved Item</span>
            <span className="font-bold text-gray-800 text-sm">{props.title}</span>
            {props.detailLine && <span className="block text-gray-500 mt-0.5">{props.detailLine}</span>}
          </div>

          {props.dateLine && (
            <div>
              <span className="text-gray-400 block text-[10px] font-bold uppercase">Dates</span>
              <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
                <Calendar size={12} className="text-emerald-800 shrink-0" /> {props.dateLine}
              </span>
            </div>
          )}

          {props.travelerName && (
            <div>
              <span className="text-gray-400 block text-[10px] font-bold uppercase">Guest Name</span>
              <span className="font-medium text-gray-800">{props.travelerName}</span>
            </div>
          )}

          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Payment</span>
            <span className="font-medium text-gray-800">{paid ? "Paid by card (Stripe)" : "Not confirmed yet"}</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 flex items-baseline justify-between text-sm">
          <span className="font-bold text-gray-900">{paid ? "Total Paid" : "Total"}</span>
          <span className="font-bold text-emerald-800 text-lg">{props.totalText}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download size={14} /> Print Receipt
        </button>

        <Link
          href={`/bookings/${props.bookingId}`}
          className="w-full sm:w-auto px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow"
        >
          View Booking <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
