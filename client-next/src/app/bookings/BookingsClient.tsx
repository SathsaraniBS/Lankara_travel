"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Users,
  Search,
  Hotel as HotelIcon,
  Palmtree,
  Compass,
  Plane,
  ChevronRight,
  Headphones,
  Sparkles,
  CheckCircle2,
  Clock,
  XCircle,
  Tag,
} from "lucide-react";

export interface BookingItem {
  id: string;
  type: "Hotel" | "Holiday Package" | "Tour" | "Flight";
  title: string;
  location: string;
  date_range: string;
  details_line_1: string;
  details_line_2: string;
  price_lkr: number;
  status: "Upcoming" | "Completed" | "Cancelled";
  image_url: string;
}

interface BookingsClientProps {
  initialBookings: BookingItem[];
}

const DEFAULT_BOOKINGS: BookingItem[] = [
  {
    id: "bk-101",
    type: "Hotel",
    title: "Cinnamon Grand Colombo",
    location: "Colombo",
    date_range: "12 Apr 2026 - 16 Apr 2026 (4 Nights)",
    details_line_1: "2 Adults · Deluxe Room",
    details_line_2: "Breakfast Included",
    price_lkr: 85000,
    status: "Upcoming",
    image_url: "/images/colombo.jpg",
  },
  {
    id: "bk-102",
    type: "Holiday Package",
    title: "Southern Beach Holiday",
    location: "Galle",
    date_range: "5 Mar 2026 - 10 Mar 2026 (5 Nights)",
    details_line_1: "2 Adults · Family Package",
    details_line_2: "Half Board",
    price_lkr: 220000,
    status: "Upcoming",
    image_url: "/images/unawatuna.jpg",
  },
  {
    id: "bk-103",
    type: "Tour",
    title: "Yala Safari Experience",
    location: "Yala National Park",
    date_range: "20 Jan 2026 - 22 Jan 2026 (2 Days)",
    details_line_1: "2 Adults · Private Safari Jeep",
    details_line_2: "All Meals",
    price_lkr: 95000,
    status: "Completed",
    image_url: "/images/sigiriya.jpg",
  },
  {
    id: "bk-104",
    type: "Flight",
    title: "Colombo → Dubai",
    location: "International Flight",
    date_range: "15 Dec 2025",
    details_line_1: "1 Adult · Economy Class",
    details_line_2: "Checked Baggage",
    price_lkr: 68500,
    status: "Completed",
    image_url: "/images/colombo.jpg",
  },
  {
    id: "bk-105",
    type: "Hotel",
    title: "Mirissa Beach Resort",
    location: "Mirissa",
    date_range: "10 Nov 2025 - 12 Nov 2025 (2 Nights)",
    details_line_1: "2 Adults · Ocean View Room",
    details_line_2: "Breakfast Included",
    price_lkr: 52000,
    status: "Completed",
    image_url: "/images/ella.jpg",
  },
];

export default function BookingsClient({ initialBookings }: BookingsClientProps) {
  const bookings =
    initialBookings.length > 0 ? initialBookings : DEFAULT_BOOKINGS;

  const [activeTab, setActiveTab] = useState<"All" | "Upcoming" | "Completed" | "Cancelled">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchesTab = activeTab === "All" || b.status === activeTab;
      const matchesSearch =
        !searchQuery ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, searchQuery]);

  const summaryStats = useMemo(() => {
    return {
      total: bookings.length,
      upcoming: bookings.filter((b) => b.status === "Upcoming").length,
      completed: bookings.filter((b) => b.status === "Completed").length,
      cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    };
  }, [bookings]);

  return (
    <div className="w-full">
      {/* 1. HERO HEADER */}
      <section className="relative w-full h-[280px] sm:h-[320px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/unawatuna.jpg"
          alt="My Bookings Banner"
          fill
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
                View, manage and track your upcoming and past bookings all in one place.
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
          {/* Status Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {[
              { id: "All", label: "All Bookings" },
              { id: "Upcoming", label: "Upcoming" },
              { id: "Completed", label: "Completed" },
              { id: "Cancelled", label: "Cancelled" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.id === "Upcoming" && <Clock size={13} />}
                {tab.id === "Completed" && <CheckCircle2 size={13} />}
                {tab.id === "Cancelled" && <XCircle size={13} />}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 bg-gray-50 rounded-xl border border-gray-100 w-full md:w-80">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by booking ID, destination or hotel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-gray-800 focus:outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* 3. MAIN SECTION */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: BOOKINGS LIST */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900">Your Bookings</h2>
              <p className="text-xs text-gray-500">Manage your trips, view details and make changes if needed.</p>
            </div>

            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-500">No bookings found for the selected criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 relative"
                  >
                    {/* Booking Image */}
                    <div className="sm:col-span-4 relative h-44 sm:h-auto rounded-xl overflow-hidden">
                      <Image
                        src={b.image_url}
                        alt={b.title}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow flex items-center gap-1">
                        {b.type === "Hotel" && <HotelIcon size={12} />}
                        {b.type === "Holiday Package" && <Palmtree size={12} />}
                        {b.type === "Tour" && <Compass size={12} />}
                        {b.type === "Flight" && <Plane size={12} />}
                        {b.type}
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
                            </p>
                          </div>

                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                              b.status === "Upcoming"
                                ? "bg-emerald-50 text-emerald-800"
                                : b.status === "Completed"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {b.status}
                          </span>
                        </div>

                        <div className="mt-3 space-y-1.5 text-xs text-gray-600">
                          <p className="flex items-center gap-1.5 text-gray-800 font-semibold">
                            <Calendar size={13} className="text-emerald-700" /> {b.date_range}
                          </p>
                          <p className="flex items-center gap-1.5 text-gray-500">
                            <Users size={13} className="text-emerald-700" /> {b.details_line_1}
                          </p>
                          <p className="flex items-center gap-1.5 text-gray-500">
                            <Tag size={13} className="text-emerald-700" /> {b.details_line_2}
                          </p>
                        </div>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <div>
                          <span className="text-xs text-gray-400 block">Total Paid</span>
                          <span className="text-base font-bold text-gray-900">
                            LKR {b.price_lkr.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/bookings/${b.id}`}
                            className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs rounded-xl transition cursor-pointer"
                          >
                            View Details
                          </Link>

                          {b.status === "Upcoming" ? (
                            <Link
                              href={`/bookings/${b.id}/manage`}
                              className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
                            >
                              Manage Booking →
                            </Link>
                          ) : (
                            <button className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition cursor-pointer">
                              Book Again
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                  { title: "Book a Holiday Package", desc: "Explore curated experiences", href: "/holiday-packages", icon: Palmtree },
                  { title: "Book a Flight", desc: "Fly to your next destination", href: "/flights", icon: Plane },
                  { title: "Book a Tour", desc: "Discover amazing places", href: "/planning-a-trip", icon: Compass },
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
                className="object-cover opacity-25"
              />
              <div className="relative z-10 space-y-1">
                <h4 className="text-base font-serif font-bold">Need Help?</h4>
                <p className="text-xs text-gray-300">
                  Our team is here to assist you with your bookings and travel plans.
                </p>
              </div>

              <Link
                href="/contact"
                className="relative z-10 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer w-fit"
              >
                <Headphones size={14} /> Contact Support →
              </Link>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <h3 className="font-serif font-bold text-gray-900 text-sm">Booking Summary</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Total Bookings</span>
                  <span className="font-bold text-gray-900">{summaryStats.total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Upcoming</span>
                  <span className="font-bold text-emerald-800">{summaryStats.upcoming}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Completed</span>
                  <span className="font-bold text-blue-600">{summaryStats.completed}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Cancelled</span>
                  <span className="font-bold text-rose-600">{summaryStats.cancelled}</span>
                </div>
              </div>
            </div>

            {/* Travel More Save More Banner */}
            <div className="relative rounded-2xl overflow-hidden p-6 text-white bg-slate-900 space-y-3">
              <Image
                src="/images/ella.jpg"
                alt="Travel More Save More"
                fill
                className="object-cover opacity-30"
              />
              <div className="relative z-10 space-y-1">
                <h4 className="text-base font-serif font-bold">Travel More Save More!</h4>
                <p className="text-xs text-gray-300">
                  Get exclusive deals and offers for your next trip.
                </p>
              </div>

              <Link
                href="/holiday-packages"
                className="relative z-10 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-xs rounded-xl transition cursor-pointer inline-block"
              >
                Explore Offers →
              </Link>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}