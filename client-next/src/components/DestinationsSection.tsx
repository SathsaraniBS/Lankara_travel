"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Navigation } from "lucide-react";

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
  description?: string;
}

const categoriesData: Category[] = [
  { id: "1", title: "Adventure Trip", count: "24 Destinations", image: "/images/adventures_trips.jpg" },
  { id: "2", title: "Road Trip", count: "30 Destinations", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&q=80" },
  { id: "3", title: "Family Trip", count: "15 Destinations", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&q=80" },
  { id: "4", title: "Safari Trip", count: "24 Destinations", image: "/images/safari-trip.jpg" },
  { id: "5", title: "Group Trip", count: "40 Destinations", image: "https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=300&q=80" },
  { id: "6", title: "Art & Culture", count: "18 Destinations", image: "/images/art&culture.jpg" },
];

const mockDestinations: Destination[] = [
  { id: "1", title: "Six Senses Zil Pasyon", location: "Seychelles", duration: "10 days Trip", price: 850.0, categoryTag: "Safari", image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80" },
  { id: "2", title: "Six Senses Zil Pasyon", location: "Seychelles", duration: "10 days Trip", price: 850.0, categoryTag: "Safari", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80" },
  { id: "3", title: "Six Senses Zil Pasyon", location: "Seychelles", duration: "10 days Trip", price: 850.0, categoryTag: "Safari", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80" },
  { id: "4", title: "Six Senses Zil Pasyon", location: "Seychelles", duration: "10 days Trip", price: 850.0, categoryTag: "Safari", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&q=80" },
  { id: "5", title: "Six Senses Zil Pasyon", location: "Seychelles", duration: "10 days Trip", price: 850.0, categoryTag: "Safari", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80" },
  { id: "6", title: "Six Senses Zil Pasyon", location: "Seychelles", duration: "10 days Trip", price: 850.0, categoryTag: "Safari", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80" },
];

export default function DestinationsSection() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [guideDestinations, setGuideDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Category click handler
  const handleCategoryClick = (title: string) => {
    if (title === "Safari Trip") {
      router.push("/SafariTrip");
    } else if (title === "Adventure Trip") {
      router.push("/AdventureTrip");
    } else {
      setSelectedCategory(title);
    }
  };

  // Fetch Main Destinations
  useEffect(() => {
    async function fetchDestinations() {
      try {
        const query = selectedCategory ? `?category=${selectedCategory}` : "";
        const res = await fetch(`http://localhost:8000/api/v1/destinations${query}`);
        if (res.ok) {
          const data = await res.json();
          setDestinations(data);
        }
      } catch (err) {
        console.warn("Backend API unavailable, using fallback data.");
      }
    }
    fetchDestinations();
  }, [selectedCategory]);

  // Fetch Sri Lanka Destination Guide
  useEffect(() => {
    fetch("http://127.0.0.1:8000/destinations")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setGuideDestinations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <section id="destinations" className="py-16 px-4 sm:px-8 bg-[#070b09] text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Categories Header & 6 Cards Layout */}
        <div className="space-y-8 text-center">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-zinc-100 uppercase">
              Destinations Category
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
              Explore handpicked trip collections tailored to your travel style.
            </p>
          </div>

          {/* 6 Grid items in 1 single row */}
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
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 16vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Top Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

                {/* Bottom Card Footer Section */}
                <div className="relative z-10 mt-auto w-full bg-[#1c1a19]/90 backdrop-blur-md p-3 text-center space-y-1 rounded-b-2xl border-t border-white/10">
                  <h3 className="text-sm font-bold text-zinc-100 tracking-wide line-clamp-1">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-zinc-300 font-medium line-clamp-1">
                    {cat.count}
                  </p>
                  <div className="pt-1 flex justify-center">
                    <button 
                      aria-label="Favorite category"
                      className="text-white hover:text-red-500 transition-colors text-sm"
                    >
                      ♥
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-3 flex flex-col justify-between space-y-3 hover:border-zinc-700 transition duration-300 group shadow-lg"
              >
                <div className="relative h-44 w-full rounded-xl overflow-hidden">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
            <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-center space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-100">30K+</span>
              <span className="text-xs text-zinc-400">Happy Travelers</span>
            </div>
            <div className="bg-emerald-500 text-slate-950 rounded-2xl p-6 flex flex-col justify-center space-y-1">
              <span className="text-2xl sm:text-3xl font-black">10+</span>
              <span className="text-xs font-semibold">Years Of Experience</span>
            </div>
            <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-center space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-100">112+</span>
              <span className="text-xs text-zinc-400">Destinations</span>
            </div>
            <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-6 flex flex-col justify-center space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-100">4.8</span>
              <span className="text-xs text-zinc-400">Overall Rating</span>
            </div>
          </div>

          <div className="lg:col-span-6 bg-[#121614] border border-zinc-800/80 rounded-2xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
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

      {/* Destination Guide Section */}
      <div
        className="relative min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center mt-16"
        style={{ backgroundImage: "url('/images/backimage2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 p-5">
          <h1 className="text-[3rem] font-bold text-white max-[768px]:text-[2rem]">
            Destination Guide
          </h1>
          <p className="text-2xl text-white mb-5">Holiday in Sri Lanka</p>

          {loading && <p className="text-white text-xl mt-5">Loading destinations...</p>}

          {error && (
            <p className="text-white text-xl mt-5">
              Couldn't load destinations. Is the backend server running?
            </p>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-3 gap-[50px] justify-center mt-5 w-[90%] max-w-[1200px] max-[1024px]:grid-cols-2 max-[768px]:grid-cols-1">
              {guideDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="w-[250px] h-[320px] bg-cover bg-center rounded-2xl relative transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 max-[768px]:w-[180px] max-[768px]:h-[280px]"
                  style={{ backgroundImage: `url(${dest.image})` }}
                >
                  <div className="absolute bottom-0 w-full bg-black/40 text-white p-3 text-center rounded-b-2xl max-[768px]:p-2">
                    <h2>{dest.name || dest.title}</h2>
                    <p>{dest.description}</p>
                    <button className="bg-transparent border-none text-white text-xl cursor-pointer mt-[5px] hover:text-[red] active:text-[red] max-[768px]:text-base">
                      ❤
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}