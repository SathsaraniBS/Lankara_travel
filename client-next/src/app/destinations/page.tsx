import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Plus,
  Clock,
  Route,
  Star,
  Compass,
  ChevronRight,
  GripVertical,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import TripPlannerForm from "@/components/planning/TripPlannerForm";

// Types matching FastAPI / Pydantic schemas
export interface District {
  id: string;
  name: string;
  category: string;
  places: string;
  image: string;
}

export interface PopularTrip {
  id?: string;
  title: string;
  route: string;
  duration: string;
  tag: string;
  image: string;
}

export interface PlanItem {
  id?: string;
  day: string;
  location: string;
  image: string;
}

interface InitialPlannerData {
  districts: District[];
  popularTrips: PopularTrip[];
  initialTripPlan: PlanItem[];
}

// Fallback image path inside public/images folder
const DEFAULT_PLACEHOLDER = "/images/sigiriya.jpg";

// Helper function to safely parse local image paths from public/images
function getImageUrl(url?: string): string {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return DEFAULT_PLACEHOLDER;
  }
  const trimmed = url.trim();

  // If full external URL, return as is
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Ensure relative path starts with '/' for public folder access
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

// Fallback data using local images inside public/images/
const fallbackData: InitialPlannerData = {
  districts: [
    {
      id: "colombo",
      name: "Colombo",
      category: "Capital City",
      places: "12+ places",
      image: "/images/colombo.jpg",
    },
    {
      id: "kandy",
      name: "Kandy",
      category: "Culture",
      places: "10+ places",
      image: "/images/Kandy.jpg",
    },
    {
      id: "ella",
      name: "Ella",
      category: "Nature",
      places: "8+ places",
      image: "/images/ella.jpg",
    },
    {
      id: "galle",
      name: "Galle",
      category: "Heritage",
      places: "9+ places",
      image: "/images/galle.jpg",
    },
  ],
  popularTrips: [
    {
      title: "5 Days Cultural Tour",
      route: "Colombo • Kandy • Sigiriya • Dambulla",
      duration: "5 Days",
      tag: "Cultural",
      image: "/images/sigiriya.jpg",
    },
    {
      title: "7 Days Nature & Adventure",
      route: "Ella • Nuwara Eliya • Yala",
      duration: "7 Days",
      tag: "Nature",
      image: "/images/nuwaraeliya.webp",
    },
    {
      title: "3 Days Beach Getaway",
      route: "Bentota • Unawatuna • Mirissa",
      duration: "3 Days",
      tag: "Beach",
      image: "/images/unawatuna.jpg",
    },
    {
      title: "Family Trip (7 Days)",
      route: "Colombo • Pinnawala • Kandy • Galle",
      duration: "7 Days",
      tag: "Family",
      image: "/images/colombo.jpg",
    },
  ],
  initialTripPlan: [
    {
      day: "Day 1",
      location: "Colombo",
      image: "/images/colombo.jpg",
    },
    {
      day: "Day 2",
      location: "Kandy",
      image: "/images/Kandy.jpg",
    },
    {
      day: "Day 3",
      location: "Ella",
      image: "/images/ella.jpg",
    },
    {
      day: "Day 4",
      location: "Galle",
      image: "/images/galle.jpg",
    },
  ],
};

// Server-side fetching function connecting to FastAPI
async function getPlannerData(): Promise<InitialPlannerData> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  try {
    const res = await fetch(`${apiUrl}/api/v1/planner/overview`, {
      next: { revalidate: 3600 }, // SSR Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch planner data: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.warn("FastAPI backend error, using local fallback data:", error);
    return fallbackData;
  }
}

export default async function PlanningATripPage() {
  const { districts, popularTrips, initialTripPlan } = await getPlannerData();

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans flex flex-col justify-between">
      <div>
        {/* Hero Section */}
        <section className="relative w-full h-[420px] bg-slate-900 overflow-hidden">
          <Image
            src="/images/sigiriya.jpg"
            alt="Sigiriya Sri Lanka Travel Banner"
            fill
            className="object-cover opacity-65"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1">
                🗺 PLAN YOUR TRIP
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white max-w-xl leading-tight">
              Plan Your Perfect <br />
              Sri Lanka Journey
            </h1>

            <p className="text-gray-200 text-xs md:text-sm mt-3 max-w-md leading-relaxed">
              Discover amazing places, create your itinerary, find nearby attractions and make the most of your trip with Lankara Travels.
            </p>

            {/* Feature Badges */}
            <div className="mt-8 flex flex-wrap gap-3 text-xs text-white/90">
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>All 25 Districts & Top Places</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Plan & Add Your Places</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Get Distance & Travel Time</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20 flex items-center gap-2">
                <Route className="w-3.5 h-3.5 text-amber-400" />
                <span>Smart Route Suggestions</span>
              </div>
            </div>
          </div>

          <div className="absolute right-12 bottom-12 hidden lg:block text-right text-white/80">
            <p className="font-serif italic text-2xl font-light tracking-wide">
              Your dream trip <br /> starts here ♡
            </p>
          </div>
        </section>

        {/* Main Content Container */}
        <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
          {/* Plan Your Trip Interactive Form (Client Component) */}
          <TripPlannerForm />

          {/* How It Works Section */}
          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-serif font-bold text-gray-900">How It Works?</h2>
              <p className="text-xs text-gray-500">Plan your trip in just a few simple steps.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative space-y-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  1
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs">Choose Your Locations</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Select places from all 25 districts or explore our popular destinations.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative space-y-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  2
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs">Add to Your Plan</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Save the places you like and build your personalised itinerary.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative space-y-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  3
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Route className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs">Get Route & Time</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  We'll show you distance, travel time and the best route.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative space-y-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                  4
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Star className="w-4 h-4" />
                </div>
                <h3 className="font-semibold text-gray-900 text-xs">Enjoy Your Trip</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Get nearby places, tips and emergency assistance if needed.
                </p>
              </div>
            </div>
          </section>

          {/* Main Grid: Explore Sri Lanka & Side Trip Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column - Explore Sri Lanka */}
            <div className="lg:col-span-8 space-y-8">
              {/* District Explorer */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-emerald-800" />
                      Explore Sri Lanka
                    </h2>
                    <p className="text-xs text-gray-500">Discover the best places across all 25 districts.</p>
                  </div>
                  <Link
                    href="/destinations"
                    className="text-xs text-emerald-800 font-semibold hover:underline flex items-center gap-1"
                  >
                    View All Destinations →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {districts.map((district) => (
                    <Link
                      key={district.id}
                      href={`/destinations/${district.id}`}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group block cursor-pointer"
                    >
                      <div className="relative h-28 w-full overflow-hidden">
                        <Image
                          src={getImageUrl(district.image)}
                          alt={district.name}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-gray-900 text-xs">{district.name}</h3>
                        <p className="text-[10px] text-gray-400">{district.category}</p>
                        <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-500">
                          <span>{district.places}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Trip Ideas */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      Popular Trip Ideas
                    </h2>
                    <p className="text-xs text-gray-500">Get inspired with our ready-to-plan itineraries.</p>
                  </div>
                  <Link
                    href="/destinations"
                    className="text-xs text-emerald-800 font-semibold hover:underline flex items-center gap-1"
                  >
                    View All Trips →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {popularTrips.map((trip, idx) => (
                    <div
                      key={trip.id || idx}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative h-28 w-full overflow-hidden">
                          <Image
                            src={getImageUrl(trip.image)}
                            alt={trip.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                        <div className="p-3 space-y-1">
                          <h3 className="font-semibold text-gray-900 text-xs leading-snug">{trip.title}</h3>
                          <p className="text-[10px] text-gray-400 line-clamp-1">{trip.route}</p>
                        </div>
                      </div>
                      <div className="p-3 pt-0 flex items-center gap-2 text-[10px] text-gray-500">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-[9px] font-medium">{trip.duration}</span>
                        <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[9px] font-medium">{trip.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Trip Plan Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Route className="w-4 h-4 text-emerald-800" />
                    <h3 className="font-serif font-bold text-gray-900 text-sm">Your Trip Plan</h3>
                  </div>
                  <button className="text-[10px] text-emerald-800 font-semibold hover:underline">
                    View All
                  </button>
                </div>

                <div className="space-y-2.5">
                  {initialTripPlan.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="bg-gray-50/60 p-2 rounded-xl border border-gray-100 flex items-center justify-between group hover:bg-white transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <Image src={getImageUrl(item.image)} alt={item.location} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-xs">{item.location}</h4>
                          <p className="text-[10px] text-gray-400">{item.day}</p>
                        </div>
                      </div>
                      <GripVertical className="w-4 h-4 text-gray-300 cursor-grab opacity-60 group-hover:opacity-100" />
                    </div>
                  ))}
                </div>

                <button className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add More Places
                </button>
              </div>

              {/* Assistance Card */}
              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs">
                  <Compass className="w-4 h-4 text-emerald-700" />
                  <h4>Need help planning?</h4>
                </div>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Our travel experts are here to assist you with custom itineraries and special requests.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-1.5 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
                >
                  Contact Us →
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="relative rounded-2xl overflow-hidden p-8 md:p-12 text-white bg-slate-900 flex flex-col md:flex-row items-center justify-between">
            <Image
              src="/images/unawatuna.jpg"
              alt="Beach Sri Lanka"
              fill
              className="object-cover opacity-30"
            />
            <div className="relative z-10 space-y-2 max-w-lg">
              <span className="font-serif italic text-xs text-amber-400">
                Small steps, Big adventures ♡
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold">
                Ready to Plan Your Trip?
              </h3>
              <p className="text-xs text-gray-200">
                Let Lankara Travels be part of your journey to discover the real Sri Lanka.
              </p>
            </div>
            <div className="relative z-10 mt-6 md:mt-0 flex flex-col items-end gap-3">
              <button className="bg-amber-400 hover:bg-amber-500 text-gray-900 text-xs font-semibold px-6 py-3 rounded-full transition flex items-center gap-1 shadow-md">
                Start Planning →
              </button>
              <div className="flex items-center gap-2 text-[10px] text-white/80 uppercase tracking-widest">
                <span>Beaches</span> • <span>Mountains</span> • <span>Culture</span> • <span>Wildlife</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}