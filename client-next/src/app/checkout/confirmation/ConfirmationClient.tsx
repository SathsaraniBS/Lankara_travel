"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, Download, Calendar, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export interface OrderConfirmationData {
  booking_reference: string;
  customer_name: string;
  email: string;
  phone: string;
  item_title: string;
  date_range: string;
  total_paid_lkr: number;
  payment_method: string;
}

const DEFAULT_CONFIRMATION: OrderConfirmationData = {
  booking_reference: "LT-2026-88912",
  customer_name: "bss",
  email: "bss@example.com",
  phone: "+94 77 123 4567",
  item_title: "Cinnamon Grand Colombo - Deluxe Room",
  date_range: "12 Apr 2026 - 16 Apr 2026 (4 Nights)",
  total_paid_lkr: 85000,
  payment_method: "Credit Card (Visa ending in 3456)",
};

export default function ConfirmationClient({ confirmationData }: { confirmationData: OrderConfirmationData | null }) {
  const info = confirmationData || DEFAULT_CONFIRMATION;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 w-full space-y-8">
      {/* SUCCESS MESSAGE */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={36} />
        </div>
        <div>
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Payment Confirmed</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-1">Booking Confirmed!</h1>
          <p className="text-xs text-gray-500 mt-1">
            Thank you for booking with Lankara Travels. We have sent a confirmation email to <span className="font-bold text-gray-700">{info.email}</span>.
          </p>
        </div>

        <div className="inline-block bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl text-xs font-bold text-emerald-900">
          Booking Reference: <span className="font-mono text-emerald-800">{info.booking_reference}</span>
        </div>
      </div>

      {/* SUMMARY DETAILS */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4 text-xs">
        <h2 className="font-serif font-bold text-sm text-gray-900 border-b border-gray-100 pb-3">Reservation Details</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Reserved Item</span>
            <span className="font-bold text-gray-800 text-sm">{info.item_title}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Dates</span>
            <span className="font-semibold text-gray-800 flex items-center gap-1 mt-0.5">
              <Calendar size={12} className="text-emerald-800" /> {info.date_range}
            </span>
          </div>

          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Guest Name</span>
            <span className="font-medium text-gray-800">{info.customer_name}</span>
          </div>

          <div>
            <span className="text-gray-400 block text-[10px] font-bold uppercase">Payment Method</span>
            <span className="font-medium text-gray-800">{info.payment_method}</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 flex items-baseline justify-between text-sm">
          <span className="font-bold text-gray-900">Total Paid</span>
          <span className="font-bold text-emerald-800 text-lg">LKR {info.total_paid_lkr.toLocaleString()}</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download size={14} /> Download PDF Receipt
        </button>

        <Link
          href="/bookings"
          className="w-full sm:w-auto px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow"
        >
          Go to My Bookings <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}