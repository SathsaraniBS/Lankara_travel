"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Heart,
  User,
  MapPin,
  Calendar,
  Car,
  ArrowRight,
  ShieldCheck,
  Compass,
  Clock,
  Navigation,
  CheckCircle2,
  Sliders,
  Map,
  Instagram,
  Facebook,
  Twitter,
  Sparkles,
  Camera,
  Users,
} from "lucide-react";

interface RoadTripCard {
  id: string;
  badge: string;
  title: string;
  tags: string[];
  duration: string;
  distance: string;
  image: string;
}

const featuredRoadTrips: RoadTripCard[] = [
  {
    id: "1",
    badge: "Coastal Drive",
    title: "Galle to Mirissa",
    tags: ["Coastline", "Beaches", "Surfing"],
    duration: "1-2 days",
    distance: "130 km",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    badge: "Mountain Escape",
    title: "Kandy to Ella",
    tags: ["Mountains", "Tea Estates", "Scenic Views"],
    duration: "2-3 days",
    distance: "180 km",
    image:
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    badge: "Wildlife & Nature",
    title: "Colombo to Yala",
    tags: ["Wildlife", "National Parks", "Beaches"],
    duration: "2-3 days",
    distance: "280 km",
    image:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    badge: "Cultural Journey",
    title: "Sigiriya to Anuradhapura",
    tags: ["Heritage", "Culture", "History"],
    duration: "1-2 days",
    distance: "150 km",
    image:
      "https://images.unsplash.com/photo-1588598056926-d6215715a201?auto=format&fit=crop&w=800&q=80",
  },
];

export default function RoadTripPage() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [destination, setDestination] = useState("");
  const [tripDuration, setTripDuration] = useState("");
  const [travelStyle, setTravelStyle] = useState("");

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-zinc-800 font-sans selection:bg-amber-200">

      {/* Hero Section */}
      <section className="relative w-full h-[500px] sm:h-[560px] bg-stone-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80"
          alt="Scenic Road Trip Driving in Sri Lanka"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/45 to-transparent" />

        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-8 flex flex-col justify-center text-white space-y-5">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Car size={16} />
            <span>Road Trips</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-tight max-w-2xl drop-shadow-md">
            Scenic Routes, <br />
            Unforgettable Journeys
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 max-w-md font-light leading-relaxed drop-shadow">
            Hit the road and discover Sri Lanka&apos;s most breathtaking routes. From coastal drives to mountain passes, our road trip guides help you explore more, stress less.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-300 pt-2">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-amber-400" />
              <span>Curated Road Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera size={16} className="text-amber-400" />
              <span>Best Stops & Hidden Gems</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-amber-400" />
              <span>Travel Tips & Safety</span>
            </div>
            <div className="flex items-center gap-2">
              <Sliders size={16} className="text-amber-400" />
              <span>Flexible Itineraries</span>
            </div>
          </div>

          <p className="text-xs italic text-amber-200 font-serif pt-1">
            &ldquo;Same island, Different routes ♡&rdquo;
          </p>
        </div>
      </section>

      {/* Filter / Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-10 relative z-20">
        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
          
          {/* Where do you want to go */}
          <div className="p-2 border-b sm:border-b-0 sm:border-r border-stone-200">
            <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
              Where do you want to go?
            </label>
            <div className="flex items-center gap-2 text-xs text-stone-800">
              <MapPin size={14} className="text-emerald-700" />
              <input
                type="text"
                placeholder="e.g. Galle, Ella, Trincomalee..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-xs text-stone-800 placeholder-stone-400"
              />
            </div>
          </div>

          {/* Trip Duration */}
          <div className="p-2 border-b sm:border-b-0 lg:border-r border-stone-200">
            <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
              Trip Duration
            </label>
            <div className="flex items-center gap-2 text-xs text-stone-800">
              <Calendar size={14} className="text-emerald-700" />
              <select
                value={tripDuration}
                onChange={(e) => setTripDuration(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-xs text-stone-800 cursor-pointer"
              >
                <option value="">Select days</option>
                <option value="1-2">1 - 2 Days</option>
                <option value="3-5">3 - 5 Days</option>
                <option value="7+">7+ Days</option>
              </select>
            </div>
          </div>

          {/* Travel Style */}
          <div className="p-2 border-b lg:border-b-0 border-stone-200">
            <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
              Travel Style
            </label>
            <div className="flex items-center gap-2 text-xs text-stone-800">
              <Car size={14} className="text-emerald-700" />
              <select
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-xs text-stone-800 cursor-pointer"
              >
                <option value="">Any type</option>
                <option value="coastal">Coastal Drive</option>
                <option value="mountain">Mountain Escape</option>
                <option value="wildlife">Wildlife & Nature</option>
                <option value="cultural">Cultural Journey</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button className="w-full bg-[#173a2e] hover:bg-[#122e24] text-white font-medium text-xs py-3 px-4 rounded-xl transition shadow-md flex items-center justify-center gap-2">
              <span>Explore Road Trips</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* Featured Road Trips Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Featured Road Trips
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              Top Road Trips in Sri Lanka
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Handpicked routes for every kind of traveler — from coastal drives to mountain adventures.
            </p>
          </div>
          <Link
            href="#"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-emerald-800 transition"
          >
            <span>View All Road Trips</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRoadTrips.map((trip) => {
            const isFav = !!favorites[trip.id];
            return (
              <div
                key={trip.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <button
                    onClick={(e) => toggleFavorite(trip.id, e)}
                    aria-label="Favorite road trip"
                    className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full text-white hover:text-red-500 transition"
                  >
                    <Heart
                      size={14}
                      className={isFav ? "fill-red-500 text-red-500" : "text-white"}
                    />
                  </button>
                  <span className="absolute top-3 left-3 bg-sky-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {trip.badge}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-stone-900 leading-tight">
                      {trip.title}
                    </h3>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {trip.tags.map((t, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <div className="flex items-center gap-3 text-[10px] text-stone-500 font-medium">
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-emerald-700" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation size={12} className="text-emerald-700" />
                        <span>{trip.distance}</span>
                      </div>
                    </div>

                    <Link
                      href="#"
                      className="bg-[#173a2e] hover:bg-[#122e24] text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                    >
                      <span>View Route</span>
                      <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Itinerary Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Decorative Image Box */}
          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden shadow-md min-h-[340px] flex flex-col justify-end p-6 text-white group">
            <Image
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
              alt="Jeep Driving along Coconut Palms"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
            <div className="relative z-10 space-y-1">
              <span className="font-serif italic text-sm text-amber-300 drop-shadow">
                &ldquo;Road trips create the best memories ♡&rdquo;
              </span>
            </div>
          </div>

          {/* Center Details Box */}
          <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">
                Featured Itinerary
              </span>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                Coastal Wonders Road Trip
              </h3>
              <p className="text-xs text-stone-500">
                Galle → Matara → Tangalle → Mirissa
              </p>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-3 pl-1 border-l-2 border-emerald-800/20 my-2">
              <div className="flex items-start gap-3 relative pl-3">
                <div className="absolute -left-[17px] top-0 w-6 h-6 rounded-full bg-[#173a2e] text-white flex items-center justify-center text-[10px] font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Day 1: Galle</h4>
                  <p className="text-[10px] text-stone-500">Dutch Fort, Old Town, Lighthouse</p>
                </div>
              </div>

              <div className="flex items-start gap-3 relative pl-3">
                <div className="absolute -left-[17px] top-0 w-6 h-6 rounded-full bg-[#173a2e] text-white flex items-center justify-center text-[10px] font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Day 1: Unawatuna</h4>
                  <p className="text-[10px] text-stone-500">Snorkeling, Beach Vibes</p>
                </div>
              </div>

              <div className="flex items-start gap-3 relative pl-3">
                <div className="absolute -left-[17px] top-0 w-6 h-6 rounded-full bg-[#173a2e] text-white flex items-center justify-center text-[10px] font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Day 2: Tangalle</h4>
                  <p className="text-[10px] text-stone-500">Hidden Beaches, Silent Beach</p>
                </div>
              </div>

              <div className="flex items-start gap-3 relative pl-3">
                <div className="absolute -left-[17px] top-0 w-6 h-6 rounded-full bg-[#173a2e] text-white flex items-center justify-center text-[10px] font-bold">
                  4
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Day 2: Mirissa</h4>
                  <p className="text-[10px] text-stone-500">Whale Watching, Sunset</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
              <div className="flex items-center gap-1">
                <Clock size={12} className="text-emerald-700" />
                <span>2 Days</span>
              </div>
              <div className="flex items-center gap-1">
                <Navigation size={12} className="text-emerald-700" />
                <span>150 km</span>
              </div>
              <div className="flex items-center gap-1">
                <Car size={12} className="text-emerald-700" />
                <span>Moderate</span>
              </div>
            </div>

            <Link
              href="#"
              className="bg-[#173a2e] hover:bg-[#122e24] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition text-center shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>View Full Itinerary</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Right Map & Photo Box */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Map Graphic Simulation */}
            <div className="bg-[#d2e3d8] border border-emerald-200 rounded-2xl p-4 relative flex-1 min-h-[180px] flex flex-col justify-between overflow-hidden shadow-inner">
              <div className="flex justify-between items-start z-10">
                <span className="text-[10px] font-bold text-emerald-950 uppercase tracking-wider bg-white/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  Sri Lanka Route Map
                </span>
                <span className="text-[9px] font-mono text-emerald-900 font-bold">A → N</span>
              </div>

              {/* Decorative Pins */}
              <div className="relative w-full h-24 my-2">
                <div className="absolute top-2 left-6 flex items-center gap-1">
                  <MapPin size={16} className="text-red-500 fill-red-500" />
                  <span className="text-[9px] font-bold text-slate-800 bg-white/80 px-1 rounded">
                    Galle
                  </span>
                </div>
                <div className="absolute top-8 left-1/3 flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-800" />
                  <span className="text-[8px] text-slate-700 bg-white/70 px-1 rounded">
                    Unawatuna
                  </span>
                </div>
                <div className="absolute bottom-2 right-10 flex items-center gap-1">
                  <MapPin size={16} className="text-red-500 fill-red-500" />
                  <span className="text-[9px] font-bold text-slate-800 bg-white/80 px-1 rounded">
                    Mirissa
                  </span>
                </div>
                {/* SVG Route Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-emerald-800 stroke-[2] stroke-dasharray-4">
                  <path d="M 35 15 Q 110 45, 230 75" fill="none" strokeDasharray="3 3" />
                </svg>
              </div>

              <div className="z-10 text-[10px] text-emerald-900 font-medium">
                Scenic Coastal Highway A2 Route
              </div>
            </div>

            {/* Coastal Photo */}
            <div className="relative h-32 rounded-2xl overflow-hidden shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80"
                alt="Coastlines & Beaches"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="font-serif italic text-xs drop-shadow">
                  Coastlines, Culture & Good Vibes ♡
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose a Road Trip Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
            Why Choose a Road Trip?
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Freedom to Explore
          </h2>
          <p className="text-xs text-stone-500 mt-1 max-w-xl">
            A road trip in Sri Lanka gives you the freedom to discover hidden beaches, local towns and stunning landscapes at your own pace.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Calendar size={18} />
            </div>
            <h3 className="text-sm font-bold text-stone-900 pt-1">Flexible Itineraries</h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Go at your own pace without rigid tour schedules.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Compass size={18} />
            </div>
            <h3 className="text-sm font-bold text-stone-900 pt-1">Hidden Gems</h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Discover secret spots beyond the typical tourist trails.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <Users size={18} />
            </div>
            <h3 className="text-sm font-bold text-stone-900 pt-1">Local Experiences</h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Meet amazing local people and try authentic street food.
            </p>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-2 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <h3 className="text-sm font-bold text-stone-900 pt-1">More Value</h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed">
              Explore more iconic destinations while spending less.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-16 bg-stone-900 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80"
          alt="Road trip highway through Sri Lanka"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-4xl font-serif font-bold">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Plan your Sri Lanka road trip today and make memories that last a lifetime.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <Link
              href="/PlanTrip"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-full transition shadow-lg flex items-center gap-2"
            >
              <span>Plan Your Road Trip</span>
              <ArrowRight size={14} />
            </Link>
            <span className="text-[10px] italic text-stone-300 font-serif">
              Same island, More to explore ♡
            </span>
          </div>
        </div>
      </section>


    </div>
  );
}