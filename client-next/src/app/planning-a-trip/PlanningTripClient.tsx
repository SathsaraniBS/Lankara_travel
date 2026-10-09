"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Compass,
  Search,
  Plus,
  Edit2,
  MoreVertical,
  PlusCircle,
  Navigation,
  Clock,
  Download,
  Headphones,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Info,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export interface DestinationSpot {
  id: string;
  name: string;
  province: string;
  image_url: string;
}

export interface DayItinerary {
  day: number;
  date: string;
  city: string;
  image_url: string;
  spots: string[];
}

export interface TripItineraryData {
  title: string;
  route_text: string;
  date_range: string;
  duration_text: string;
  travelers_text: string;
  tags: string[];
  estimated_cost_range: string;
  days: DayItinerary[];
}

interface PlanningTripClientProps {
  initialDestinations: DestinationSpot[];
  initialItinerary: TripItineraryData | null;
}

const DEFAULT_DESTINATIONS: DestinationSpot[] = [
  { id: "ella", name: "Ella", province: "Uva Province", image_url: "/images/ella.jpg" },
  { id: "galle", name: "Galle", province: "Southern Province", image_url: "/images/unawatuna.jpg" },
  { id: "kandy", name: "Kandy", province: "Central Province", image_url: "/images/Kandy.jpg" },
  { id: "sigiriya", name: "Sigiriya", province: "Central Province", image_url: "/images/sigiriya.jpg" },
  { id: "trinco", name: "Trincomalee", province: "Eastern Province", image_url: "/images/colombo.jpg" },
];

const DEFAULT_ITINERARY: TripItineraryData = {
  title: "Sri Lanka Adventure",
  route_text: "Colombo → Kandy → Ella → Galle",
  date_range: "10 Apr 2026 - 16 Apr 2026",
  duration_text: "7 Days",
  travelers_text: "2 Adults",
  tags: ["Culture", "Nature", "Beach"],
  estimated_cost_range: "LKR 180,000 - 220,000",
  days: [
    {
      day: 1,
      date: "10 Apr 2026",
      city: "Colombo",
      image_url: "/images/colombo.jpg",
      spots: ["Gangaramaya Temple", "Pettah Market", "Galle Face Green"],
    },
    {
      day: 2,
      date: "11 Apr 2026",
      city: "Kandy",
      image_url: "/images/Kandy.jpg",
      spots: ["Temple of the Tooth", "Kandy Lake", "Royal Botanical Gardens"],
    },
    {
      day: 3,
      date: "12 Apr 2026",
      city: "Ella",
      image_url: "/images/ella.jpg",
      spots: ["Nine Arch Bridge", "Little Adam's Peak", "Ella Rock"],
    },
    {
      day: 4,
      date: "13 Apr 2026",
      city: "Galle",
      image_url: "/images/unawatuna.jpg",
      spots: ["Galle Fort", "Unawatuna Beach", "Jungle Beach"],
    },
  ],
};

export default function PlanningTripClient({
  initialDestinations,
  initialItinerary,
}: PlanningTripClientProps) {
  const destinations =
    initialDestinations.length > 0 ? initialDestinations : DEFAULT_DESTINATIONS;
  const itinerary = initialItinerary || DEFAULT_ITINERARY;

  const [activeStep, setActiveStep] = useState(1);
  const [destinationQuery, setDestinationQuery] = useState("");
  const [dateRange, setDateRange] = useState("10 Apr 2026 - 16 Apr 2026");
  const [tripType, setTripType] = useState("All Types");
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePlanMyTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      await fetch("/api/planner/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinationQuery, dateRange, tripType }),
      });
    } catch (err) {
      console.error("AI Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full">
      {/* 1. HERO HEADER */}
      <section className="relative w-full h-[320px] sm:h-[360px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/unawatuna.jpg"
          alt="Plan Trip Banner"
          fill
          className="object-cover opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div className="max-w-xl space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                🗺️ PLANING A TRIP
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                Your Sri Lanka Journey Starts Here
              </h1>
              <p className="text-gray-200 text-xs sm:text-sm font-light leading-relaxed">
                Create your perfect trip with our smart planner. Explore places, get route suggestions, and make unforgettable memories.
              </p>

              {/* Quick Feature Badges */}
              <div className="flex flex-wrap gap-4 pt-3 text-[11px] font-semibold text-white">
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg">
                  <Calendar size={13} className="text-amber-400" /> Plan Your Itinerary
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg">
                  <MapPin size={13} className="text-amber-400" /> Find Nearby Places
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg">
                  <Clock size={13} className="text-amber-400" /> Check Distances & Time
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg">
                  <Sparkles size={13} className="text-amber-400" /> Save & Share
                </span>
              </div>
            </div>

            <div className="hidden md:block text-right text-amber-300 font-serif italic text-lg leading-snug">
              <p>More places</p>
              <p>More stories ♡</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MULTI-STEP PROGRESS NAV BAR */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold text-gray-600">
          {[
            { step: 1, label: "Choose Destination" },
            { step: 2, label: "Add Places" },
            { step: 3, label: "Plan Route" },
            { step: 4, label: "Review & Save" },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(s.step)}
              className={`p-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
                activeStep === s.step
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  activeStep === s.step ? "bg-white text-emerald-800" : "bg-gray-200 text-gray-700"
                }`}
              >
                {s.step}
              </span>
              <span className="truncate">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. MAIN SECTION */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        
        {/* DESTINATION SELECTION CARD */}
        <form onSubmit={handlePlanMyTrip} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <h2 className="text-base font-serif font-bold text-gray-900">Where do you want to go?</h2>
            <p className="text-xs text-gray-500">Select your destination, travel dates and preferences to plan your ideal trip.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Input 1: Destination */}
            <div className="sm:col-span-5 bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex items-center gap-2">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              <div className="w-full">
                <label className="text-[9px] text-gray-400 font-bold uppercase block">Destination</label>
                <input
                  type="text"
                  placeholder="e.g. Ella, Kandy, Galle..."
                  value={destinationQuery}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Input 2: Dates */}
            <div className="sm:col-span-4 bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex items-center gap-2">
              <Calendar size={16} className="text-gray-400 shrink-0" />
              <div className="w-full">
                <label className="text-[9px] text-gray-400 font-bold uppercase block">Travel Dates</label>
                <input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Input 3: Type */}
            <div className="sm:col-span-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex items-center gap-2">
              <Compass size={16} className="text-gray-400 shrink-0" />
              <div className="w-full">
                <label className="text-[9px] text-gray-400 font-bold uppercase block">Trip Type</label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer"
                >
                  <option value="All Types">All Types</option>
                  <option value="Culture & Heritage">Culture & Heritage</option>
                  <option value="Nature & Wildlife">Nature & Wildlife</option>
                  <option value="Beach & Relaxation">Beach & Relaxation</option>
                  <option value="Adventure & Hiking">Adventure & Hiking</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Search size={14} />
            <span>{isGenerating ? "Planning AI Itinerary..." : "Plan My Trip →"}</span>
          </button>
        </form>

        {/* POPULAR DESTINATIONS HORIZONTAL STRIP */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif font-bold text-gray-900">Popular Destinations</h2>
              <p className="text-xs text-gray-500">Discover the most loved places in Sri Lanka.</p>
            </div>
            <Link
              href="/destinations"
              className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1"
            >
              View All Destinations →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group cursor-pointer"
              >
                <div className="relative h-28 w-full overflow-hidden">
                  <Image
                    src={dest.image_url}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-bold text-gray-900 flex items-center gap-1">
                    <MapPin size={11} className="text-emerald-800" /> {dest.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">{dest.province}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BUILD YOUR TRIP & RIGHT SIDEBAR GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: DAY-BY-DAY ITINERARY BUILDER */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-gray-900">Build Your Trip Itinerary</h2>
                <p className="text-xs text-gray-500">Add places, explore nearby spots, and get the best route for your adventure.</p>
              </div>

              <button className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1">
                <Plus size={14} /> Add to Itinerary
              </button>
            </div>

            {/* Days List */}
            <div className="space-y-4">
              {itinerary.days.map((d) => (
                <div
                  key={d.day}
                  className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  <div className="sm:col-span-3 relative h-28 rounded-xl overflow-hidden">
                    <Image src={d.image_url} alt={d.city} fill className="object-cover" />
                    <span className="absolute top-2 left-2 bg-emerald-800 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                      Day {d.day}
                    </span>
                    <span className="absolute bottom-2 left-2 text-[9px] text-white/90 font-medium bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded">
                      {d.date}
                    </span>
                  </div>

                  <div className="sm:col-span-7 space-y-1.5">
                    <h3 className="text-base font-bold text-gray-900">{d.city}</h3>
                    <ul className="space-y-1">
                      {d.spots.map((spot, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
                          <span>{spot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sm:col-span-2 flex sm:flex-col items-center justify-end gap-2 text-right">
                    <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1">
                      <Edit2 size={12} /> Edit
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 cursor-pointer">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR: SUMMARY & QUICK TOOLS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Trip Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif font-bold text-gray-900 text-sm">Trip Summary</h3>
                <button className="text-xs font-bold text-emerald-800 hover:underline">Edit</button>
              </div>

              <div className="relative h-28 rounded-xl overflow-hidden">
                <Image src="/images/unawatuna.jpg" alt={itinerary.title} fill className="object-cover" />
              </div>

              <div>
                <h4 className="text-base font-bold text-gray-900">{itinerary.title}</h4>
                <p className="text-xs text-gray-500">{itinerary.route_text}</p>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600">
                <p className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-emerald-800" />
                  <span>{itinerary.date_range} ({itinerary.duration_text})</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-emerald-800" />
                  <span>{itinerary.travelers_text}</span>
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {itinerary.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-full"
                  >
                    • {tag}
                  </span>
                ))}
              </div>

              {/* Estimated Cost Box */}
              <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Estimated Cost</span>
                  <span className="font-bold text-emerald-900">{itinerary.estimated_cost_range}</span>
                </div>
                <Info size={16} className="text-emerald-700 shrink-0" />
              </div>
            </div>

            {/* Quick Tools Box */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
              <h3 className="font-serif font-bold text-gray-900 text-sm">Quick Tools</h3>
              <div className="space-y-2">
                {[
                  { title: "Find Nearby Places", desc: "See what's around you", icon: Navigation },
                  { title: "Check Distance & Time", desc: "Plan your travel route", icon: Clock },
                  { title: "Reorder Route", desc: "Optimize your trip", icon: Sparkles },
                  { title: "Download Itinerary", desc: "PDF / Share with friends", icon: Download },
                ].map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.title}
                      className="w-full p-3 rounded-xl border border-gray-50 hover:border-emerald-200 hover:bg-emerald-50/30 transition flex items-center justify-between text-left cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg group-hover:bg-emerald-800 group-hover:text-white transition">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-800">{tool.title}</h4>
                          <p className="text-[10px] text-gray-400">{tool.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-gray-400 group-hover:text-emerald-800" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Assistance Banner */}
            <div className="relative rounded-2xl overflow-hidden p-6 text-white bg-slate-900 space-y-3">
              <Image
                src="/images/ella.jpg"
                alt="Need Assistance"
                fill
                className="object-cover opacity-25"
              />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] text-amber-300 font-serif italic block">
                  Good Vibes Great Journeys ♡
                </span>
                <h4 className="text-base font-serif font-bold">Need Travel Assistance?</h4>
                <p className="text-xs text-gray-300">
                  Our team is here to help you plan your perfect trip.
                </p>
              </div>

              <Link
                href="/contact"
                className="relative z-10 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-xs rounded-xl transition cursor-pointer inline-block"
              >
                Contact Support →
              </Link>
            </div>

          </div>

        </div>

        {/* MAP & WHY PLAN WITH US SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          
          {/* MAP VISUALIZER */}
          <div className="lg:col-span-7 relative h-72 sm:h-80 bg-blue-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center">
            <Image
              src="/images/sigiriya.jpg"
              alt="Map Route"
              fill
              className="object-cover opacity-35"
            />
            
            {/* Overlay Waypoints Box */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-sm text-xs space-y-1.5 font-bold text-gray-800">
              <span className="text-[10px] text-gray-400 uppercase block">Your Route</span>
              <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"/> Colombo</p>
              <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"/> Kandy</p>
              <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"/> Ella</p>
              <p className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"/> Galle</p>
            </div>

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-1 shadow flex flex-col gap-1 text-gray-700">
              <button className="p-1 hover:bg-gray-100 rounded cursor-pointer"><ZoomIn size={16} /></button>
              <button className="p-1 hover:bg-gray-100 rounded cursor-pointer"><ZoomOut size={16} /></button>
            </div>
          </div>

          {/* WHY PLAN WITH LANKARA TRAVELS */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-serif font-bold text-gray-900">Why Plan with Lankara Travels?</h2>

            <div className="space-y-3">
              {[
                { title: "Personalized itineraries", desc: "Tailored to your interests and time", icon: Sparkles },
                { title: "Local insights", desc: "Hidden gems and local experiences", icon: ShieldCheck },
                { title: "Real-time information", desc: "Weather, transport and travel updates", icon: CheckCircle2 },
                { title: "24/7 support", desc: "We're here whenever you need us", icon: Headphones },
              ].map((reason) => {
                const Icon = reason.icon;
                return (
                  <div key={reason.title} className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl shrink-0 mt-0.5">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">{reason.title}</h4>
                      <p className="text-[11px] text-gray-500">{reason.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}