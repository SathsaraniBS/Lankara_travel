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
  ShieldCheck,
  Compass,
  ArrowRight,
  Star,
  CheckCircle2,
  DollarSign,
  UserCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface GroupTripCard {
  id: string;
  title: string;
  tag: string;
  location: string;
  duration: string;
  tags: string[];
  price: number;
  image: string;
}

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  country: string;
  rating: number;
  avatar: string;
}

const popularTrips: GroupTripCard[] = [
  {
    id: "1",
    title: "Ella Adventure Escape",
    tag: "Best Seller",
    location: "Ella",
    duration: "5 Days • 4 Nights",
    tags: ["Hiking", "Tea Experience", "Scenic Views"],
    price: 420,
    image: "/images/ella.jpg",
  },
  {
    id: "2",
    title: "South Coast Getaway",
    tag: "Beach Vibes",
    location: "Mirissa",
    duration: "4 Days • 3 Nights",
    tags: ["Surfing", "Beach Time", "Local Food"],
    price: 380,
    image: "/images/Trincomalee.jpg",
  },
  {
    id: "3",
    title: "Yala Wildlife Expedition",
    tag: "Wildlife",
    location: "Yala",
    duration: "3 Days • 2 Nights",
    tags: ["Safari", "Nature", "Photography"],
    price: 350,
    image: "/images/safari-trip.jpg",
  },
  {
    id: "4",
    title: "Tea Trails & Highlands",
    tag: "Cultural & Scenic",
    location: "Nuwara Eliya",
    duration: "5 Days • 4 Nights",
    tags: ["Tea Plantation", "Train Ride", "Nature Walk"],
    price: 450,
    image: "/images/nuwaraeliya.webp",
  },
];

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "The Ella trek was the highlight of our trip! Amazing group, well-organized, and unforgettable views!",
    name: "Emma W.",
    country: "UK",
    rating: 5,
    avatar: "/images/art&culture.jpg",
  },
  {
    id: "2",
    quote:
      "Loved the mix of adventure, culture and relaxation. Made new friends for life!",
    name: "Daniel K.",
    country: "Australia",
    rating: 5,
    avatar: "/images/colombo.jpg",
  },
  {
    id: "3",
    quote:
      "Everything was perfectly planned. The guides were fantastic and the places were beyond beautiful.",
    name: "Sophia L.",
    country: "Germany",
    rating: 5,
    avatar: "/images/jaffna.jpg",
  },
  {
    id: "4",
    quote:
      "Best travel experience ever! Sri Lanka is even more beautiful when you explore it together.",
    name: "James T.",
    country: "Canada",
    rating: 5,
    avatar: "/images/Kandy.jpg",
  },
];

export default function GroupTripPage() {
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
    <div className="min-h-screen bg-[#fcfbf9] text-zinc-800 font-sans selection:bg-emerald-200">
      
      {/* Hero Section */}
      <section className="relative w-full h-[500px] sm:h-[560px] bg-stone-900 overflow-hidden">
        <Image
          src="/images/adventures_trips.jpg"
          alt="Group of travellers exploring Sri Lanka"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/40 to-transparent" />

        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-8 flex flex-col justify-center text-white space-y-6">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-widest">
            <Users size={16} />
            <span>Group Trips</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-tight max-w-xl drop-shadow-md">
            Travel Together, Experience More
          </h1>

          <p className="text-xs sm:text-sm text-stone-200 max-w-md font-light leading-relaxed drop-shadow">
            Join our curated group trips and explore Sri Lanka with like-minded travellers. Share new experiences, make lasting friendships, and create unforgettable memories.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-300 pt-2">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-emerald-400" />
              <span>Small Groups (6–12 people)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Safe & Guided Experiences</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-emerald-400" />
              <span>Authentic Local Encounters</span>
            </div>
          </div>

          <p className="text-xs italic text-emerald-200 font-serif pt-1">
            &ldquo;Good people. Great journeys. Sri Lanka&rdquo;
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
                placeholder="e.g. Ella, Yala, Nuwara Eliya..."
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
                <option value="small">Solo / Couple</option>
                <option value="medium">4–8 People</option>
                <option value="large">8–12 People</option>
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
                <option value="adventure">Adventure & Trekking</option>
                <option value="beach">Beach & Relaxation</option>
                <option value="wildlife">Wildlife Safari</option>
                <option value="culture">Cultural Heritage</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button className="w-full bg-[#173a2e] hover:bg-[#122e24] text-white font-medium text-xs py-3 px-4 rounded-xl transition shadow-md flex items-center justify-center gap-2">
              <span>Explore Group Trips</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* Featured Group Trips Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Featured Group Trips
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              Popular Group Trips
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Handpicked experiences loved by travellers, perfect for your next adventure.
            </p>
          </div>
          <Link
            href="#"
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-emerald-800 transition"
          >
            <span>View All Group Trips</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTrips.map((trip) => {
            const isFav = !!favorites[trip.id];
            return (
              <div
                key={trip.id}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <button
                    onClick={(e) => toggleFavorite(trip.id, e)}
                    aria-label="Favorite group trip"
                    className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full text-white hover:text-red-500 transition"
                  >
                    <Heart
                      size={14}
                      className={isFav ? "fill-red-500 text-red-500" : "text-white"}
                    />
                  </button>
                  <span className="absolute top-3 left-3 bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    {trip.tag}
                  </span>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-bold text-stone-900">{trip.title}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} className="text-emerald-700" />
                        {trip.location}
                      </span>
                      <span>•</span>
                      <span>{trip.duration}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {trip.tags.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <div className="text-xs">
                      <span className="text-stone-500 text-[11px]">From </span>
                      <span className="font-extrabold text-stone-900 text-sm">
                        ${trip.price}
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

      {/* Why Join a Group Trip Banner */}
      <section className="bg-stone-100/70 border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Image Collage */}
          <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/sigiriya.jpg"
              alt="Travellers sharing moments"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white space-y-0.5">
              <span className="font-serif italic text-sm drop-shadow">
                &ldquo;Same destination, new friends ❤️&rdquo;
              </span>
            </div>
          </div>

          {/* Right Features Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Why Join a Group Trip?
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                More than just a trip — it&apos;s a shared journey.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2 shadow-sm">
                <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl w-max">
                  <UserCheck size={18} />
                </div>
                <h3 className="text-xs font-bold text-stone-900">
                  Meet like-minded people
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Make friends who share your passion for travel.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2 shadow-sm">
                <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl w-max">
                  <DollarSign size={18} />
                </div>
                <h3 className="text-xs font-bold text-stone-900">Better Value</h3>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Group rates, shared costs, more value for your money.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2 shadow-sm">
                <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl w-max">
                  <Compass size={18} />
                </div>
                <h3 className="text-xs font-bold text-stone-900">
                  Local Expertise
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Experienced guides bring Sri Lanka&apos;s stories to life.
                </p>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2 shadow-sm">
                <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl w-max">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="text-xs font-bold text-stone-900">
                  Safe & Comfortable
                </h3>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  We handle the details so you can focus on the experience.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Traveller Stories / Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Traveller Stories
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              Real People. Real Journeys.
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Hear from fellow travellers who explored Sri Lanka together.
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
          {testimonials.map((item) => (
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
                      alt={item.name}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{item.name}</h4>
                    <span className="text-[10px] text-stone-400">{item.country}</span>
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
          src="/images/galle.jpg"
          alt="Group travellers on beach sunset"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">
              Ready for your next adventure?
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold">
              Join a Group Trip Today
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Discover Sri Lanka with amazing people, create lifelong memories, and experience the island like never before.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <Link
              href="#"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-6 py-3 rounded-full transition shadow-lg flex items-center gap-2"
            >
              <span>Browse Group Trips</span>
              <ArrowRight size={14} />
            </Link>
            <span className="text-[10px] italic text-stone-300 font-serif">
              Different people, same dream: Sri Lanka ❤️
            </span>
          </div>
        </div>
      </section>


    </div>
  );
}