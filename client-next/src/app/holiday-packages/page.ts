"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  MapPin, 
  Star, 
  Clock, 
  Sparkles, 
  Filter, 
  ArrowRight, 
  CheckCircle2,
  PackageX
} from "lucide-react";

interface Package {
  id: string;
  title: string;
  location: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  price: number;
  category: string;
  image: string;
  highlights: string[];
  featured?: boolean;
}

const HOLIDAY_PACKAGES: Package[] = [
  {
    id: "pkg-001",
    title: "Ella & Hill Country Express",
    location: "Ella, Nuwara Eliya & Kandy",
    duration: "4 Days / 3 Nights",
    rating: 4.9,
    reviewsCount: 128,
    price: 350,
    category: "Hill Country",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=800",
    highlights: ["Scenic Train Tour", "Nine Arches Bridge", "Tea Estate Stay"],
    featured: true,
  },
  {
    id: "pkg-002",
    title: "Southern Coastal Sunset Escape",
    location: "Mirissa, Galle & Bentota",
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviewsCount: 96,
    price: 480,
    category: "Beach",
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&q=80&w=800",
    highlights: ["Whale Watching", "Galle Fort Tour", "Private Beach Resort"],
  },
  {
    id: "pkg-003",
    title: "Cultural Triangle & Wildlife Safari",
    location: "Sigiriya, Dambulla & Yala",
    duration: "6 Days / 5 Nights",
    rating: 4.95,
    reviewsCount: 210,
    price: 650,
    category: "Culture & Wildlife",
    image: "https://images.unsplash.com/photo-1588598056927-e2a22f778a46?auto=format&fit=crop&q=80&w=800",
    highlights: ["Sigiriya Fortress Climb", "Yala Jeep Safari", "Ancient Temples"],
    featured: true,
  },
  {
    id: "pkg-004",
    title: "Arugam Bay Surf & Chill Expedition",
    location: "Arugam Bay, Eastern Province",
    duration: "3 Days / 2 Nights",
    rating: 4.7,
    reviewsCount: 74,
    price: 290,
    category: "Beach",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
    highlights: ["Surf Coaching", "Lagoon Safari", "Beachfront Cabanas"],
  },
];

export default function HolidayPackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Hill Country", "Beach", "Culture & Wildlife"];

  const filteredPackages = HOLIDAY_PACKAGES.filter((pkg) => {
    const matchesCategory = selectedCategory === "All" || pkg.category === selectedCategory;
    const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#070b09] text-white py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Banner */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles size={14} /> Handcrafted Travel Experiences
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-100 tracking-tight">
            Curated Holiday Packages
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Explore curated itineraries covering Sri Lanka’s golden beaches, misty mountains, and historical landmarks.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder="Search destination or package..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#070b09] border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <Filter size={16} className="text-zinc-500 hidden sm:block mr-2 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-4 py-2 rounded-xl transition whitespace-nowrap font-medium cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "bg-[#070b09] text-zinc-400 border border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#121614] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl overflow-hidden transition group flex flex-col justify-between"
              >
                <div>
                  {/* Image & Badge Header */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20 z-10">
                      {pkg.category}
                    </div>
                    {pkg.featured && (
                      <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full z-10">
                        POPULAR
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                          <MapPin size={12} className="text-emerald-500" /> {pkg.location}
                        </span>
                        <span className="text-[11px] text-amber-400 flex items-center gap-1 font-semibold">
                          <Star size={12} className="fill-amber-400" /> {pkg.rating} ({pkg.reviewsCount})
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-zinc-100 group-hover:text-emerald-400 transition">
                        {pkg.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-zinc-400 border-y border-zinc-800/60 py-2.5">
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-emerald-500" /> {pkg.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-emerald-500" /> Daily Departures
                      </span>
                    </div>

                    {/* Highlights Bullet Points */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                        Package Highlights
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {pkg.highlights.map((hl, idx) => (
                          <span key={idx} className="text-xs text-zinc-300 flex items-center gap-1.5">
                            <CheckCircle2 size={12} className="text-emerald-500 shrink-0" /> {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer / Pricing & CTA */}
                <div className="p-6 pt-0 border-t border-zinc-800/40 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Starting From</span>
                    <div className="text-xl font-black text-zinc-100">
                      ${pkg.price} <span className="text-xs font-normal text-zinc-400">/ person</span>
                    </div>
                  </div>

                  <Link
                    href={`/bookings?packageId=${pkg.id}`}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Package</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-12 text-center space-y-3">
            <PackageX size={40} className="text-zinc-600 mx-auto" />
            <h3 className="text-zinc-200 font-bold text-base">No Packages Found</h3>
            <p className="text-zinc-500 text-xs max-w-sm mx-auto">
              We couldn&apos;t find any holiday packages matching your filter criteria. Try adjusting your search query or selecting a different category.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}