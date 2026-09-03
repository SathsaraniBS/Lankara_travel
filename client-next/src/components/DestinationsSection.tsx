"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Navigation, Heart } from "lucide-react";

interface Category {
  id: string;
  title: string;
  count: string;
  image: string;
}

interface Destination {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  categoryTag: string;
  image: string;
  name?: string;
  subtitle?: string;
  description?: string;
}

const categoriesData: Category[] = [
  { id: "1", title: "Adventure Trip", count: "24 Destinations", image: "/images/adventures_trips.jpg" },
  { id: "2", title: "Road Trip", count: "30 Destinations", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&q=80" },
  { id: "3", title: "Family Trip", count: "15 Destinations", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&q=80" },
  { id: "4", title: "Safari Trip", count: "24 Destinations", image: "/images/safari-trip.jpg" },
  { id: "5", title: "Group Trip", count: "40 Destinations", image: "/images/group-trip.webp" },
  { id: "6", title: "Art & Culture", count: "18 Destinations", image: "/images/art&culture.jpg" },
];

const mockDestinations: Destination[] = [
  { id: "1", title: "Colombo Explorer", location: "Colombo, Sri Lanka", duration: "3 days Trip", price: 450.0, categoryTag: "Urban", image: "/images/colombo.jpg" },
  { id: "2", title: "Galle Fort Heritage", location: "Galle, Sri Lanka", duration: "5 days Trip", price: 620.0, categoryTag: "Culture", image: "/images/galle.jpg" },
  { id: "3", title: "Kandy Sacred Temple", location: "Kandy, Sri Lanka", duration: "4 days Trip", price: 550.0, categoryTag: "Culture", image: "/images/Kandy.jpg" },
  { id: "4", title: "Trincomalee Beach Retreat", location: "Trincomalee, Sri Lanka", duration: "7 days Trip", price: 780.0, categoryTag: "Beach", image: "/images/Trincomalee.jpg" },
  { id: "5", title: "Nuwara Eliya Tea Hills", location: "Nuwara Eliya, Sri Lanka", duration: "4 days Trip", price: 500.0, categoryTag: "Nature", image: "/images/nuwaraeliya.webp" },
  { id: "6", title: "Jaffna Cultural Journey", location: "Jaffna, Sri Lanka", duration: "6 days Trip", price: 600.0, categoryTag: "Culture", image: "/images/jaffna.jpg" },
  { id: "7", title: "Ella Gap & Nine Arch", location: "Ella, Sri Lanka", duration: "5 days Trip", price: 520.0, categoryTag: "Adventure", image: "/images/ella.jpg" },
  { id: "8", title: "Sigiriya Fortress Hike", location: "Sigiriya, Sri Lanka", duration: "3 days Trip", price: 480.0, categoryTag: "History", image: "/images/sigiriya.jpg" },
  { id: "9", title: "Anuradhapura Ancient City", location: "Anuradhapura, Sri Lanka", duration: "4 days Trip", price: 510.0, categoryTag: "History", image: "/images/anuradhapura.jpg" },
];

const fallbackGuideDestinations: Destination[] = [
  { id: "1", title: "COLOMBO", subtitle: "Urban & Nightlife", location: "Colombo", duration: "", price: 0, categoryTag: "", image: "/images/colombo.jpg" },
  { id: "2", title: "GALLE", subtitle: "Heritage & Beaches", location: "Galle", duration: "", price: 0, categoryTag: "", image: "/images/galle.jpg" },
  { id: "3", title: "KANDY", subtitle: "History & Culture", location: "Kandy", duration: "", price: 0, categoryTag: "", image: "/images/Kandy.jpg" },
  { id: "4", title: "TRINCOMALEE", subtitle: "Beaches & Diving", location: "Trincomalee", duration: "", price: 0, categoryTag: "", image: "/images/Trincomalee.jpg" },
  { id: "5", title: "NUWARA ELIYA", subtitle: "Tea Gardens & Cool Climate", location: "Nuwara Eliya", duration: "", price: 0, categoryTag: "", image: "/images/nuwaraeliya.webp" },
  { id: "6", title: "JAFFNA", subtitle: "Northern Heritage & Food", location: "Jaffna", duration: "", price: 0, categoryTag: "", image: "/images/jaffna.jpg" },
];

const CATEGORY_ROUTES: Record<string, string> = {
  "Safari Trip": "/SafariTrip",
  "Adventure Trip": "/AdventureTrip",
  "Family Trip": "/FamilyTrip",
  "Road Trip": "/RoadTrip",
  "Art & Culture": "/ArtandCulture",
  "Group Trip": "/GroupTrip",
};

export default function DestinationsSection() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [guideDestinations, setGuideDestinations] = useState<Destination[]>(fallbackGuideDestinations);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const handleCategoryClick = (title: string) => {
    const route = CATEGORY_ROUTES[title];
    if (route) {
      router.push(route);
    } else {
      setSelectedCategory(title);
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const query = selectedCategory ? `?category=${encodeURIComponent(selectedCategory)}` : "";
        const res = await fetch(`http://localhost:8000/api/v1/destinations${query}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setDestinations(data);
          }
        }
      } catch (err) {
        console.warn("Backend API unavailable, using fallback mock destinations.");
      }
    }
    fetchDestinations();
  }, [selectedCategory]);

  useEffect(() => {
    let isMounted = true;
    async function fetchGuide() {
      try {
        const res = await fetch("http://localhost:8000/destinations");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setGuideDestinations(data);
          }
        }
      } catch (err) {
        console.warn("Backend API unavailable, using guide fallback data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGuide();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section 
      id="destinations"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat px-4 py-16 text-white scroll-mt-20"
      style={{
        backgroundImage: "url('/images/backimage1.jpg')",
      }}
    >
      <div className="max-w-7xl w-full mx-auto space-y-16">

        {/* Categories Header */}
        <div className="space-y-8 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-zinc-100 uppercase">
              Destinations Category
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Explore handpicked trip collections tailored to your travel style.
            </p>
          </div>

          <div className="flex sm:grid sm:grid-cols-6 gap-4 overflow-x-auto pb-4 sm:pb-0 scrollbar-none">
            {categoriesData.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.title)}
                className={`group relative min-w-[160px] sm:min-w-0 h-[280px] rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-transform duration-300 hover:scale-105 border ${
                  selectedCategory === cat.title
                    ? "border-emerald-500 ring-2 ring-emerald-500/50"
                    : "border-zinc-800"
                }`}
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />

                <div className="relative z-10 mt-auto w-full bg-transparent p-3 text-center space-y-1 rounded-b-2xl">
                  <h3 className="text-sm font-bold text-zinc-100 tracking-wide line-clamp-1 drop-shadow-md">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-zinc-300 font-medium line-clamp-1 drop-shadow-md">
                    {cat.count}
                  </p>
                  <div className="pt-1 flex justify-center">
                    <button 
                      aria-label="Expand category"
                      className="text-white hover:text-emerald-400 transition-colors text-xs"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Destinations Grid */}
        <div className="space-y-8 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
              Popular Destinations For Your Trip Plans
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Curated luxury locations and custom travel itineraries created to offer maximum comfort and extraordinary memories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-[#121614]/90 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-3 flex flex-col justify-between space-y-3 hover:border-zinc-700 transition duration-300 group shadow-lg"
              >
                <div className="relative h-48 w-full rounded-xl overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-emerald-500/90 backdrop-blur-md text-slate-950 font-semibold text-[10px] px-2.5 py-0.5 rounded-md">
                    {dest.categoryTag}
                  </span>
                </div>

                <div className="space-y-2 text-left px-1">
                  <h3 className="text-sm font-bold text-zinc-100 line-clamp-1">{dest.title}</h3>
                  <div className="flex items-center justify-between text-zinc-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-emerald-500" /> {dest.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Navigation size={12} className="text-emerald-500" /> {dest.duration}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 px-1">
                  <span className="text-sm font-extrabold text-zinc-100">
                    ${dest.price.toFixed(2)}
                  </span>
                  <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Metrics & Banner Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="bg-[#121614]/90 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-center space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-100">30K+</span>
              <span className="text-xs text-zinc-400">Happy Travelers</span>
            </div>
            <div className="bg-emerald-500 text-slate-950 rounded-2xl p-6 flex flex-col justify-center space-y-1">
              <span className="text-2xl sm:text-3xl font-black">10+</span>
              <span className="text-xs font-semibold">Years Of Experience</span>
            </div>
            <div className="bg-[#121614]/90 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-center space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-100">112+</span>
              <span className="text-xs text-zinc-400">Destinations</span>
            </div>
            <div className="bg-[#121614]/90 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-center space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-100">4.8</span>
              <span className="text-xs text-zinc-400">Overall Rating</span>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#121614]/90 backdrop-blur-sm border border-zinc-800/80 rounded-2xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="space-y-2 text-left">
              <h3 className="text-base font-bold text-zinc-100">Happy Trip</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                Discover unforgettable journeys curated for comfort, luxury, and unmatched experiences worldwide.
              </p>
            </div>
            <div className="relative h-36 sm:h-full w-full rounded-xl overflow-hidden min-h-[130px]">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80"
                alt="Happy Trip Banner"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Destination Guide Section - Styled according to screenshot */}
      <div
        className="relative w-full min-h-[500px] bg-cover bg-center flex flex-col justify-center items-center text-center mt-16 rounded-3xl overflow-hidden px-4 py-12"
        style={{ backgroundImage: "url('/images/backimage2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto space-y-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
              Destination Guide
            </h2>
            <p className="text-base sm:text-lg text-zinc-200 font-normal mt-1 drop-shadow">
              Holiday in Sri Lanka
            </p>
          </div>

          {loading ? (
            <p className="text-zinc-300 text-sm">Loading destinations...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-2">
              {guideDestinations.map((dest) => {
                const titleText = (dest.name || dest.title).toUpperCase();
                const subtitleText = dest.subtitle || dest.description || dest.categoryTag || "Top Attraction";
                const isFav = !!favorites[dest.id];

                return (
                  <div
                    key={dest.id}
                    className="group relative h-[320px] w-full rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-105 shadow-2xl border border-white/10"
                  >
                    {/* Background Image */}
                    <Image
                      src={dest.image}
                      alt={titleText}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />

                    {/* Dark gradient container at the bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-12 pb-4 px-4 flex flex-col items-center justify-end text-center space-y-1">
                      <h3 className="text-lg font-black text-white uppercase tracking-wider drop-shadow-md">
                        {titleText}
                      </h3>
                      <p className="text-xs text-zinc-300 font-medium drop-shadow-sm">
                        {subtitleText}
                      </p>
                      
                      <button
                        onClick={(e) => toggleFavorite(dest.id, e)}
                        aria-label="Favorite destination"
                        className="pt-2 text-white hover:text-red-500 transition-colors focus:outline-none"
                      >
                        <Heart
                          size={18}
                          className={isFav ? "fill-red-500 text-red-500" : "text-white"}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}