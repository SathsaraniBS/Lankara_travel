"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {Search,Heart,User,Star,MapPin,Clock,Landmark,Sparkles,Palette,Calendar,
  Users,
  BookOpen,
  ChevronRight,
  ArrowRight,
  Play,
  
} from "lucide-react";

interface CategoryPill {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

interface DestinationCard {
  id: string;
  title: string;
  tag: string;
  subtags: string[];
  rating: number;
  reviews: string;
  price: string;
  image: string;
}

interface ExperienceCard {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  image: string;
}

const categories: CategoryPill[] = [
  { id: "temples", title: "Ancient Temples", subtitle: "Sacred places of peace", icon: Landmark },
  { id: "heritage", title: "Heritage Sites", subtitle: "Timeless landmarks", icon: Sparkles },
  { id: "arts", title: "Traditional Arts", subtitle: "Crafts, dance & music", icon: Palette },
  { id: "festivals", title: "Festivals", subtitle: "Colorful celebrations", icon: Calendar },
  { id: "culture", title: "Local Culture", subtitle: "Food, people & lifestyle", icon: Users },
  { id: "stories", title: "History & Stories", subtitle: "The island's past", icon: BookOpen },
];

const mustVisitDestinations: DestinationCard[] = [
  {
    id: "1",
    title: "Sigiriya",
    tag: "Heritage Site",
    subtags: ["Ancient Fortress", "Royal History"],
    rating: 4.8,
    reviews: "12k",
    price: "From $45/day",
    image: "/images/sigiriya.jpg",
  },
  {
    id: "2",
    title: "Temple of the Tooth",
    tag: "Sacred Temple",
    subtags: ["Buddhism", "Kandy"],
    rating: 4.9,
    reviews: "8.4k",
    price: "From $30/day",
    image: "/images/Kandy.jpg",
  },
  {
    id: "3",
    title: "Galle Fort",
    tag: "Heritage Site",
    subtags: ["Colonial History", "Coastal Charm"],
    rating: 4.7,
    reviews: "6.2k",
    price: "From $40/day",
    image: "/images/galle.jpg",
  },
  {
    id: "4",
    title: "Kandy Esala Perahera",
    tag: "Festival",
    subtags: ["Culture", "Tradition", "Festivity"],
    rating: 4.7,
    reviews: "5.3k",
    price: "From $35/day",
    image: "/images/jaffna.jpg",
  },
];

const culturalExperiences: ExperienceCard[] = [
  {
    id: "1",
    title: "Cultural Triangle Tour",
    location: "Anuradhapura • Polonnaruwa",
    duration: "Full day",
    price: "From $55/day",
    image: "/images/anuradhapura.jpg",
  },
  {
    id: "2",
    title: "Traditional Kandyan Dance",
    location: "Kandy",
    duration: "2 hours",
    price: "From $25",
    image: "/images/art&culture.jpg",
  },
  {
    id: "3",
    title: "Village Life Experience",
    location: "Galle • Hikkaduwa",
    duration: "Half day",
    price: "From $30",
    image: "/images/nuwaraeliya.webp",
  },
  {
    id: "4",
    title: "Ayurveda & Wellness",
    location: "Kandy • Gampola",
    duration: "1-3 days",
    price: "From $90",
    image: "/images/colombo.jpg",
  },
];

const topExperiencesList = [
  { title: "Visit UNESCO Heritage Sites", desc: "Explore ancient wonders", icon: Landmark },
  { title: "Watch a Traditional Dance", desc: "Feel the rhythm of Sri Lanka", icon: Palette },
  { title: "Join a Local Festival", desc: "Be part of the celebration", icon: Calendar },
  { title: "Learn Traditional Crafts", desc: "Support local artisans", icon: Sparkles },
  { title: "Taste Local Cuisine", desc: "A journey of flavors", icon: Users },
];

export default function ArtAndCulturePage() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-zinc-800 font-sans selection:bg-amber-200">


      {/* Hero Banner */}
      <section className="relative w-full h-[480px] sm:h-[540px] bg-stone-900 overflow-hidden">
        <Image
          src="/images/art&culture.jpg"
          alt="Traditional Kandyan Dancer"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/40 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-8 flex flex-col justify-center text-white space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-300">
            Art & Culture
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight leading-tight max-w-xl drop-shadow-md">
            Timeless Traditions, Living Heritage
          </h1>
          <p className="text-xs sm:text-sm text-stone-200 max-w-md font-light leading-relaxed drop-shadow">
            Explore Sri Lanka&apos;s rich cultural tapestry — from ancient kingdoms and sacred temples to vibrant festivals, traditional arts and warm local communities.
          </p>
          <p className="text-xs italic text-amber-200 font-serif pt-1">
            &ldquo;More than a destination, it&apos;s a culture.&rdquo;
          </p>
        </div>
      </section>

      {/* Category Navigation Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col items-center text-center space-y-2 shadow-sm hover:shadow-md hover:border-amber-400 transition cursor-pointer group"
              >
                <div className="p-2.5 bg-amber-50 rounded-full text-amber-800 group-hover:bg-amber-600 group-hover:text-white transition">
                  <Icon size={18} />
                </div>
                <h3 className="text-xs font-bold text-stone-900 tracking-tight">{cat.title}</h3>
                <p className="text-[10px] text-stone-500 line-clamp-1">{cat.subtitle}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content Area: Left Grid + Right Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Main) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Must-Visit Cultural Gems */}
            <div className="space-y-6">
              <div className="flex items-end justify-between border-b border-stone-200 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                    Featured Destinations
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-stone-900">
                    Must-Visit Cultural Gems
                  </h2>
                  <p className="text-xs text-stone-500 mt-1">
                    Discover the most iconic places where Sri Lanka&apos;s history and culture come alive.
                  </p>
                </div>
                <Link
                  href="/#destinations"
                  className="hidden sm:flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-amber-800 transition"
                >
                  <span>View all destinations</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {mustVisitDestinations.map((item) => {
                  const isFav = !!favorites[item.id];
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        <button
                          onClick={(e) => toggleFavorite(item.id, e)}
                          aria-label="Favorite destination"
                          className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-1.5 rounded-full text-white hover:text-red-500 transition"
                        >
                          <Heart
                            size={14}
                            className={isFav ? "fill-red-500 text-red-500" : "text-white"}
                          />
                        </button>
                        <span className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full">
                          {item.tag}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <h3 className="text-sm font-bold text-stone-900">{item.title}</h3>
                        <div className="flex flex-wrap gap-1">
                          {item.subtags.map((st, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded"
                            >
                              {st}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-2 text-xs border-t border-stone-100">
                          <div className="flex items-center gap-1 text-stone-700">
                            <Star size={13} className="fill-amber-500 text-amber-500" />
                            <span className="font-bold">{item.rating}</span>
                            <span className="text-stone-400 text-[10px]">({item.reviews})</span>
                          </div>
                          <span className="font-bold text-stone-900">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cultural Experiences Section */}
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-3">
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                  Cultural Experiences
                </span>
                <h2 className="text-2xl font-serif font-bold text-stone-900">
                  Immerse Yourself in Sri Lanka&apos;s Heritage
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  From ancient ruins to colorful festivals, experience the island&apos;s living culture.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {culturalExperiences.map((exp) => {
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
                          sizes="(max-width: 640px) 100vw, 50vw"
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
                      </div>

                      <div className="p-4 space-y-2">
                        <h3 className="text-sm font-bold text-stone-900">{exp.title}</h3>
                        <p className="text-xs text-stone-500 flex items-center gap-1">
                          <MapPin size={12} className="text-amber-700" />
                          <span>{exp.location}</span>
                        </p>

                        <div className="flex items-center justify-between pt-2 text-xs border-t border-stone-100">
                          <span className="flex items-center gap-1 text-stone-500 text-[11px]">
                            <Clock size={12} />
                            {exp.duration}
                          </span>
                          <span className="font-bold text-stone-900">{exp.price}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Banner: Why Sri Lanka's Culture is Unique */}
            <div className="bg-stone-100 border border-stone-200 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 relative h-48 rounded-xl overflow-hidden group">
                <Image
                  src="/images/Kandy.jpg"
                  alt="Experience Sri Lanka"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button
                    aria-label="Play video"
                    className="p-3 bg-white/90 rounded-full text-stone-900 hover:scale-110 transition shadow-lg"
                  >
                    <Play size={20} className="fill-stone-900 ml-0.5" />
                  </button>
                </div>
                <span className="absolute bottom-3 left-3 text-white text-xs font-serif font-bold drop-shadow">
                  Experience the real Sri Lanka
                </span>
              </div>

              <div className="md:col-span-7 space-y-4">
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Why Sri Lanka&apos;s Culture is Unique
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold">
                      <Landmark size={14} />
                      <span>Rich History</span>
                    </div>
                    <p className="text-[11px] text-stone-500">2,500+ years of documented heritage</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold">
                      <Sparkles size={14} />
                      <span>Diverse Influences</span>
                    </div>
                    <p className="text-[11px] text-stone-500">Buddhist, Hindu, Colonial & more</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold">
                      <Calendar size={14} />
                      <span>Vibrant Festivals</span>
                    </div>
                    <p className="text-[11px] text-stone-500">Year-round celebrations across island</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold">
                      <Users size={14} />
                      <span>Warm People</span>
                    </div>
                    <p className="text-[11px] text-stone-500">A culture rooted in deep hospitality</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quote Card */}
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden">
              <div className="relative h-20 w-20 mx-auto rounded-full overflow-hidden border-2 border-amber-300">
                <Image
                  src="/images/colombo.jpg"
                  alt="Stupa"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <blockquote className="font-serif italic text-stone-800 text-sm leading-relaxed">
                &ldquo;Culture is not something you visit, it is something you feel.&rdquo;
              </blockquote>
            </div>

            {/* Top Cultural Experiences List */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
                Top Cultural Experiences
              </h3>
              <div className="space-y-3">
                {topExperiencesList.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-50 transition cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-800 group-hover:bg-amber-600 group-hover:text-white transition">
                          <Icon size={16} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-stone-800">{item.title}</h4>
                          <p className="text-[10px] text-stone-500">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-stone-400 group-hover:text-stone-800 transition" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cultural Trail Map Widget */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
                Cultural Trail Map
              </h3>
              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-emerald-50/50 border border-stone-200 flex flex-col justify-between p-4">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#173a2e_1px,transparent_1px)] [background-size:12px_12px]" />
                
                {/* Map Pins Mockup */}
                <div className="relative z-10 space-y-2 text-[11px] font-medium text-stone-700">
                  <div className="flex items-center gap-1.5 text-stone-900 font-bold">
                    <MapPin size={12} className="text-emerald-700" />
                    <span>Anuradhapura</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-3">
                    <MapPin size={12} className="text-amber-600" />
                    <span>Sigiriya</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-6">
                    <MapPin size={12} className="text-sky-600" />
                    <span>Kandy</span>
                  </div>
                  <div className="flex items-center gap-1.5 pl-2 pt-2">
                    <MapPin size={12} className="text-rose-600" />
                    <span>Galle</span>
                  </div>
                </div>

                <div className="relative z-10 flex justify-end">
                  <button className="bg-[#173a2e] hover:bg-[#122e24] text-white text-[11px] font-medium px-3 py-1.5 rounded-lg transition shadow-sm">
                    Explore Map →
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Discover Stories Call To Action Footer Banner */}
      <section className="relative w-full py-16 bg-stone-900 text-white overflow-hidden">
        <Image
          src="/images/nuwaraeliya.webp"
          alt="Sunset landscape"
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">
              Plan Your Cultural Journey
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold">
              Discover the Stories Behind Every Place
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Let Lankara Travels help you explore Sri Lanka&apos;s art, culture and heritage with personalized itineraries.
            </p>
          </div>

          <Link
            href="/FamilyTrip"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-6 py-3 rounded-full transition shadow-lg flex items-center gap-2 min-w-max"
          >
            <span>Plan My Trip</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>


    </div>
  );
}