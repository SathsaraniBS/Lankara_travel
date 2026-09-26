"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  ArrowRight,
  Compass,
  Sparkles,
  Heart,
  SlidersHorizontal,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function DestinationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Urban & Nightlife",
    "Heritage & Culture",
    "Beaches & Coast",
    "Hills & Nature",
    "Northern Heritage",
  ];

  const destinations = [
    {
      slug: "colombo",
      name: "Colombo",
      tagline: "Urban & Nightlife",
      category: "Urban & Nightlife",
      description:
        "Sri Lanka's bustling commercial capital mixing colonial heritage, modern rooftop bars, and vibrant street food culture.",
      image:
        "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
      highlights: ["Lotus Tower", "Galle Face Green", "Pettah Market"],
      bestTime: "Nov - Apr",
    },
    {
      slug: "galle",
      name: "Galle",
      tagline: "Heritage & Beaches",
      category: "Beaches & Coast",
      description:
        "A UNESCO World Heritage Dutch fort city filled with charming cobblestone streets, boutique cafes, and golden palm beaches.",
      image:
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop",
      highlights: ["Galle Fort", "Lighthouse", "Unawatuna Beach"],
      bestTime: "Nov - Apr",
    },
    {
      slug: "kandy",
      name: "Kandy",
      tagline: "History & Culture",
      category: "Heritage & Culture",
      description:
        "The sacred hill capital surrounded by misty mountains, home to the Temple of the Sacred Tooth Relic and royal gardens.",
      image:
        "https://images.unsplash.com/photo-1566296531481-5800d3992084?q=80&w=800&auto=format&fit=crop",
      highlights: ["Temple of Tooth Relic", "Kandy Lake", "Peradeniya Gardens"],
      bestTime: "Jan - Apr",
    },
    {
      slug: "trincomalee",
      name: "Trincomalee",
      tagline: "Pristine Beaches & Whales",
      category: "Beaches & Coast",
      description:
        "Famous for turquoise waters, whale watching, ancient Koneswaram temple perched on cliffside cliffs, and Nilaveli beach.",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
      highlights: ["Nilaveli Beach", "Pigeon Island", "Koneswaram Temple"],
      bestTime: "May - Oct",
    },
    {
      slug: "nuwara-eliya",
      name: "Nuwara Eliya",
      tagline: "Little England & Tea Country",
      category: "Hills & Nature",
      description:
        "Cool mountain air, endless rolling green tea plantations, colonial bungalows, and dramatic cascading waterfalls.",
      image:
        "https://images.unsplash.com/photo-1588598198321-9735fd52455b?q=80&w=800&auto=format&fit=crop",
      highlights: ["Gregory Lake", "Tea Estates", "Horton Plains"],
      bestTime: "Feb - May",
    },
    {
      slug: "jaffna",
      name: "Jaffna",
      tagline: "Northern Culture & History",
      category: "Northern Heritage",
      description:
        "A vibrant northern peninsula rich in Tamil culture, colorful Nallur temples, secluded islands, and unique cuisine.",
      image:
        "https://images.unsplash.com/photo-1608248597259-be133f9547d4?q=80&w=800&auto=format&fit=crop",
      highlights: ["Nallur Kandaswamy Kovil", "Jaffna Fort", "Delft Island"],
      bestTime: "Jan - Sep",
    },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesCategory =
      selectedCategory === "All" || dest.category === selectedCategory;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans flex flex-col justify-between">
      <div>
        {/* Hero Section */}
        <section className="relative w-full h-[400px] bg-slate-900 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=1600&auto=format&fit=crop"
            alt="Sri Lanka Destinations Banner"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1">
                📍 DESTINATION GUIDE
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white max-w-xl leading-tight">
              Explore Sri Lanka
            </h1>

            <p className="text-gray-200 text-xs md:text-sm mt-3 max-w-md leading-relaxed">
              From golden coastal beaches and ancient heritage forts to misty mountain peak tea plantations — discover your next island adventure.
            </p>

            <p className="font-serif italic text-white/90 text-sm mt-4">
              One island. Endless stories ♡
            </p>
          </div>

          <div className="absolute right-12 bottom-12 hidden lg:block text-right text-white/80">
            <p className="font-serif italic text-2xl font-light tracking-wide">
              Small island <br />
              Big adventures ♡
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
          {/* Search & Filter Controls */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search city, beach, heritage..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-emerald-700 focus:bg-white transition"
                />
              </div>

              {/* Count Indicator */}
              <div className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-800" />
                Showing <span className="font-bold text-gray-900">{filteredDestinations.length}</span> destinations
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <SlidersHorizontal className="w-4 h-4 text-gray-400 mr-1 shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-emerald-900 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Destination Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((dest) => (
                <Link
                  key={dest.slug}
                  href={`/destinations/${dest.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition duration-300 transform hover:-translate-y-1"
                >
                  <div>
                    {/* Card Image */}
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Top Category Badge */}
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-emerald-900 uppercase tracking-wider shadow">
                        {dest.category}
                      </div>

                      {/* Best Time Badge */}
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {dest.bestTime}
                      </div>

                      {/* Title Overlay */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className="text-2xl font-serif font-bold leading-tight">
                          {dest.name}
                        </h3>
                        <p className="text-xs text-amber-300 font-serif italic">
                          {dest.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 space-y-4">
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {dest.description}
                      </p>

                      {/* Key Highlights */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
                          Top Highlights
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {dest.highlights.map((spot, i) => (
                            <span
                              key={i}
                              className="bg-emerald-50 text-emerald-800 text-[11px] px-2.5 py-1 rounded-md font-medium border border-emerald-100/60"
                            >
                              {spot}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-5 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between text-xs text-emerald-900 font-semibold group-hover:bg-emerald-900 group-hover:text-white transition duration-300">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Explore Guide
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-3">
              <Compass className="w-10 h-10 text-gray-300 mx-auto animate-bounce" />
              <h3 className="text-lg font-serif font-bold text-gray-800">
                No Destinations Found
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                We couldn&apos;t find any destination matching &quot;{searchQuery}&quot;. Try searching for another city or resetting filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="bg-emerald-900 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-emerald-950 transition"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Bottom Banner CTA */}
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-white bg-slate-900 flex flex-col md:flex-row items-center justify-between">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"
              alt="Plan your trip"
              fill
              className="object-cover opacity-40"
            />
            <div className="relative z-10 space-y-2 max-w-lg">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold">
                CAN'T DECIDE WHERE TO GO?
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold">
                Let Us Plan Your Custom Itinerary
              </h3>
              <p className="text-xs text-gray-200">
                Tell us your travel style, schedule, and budget, and we&apos;ll craft a tailored Sri Lanka experience just for you.
              </p>
            </div>
            <div className="relative z-10 mt-6 md:mt-0 flex flex-col items-end gap-2">
              <Link
                href="/plantrip"
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 text-xs font-semibold px-6 py-3 rounded-full transition flex items-center gap-1 shadow-md"
              >
                Plan My Trip <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <span className="font-serif italic text-xs text-white/80">
                Crafted with love ♡
              </span>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}