"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Hotel as HotelIcon, 
  MapPin, 
  Star, 
  Wifi, 
  Coffee, 
  Pool, 
  Search, 
  SlidersHorizontal, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  image: string;
  amenities: string[];
  featured?: boolean;
}

const HOTELS: Hotel[] = [
  {
    id: "hotel-001",
    name: "Heritance Kandalama",
    location: "Dambulla, Cultural Triangle",
    rating: 4.9,
    reviewsCount: 342,
    pricePerNight: 180,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    amenities: ["Infinity Pool", "Free WiFi", "Spa & Wellness", "Breakfast Included"],
    featured: true,
  },
  {
    id: "hotel-002",
    name: "Cape Weligama Luxury Resort",
    location: "Weligama, Southern Coast",
    rating: 4.95,
    reviewsCount: 189,
    pricePerNight: 320,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
    amenities: ["Ocean View", "Private Pool", "Fine Dining", "Airport Shuttle"],
    featured: true,
  },
  {
    id: "hotel-003",
    name: "98 Acres Resort & Spa",
    location: "Ella, Hill Country",
    rating: 4.85,
    reviewsCount: 512,
    pricePerNight: 210,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    amenities: ["Mountain View", "Helipad", "Spa", "Free WiFi"],
  },
  {
    id: "hotel-004",
    name: "Cinnamon Citadel",
    location: "Kandy, Central Province",
    rating: 4.7,
    reviewsCount: 276,
    pricePerNight: 110,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
    amenities: ["Riverfront View", "Outdoor Pool", "Fitness Center", "Restaurant"],
  },
];

export default function HotelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState<number>(400);

  const filteredHotels = HOTELS.filter((hotel) => {
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = hotel.pricePerNight <= maxPrice;
    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#070b09] text-white py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full">
            <HotelIcon size={14} /> Premium Accommodations
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-100 tracking-tight">
            Handpicked Stays in Sri Lanka
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            From eco-luxury rainforest lodges to beachfront boutique resorts, discover top-rated places to stay.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          
          {/* Search Box */}
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-3 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by hotel or city (e.g. Ella, Kandy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#070b09] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Budget Range Slider */}
          <div className="space-y-1 md:col-span-1">
            <div className="flex justify-between text-xs text-zinc-400 font-medium">
              <span>Max Price / Night</span>
              <span className="text-emerald-400 font-bold">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer bg-zinc-800 h-1.5 rounded-lg"
            />
          </div>

          {/* Quick Info Badge */}
          <div className="flex items-center justify-end text-xs text-zinc-400 gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span>Best Price Guaranteed & Instant Confirmation</span>
          </div>

        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-[#121614] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl overflow-hidden transition group flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges Header */}
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  {hotel.featured && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full">
                      FEATURED
                    </div>
                  )}
                </div>

                {/* Hotel Details */}
                <div className="p-6 space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                        <MapPin size={12} className="text-emerald-500" /> {hotel.location}
                      </span>
                      <span className="text-[11px] text-amber-400 flex items-center gap-1 font-semibold">
                        <Star size={12} className="fill-amber-400" /> {hotel.rating} ({hotel.reviewsCount})
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-zinc-100 group-hover:text-emerald-400 transition">
                      {hotel.name}
                    </h3>
                  </div>

                  {/* Amenities Tags */}
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-[#070b09] border border-zinc-800 text-zinc-300 text-[10px] font-medium px-2.5 py-1 rounded-lg"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & CTA Footer */}
              <div className="p-6 pt-0 border-t border-zinc-800/40 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold">Nightly Rate</span>
                  <div className="text-2xl font-black text-zinc-100">
                    ${hotel.pricePerNight} <span className="text-xs font-normal text-zinc-400">/ night</span>
                  </div>
                </div>

                <Link
                  href={`/bookings?hotelId=${hotel.id}`}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <span>Book Stay</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}