"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plane,
  MapPin,
  Calendar,
  Users,
  Search,
  ShieldCheck,
  Headphones,
  Award,
  RefreshCw,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export interface DestinationItem {
  id: string;
  name: string;
  country: string;
  price_lkr: number;
  image_url: string;
}

interface FlightsClientProps {
  initialDestinations: DestinationItem[];
}

const DEFAULT_DESTINATIONS: DestinationItem[] = [
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    price_lkr: 78000,
    image_url: "/images/maldives.jpg",
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    price_lkr: 55000,
    image_url: "/images/dubai.jpg",
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    price_lkr: 65000,
    image_url: "/images/singapore.jpg",
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    price_lkr: 48000,
    image_url: "/images/bangkok.jpg",
  },
  {
    id: "kuala-lumpur",
    name: "Kuala Lumpur",
    country: "Malaysia",
    price_lkr: 52000,
    image_url: "/images/kualalumpur.jpg",
  },
  {
    id: "colombo",
    name: "Colombo",
    country: "Sri Lanka",
    price_lkr: 18000,
    image_url: "/images/colombo.jpg",
  },
];

export default function FlightsClient({ initialDestinations }: FlightsClientProps) {
  const destinations =
    initialDestinations.length > 0 ? initialDestinations : DEFAULT_DESTINATIONS;

  const [tripType, setTripType] = useState<"one-way" | "round-trip" | "multi-city">("one-way");
  const [fromLocation, setFromLocation] = useState("Colombo (CMB)");
  const [toLocation, setToLocation] = useState("Any Destination");
  const [departureDate, setDepartureDate] = useState("2026-04-12");
  const [returnDate, setReturnDate] = useState("2026-04-19");
  const [passengers, setPassengers] = useState("1 Adult");

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[460px] sm:h-[500px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/flight-hero.jpg"
          alt="Holiday Flights"
          fill
          className="object-cover opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center pt-6">
          <div className="max-w-xl space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              ✈️ HOLIDAY FLIGHTS
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Fly to Your Sri Lanka Dream
            </h1>
            <p className="text-gray-200 text-xs sm:text-sm font-light leading-relaxed">
              Find the best flight deals, compare prices, and book your next holiday to Sri Lanka with ease.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-8 max-w-3xl text-white">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15">
              <Award className="text-amber-400 shrink-0" size={16} />
              <span className="text-[11px] font-medium">Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15">
              <Plane className="text-amber-400 shrink-0" size={16} />
              <span className="text-[11px] font-medium">Multiple Airlines Compare</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15">
              <RefreshCw className="text-amber-400 shrink-0" size={16} />
              <span className="text-[11px] font-medium">Flexible Booking Options</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/15">
              <Headphones className="text-amber-400 shrink-0" size={16} />
              <span className="text-[11px] font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-5 space-y-4">
          {/* Trip Type Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            {[
              { id: "one-way", label: "One Way" },
              { id: "round-trip", label: "Round Trip" },
              { id: "multi-city", label: "Multi-City" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setTripType(tab.id as any)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  tripType === tab.id
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Plane size={13} /> {tab.label}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-2 flex items-center gap-2.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
              <MapPin size={16} className="text-emerald-700 shrink-0" />
              <div className="w-full">
                <label className="block text-[9px] font-bold text-gray-400 uppercase">From</label>
                <input
                  type="text"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center gap-2.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
              <MapPin size={16} className="text-emerald-700 shrink-0" />
              <div className="w-full">
                <label className="block text-[9px] font-bold text-gray-400 uppercase">To</label>
                <input
                  type="text"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center gap-2.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
              <Calendar size={16} className="text-emerald-700 shrink-0" />
              <div className="w-full">
                <label className="block text-[9px] font-bold text-gray-400 uppercase">Departure Date</label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center gap-2.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
              <Calendar size={16} className="text-emerald-700 shrink-0" />
              <div className="w-full">
                <label className="block text-[9px] font-bold text-gray-400 uppercase">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  disabled={tripType === "one-way"}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none disabled:opacity-40"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center gap-2.5 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
              <Users size={16} className="text-emerald-700 shrink-0" />
              <div className="w-full">
                <label className="block text-[9px] font-bold text-gray-400 uppercase">Passengers</label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer"
                >
                  <option>1 Adult</option>
                  <option>2 Adults</option>
                  <option>2 Adults, 1 Child</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <button className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md cursor-pointer">
                <Search size={14} /> Search Flights
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. POPULAR FLIGHT DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-gray-900">Popular Flight Destinations</h2>
            <p className="text-xs text-gray-500 mt-0.5">Explore top destinations with great flight deals.</p>
          </div>
          <Link
            href="/destinations"
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All Destinations <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {destinations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-32 w-full overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1">
                    <Plane size={11} className="text-emerald-700 rotate-45" /> {item.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <MapPin size={10} /> {item.country}
                  </p>
                  <div className="pt-2">
                    <span className="block text-[9px] text-gray-400">From</span>
                    <span className="text-xs font-bold text-emerald-800">
                      LKR {item.price_lkr.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 pt-0">
                <button className="w-full py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-[10px] rounded-lg transition shadow-sm cursor-pointer flex items-center justify-center gap-1">
                  Book Now <ArrowRight size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. EXCLUSIVE FLIGHT DEALS BANNER */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <Image
            src="/images/flight-deals.jpg"
            alt="Exclusive Flight Deals"
            fill
            className="object-cover opacity-40"
          />
          <div className="relative z-10 space-y-2 max-w-lg">
            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-400 mb-2">
              <Sparkles size={18} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">Exclusive Flight Deals</h3>
            <p className="text-xs sm:text-sm text-gray-200">
              Get special discounts and flexible fares for your Sri Lanka holiday and beyond.
            </p>
            <button className="mt-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs rounded-xl transition shadow cursor-pointer">
              View Deals →
            </button>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE & TRAVEL TIPS */}
      <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Why Choose Lankara Travels */}
        <div className="md:col-span-8 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-6 shadow-sm">
          <div>
            <h3 className="text-xl font-serif font-bold text-gray-900">Why Choose Lankara Travels?</h3>
            <p className="text-xs text-gray-500 mt-0.5">We make your flight booking simple, safe and stress-free.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
                <Plane size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Trusted Airlines</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Fly with top international and local airlines.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Secure Booking</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Your data and payments are always protected.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
                <Award size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Best Prices</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Great deals and exclusive offers all year round.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl shrink-0">
                <Headphones size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Dedicated Support</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Need help? We're here 24/7 for you.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Tips */}
        <div className="md:col-span-4 bg-white rounded-3xl border border-gray-100 p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-serif font-bold text-gray-900">Travel Tips</h3>
            <p className="text-xs text-gray-500">Make your journey smoother with our helpful tips.</p>

            <div className="space-y-3 mt-4">
              {[
                { title: "Best Time to Visit Sri Lanka", subtitle: "For Perfect Weather" },
                { title: "What to Pack", subtitle: "For a Sri Lanka Trip" },
                { title: "Airport Guide", subtitle: "Colombo (CMB)" },
                { title: "Travel Documents", subtitle: "& Visa Information" },
              ].map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50/50 transition cursor-pointer group"
                >
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 group-hover:text-emerald-800">
                      {tip.title}
                    </h4>
                    <p className="text-[10px] text-gray-400">{tip.subtitle}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 group-hover:text-emerald-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <Image
            src="/images/sri-lanka-cta.jpg"
            alt="Ready to Explore Sri Lanka?"
            fill
            className="object-cover opacity-30"
          />
          <div className="relative z-10 space-y-1">
            <h3 className="text-2xl font-serif font-bold">Ready to Explore Sri Lanka?</h3>
            <p className="text-xs text-gray-300">Book your holiday flight and start your journey today.</p>
          </div>
          <button className="relative z-10 px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs rounded-xl transition shadow cursor-pointer shrink-0">
            Search Flights →
          </button>
        </div>
      </section>
    </div>
  );
}