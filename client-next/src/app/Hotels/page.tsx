"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  Heart,
  Wifi,
  Pool,
  Tv,
  Coffee,
  Sparkles,
  ChevronDown,
  Building2,
  Palmtree,
  Hotel,
  Check,
  ShieldCheck,
  Clock,
  Award,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

// Hotel Interface
interface HotelItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  amenities: string[];
  description: string;
  pricePerNight: number;
  type: "Resort" | "Hotel" | "Villa" | "Guesthouse" | "Apartment";
}

// Dummy Data matching the UI screenshot
const HOTELS_DATA: HotelItem[] = [
  {
    id: "jetwing-beach",
    name: "Jetwing Beach",
    location: "Negombo",
    rating: 4.8,
    reviewsCount: 1240,
    badge: "Best Seller",
    image: "/images/unawatuna.jpg",
    amenities: ["Beachfront", "Free WiFi", "Swimming Pool"],
    description:
      "A perfect blend of modern comfort and natural beauty, just steps away from the golden beach.",
    pricePerNight: 120,
    type: "Resort",
  },
  {
    id: "98-acres",
    name: "98 Acres Resort & Spa",
    location: "Ella",
    rating: 4.7,
    reviewsCount: 896,
    badge: "Popular",
    image: "/images/ella.jpg",
    amenities: ["Mountain View", "Spa", "Free WiFi"],
    description:
      "Surrounded by tea plantations, this eco-resort offers a peaceful escape in the heart of Ella.",
    pricePerNight: 150,
    type: "Resort",
  },
  {
    id: "heritance-ahungalla",
    name: "Heritance Ahungalla",
    location: "Ahungalla",
    rating: 4.6,
    reviewsCount: 1032,
    image: "/images/sigiriya.jpg",
    amenities: ["Beachfront", "All Inclusive", "Spa"],
    description:
      "A luxurious resort with stunning ocean views, world-class facilities and warm Sri Lankan hospitality.",
    pricePerNight: 180,
    type: "Resort",
  },
  {
    id: "cinnamon-grand",
    name: "Cinnamon Grand Colombo",
    location: "Colombo",
    rating: 4.5,
    reviewsCount: 1570,
    image: "/images/colombo.jpg",
    amenities: ["City View", "Fitness Center", "Free WiFi"],
    description:
      "A stylish city hotel in the heart of Colombo, perfect for business and leisure travelers.",
    pricePerNight: 140,
    type: "Hotel",
  },
  {
    id: "fortress-resort",
    name: "The Fortress Resort & Spa",
    location: "Koggala",
    rating: 4.9,
    reviewsCount: 669,
    image: "/images/unawatuna.jpg",
    amenities: ["Beachfront", "Private Beach", "Spa"],
    description:
      "Experience luxury and tranquility in a historic Dutch fort with breathtaking views.",
    pricePerNight: 200,
    type: "Resort",
  },
  {
    id: "villa-rosa",
    name: "Villa Rosa",
    location: "Mirissa",
    rating: 4.8,
    reviewsCount: 745,
    image: "/images/Kandy.jpg",
    amenities: ["Beachfront", "Free WiFi", "Breakfast Included"],
    description:
      "A charming boutique hotel with a relaxed atmosphere and easy access to Mirissa Beach.",
    pricePerNight: 110,
    type: "Villa",
  },
];

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(300);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between">
      <div>
        {/* HERO SECTION */}
        <section className="relative w-full h-[360px] sm:h-[420px] bg-slate-900 overflow-hidden">
          <Image
            src="/images/unawatuna.jpg"
            alt="Hotels Banner"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center pt-8">
            <div className="flex items-center justify-between">
              <div className="max-w-xl space-y-2">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                  🏨 HOTELS
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                  Find Your Perfect Stay in Sri Lanka
                </h1>
                <p className="text-gray-200 text-xs sm:text-sm font-light leading-relaxed">
                  From luxury resorts to cozy boutique hotels, discover accommodation options for every traveler and every budget.
                </p>
              </div>

              <div className="hidden md:block text-right text-amber-300 font-serif italic text-xl leading-snug">
                <p>Stay Close</p>
                <p>to Nature ♡</p>
              </div>
            </div>

            {/* Quick Category Icons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 max-w-2xl">
              <button
                onClick={() => setSelectedCategory("Resort")}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs hover:bg-white/20 transition cursor-pointer"
              >
                <Palmtree size={16} className="text-emerald-400" />
                <span>Luxury Resorts & Villas</span>
              </button>
              <button
                onClick={() => setSelectedCategory("Hotel")}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs hover:bg-white/20 transition cursor-pointer"
              >
                <Hotel size={16} className="text-amber-400" />
                <span>Boutique Hotels</span>
              </button>
              <button
                onClick={() => setSelectedCategory("Villa")}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs hover:bg-white/20 transition cursor-pointer"
              >
                <Building2 size={16} className="text-blue-400" />
                <span>Beach Hotels & Guesthouses</span>
              </button>
              <button
                onClick={() => setSelectedCategory("Apartment")}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white text-xs hover:bg-white/20 transition cursor-pointer"
              >
                <Building2 size={16} className="text-teal-400" />
                <span>City Hotels & Apartments</span>
              </button>
            </div>
          </div>
        </section>

        {/* FLOATING SEARCH BAR */}
        <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Destination */}
            <div className="md:col-span-4 flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
              <MapPin size={18} className="text-emerald-700 shrink-0" />
              <div className="w-full">
                <label className="block text-[10px] font-semibold text-gray-400 uppercase">Destination</label>
                <input
                  type="text"
                  placeholder="eg. Colombo, Galle, Ella"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="md:col-span-4 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
                <Calendar size={16} className="text-emerald-700 shrink-0" />
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase">Check In</label>
                  <span className="text-xs font-semibold text-gray-800">12 Apr 2026</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
                <Calendar size={16} className="text-emerald-700 shrink-0" />
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase">Check Out</label>
                  <span className="text-xs font-semibold text-gray-800">16 Apr 2026</span>
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="md:col-span-2 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
              <Users size={16} className="text-emerald-700 shrink-0" />
              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase">Guests</label>
                <span className="text-xs font-semibold text-gray-800">2 Adults · 0 Children</span>
              </div>
            </div>

            {/* Search Button */}
            <div className="md:col-span-2">
              <button className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md">
                <Search size={14} /> Search Hotels →
              </button>
            </div>

          </div>
        </div>

        {/* MAIN CONTENT SECTION */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT HOTELS LISTING */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Header Filter Controls */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">FEATURED HOTELS</span>
                  <h2 className="text-xl font-serif font-bold text-gray-900">Handpicked Stays for You</h2>
                  <p className="text-xs text-gray-500">Explore our top-rated hotels and resorts across Sri Lanka.</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                  <span>Sort by:</span>
                  <select className="bg-transparent font-semibold focus:outline-none cursor-pointer">
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* HOTELS CARDS LIST */}
              <div className="space-y-4">
                {HOTELS_DATA.filter((h) =>
                  h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  h.location.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 relative"
                  >
                    {/* Hotel Image */}
                    <div className="sm:col-span-5 relative h-48 sm:h-auto rounded-xl overflow-hidden">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                      />
                      {hotel.badge && (
                        <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                          {hotel.badge}
                        </span>
                      )}
                    </div>

                    {/* Hotel Information */}
                    <div className="sm:col-span-7 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-base font-bold text-gray-900">{hotel.name}</h3>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                              <MapPin size={12} className="text-emerald-700" /> {hotel.location}
                            </p>
                          </div>

                          <button
                            onClick={() => toggleFavorite(hotel.id)}
                            className="text-gray-300 hover:text-rose-500 transition cursor-pointer"
                          >
                            <Heart
                              size={18}
                              className={favorites.includes(hotel.id) ? "fill-rose-500 text-rose-500" : ""}
                            />
                          </button>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mt-2 text-xs">
                          <Star size={13} className="fill-amber-400 text-amber-400" />
                          <span className="font-bold text-gray-900">{hotel.rating}</span>
                          <span className="text-gray-400">({hotel.reviewsCount} reviews)</span>
                        </div>

                        {/* Amenities Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {hotel.amenities.map((amenity, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                          {hotel.description}
                        </p>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                        <div>
                          <span className="text-xl font-bold text-gray-900">${hotel.pricePerNight}</span>
                          <span className="text-[10px] text-gray-400"> / night</span>
                          <p className="text-[9px] text-gray-400">Including taxes & fees</p>
                        </div>

                        <Link
                          href={`/Hotels/${hotel.id}`}
                          className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition cursor-pointer shadow-sm"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT SIDEBAR FILTERS */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Filter Card */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="font-serif font-bold text-gray-900 text-sm flex items-center gap-2">
                    ⚡ Filter by
                  </h3>
                  <button
                    onClick={() => setPriceRange(300)}
                    className="text-[10px] text-emerald-700 font-semibold hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-800 flex justify-between">
                    <span>Price Range</span>
                    <span className="text-emerald-800 font-bold">$50 -${priceRange}+</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                </div>

                {/* Star Rating Filter */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="text-xs font-semibold text-gray-800 block">Star Rating</label>
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-emerald-700 rounded" />
                      <span>5 Stars</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-emerald-700 rounded" />
                      <span>4 Stars & up</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-emerald-700 rounded" />
                      <span>3 Stars & up</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-emerald-700 rounded" />
                      <span>2 Stars & up</span>
                    </label>
                  </div>
                </div>

                {/* Hotel Type */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="text-xs font-semibold text-gray-800 block">Hotel Type</label>
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-emerald-700 rounded" />
                      <span>Resort</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-emerald-700 rounded" />
                      <span>Hotel</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-emerald-700 rounded" />
                      <span>Villa</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-emerald-700 rounded" />
                      <span>Guesthouse</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-emerald-700 rounded" />
                      <span>Apartment</span>
                    </label>
                  </div>
                </div>

                {/* Popular Amenities */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="text-xs font-semibold text-gray-800 block">Popular Amenities</label>
                  <div className="space-y-1.5 text-xs text-gray-600">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-emerald-700 rounded" />
                      <span>Free WiFi</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-emerald-700 rounded" />
                      <span>Swimming Pool</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-emerald-700 rounded" />
                      <span>Beachfront</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-emerald-700 rounded" />
                      <span>Spa</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-emerald-700 rounded" />
                      <span>Fitness Center</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-emerald-700 rounded" />
                      <span>Breakfast Included</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Side Promo Banner */}
              <div className="relative rounded-2xl overflow-hidden p-6 text-white bg-slate-900 min-h-[200px] flex flex-col justify-between">
                <Image
                  src="/images/sigiriya.jpg"
                  alt="Special Deals"
                  fill
                  className="object-cover opacity-30"
                />
                <div className="relative z-10 space-y-1">
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    🏷️ SPECIAL DEALS
                  </span>
                  <h4 className="text-lg font-serif font-bold">Save More on Your Stay</h4>
                  <p className="text-xs text-gray-300">
                    Get exclusive discounts and offers on selected hotels across Sri Lanka.
                  </p>
                </div>

                <button className="relative z-10 w-fit px-4 py-2 bg-amber-400 hover:bg-amber-500 text-gray-900 text-xs font-bold rounded-xl transition mt-4 cursor-pointer">
                  View Deals →
                </button>
              </div>

            </div>

          </div>
        </main>

        {/* BOTTOM BANNER: DISCOVER MORE ACCOMMODATIONS */}
        <section className="relative my-12 max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <Image
              src="/images/ella.jpg"
              alt="Discover More"
              fill
              className="object-cover opacity-35"
            />
            <div className="relative z-10 space-y-2 max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold">
                Discover More Accommodation Options
              </h3>
              <p className="text-xs sm:text-sm text-gray-300">
                From coastal retreats to hill country cabins, find the perfect place to stay during your Sri Lankan journey.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-4 text-xs text-amber-300">
                <span className="flex items-center gap-1"><ShieldCheck size={14} /> Best Price Guarantee</span>
                <span className="flex items-center gap-1"><Check size={14} /> Secure Booking</span>
                <span className="flex items-center gap-1"><Clock size={14} /> 24/7 Support</span>
              </div>
              <Link
                href="/planning-a-trip"
                className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-xs rounded-xl transition shadow-lg shrink-0"
              >
                Explore All Hotels →
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}