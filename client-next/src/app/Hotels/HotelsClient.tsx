"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Search,
  Calendar,
  Users,
  Award,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  SlidersHorizontal,
  Wifi,
  Waves,
  Sparkles,
  Utensils,
  Trees,
  Landmark,
  Heart,
  ChevronDown,
} from "lucide-react";

export interface HotelItem {
  id: string;
  badge: string;
  categoryTag: string;
  title: string;
  rating: number;
  reviews_count: number;
  location: string;
  distance_from_colombo: string;
  amenities: string[];
  description: string;
  price_lkr: number;
  main_image: string;
  gallery: string[];
  stars: number;
  type: string;
}

interface HotelsClientProps {
  initialHotels: HotelItem[];
}

const DEFAULT_HOTELS: HotelItem[] = [
  {
    id: "blue-1",
    badge: "Best Seller",
    categoryTag: "Luxury",
    title: "Jetwing Blue",
    rating: 4.8,
    reviews_count: 2341,
    location: "Negombo",
    distance_from_colombo: "25 km from Colombo",
    amenities: ["Beachfront", "Free WiFi", "Spa"],
    description:
      "A luxurious beachfront resort with stunning ocean views, world-class dining and a relaxing atmosphere.",
    price_lkr: 45000,
    main_image: "/images/unawatuna.jpg",
    gallery: ["/images/unawatuna.jpg", "/images/colombo.jpg", "/images/sigiriya.jpg"],
    stars: 5,
    type: "Resort",
  },
  {
    id: "ella-1",
    badge: "Great Value",
    categoryTag: "Boutique",
    title: "Ella Flower Garden Resort",
    rating: 4.6,
    reviews_count: 1245,
    location: "Ella",
    distance_from_colombo: "180 km from Colombo",
    amenities: ["Mountain View", "Free WiFi", "Restaurant"],
    description:
      "A charming resort surrounded by nature, perfect for a peaceful getaway.",
    price_lkr: 32000,
    main_image: "/images/ella.jpg",
    gallery: ["/images/ella.jpg", "/images/colombo.jpg", "/images/unawatuna.jpg"],
    stars: 4,
    type: "Boutique",
  },
  {
    id: "cinnamon-1",
    badge: "Family Friendly",
    categoryTag: "Resort",
    title: "Cinnamon Bentota Beach",
    rating: 4.7,
    reviews_count: 2876,
    location: "Bentota",
    distance_from_colombo: "65 km from Colombo",
    amenities: ["Beachfront", "Pool", "Kids Club"],
    description:
      "A family-friendly resort with a private beach, exciting activities and relaxing spa treatments.",
    price_lkr: 55000,
    main_image: "/images/colombo.jpg",
    gallery: ["/images/colombo.jpg", "/images/unawatuna.jpg", "/images/ella.jpg"],
    stars: 5,
    type: "Resort",
  },
  {
    id: "fortress-1",
    badge: "Guest Favourite",
    categoryTag: "Heritage",
    title: "The Fortress Resort & Spa",
    rating: 4.9,
    reviews_count: 1102,
    location: "Galle",
    distance_from_colombo: "119 km from Colombo",
    amenities: ["Historic", "Free WiFi", "Spa"],
    description:
      "Experience colonial charm with modern comforts in the heart of Galle Fort.",
    price_lkr: 48000,
    main_image: "/images/sigiriya.jpg",
    gallery: ["/images/sigiriya.jpg", "/images/ella.jpg", "/images/colombo.jpg"],
    stars: 5,
    type: "Hotel",
  },
  {
    id: "kandy-1",
    badge: "Eco Friendly",
    categoryTag: "Eco Resort",
    title: "Kandy Tree Tops",
    rating: 4.5,
    reviews_count: 982,
    location: "Kandy",
    distance_from_colombo: "115 km from Colombo",
    amenities: ["Nature View", "Free WiFi", "Restaurant"],
    description:
      "A unique stay in the hills of Kandy with breathtaking views and a tranquil atmosphere.",
    price_lkr: 38000,
    main_image: "/images/Kandy.jpg",
    gallery: ["/images/Kandy.jpg", "/images/ella.jpg", "/images/unawatuna.jpg"],
    stars: 4,
    type: "Boutique",
  },
];

export default function HotelsClient({ initialHotels }: HotelsClientProps) {
  const hotelsList = initialHotels.length > 0 ? initialHotels : DEFAULT_HOTELS;

  const [destination, setDestination] = useState("All Destinations");
  const [checkIn, setCheckIn] = useState("12 Apr 2026");
  const [checkOut, setCheckOut] = useState("16 Apr 2026");
  const [guests, setGuests] = useState("2 Adults, 0 Children");

  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Recommended");

  const [selectedImageMap, setSelectedImageMap] = useState<Record<string, string>>({});

  const toggleStar = (star: number) => {
    setSelectedStars((prev) =>
      prev.includes(star) ? prev.filter((s) => s !== star) : [...prev, star]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleFacility = (facility: string) => {
    setSelectedFacilities((prev) =>
      prev.includes(facility) ? prev.filter((f) => f !== facility) : [...prev, facility]
    );
  };

  const filteredHotels = useMemo(() => {
    return hotelsList.filter((hotel) => {
      if (hotel.price_lkr > maxPrice) return false;
      if (selectedStars.length > 0 && !selectedStars.includes(hotel.stars)) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(hotel.type)) return false;
      if (
        selectedFacilities.length > 0 &&
        !selectedFacilities.every((f) => hotel.amenities.includes(f))
      ) {
        return false;
      }
      return true;
    });
  }, [hotelsList, maxPrice, selectedStars, selectedTypes, selectedFacilities]);

  return (
    <div className="w-full">
      {/* 1. HERO HEADER */}
      <section className="relative w-full h-[320px] sm:h-[360px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/unawatuna.jpg"
          alt="Hotels Banner"
          fill
          className="object-cover opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div className="max-w-xl space-y-2">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
                🏨 HOTELS
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                Find Your Perfect Stay in Sri Lanka
              </h1>
              <p className="text-gray-200 text-xs sm:text-sm font-light leading-relaxed">
                From luxury resorts to cozy boutique hotels, discover the best places to stay across the island.
              </p>

              {/* Trust Features */}
              <div className="flex flex-wrap gap-4 pt-3 text-[11px] font-semibold text-white">
                <span className="flex items-center gap-1">
                  <Award size={14} className="text-amber-400" /> Top Rated Hotels
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-amber-400" /> Best Price Guarantee
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={14} className="text-amber-400" /> Verified Properties
                </span>
                <span className="flex items-center gap-1">
                  <Headphones size={14} className="text-amber-400" /> 24/7 Support
                </span>
              </div>
            </div>

            <div className="hidden md:block text-right text-amber-300 font-serif italic text-lg leading-snug">
              <p>Stay closer</p>
              <p>to what you love ♡</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH BAR BAR */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Destination */}
          <div className="lg:col-span-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <label className="text-[10px] text-gray-400 font-bold uppercase block">Destination</label>
            <div className="flex items-center justify-between text-xs font-bold text-gray-800 mt-0.5">
              <span>{destination}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>

          {/* Check In */}
          <div className="lg:col-span-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <label className="text-[10px] text-gray-400 font-bold uppercase block">Check In</label>
            <div className="flex items-center justify-between text-xs font-bold text-gray-800 mt-0.5">
              <span>{checkIn}</span>
              <Calendar size={14} className="text-gray-400" />
            </div>
          </div>

          {/* Check Out */}
          <div className="lg:col-span-3 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <label className="text-[10px] text-gray-400 font-bold uppercase block">Check Out</label>
            <div className="flex items-center justify-between text-xs font-bold text-gray-800 mt-0.5">
              <span>{checkOut}</span>
              <Calendar size={14} className="text-gray-400" />
            </div>
          </div>

          {/* Guests */}
          <div className="lg:col-span-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <label className="text-[10px] text-gray-400 font-bold uppercase block">Guests</label>
            <div className="flex items-center justify-between text-xs font-bold text-gray-800 mt-0.5">
              <span className="truncate">{guests}</span>
              <Users size={14} className="text-gray-400" />
            </div>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-1">
            <button className="w-full h-full min-h-[48px] bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer shadow">
              <Search size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN SECTION */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: HOTEL CARDS LIST */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-gray-900">Popular Hotels</h2>
                <p className="text-xs text-gray-500">Handpicked stays for an unforgettable Sri Lanka experience.</p>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-bold text-gray-800 focus:outline-none cursor-pointer"
                >
                  <option value="Recommended">Recommended</option>
                  <option value="PriceLowToHigh">Price: Low to High</option>
                  <option value="PriceHighToLow">Price: High to Low</option>
                  <option value="TopRated">Top Rated</option>
                </select>
              </div>
            </div>

            {filteredHotels.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-gray-100">
                <p className="text-sm font-semibold text-gray-500">No hotels match your filters.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredHotels.map((hotel) => {
                  const currentImage = selectedImageMap[hotel.id] || hotel.main_image;

                  return (
                    <div
                      key={hotel.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden p-4 space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        
                        {/* Main Thumbnail Image */}
                        <div className="sm:col-span-4 relative h-52 sm:h-auto rounded-xl overflow-hidden group">
                          <Image
                            src={currentImage}
                            alt={hotel.title}
                            fill
                            className="object-cover transition duration-300 group-hover:scale-105"
                          />
                          <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                            • {hotel.badge}
                          </span>
                          <button className="absolute top-3 right-3 p-1.5 bg-white/80 hover:bg-white rounded-full text-gray-600 transition cursor-pointer">
                            <Heart size={14} />
                          </button>
                        </div>

                        {/* Details */}
                        <div className="sm:col-span-8 flex flex-col justify-between space-y-3">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="text-base font-bold text-gray-900">{hotel.title}</h3>
                                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-0.5">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={12}
                                        className={i < hotel.stars ? "fill-amber-400 text-amber-400" : "text-gray-200"}
                                      />
                                    ))}
                                  </div>
                                  <span>{hotel.rating}</span>
                                  <span className="text-gray-400 font-normal">({hotel.reviews_count.toLocaleString()} reviews)</span>
                                </div>
                              </div>

                              <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
                                {hotel.categoryTag}
                              </span>
                            </div>

                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                              <MapPin size={12} className="text-emerald-800 shrink-0" />
                              <span>{hotel.location}</span>
                              <span className="text-gray-300">•</span>
                              <span>{hotel.distance_from_colombo}</span>
                            </p>

                            {/* Amenity Badges */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {hotel.amenities.map((amenity) => (
                                <span
                                  key={amenity}
                                  className="text-[10px] font-semibold text-gray-600 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-md flex items-center gap-1"
                                >
                                  {amenity === "Beachfront" && <Waves size={10} className="text-emerald-800" />}
                                  {amenity === "Free WiFi" && <Wifi size={10} className="text-emerald-800" />}
                                  {amenity === "Spa" && <Sparkles size={10} className="text-emerald-800" />}
                                  {amenity === "Restaurant" && <Utensils size={10} className="text-emerald-800" />}
                                  {amenity === "Mountain View" && <Trees size={10} className="text-emerald-800" />}
                                  {amenity === "Historic" && <Landmark size={10} className="text-emerald-800" />}
                                  {amenity}
                                </span>
                              ))}
                            </div>

                            <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                              {hotel.description}
                            </p>
                          </div>

                          {/* Price & Action */}
                          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                            <div>
                              <span className="text-base font-bold text-gray-900">
                                LKR {hotel.price_lkr.toLocaleString()}
                              </span>
                              <span className="text-[10px] text-gray-400 block">per night</span>
                            </div>

                            <Link
                              href={`/checkout?bookingId=${hotel.id}`}
                              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
                            >
                              View Details →
                            </Link>
                          </div>
                        </div>

                      </div>

                      {/* Small Image Gallery Switcher */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-50">
                        {hotel.gallery.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() =>
                              setSelectedImageMap((prev) => ({ ...prev, [hotel.id]: img }))
                            }
                            className={`relative h-14 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                              currentImage === img ? "border-emerald-800" : "border-transparent opacity-70 hover:opacity-100"
                            }`}
                          >
                            <Image src={img} alt="Hotel detail" fill className="object-cover" />
                          </button>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: FILTERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="font-serif font-bold text-gray-900 text-sm">Filter Hotels</h3>
                <SlidersHorizontal size={16} className="text-gray-400" />
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-800 block">Price Range (per night)</label>
                <input
                  type="range"
                  min={10000}
                  max={100000}
                  step={5000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-semibold text-gray-500">
                  <span>LKR 10,000</span>
                  <span>LKR {maxPrice.toLocaleString()}+</span>
                </div>
              </div>

              {/* Star Rating Filter */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-800 block">Star Rating</label>
                <div className="space-y-1.5 text-xs text-gray-600">
                  {[
                    { star: 5, count: 12 },
                    { star: 4, count: 28 },
                    { star: 3, count: 24 },
                    { star: 2, count: 10 },
                    { star: 1, count: 5 },
                  ].map((item) => (
                    <label key={item.star} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedStars.includes(item.star)}
                        onChange={() => toggleStar(item.star)}
                        className="rounded accent-emerald-800"
                      />
                      <span>{item.star} Stars ({item.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Hotel Type Filter */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-800 block">Hotel Type</label>
                <div className="space-y-1.5 text-xs text-gray-600">
                  {[
                    { type: "Resort", count: 42 },
                    { type: "Hotel", count: 38 },
                    { type: "Villa", count: 12 },
                    { type: "Guest House", count: 8 },
                    { type: "Boutique", count: 6 },
                  ].map((item) => (
                    <label key={item.type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(item.type)}
                        onChange={() => toggleType(item.type)}
                        className="rounded accent-emerald-800"
                      />
                      <span>{item.type} ({item.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Facilities Filter */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-800 block">Facilities</label>
                <div className="space-y-1.5 text-xs text-gray-600">
                  {["Beachfront", "Pool", "Free WiFi", "Spa", "Restaurant", "Family Rooms"].map(
                    (facility) => (
                      <label key={facility} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedFacilities.includes(facility)}
                          onChange={() => toggleFacility(facility)}
                          className="rounded accent-emerald-800"
                        />
                        <span>{facility}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  setMaxPrice(100000);
                  setSelectedStars([]);
                  setSelectedTypes([]);
                  setSelectedFacilities([]);
                }}
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow"
              >
                Apply Filters
              </button>
            </div>

            {/* Exclusive Hotel Deals CTA Card */}
            <div className="relative rounded-2xl overflow-hidden p-6 text-white bg-slate-900 space-y-3">
              <Image
                src="/images/sigiriya.jpg"
                alt="Exclusive Hotel Deals"
                fill
                className="object-cover opacity-30"
              />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest block">
                  Discover Sri Lanka ♡
                </span>
                <h4 className="text-lg font-serif font-bold">Exclusive Hotel Deals</h4>
                <p className="text-xs text-gray-200">
                  Get special discounts and offers on top-rated hotels.
                </p>
              </div>

              <Link
                href="/holiday-packages"
                className="relative z-10 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-xs rounded-xl transition cursor-pointer inline-block"
              >
                View Offers →
              </Link>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}