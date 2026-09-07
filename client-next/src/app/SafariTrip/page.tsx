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
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  Leaf,
  Headphones,
} from "lucide-react";

interface SafariDestination {
  id: string;
  badge?: string;
  locationTag: string;
  title: string;
  type: string;
  duration: string;
  season: string;
  price: number;
  image: string;
}

interface WildlifeCategory {
  id: string;
  name: string;
  tripsCount: string;
  image: string;
}

interface SafariExperience {
  id: string;
  badge: string;
  title: string;
  tag1: string;
  duration: string;
  tag2: string;
  price: number;
  image: string;
}

const safariDestinations: SafariDestination[] = [
  {
    id: "1",
    badge: "Most Popular",
    locationTag: "Yala National Park",
    title: "Yala Safari Adventure",
    type: "Wildlife",
    duration: "1 Day",
    season: "All Seasons",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    locationTag: "Wilpattu National Park",
    title: "Leopard Trail Safari",
    type: "Wildlife",
    duration: "1 Day",
    season: "Best: Feb–Oct",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    locationTag: "Minneriya National Park",
    title: "Elephant Gathering Tour",
    type: "Wildlife",
    duration: "1 Day",
    season: "Best: Jul–Sep",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1581852017103-68ac65514cf7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    locationTag: "Bundala National Park",
    title: "Bird Watching Safari",
    type: "Birds",
    duration: "1 Day",
    season: "Best: Nov–Apr",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=800&q=80",
  },
];

const wildlifeCategories: WildlifeCategory[] = [
  {
    id: "elephants",
    name: "Elephants",
    tripsCount: "4 trips",
    image:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "leopards",
    name: "Leopards",
    tripsCount: "3 trips",
    image:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "birds",
    name: "Birds",
    tripsCount: "6 trips",
    image:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "sloth-bears",
    name: "Sloth Bears",
    tripsCount: "2 trips",
    image:
      "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "crocodiles",
    name: "Crocodiles",
    tripsCount: "2 trips",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=300&q=80",
  },
];

const safariExperiences: SafariExperience[] = [
  {
    id: "1",
    badge: "Photography",
    title: "Wildlife Photography Tour",
    tag1: "Wildlife",
    duration: "1 Day",
    tag2: "Minneriya",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    badge: "Camping",
    title: "Jungle Camping Experience",
    tag1: "Nature",
    duration: "1 Night",
    tag2: "Yala",
    price: 75,
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    badge: "Boat Safari",
    title: "Madu River Safari",
    tag1: "Nature",
    duration: "Half Day",
    tag2: "Balapitiya",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    badge: "Family Friendly",
    title: "Family Safari Adventure",
    tag1: "Wildlife",
    duration: "1 Day",
    tag2: "Udawalawe",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1581852017103-68ac65514cf7?auto=format&fit=crop&w=800&q=80",
  },
];

export default function SafariTripPage() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [destination, setDestination] = useState("");
  const [travelPeriod, setTravelPeriod] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [tripType, setTripType] = useState("");

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-zinc-800 font-sans selection:bg-amber-200">
      

      {/* Hero Section */}
      <section className="relative w-full h-[500px] sm:h-[560px] bg-stone-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1920&q=80"
          alt="Elephant in Sri Lanka Safari"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/45 to-transparent" />

        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-8 flex flex-col justify-center text-white space-y-5">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Compass size={16} />
            <span>Safari Trips</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-tight max-w-2xl drop-shadow-md">
            Wildlife Encounters, Unforgettable Moments
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 max-w-md font-light leading-relaxed drop-shadow">
            Explore Sri Lanka&apos;s breathtaking national parks and witness extraordinary wildlife, from majestic elephants to elusive leopards. Create memories that last a lifetime.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-300 pt-2">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-amber-400" />
              <span>Iconic Wildlife & Nature</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={16} className="text-amber-400" />
              <span>Expert Local Guides</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-amber-400" />
              <span>Safe & Comfortable Travel</span>
            </div>
          </div>

          <p className="text-xs italic text-amber-200 font-serif pt-1">
            &ldquo;Same island. Different Wildlife Story ❤️&rdquo;
          </p>
        </div>
      </section>

      {/* Filter / Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-10 relative z-20">
        <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
          
          {/* Destination */}
          <div className="p-2 border-b sm:border-b-0 sm:border-r border-stone-200">
            <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
              Where do you want to go?
            </label>
            <div className="flex items-center gap-2 text-xs text-stone-800">
              <MapPin size={14} className="text-emerald-700" />
              <input
                type="text"
                placeholder="e.g. Yala, Wilpattu, Minneriya..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-xs text-stone-800 placeholder-stone-400"
              />
            </div>
          </div>

          {/* Travel Period */}
          <div className="p-2 border-b sm:border-b-0 sm:border-r border-stone-200">
            <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
              Travel Period
            </label>
            <div className="flex items-center gap-2 text-xs text-stone-800">
              <Calendar size={14} className="text-emerald-700" />
              <select
                value={travelPeriod}
                onChange={(e) => setTravelPeriod(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-xs text-stone-800 cursor-pointer"
              >
                <option value="">Select dates</option>
                <option value="oct">October 2026</option>
                <option value="nov">November 2026</option>
                <option value="dec">December 2026</option>
              </select>
            </div>
          </div>

          {/* Group Size */}
          <div className="p-2 border-b lg:border-b-0 lg:border-r border-stone-200">
            <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
              Group Size
            </label>
            <div className="flex items-center gap-2 text-xs text-stone-800">
              <Users size={14} className="text-emerald-700" />
              <select
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-xs text-stone-800 cursor-pointer"
              >
                <option value="">Any size</option>
                <option value="solo">Solo / Couple</option>
                <option value="family">Family Group</option>
                <option value="private">Private Safari Jeep</option>
              </select>
            </div>
          </div>

          {/* Trip Type */}
          <div className="p-2">
            <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
              Trip Type
            </label>
            <div className="flex items-center gap-2 text-xs text-stone-800">
              <Compass size={14} className="text-emerald-700" />
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-xs text-stone-800 cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="jeep">Jeep Safari</option>
                <option value="boat">Boat Safari</option>
                <option value="camping">Camping Safari</option>
                <option value="photo">Photography Safari</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button className="w-full bg-[#173a2e] hover:bg-[#122e24] text-white font-medium text-xs py-3 px-4 rounded-xl transition shadow-md flex items-center justify-center gap-2">
              <span>Explore Safari Trips</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* Featured Safari Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Featured Safari Destinations
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              Sri Lanka&apos;s Best Safari Experiences
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              From dense jungles to open grasslands, discover the incredible wildlife and natural beauty.
            </p>
          </div>
          <Link
            href="#"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-emerald-800 transition"
          >
            <span>View All Safari Trips</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Safari Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safariDestinations.map((dest) => {
            const isFav = !!favorites[dest.id];
            return (
              <div
                key={dest.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <button
                    onClick={(e) => toggleFavorite(dest.id, e)}
                    aria-label="Favorite safari destination"
                    className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full text-white hover:text-red-500 transition"
                  >
                    <Heart
                      size={14}
                      className={isFav ? "fill-red-500 text-red-500" : "text-white"}
                    />
                  </button>
                  {dest.badge && (
                    <span className="absolute top-3 left-3 bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      {dest.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full">
                    {dest.locationTag}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-stone-900">{dest.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <Compass size={11} className="text-emerald-700" />
                        {dest.type}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {dest.duration}
                      </span>
                      <span>•</span>
                      <span className="text-amber-800 font-medium">{dest.season}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <div className="text-xs">
                      <span className="text-stone-500 text-[11px]">From </span>
                      <span className="font-extrabold text-stone-900 text-sm">
                        ${dest.price}
                      </span>
                      <span className="text-stone-500 text-[10px]"> / person</span>
                    </div>

                    <Link
                      href="#"
                      className="bg-[#173a2e] hover:bg-[#122e24] text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                    >
                      <span>View Trip</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Lankara & Explore by Wildlife Dual Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Card: Why Choose Lankara */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md min-h-[320px] flex flex-col justify-between p-6 text-white group">
          <Image
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
            alt="Safari Jeep"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent" />

          <div className="relative z-10 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
              Why Choose Lankara
            </span>
            <h3 className="text-2xl font-serif font-bold">
              Authentic Safari Experiences
            </h3>
            <p className="text-xs text-stone-200 leading-relaxed max-w-sm">
              Small groups, expert guides, and a deep respect for nature — for a more meaningful adventure.
            </p>

            <Link
              href="/FamilyTrip"
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition shadow mt-2"
            >
              <span>Learn More</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="relative z-10 pt-6 grid grid-cols-3 gap-2 border-t border-stone-700/80 text-[10px] text-stone-300">
            <div className="flex items-center gap-1.5">
              <Award size={14} className="text-amber-400 shrink-0" />
              <span>Licensed Guides</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Leaf size={14} className="text-amber-400 shrink-0" />
              <span>Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Headphones size={14} className="text-amber-400 shrink-0" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Right Card: Explore by Wildlife Categories */}
        <div className="lg:col-span-7 bg-stone-100/70 border border-stone-200 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Explore by Wildlife
            </h3>
            <p className="text-xs text-stone-500">
              Choose what you&apos;d love to see.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {wildlifeCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white border border-stone-200 rounded-xl p-3 flex flex-col items-center text-center space-y-2 shadow-sm hover:border-amber-400 hover:shadow-md transition cursor-pointer group"
              >
                <div className="relative h-14 w-14 rounded-full overflow-hidden border border-stone-200">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="56px"
                    className="object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <h4 className="text-xs font-bold text-stone-900">{cat.name}</h4>
                <span className="text-[10px] text-stone-500">{cat.tripsCount}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl flex items-center gap-3 text-xs text-stone-700">
            <Leaf size={18} className="text-emerald-700 shrink-0" />
            <p className="text-[11px] leading-relaxed">
              Sri Lanka is home to over <strong>400 bird species</strong>, including <strong>33 endemics</strong>!
            </p>
          </div>
        </div>

      </section>

      {/* More Than Just a Safari Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Safari Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              More Than Just a Safari
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Combine your wildlife adventure with unique experiences.
            </p>
          </div>
          <Link
            href="#"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-emerald-800 transition"
          >
            <span>View All Experiences</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safariExperiences.map((exp) => {
            const isFav = !!favorites[`exp-${exp.id}`];
            return (
              <div
                key={exp.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <button
                    onClick={(e) => toggleFavorite(`exp-${exp.id}`, e)}
                    aria-label="Favorite experience"
                    className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full text-white hover:text-red-500 transition"
                  >
                    <Heart
                      size={14}
                      className={isFav ? "fill-red-500 text-red-500" : "text-white"}
                    />
                  </button>
                  <span className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full">
                    {exp.badge}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-stone-900">{exp.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <Compass size={11} className="text-emerald-700" />
                        {exp.tag1}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {exp.duration}
                      </span>
                      <span>•</span>
                      <span>{exp.tag2}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <div className="text-xs">
                      <span className="text-stone-500 text-[11px]">From </span>
                      <span className="font-extrabold text-stone-900 text-sm">
                        ${exp.price}
                      </span>
                      <span className="text-stone-500 text-[10px]"> / person</span>
                    </div>

                    <Link
                      href="#"
                      className="bg-[#173a2e] hover:bg-[#122e24] text-white text-xs font-semibold px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                    >
                      <span>View Trip</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-16 bg-stone-900 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1581852017103-68ac65514cf7?auto=format&fit=crop&w=1920&q=80"
          alt="Elephant herd in Sri Lanka"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">
              Ready for the wild?
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold">
              Plan Your Safari Adventure Today
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Let Lankara Travels create a personalized wildlife journey just for you.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <Link
              href="/FamilyTrip"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-full transition shadow-lg flex items-center gap-2"
            >
              <span>Plan My Trip</span>
              <ArrowRight size={14} />
            </Link>
            <span className="text-[10px] italic text-stone-300 font-serif">
              Discover Sri Lanka&apos;s Wild Side ❤️
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}