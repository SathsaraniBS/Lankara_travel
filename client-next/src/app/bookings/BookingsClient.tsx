"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Search,
  Hotel as HotelIcon,
  Plane,
  Compass,
  ChevronRight,
  Headphones,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  CreditCard,
  Tag,
} from "lucide-react";
import { BookingPhase, BookingView, formatMoney } from "@/lib/bookings";
import BookingActions from "./BookingActions";

interface BookingsClientProps {
  bookings: BookingView[];
  currency: string;
}

type TabId = "all" | BookingPhase;

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All Bookings" },
  { id: "pending", label: "Pending payment" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const PHASE_BADGE: Record<BookingPhase, { label: string; className: string }> = {
  pending: { label: "Awaiting payment", className: "bg-amber-50 text-amber-700" },
  upcoming: { label: "Confirmed", className: "bg-emerald-50 text-emerald-800" },
  completed: { label: "Completed", className: "bg-blue-50 text-blue-700" },
  cancelled: { label: "Cancelled", className: "bg-rose-50 text-rose-700" },
};

export default function BookingsClient({ bookings, currency }: BookingsClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const counts = useMemo(
    () => ({
      all: bookings.length,
      pending: bookings.filter((b) => b.phase === "pending").length,
      upcoming: bookings.filter((b) => b.phase === "upcoming").length,
      completed: bookings.filter((b) => b.phase === "completed").length,
      cancelled: bookings.filter((b) => b.phase === "cancelled").length,
    }),
    [bookings]
  );

  const filteredBookings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchesTab = activeTab === "all" || b.phase === activeTab;
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.reference.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, searchQuery]);

  return (
    <div className="w-full">
      {/* 1. HERO HEADER */}
      <section className="relative w-full h-[280px] sm:h-[320px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/galle.jpg"
          alt="My Bookings Banner"
          fill
          sizes="100vw"
          className="object-cover opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div className="max-w-xl space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                🧳 MY BOOKINGS
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                Your Travel Bookings
              </h1>
              <p className="text-gray-200 text-xs sm:text-sm font-light leading-relaxed">
                View, pay for and manage your bookings all in one place.
              </p>
            </div>

            <div className="hidden md:block text-right text-amber-300 font-serif italic text-lg leading-snug">
              <p>Good trips</p>
              <p>make great stories ♡</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TAB CONTROLS & SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.id === "pending" && <CreditCard size={13} />}
                {tab.id === "upcoming" && <Clock size={13} />}
                {tab.id === "completed" && <CheckCircle2 size={13} />}
                {tab.id === "cancelled" && <XCircle size={13} />}
                {tab.label}
                <span className="opacity-70">({counts[tab.id]})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-100 w-full md:w-80">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by reference, destination or hotel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-gray-800 focus:outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* 3. MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: BOOKINGS LIST */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900">Your Bookings</h2>
              <p className="text-xs text-gray-500">
                Complete payment for pending bookings, or review the trips you have already booked.
              </p>
            </div>

            {bookings.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-gray-100 space-y-4">
                <p className="text-sm font-semibold text-gray-700">You haven&apos;t made any bookings yet.</p>
                <p className="text-xs text-gray-500">Find a place to stay or a flight and your bookings will appear here.</p>
                <div className="flex items-center justify-center gap-2">
                  <Link
                    href="/Hotels"
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition"
                  >
                    Browse hotels
                  </Link>
                  <Link
                    href="/flights"
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition"
                  >
                    Browse flights
                  </Link>
                </div>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-500">No bookings match your search or filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((b) => {
                  const badge = PHASE_BADGE[b.phase];
                  const totalLabel = b.paid ? "Total paid" : b.phase === "cancelled" ? "Total (cancelled)" : "Total due";
                  return (
                    <div
                      key={b.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 relative"
                    >
                      {/* Booking Image */}
                      <div className="sm:col-span-4 relative h-44 sm:h-auto sm:min-h-[11rem] rounded-xl overflow-hidden">
                        <Image
                          src={b.imageUrl}
                          alt={b.title}
                          fill
                          sizes="(min-width: 640px) 33vw, 100vw"
                          className="object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow flex items-center gap-1">
                          {b.kind === "Flight" ? <Plane size={12} /> : <HotelIcon size={12} />}
                          {b.kind}
                        </span>
                      </div>

                      {/* Booking Info */}
                      <div className="sm:col-span-8 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="text-base font-bold text-gray-900">{b.title}</h3>
                              <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <MapPin size={12} className="text-emerald-700" /> {b.location}
                                <span className="text-gray-300 mx-1">•</span>
                                <span className="font-mono">{b.reference}</span>
                              </p>
                            </div>

                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${badge.className}`}>
                              {badge.label}
                            </span>
                          </div>

                          <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                            {b.dateLine && (
                              <p className="flex items-center gap-1.5 text-gray-800 font-semibold">
                                <Calendar size={13} className="text-emerald-700 shrink-0" /> {b.dateLine}
                              </p>
                            )}
                            {b.detailLine1 && (
                              <p className="flex items-center gap-1.5 text-gray-500">
                                <Users size={13} className="text-emerald-700 shrink-0" /> {b.detailLine1}
                              </p>
                            )}
                            {b.detailLine2 && (
                              <p className="flex items-center gap-1.5 text-gray-500">
                                <Tag size={13} className="text-emerald-700 shrink-0" /> {b.detailLine2}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Price & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
                          <div>
                            <span className="text-xs text-gray-400 block">{totalLabel}</span>
                            <span className="text-base font-bold text-gray-900">{formatMoney(b.total, currency)}</span>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap justify-end">
                            <Link
                              href={`/bookings/${b.id}`}
                              className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition cursor-pointer"
                            >
                              View Details
                            </Link>

                            <BookingActions bookingId={b.id} canPay={b.canPay} canCancel={b.canCancel} />

                            {(b.phase === "completed" || b.phase === "cancelled") && (
                              <Link
                                href={b.rebookHref}
                                className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition cursor-pointer"
                              >
                                Book Again
                              </Link>
                            )}

                            {b.phase === "upcoming" && (
                              <Link
                                href="/contact-us"
                                className="px-3.5 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold text-xs rounded-xl transition cursor-pointer"
                              >
                                Need changes?
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Booking Shortcuts */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <div>
                <h3 className="font-serif font-bold text-gray-900 text-sm">Quick Booking</h3>
                <p className="text-[11px] text-gray-400">Plan your next adventure in just a few clicks.</p>
              </div>

              <div className="space-y-2">
                {[
                  { title: "Book a Hotel", desc: "Find the perfect stay", href: "/Hotels", icon: HotelIcon },
                  { title: "Book a Flight", desc: "Fly to your next destination", href: "/flights", icon: Plane },
                  { title: "Plan a Trip", desc: "Build your itinerary", href: "/planning-a-trip", icon: Compass },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="flex items-center justify-between p-3 rounded-xl border border-gray-50 hover:border-emerald-200 hover:bg-emerald-50/30 transition group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg group-hover:bg-emerald-800 group-hover:text-white transition">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">{item.title}</h4>
                          <p className="text-[10px] text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-gray-400 group-hover:text-emerald-800" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Need Help Card */}
            <div className="relative rounded-2xl overflow-hidden p-6 text-white bg-slate-900 space-y-3">
              <Image
                src="/images/sigiriya.jpg"
                alt="Need Help"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover opacity-25"
              />
              <div className="relative z-10 space-y-1">
                <h4 className="text-base font-serif font-bold">Need Help?</h4>
                <p className="text-xs text-gray-300">
                  Our team is here to assist you with your bookings and travel plans.
                </p>
              </div>

              <Link
                href="/contact-us"
                className="relative z-10 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer w-fit"
              >
                <Headphones size={14} /> Contact Support →
              </Link>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <h3 className="font-serif font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" /> Booking Summary
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Total Bookings</span>
                  <span className="font-bold text-gray-900">{counts.all}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Pending payment</span>
                  <span className="font-bold text-amber-600">{counts.pending}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Upcoming</span>
                  <span className="font-bold text-emerald-800">{counts.upcoming}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Completed</span>
                  <span className="font-bold text-blue-600">{counts.completed}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Cancelled</span>
                  <span className="font-bold text-rose-600">{counts.cancelled}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
