"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Sparkles,
  ChevronRight,
  Star,
  MapPin,
  Flame,
  Waves,
  Mountain,
  Trees,
} from "lucide-react";

// Mock categories data
const categories = [
  { id: "all", label: "All Expeditions", icon: Flame },
  { id: "water", label: "Water Sports", icon: Waves },
  { id: "hiking", label: "Trekking & Hiking", icon: Mountain },
  { id: "wildlife", label: "Wildlife Safaris", icon: Trees },
];

// Mock adventure listings data
const adventures = [
  {
    id: 1,
    title: "White Water Rafting",
    category: "water",
    location: "Kitulgala, Sri Lanka",
    price: 85,
    rating: 4.9,
    duration: "1 Day",
    image: "/images/adventures_trips.jpg",
  },
  {
    id: 2,
    title: "Ella Rock & Peak Trek",
    category: "hiking",
    location: "Ella, Sri Lanka",
    price: 60,
    rating: 4.8,
    duration: "2 Days",
    image: "/images/ella.jpg",
  },
  {
    id: 3,
    title: "Yala Wilderness Safari",
    category: "wildlife",
    location: "Yala, Sri Lanka",
    price: 120,
    rating: 4.9,
    duration: "1 Day",
    image: "/images/safari-trip.jpg",
  },
];

export default function AdventureTripPage() {
  const [searchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAdventures = adventures.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-slate-950">
      {/* Optional Top Hero Banner */}
      <section
        id="hero-banner"
        className="relative min-h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat px-4 py-16 text-white"
        style={{
          backgroundImage: "url('/images/road-trip.png')",
        }}
      />

      {/* Main Content Section */}
      <section
        id="destinations"
        className="relative min-h-screen w-full flex flex-col items-center justify-start bg-slate-950 bg-cover bg-center bg-no-repeat px-4 py-12 text-white scroll-mt-20"
        style={{
          backgroundImage: "url('/images/adventure-trip-bg.png')",
        }}
      >
        {/* Background Decorative Blur Spheres */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-7xl space-y-10 z-10">
          {/* Hero Section */}
          <section className="relative rounded-3xl overflow-hidden bg-slate-900/40 border border-slate-800/80 p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Hero Content */}
              <div className="lg:col-span-6 space-y-6 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles size={12} /> Next-Gen Expeditions
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-none">
                  Wild{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                    Highlands
                  </span>
                </h1>
                <p className="text-sm text-slate-400 font-light max-w-md leading-relaxed">
                  Experience high-octane adventures across Sri Lanka. Master
                  rugged terrains, rushing rivers, and pristine rainforests.
                </p>

                {/* Stat Highlights */}
                <div className="grid grid-cols-3 gap-4 py-2 max-w-md border-y border-slate-800/80 my-4">
                  <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider">
                      Altitudes
                    </span>
                    <span className="text-lg font-extrabold text-cyan-400">
                      2,500m+
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider">
                      Rating
                    </span>
                    <span className="text-lg font-extrabold text-white">
                      4.9 ★
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 uppercase tracking-wider">
                      Routes
                    </span>
                    <span className="text-lg font-extrabold text-emerald-400">
                      120+
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button className="bg-gradient-to-r from-cyan-400 to-emerald-400 hover:opacity-90 text-slate-950 font-extrabold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2">
                    <span>Explore Adventures</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right Hero Collage Images */}
              <div className="lg:col-span-6 grid grid-cols-3 gap-3 h-64 sm:h-80">
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl transform hover:scale-105 transition duration-300">
                  <Image
                    src="/images/adventures_trips.jpg"
                    alt="Rafting Adventure"
                    fill
                    sizes="(max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl transform hover:scale-105 transition duration-300 translate-y-2">
                  <Image
                    src="/images/ella.jpg"
                    alt="Trekking Adventure"
                    fill
                    sizes="(max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl transform hover:scale-105 transition duration-300">
                  <Image
                    src="/images/safari-trip.jpg"
                    alt="Safari Adventure"
                    fill
                    sizes="(max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Categories Pills */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-wider text-slate-300 uppercase">
                Filter Experience
              </h2>
              <span className="text-xs text-slate-500">
                {filteredAdventures.length} Options Available
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 min-w-max border ${
                      isActive
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/40 shadow-lg shadow-cyan-500/10"
                        : "bg-slate-900/60 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={isActive ? "text-cyan-400" : "text-slate-500"}
                    />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Adventure Cards Grid */}
          <section>
            {filteredAdventures.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-slate-800/60 text-slate-500 text-sm">
                No expeditions found matching your selection.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAdventures.map((item) => {
                  const isFav = !!favorites[item.id];
                  return (
                    <div
                      key={item.id}
                      className="group bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-xl hover:border-slate-700 transition duration-300"
                    >
                      {/* Image Container with Top Favorite Button */}
                      <div className="relative h-52 w-full rounded-xl overflow-hidden mb-4">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />

                        <button
                          onClick={(e) => toggleFavorite(item.id, e)}
                          aria-label="Favorite item"
                          className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-red-500 transition"
                        >
                          <Heart
                            size={16}
                            className={
                              isFav
                                ? "fill-red-500 text-red-500"
                                : "text-slate-300"
                            }
                          />
                        </button>

                        {item.duration && (
                          <span className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-md border border-white/10 text-[10px] uppercase font-bold tracking-wider text-cyan-400 px-2.5 py-1 rounded-md">
                            {item.duration}
                          </span>
                        )}
                      </div>

                      {/* Details */}
                      <div className="space-y-3 px-1 mb-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-amber-400 shrink-0 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                            <Star size={12} className="fill-amber-400" />
                            <span className="font-bold">{item.rating}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <MapPin size={13} className="text-slate-500" />
                          <span>{item.location}</span>
                        </div>

                        <div className="pt-3 flex items-baseline justify-between border-t border-slate-800/80">
                          <span className="text-xs text-slate-500 uppercase tracking-wider">
                            Starting at
                          </span>
                          <div className="text-right">
                            <span className="text-xl font-black text-cyan-400">
                              ${item.price}
                            </span>
                            <span className="text-[10px] text-slate-500 block">
                              per person
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <button className="w-full bg-slate-800/80 hover:bg-slate-800 text-slate-200 text-xs font-bold py-3 rounded-xl border border-slate-700/50 transition">
                          Details
                        </button>
                        <button className="w-full bg-gradient-to-r from-cyan-400 to-emerald-400 hover:opacity-90 text-slate-950 text-xs font-extrabold py-3 rounded-xl transition shadow-lg shadow-cyan-500/10">
                          Book Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}