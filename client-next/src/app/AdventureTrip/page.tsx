"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Heart,
  User,
  Compass,
  MapPin,
  Star,
  Footprints,
  Ship,
  Trees,
  Waves,
  Globe,
  Binoculars,
  ArrowLeft,
} from "lucide-react";

interface AdventureCard {
  id: string;
  title: string;
  location: string;
  rating: number;
  price: number;
  category: string;
  image: string;
}

const categories = [
  { id: "hiking", label: "Hiking", icon: Footprints },
  { id: "rafting", label: "Rafting", icon: Ship },
  { id: "safari", label: "Safari", icon: Binoculars },
  { id: "surfing", label: "Surfing", icon: Waves },
  { id: "culture", label: "Culture", icon: Globe },
  { id: "wildlife", label: "Wildlife", icon: Trees },
];

const adventureItems: AdventureCard[] = [
  {
    id: "1",
    title: "Sigiriya Rock",
    location: "Sigiriya Rock",
    rating: 4.8,
    price: 750,
    category: "hiking",
    image: "/images/sigiriya.jpg",
  },
  {
    id: "2",
    title: "Ella Tea Fields",
    location: "Ella Tea Fields",
    rating: 4.8,
    price: 750,
    category: "hiking",
    image: "/images/ella.jpg",
  },
  {
    id: "3",
    title: "Yala Safari",
    location: "Yala Safari",
    rating: 4.8,
    price: 750,
    category: "safari",
    image: "/images/safari-trip.jpg",
  },
  {
    id: "4",
    title: "Kitulgala Rafting",
    location: "Kitulgala",
    rating: 4.9,
    price: 680,
    category: "rafting",
    image: "/images/adventures_trips.jpg",
  },
  {
    id: "5",
    title: "Arugam Bay Surf",
    location: "Arugam Bay",
    rating: 4.7,
    price: 620,
    category: "surfing",
    image: "/images/Trincomalee.jpg",
  },
  {
    id: "6",
    title: "Kandy Cultural Tour",
    location: "Kandy",
    rating: 4.8,
    price: 550,
    category: "culture",
    image: "/images/Kandy.jpg",
  },
];

export default function AdventureTripPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("hiking");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAdventures = adventureItems.filter((item) => {
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#111417] text-zinc-100 flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl w-full bg-[#181d22] border border-zinc-800 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl space-y-8">
        
        {/* Navigation Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/#destinations"
              className="p-2 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 rounded-xl transition"
              aria-label="Back to home"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-lg tracking-wide">
              <Compass className="w-5 h-5 text-emerald-400" />
              <span className="text-white">Adventure Trip</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#222930] text-xs text-zinc-200 placeholder-zinc-400 pl-10 pr-4 py-2.5 rounded-xl border border-zinc-700/60 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <button
              aria-label="Favorites"
              className="p-2.5 bg-[#222930] border border-zinc-700/60 rounded-xl text-zinc-300 hover:text-white hover:border-zinc-500 transition"
            >
              <Heart size={16} />
            </button>
            <button
              aria-label="User Profile"
              className="p-2.5 bg-[#222930] border border-zinc-700/60 rounded-xl text-zinc-300 hover:text-white hover:border-zinc-500 transition"
            >
              <User size={16} />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative rounded-2xl overflow-hidden bg-[#1f262e] border border-zinc-800/80 p-6 sm:p-10 min-h-[300px] flex flex-col justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-5 space-y-4 z-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-wider uppercase leading-tight">
                Adventure Trip
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300 font-light">
                Discover the Wild Heart of Sri Lanka
              </p>
              <div className="pt-2">
                <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
                  Explore Adventures
                </button>
              </div>
            </div>

            {/* Right Hero Collage Images */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-3 h-52 sm:h-64">
              <div className="relative rounded-xl overflow-hidden h-full">
                <Image
                  src="/images/adventures_trips.jpg"
                  alt="Rafting Adventure"
                  fill
                  sizes="(max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden h-full">
                <Image
                  src="/images/ella.jpg"
                  alt="Trekking Adventure"
                  fill
                  sizes="(max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative rounded-xl overflow-hidden h-full">
                <Image
                  src="/images/safari-trip.jpg"
                  alt="Zipline Adventure"
                  fill
                  sizes="(max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* Categories Pills */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-200">Category</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium border transition min-w-max ${
                    isActive
                      ? "bg-[#28323c] text-white border-zinc-600 shadow-sm"
                      : "bg-[#20272f] text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-[#252e38]"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-white" : "text-zinc-400"} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Adventure Cards Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAdventures.map((item) => {
            const isFav = !!favorites[item.id];
            return (
              <div
                key={item.id}
                className="bg-[#20272f] border border-zinc-800 rounded-2xl p-3 space-y-3 flex flex-col justify-between shadow-lg hover:border-zinc-700 transition"
              >
                {/* Image Container with Top Favorite Button */}
                <div className="relative h-44 w-full rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    aria-label="Favorite item"
                    className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-md p-1.5 rounded-full text-white hover:text-red-500 transition"
                  >
                    <Heart
                      size={14}
                      className={isFav ? "fill-red-500 text-red-500" : "text-white"}
                    />
                  </button>
                </div>

                {/* Details */}
                <div className="space-y-1 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-100">{item.title}</h3>
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      aria-label="Toggle heart"
                      className="text-zinc-400 hover:text-red-500 transition"
                    >
                      <Heart
                        size={14}
                        className={isFav ? "fill-red-500 text-red-500" : "text-zinc-400"}
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-zinc-400">
                    <MapPin size={11} className="text-zinc-400" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <div className="flex items-center gap-1 text-zinc-300">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{item.rating}</span>
                      <span className="text-zinc-400 ml-2">${item.price}</span>
                    </div>
                    <span className="text-sm font-black text-zinc-100">
                      ${item.price}
                    </span>
                  </div>
                </div>

                {/* Dual Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button className="w-full bg-[#2d3742] hover:bg-[#36424f] text-zinc-200 text-xs font-semibold py-2 rounded-xl transition">
                    Book Now
                  </button>
                  <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold py-2 rounded-xl transition">
                    Book Now
                  </button>
                </div>

              </div>
            );
          })}
        </section>

      </div>
    </div>
  );
}