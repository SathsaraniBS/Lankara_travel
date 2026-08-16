"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Search, Download, Edit3, XCircle, HelpCircle } from "lucide-react";

export default function ManageBookingsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");
  const [bookingRef, setBookingRef] = useState("TN458921");
  const [emailOrPhone, setEmailOrPhone] = useState("you@email.com");

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-slate-800 font-sans pt-28 pb-16">
      
      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Title Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Manage your hotel bookings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            View, modify, cancel, and download details for your stays.
          </p>
        </div>

        {/* Status Tabs */}
        <div className="border-b border-slate-200 flex gap-8 text-sm font-semibold px-2">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`pb-3 transition relative ${
              activeTab === "upcoming"
                ? "text-[#003580] border-b-2 border-[#003580]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Upcoming stays
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`pb-3 transition relative ${
              activeTab === "past"
                ? "text-[#003580] border-b-2 border-[#003580]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Past stays
          </button>
          <button
            onClick={() => setActiveTab("cancelled")}
            className={`pb-3 transition relative ${
              activeTab === "cancelled"
                ? "text-[#003580] border-b-2 border-[#003580]"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* Find a Booking Filter Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <form className="flex flex-col md:flex-row items-end gap-4">
            <div className="w-full md:w-auto font-bold text-slate-800 text-base md:self-center pr-2">
              Find a booking
            </div>

            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Booking reference
              </label>
              <input
                type="text"
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
                placeholder="e.g. TN458921"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#003580]"
              />
            </div>

            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Email or phone
              </label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="you@email.com"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#003580]"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-[#006ce4] hover:bg-[#0057b8] text-white font-bold px-6 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Search size={16} /> Find booking
            </button>
          </form>
        </div>

        {/* Booking Card Item */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Hotel Photo Thumbnail */}
          <div className="md:col-span-4 lg:col-span-3 bg-slate-200 rounded-lg h-48 md:h-full min-h-[180px] relative overflow-hidden shrink-0">
            <Image
              src="/images/backimage.jpg"
              alt="Mountain View Hotel"
              fill
              className="object-cover"
            />
          </div>

          {/* Booking Info */}
          <div className="md:col-span-8 lg:col-span-9 space-y-4">
            
            {/* Header: Title + Status Badge */}
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-xl font-bold text-[#003580] hover:underline cursor-pointer">
                  Mountain View Hotel
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ella, Sri Lanka · <span className="font-semibold text-slate-700">8.9 Excellent</span> · 426 reviews
                </p>
              </div>

              <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                <Check size={14} className="text-emerald-700" /> Confirmed
              </span>
            </div>

            {/* Stay Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div>
                <p className="text-slate-400 font-bold uppercase text-[11px]">Check-in</p>
                <p className="font-bold text-slate-800 mt-0.5">Thu, 27 Aug 2026</p>
                <p className="text-slate-500 text-xs">From 2:00 PM</p>
              </div>

              <div>
                <p className="text-slate-400 font-bold uppercase text-[11px]">Check-out</p>
                <p className="font-bold text-slate-800 mt-0.5">Sat, 29 Aug 2026</p>
                <p className="text-slate-500 text-xs">Until 11:00 AM</p>
              </div>

              <div>
                <p className="text-slate-400 font-bold uppercase text-[11px]">Room & Guests</p>
                <p className="font-bold text-slate-800 mt-0.5">Deluxe Double Room</p>
                <p className="text-slate-500 text-xs">2 adults · 2 nights</p>
              </div>

              <div>
                <p className="text-slate-400 font-bold uppercase text-[11px]">Total Paid</p>
                <p className="font-extrabold text-slate-900 text-base sm:text-lg mt-0.5">
                  LKR 49,000
                </p>
              </div>
            </div>

            {/* Footer Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                Booking reference: <span className="font-bold text-slate-800">TN458921</span>
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button className="bg-[#006ce4] hover:bg-[#0057b8] text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition cursor-pointer">
                  View details
                </button>
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer">
                  <Download size={14} /> Download
                </button>
                <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer">
                  <Edit3 size={14} /> Modify
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition flex items-center gap-1 cursor-pointer">
                  <XCircle size={14} /> Cancel booking
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Need Help Banner */}
        <div className="bg-[#ebf3ff] border border-[#cce0ff] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-[#003580] text-base sm:text-lg flex items-center gap-2">
              Need help with your booking?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Contact support, read cancellation terms, or ask the property a question.
            </p>
          </div>

          <button className="bg-[#006ce4] hover:bg-[#0057b8] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-lg transition shrink-0 flex items-center gap-2 cursor-pointer">
            <HelpCircle size={16} /> Contact support
          </button>
        </div>

      </main>
    </div>
  );
}