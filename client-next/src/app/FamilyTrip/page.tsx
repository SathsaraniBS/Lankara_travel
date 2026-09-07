"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  ShieldCheck,
  Smile,
  BookOpen,
  Sliders,
  ChevronRight,
  Star,
  Sparkles,
  Award,
  Headphones,
  Utensils,
  TreePalm,
  Landmark,
  Palmtree,
  Heart,
} from "lucide-react";

interface DestinationCard {
  id: string;
  badge: string;
  title: string;
  location: string;
  tags: string[];
  price: number;
  image: string;
}

interface TestimonialCard {
  id: string;
  quote: string;
  family: string;
  location: string;
  rating: number;
  avatar: string;
}

const familyDestinations: DestinationCard[] = [
  {
    id: "1",
    badge: "Beach Paradise",
    title: "Bentota",
    location: "Western Province",
    tags: ["Water Sports", "Beach Resorts", "Family Friendly"],
    price: 60,
    image:
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    badge: "Wildlife & Nature",
    title: "Udawalawe National Park",
    location: "Ratnapura",
    tags: ["Safari", "Wildlife", "Nature Trails"],
    price: 45,
    image:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    badge: "Scenic & Relaxing",
    title: "Ella",
    location: "Badulla",
    tags: ["Hiking", "Tea Gardens", "Scenic Views"],
    price: 50,
    image:
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    badge: "Culture & History",
    title: "Kandy",
    location: "Central Province",
    tags: ["Temple", "Culture", "Botanical Gardens"],
    price: 40,
    image:
      "https://images.unsplash.com/photo-1588598056926-d6215715a201?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    badge: "Beach & Adventure",
    title: "Mirissa",
    location: "Southern Province",
    tags: ["Snorkeling", "Whale Watching", "Beach"],
    price: 55,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
];

const familyTestimonials: TestimonialCard[] = [
  {
    id: "1",
    quote:
      "Our trip to Ella was magical! The kids loved the train ride and the tea factory tour.",
    family: "The Perera Family",
    location: "Colombo, Sri Lanka",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    quote:
      "Bentota was perfect for our family. The beach, water sports and resort made it unforgettable!",
    family: "The Silva Family",
    location: "Kandy, Sri Lanka",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "3",
    quote:
      "Udawalawe safari was the highlight of our trip. The kids were thrilled to see the elephants up close!",
    family: "The Fernando Family",
    location: "Galle, Sri Lanka",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "4",
    quote:
      "Lankara made our family trip so easy. The itinerary was perfect for all ages!",
    family: "The Jayasinghe Family",
    location: "Matara, Sri Lanka",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
];

export default function FamilyTripPage() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [destination, setDestination] = useState("");
  const [travelPeriod, setTravelPeriod] = useState("");
  const [familySize, setFamilySize] = useState("");
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
          src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1920&q=80"
          alt="Happy Family Exploring Sri Lanka"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/45 to-transparent" />

        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-8 flex flex-col justify-center text-white space-y-5">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Users size={16} />
            <span>Family Trips</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-tight max-w-2xl drop-shadow-md">
            Quality Time, Unforgettable Memories
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 max-w-md font-light leading-relaxed drop-shadow">
            Discover Sri Lanka&apos;s most family-friendly destinations, safe
            experiences and fun-filled activities — designed for all ages.
            Create moments your family will cherish forever.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-300 pt-2">
            <div className="flex items-center gap-2">
              <Smile size={16} className="text-amber-400" />
              <span>Kid-Friendly Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-amber-400" />
              <span>Safe & Comfortable Travel</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-amber-400" />
              <span>Fun Learning Experiences</span>
            </div>
            <div className="flex items-center gap-2">
              <Sliders size={16} className="text-amber-400" />
              <span>Flexible Itineraries</span>
            </div>
          </div>

          <p className="text-xs italic text-amber-200 font-serif pt-1">
            &ldquo;Happy Families Explore Sri Lanka ❤️&rdquo;
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
                placeholder="e.g. Ella, Galle, Kandy..."
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

          {/* Family Size */}
          <div className="p-2 border-b lg:border-b-0 lg:border-r border-stone-200">
            <label className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
              Family Size
            </label>
            <div className="flex items-center gap-2 text-xs text-stone-800">
              <Users size={14} className="text-emerald-700" />
              <select
                value={familySize}
                onChange={(e) => setFamilySize(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-xs text-stone-800 cursor-pointer"
              >
                <option value="">Any size</option>
                <option value="small">3–4 Members</option>
                <option value="medium">5–6 Members</option>
                <option value="large">7+ Members</option>
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
                <option value="">Family Friendly</option>
                <option value="beach">Beach & Relaxation</option>
                <option value="wildlife">Wildlife & Safari</option>
                <option value="culture">Culture & Heritage</option>
                <option value="adventure">Soft Adventure</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button className="w-full bg-[#173a2e] hover:bg-[#122e24] text-white font-medium text-xs py-3 px-4 rounded-xl transition shadow-md flex items-center justify-center gap-2">
              <span>Explore Family Trips</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Family Destinations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Featured Family Destinations
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              Top Places for Family Adventures
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              From beach getaways to wildlife safaris, explore Sri Lanka&apos;s
              best family-friendly destinations.
            </p>
          </div>
          <Link
            href="#"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-emerald-800 transition"
          >
            <span>View All Family Destinations</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {familyDestinations.map((dest) => {
            const isFav = !!favorites[dest.id];
            return (
              <div
                key={dest.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={dest.image}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <button
                    onClick={(e) => toggleFavorite(dest.id, e)}
                    aria-label="Favorite destination"
                    className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full text-white hover:text-red-500 transition"
                  >
                    <Heart
                      size={14}
                      className={
                        isFav ? "fill-red-500 text-red-500" : "text-white"
                      }
                    />
                  </button>
                  <span className="absolute top-3 left-3 bg-sky-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {dest.badge}
                  </span>
                </div>

                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-stone-900 leading-tight">
                      {dest.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[10px] text-stone-500">
                      <MapPin size={10} className="text-emerald-700" />
                      <span>{dest.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {dest.tags.map((t, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <div className="text-[11px]">
                      <span className="text-stone-400 text-[10px]">From </span>
                      <span className="font-extrabold text-stone-900 text-xs">
                        ${dest.price}
                      </span>
                      <span className="text-stone-400 text-[9px]"> / person</span>
                    </div>

                    <Link
                      href="#"
                      className="bg-[#173a2e] hover:bg-[#122e24] text-white text-[10px] font-semibold px-2.5 py-1 rounded-lg transition flex items-center gap-0.5"
                    >
                      <span>View Trip</span>
                      <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Middle Section: Why Choose Lankara & Popular Family Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Image Box */}
        <div className="lg:col-span-4 relative rounded-2xl overflow-hidden shadow-md min-h-[300px] flex flex-col justify-end p-6 text-white group">
          <Image
            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80"
            alt="Family enjoying beach"
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
          <div className="relative z-10 space-y-1">
            <span className="font-serif italic text-xs text-amber-300 drop-shadow">
              &ldquo;Little Moments, Big Adventures ❤️&rdquo;
            </span>
          </div>
        </div>

        {/* Center Box: Why Choose Lankara */}
        <div className="lg:col-span-4 bg-stone-100/70 border border-stone-200 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Why Choose Lankara for Family Trips?
            </h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                <Sparkles size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">
                  Curated Family Itineraries
                </h4>
                <p className="text-[11px] text-stone-500 leading-tight">
                  Safe, fun and stress-free travel plans.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                <Award size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">
                  Local Family Experts
                </h4>
                <p className="text-[11px] text-stone-500 leading-tight">
                  Get insider tips from local guides.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                <Sliders size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">
                  Flexible Plans
                </h4>
                <p className="text-[11px] text-stone-500 leading-tight">
                  Adjustable options for every family size.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
                <Headphones size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900">
                  24/7 Support
                </h4>
                <p className="text-[11px] text-stone-500 leading-tight">
                  We&apos;re here whenever you need us.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="#"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl transition text-center shadow-sm"
          >
            Plan Your Family Trip →
          </Link>
        </div>

        {/* Right Box: Popular Family Experiences */}
        <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <h3 className="text-base font-serif font-bold text-stone-900">
              Popular Family Experiences
            </h3>
            <Link
              href="#"
              className="text-[10px] font-semibold text-emerald-800 hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 transition cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-amber-50 text-amber-700 rounded-lg">
                  <Compass size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 transition">
                    Wildlife Safaris
                  </h4>
                  <p className="text-[10px] text-stone-400">
                    See elephants, leopards and more
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-stone-400 group-hover:translate-x-0.5 transition"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 transition cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-sky-50 text-sky-700 rounded-lg">
                  <Palmtree size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 transition">
                    Beach Fun
                  </h4>
                  <p className="text-[10px] text-stone-400">
                    Snorkeling, swimming & water sports
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-stone-400 group-hover:translate-x-0.5 transition"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 transition cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-purple-50 text-purple-700 rounded-lg">
                  <Landmark size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 transition">
                    Cultural Visits
                  </h4>
                  <p className="text-[10px] text-stone-400">
                    Temples, museums & heritage sites
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-stone-400 group-hover:translate-x-0.5 transition"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 transition cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
                  <TreePalm size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 transition">
                    Nature & Adventure
                  </h4>
                  <p className="text-[10px] text-stone-400">
                    Hiking, waterfalls & scenic views
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-stone-400 group-hover:translate-x-0.5 transition"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:bg-stone-50 transition cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-orange-50 text-orange-700 rounded-lg">
                  <Utensils size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-800 transition">
                    Local Food Experiences
                  </h4>
                  <p className="text-[10px] text-stone-400">
                    Taste authentic Sri Lankan cuisine
                  </p>
                </div>
              </div>
              <ChevronRight
                size={14}
                className="text-stone-400 group-hover:translate-x-0.5 transition"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Real Families. Amazing Journeys. */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Travel Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              Real Families. Amazing Journeys.
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              See how other families are exploring Sri Lanka and creating
              unforgettable memories.
            </p>
          </div>
          <Link
            href="#"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-emerald-800 transition"
          >
            <span>View More Stories</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {familyTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm flex flex-col justify-between"
            >
              <p className="text-xs text-stone-600 font-light italic leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src={item.avatar}
                      alt={item.family}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">
                      {item.family}
                    </h4>
                    <span className="text-[10px] text-stone-400">
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={11}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-16 bg-stone-900 text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
          alt="Family sunset on beach"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">
              Ready for your next family adventure?
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold">
              Plan Your Perfect Family Getaway to Sri Lanka
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Create personalized itineraries, explore family-friendly
              destinations, and make memories that last a lifetime.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <Link
              href="#"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-full transition shadow-lg flex items-center gap-2"
            >
              <span>Start Planning</span>
              <ArrowRight size={14} />
            </Link>
            <span className="text-[10px] italic text-stone-300 font-serif">
              Explore Together ❤️
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}