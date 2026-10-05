"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  Heart,
  Palmtree,
  Compass,
  Trees,
  Mountain,
  Users,
  Award,
  ShieldCheck,
  Headphones,
  Car,
  Hotel,
  ArrowRight,
} from "lucide-react";

export interface PackageItem {
  id: string;
  title: string;
  destination: string;
  duration_days: number;
  badge?: string;
  category: string;
  image_url: string;
  description: string;
  price_per_person: number;
  includes_hotel?: boolean;
  includes_transfers?: boolean;
}

interface PackagesClientProps {
  initialPackages: PackageItem[];
}

const DEFAULT_PACKAGES: PackageItem[] = [
  {
    id: "7-days-beach-bliss",
    title: "7 Days Beach Bliss",
    destination: "Colombo | Bentota | Galle",
    duration_days: 7,
    badge: "Popular",
    category: "Beach",
    image_url: "/images/unawatuna.jpg",
    description: "Relax on golden beaches, visit historic towns, and enjoy the coastal charm of Sri Lanka.",
    price_per_person: 950,
    includes_hotel: true,
    includes_transfers: true,
  },
  {
    id: "5-days-cultural-discovery",
    title: "5 Days Cultural Discovery",
    destination: "Colombo | Kandy | Sigiriya",
    duration_days: 5,
    badge: "Cultural",
    category: "Cultural",
    image_url: "/images/sigiriya.jpg",
    description: "Explore ancient cities, sacred temples, and rich heritage sites across the Cultural Triangle.",
    price_per_person: 780,
    includes_hotel: true,
    includes_transfers: true,
  },
  {
    id: "6-days-wildlife-adventure",
    title: "6 Days Wildlife Adventure",
    destination: "Sigiriya | Minneriya | Yala",
    duration_days: 6,
    badge: "Wildlife",
    category: "Wildlife",
    image_url: "/images/yala.jpg",
    description: "Get close to nature with thrilling safaris and diverse wildlife across national parks.",
    price_per_person: 890,
    includes_hotel: true,
    includes_transfers: true,
  },
  {
    id: "8-days-hill-country-escape",
    title: "8 Days Hill Country Escape",
    destination: "Kandy | Nuwara Eliya | Ella",
    duration_days: 8,
    badge: "Adventure",
    category: "Adventure",
    image_url: "/images/ella.jpg",
    description: "Wind through misty mountains, scenic tea estates, and charming hill country towns.",
    price_per_person: 1120,
    includes_hotel: true,
    includes_transfers: true,
  },
];

export default function PackagesClient({ initialPackages }: PackagesClientProps) {
  const displayPackages = initialPackages.length > 0 ? initialPackages : DEFAULT_PACKAGES;

  const [destinationSearch, setDestinationSearch] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("Any Duration");
  const [selectedType, setSelectedType] = useState("Any Type");
  const [selectedBudget, setSelectedBudget] = useState("Any Budget");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const filteredPackages = useMemo(() => {
    return displayPackages.filter((pkg) => {
      const matchesDestination =
        !destinationSearch ||
        pkg.destination.toLowerCase().includes(destinationSearch.toLowerCase()) ||
        pkg.title.toLowerCase().includes(destinationSearch.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || pkg.category.toLowerCase() === activeCategory.toLowerCase();

      return matchesDestination && matchesCategory;
    });
  }, [displayPackages, destinationSearch, activeCategory]);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[480px] sm:h-[520px] bg-slate-900 overflow-hidden">
        <Image
          src="/images/ella.jpg"
          alt="Curated Holiday Packages"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center pt-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              🌴 HOLIDAY PACKAGES
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Curated Holiday Packages for Your Perfect Sri Lanka Getaway
            </h1>
            <p className="text-gray-200 text-xs sm:text-sm font-light leading-relaxed">
              From relaxing beach escapes to adventurous journeys, our handpicked holiday packages let you experience the best of Sri Lanka — hassle-free!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-3xl text-white">
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15">
              <Compass className="text-amber-400 shrink-0" size={18} />
              <span className="text-xs font-medium">Expertly Curated Itineraries</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15">
              <Hotel className="text-amber-400 shrink-0" size={18} />
              <span className="text-xs font-medium">Comfortable Stays</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15">
              <Users className="text-amber-400 shrink-0" size={18} />
              <span className="text-xs font-medium">Local Guides & Support</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15">
              <Headphones className="text-amber-400 shrink-0" size={18} />
              <span className="text-xs font-medium">24/7 Assistance</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FLOATING SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          <div className="md:col-span-3 flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
            <MapPin size={18} className="text-emerald-700 shrink-0" />
            <div className="w-full">
              <label className="block text-[10px] font-semibold text-gray-400 uppercase">Destination</label>
              <input
                type="text"
                placeholder="e.g. Colombo, Kandy, Galle"
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="md:col-span-3 flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
            <Calendar size={18} className="text-emerald-700 shrink-0" />
            <div className="w-full">
              <label className="block text-[10px] font-semibold text-gray-400 uppercase">Duration</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
              >
                <option>Any Duration</option>
                <option>1 - 3 Days</option>
                <option>4 - 7 Days</option>
                <option>8+ Days</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
            <Compass size={18} className="text-emerald-700 shrink-0" />
            <div className="w-full">
              <label className="block text-[10px] font-semibold text-gray-400 uppercase">Travel Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
              >
                <option>Any Type</option>
                <option>Beach Getaway</option>
                <option>Cultural Tour</option>
                <option>Wildlife Safari</option>
                <option>Adventure Trip</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2 flex items-center gap-3 px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-100">
            <Award size={18} className="text-emerald-700 shrink-0" />
            <div className="w-full">
              <label className="block text-[10px] font-semibold text-gray-400 uppercase">Budget</label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
              >
                <option>Any Budget</option>
                <option>Under $800</option>
                <option>$800 - $1,200</option>
                <option>$1,200+</option>
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <button className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-md cursor-pointer">
              <Search size={15} /> Search Packages
            </button>
          </div>

        </div>
      </div>

      {/* 3. PACKAGE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">PACKAGE CATEGORIES</span>
            <h2 className="text-2xl font-serif font-bold text-gray-900">Choose Your Perfect Holiday</h2>
            <p className="text-xs text-gray-500 mt-0.5">Explore our most popular holiday packages and find the one that suits your travel style.</p>
          </div>
          <button
            onClick={() => setActiveCategory("All")}
            className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All Packages <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { title: "Beach Getaways", subtitle: "Sun, sand & relaxation", icon: Palmtree, catKey: "Beach" },
            { title: "Cultural Tours", subtitle: "History & heritage", icon: Compass, catKey: "Cultural" },
            { title: "Nature & Wildlife", subtitle: "Explore the wild side", icon: Trees, catKey: "Wildlife" },
            { title: "Adventure Trips", subtitle: "For the thrill seekers", icon: Mountain, catKey: "Adventure" },
            { title: "Family Holidays", subtitle: "Fun for all ages", icon: Users, catKey: "Family" },
            { title: "Honeymoon Packages", subtitle: "Romance & serenity", icon: Heart, catKey: "Honeymoon" },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.catKey;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(isActive ? "All" : cat.catKey)}
                className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between h-36 cursor-pointer ${
                  isActive
                    ? "bg-emerald-800 text-white border-emerald-800 shadow-md"
                    : "bg-white border-gray-100 hover:border-emerald-200 hover:shadow-md text-gray-800"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isActive ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-800"}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold">{cat.title}</h3>
                  <p className={`text-[10px] ${isActive ? "text-emerald-100" : "text-gray-400"}`}>{cat.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED PACKAGES */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">FEATURED PACKAGES</span>
            <h2 className="text-2xl font-serif font-bold text-gray-900">Top Holiday Packages</h2>
          </div>
          <button className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer">
            View All Packages <ArrowRight size={14} />
          </button>
        </div>

        {filteredPackages.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-gray-100 my-4">
            <p className="text-sm font-semibold text-gray-500">No packages match your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={pkg.image_url || "/images/unawatuna.jpg"}
                      alt={pkg.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    {pkg.badge && (
                      <span className="absolute top-3 left-3 bg-emerald-800 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                        {pkg.badge}
                      </span>
                    )}
                    <button
                      onClick={() => toggleFavorite(pkg.id)}
                      className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-md rounded-full text-gray-600 hover:text-rose-500 transition cursor-pointer"
                    >
                      <Heart
                        size={16}
                        className={favorites.includes(pkg.id) ? "fill-rose-500 text-rose-500" : ""}
                      />
                    </button>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{pkg.title}</h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin size={12} className="text-emerald-700 shrink-0" /> {pkg.destination}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600 pt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar size={13} className="text-emerald-700" /> {pkg.duration_days} Days
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Hotel size={13} className="text-emerald-700" /> Hotel + Breakfast
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Car size={13} className="text-emerald-700" /> Private Transfer
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2 pt-1 border-t border-gray-50">
                      {pkg.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-end justify-between mt-2">
                  <div>
                    <span className="block text-[10px] text-gray-400">From</span>
                    <span className="text-lg font-bold text-gray-900">${pkg.price_per_person}</span>
                    <span className="text-[10px] text-gray-400"> / person</span>
                  </div>

                  <Link
                    href={`/holiday-packages/${pkg.id}`}
                    className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition cursor-pointer shadow-sm flex items-center gap-1"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. WHY CHOOSE LANKARA TRAVELS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-sm">
          <div className="md:col-span-6 space-y-3">
            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">WHY CHOOSE LANKARA TRAVELS</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 leading-tight">
              Your Dream Holiday, Our Priority
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              We go beyond bookings — we're here to make your Sri Lanka holiday smooth, safe and unforgettable.
            </p>
          </div>

          <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 rounded-xl">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800 shrink-0">
                <Compass size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Local Expertise</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">In-depth knowledge of Sri Lanka</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800 shrink-0">
                <Award size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Custom Packages</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Tailored to your interests</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800 shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Trusted & Safe</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Your safety and peace of mind matter</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800 shrink-0">
                <Headphones size={18} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">24/7 Support</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">We're always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM BANNER */}
      <section className="relative mb-12 max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <Image
            src="/images/unawatuna.jpg"
            alt="Ready to plan your dream holiday?"
            fill
            className="object-cover opacity-35"
          />
          <div className="relative z-10 space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              Ready to Plan Your Dream Holiday?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Let us create a personalised holiday package just for you. Your Sri Lankan adventure awaits!
            </p>
          </div>

          <Link
            href="/contact"
            className="relative z-10 px-6 py-3.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold text-xs rounded-xl transition shadow-lg shrink-0 cursor-pointer"
          >
            Get in Touch →
          </Link>
        </div>
      </section>
    </div>
  );
}