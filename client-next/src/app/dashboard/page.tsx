import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Compass,
  Building2,
  Package,
  Plane,
  CalendarCheck,
  MapPin,
  Heart,
  User,
  Settings,
  Bell,
  Search,
  Star,
  ChevronRight,
  Sun,
  Clock,
  ArrowRight,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

interface DashboardData {
  full_name: string;
  email: string;
  role: string;
  avatar_url: string;
  stats: {
    total_bookings: number;
    wishlist_count: number;
    upcoming_trips: number;
    travel_points: number;
  };
  upcoming_trip: {
    title: string;
    location: string;
    date: string;
    days: string;
    type: string;
    guests: string;
    image: string;
  };
  popular_destinations: Array<{
    id: string;
    name: string;
    province: string;
    image: string;
  }>;
  recent_activities: Array<{
    id: string;
    title: string;
    subtitle: string;
    date: string;
  }>;
  travel_tips: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
  }>;
}

// Fallback data matching the exact UI design in the screenshot.
// NOTE: only used for sections the backend does not provide yet
// (upcoming trip, destinations, activities, tips).
const fallbackDashboard: DashboardData = {
  full_name: "Sanduni Sathsarani",
  email: "s209bandara@gmail.com",
  role: "Traveler",
  avatar_url: "/images/colombo.jpg",
  stats: {
    total_bookings: 3,
    wishlist_count: 5,
    upcoming_trips: 1,
    travel_points: 250,
  },
  upcoming_trip: {
    title: "Ella Getaway",
    location: "Ella, Badulla District",
    date: "12 Apr 2025 - 16 Apr 2025",
    days: "4 Days",
    type: "Round Trip",
    guests: "2 Adults",
    image: "/images/ella.jpg",
  },
  popular_destinations: [
    { id: "d1", name: "Ella", province: "Central Province", image: "/images/ella.jpg" },
    { id: "d2", name: "Galle", province: "Southern Province", image: "/images/unawatuna.jpg" },
    { id: "d3", name: "Kandy", province: "Central Province", image: "/images/Kandy.jpg" },
    { id: "d4", name: "Sigiriya", province: "Central Province", image: "/images/sigiriya.jpg" },
  ],
  recent_activities: [
    { id: "a1", title: "Hotel Booking Confirmed", subtitle: "Cinnamon Grand Colombo", date: "10 Apr 2025" },
    { id: "a2", title: "Flight Booked", subtitle: "Colombo → Dubai", date: "05 Apr 2025" },
    { id: "a3", title: "Holiday Package Viewed", subtitle: "Maldives - 5 Days", date: "28 Mar 2025" },
  ],
  travel_tips: [
    { id: "t1", title: "Best Time to Visit Sri Lanka", description: "Weather, seasons and what to pack.", image: "/images/sigiriya.jpg" },
    { id: "t2", title: "Top 10 Beaches in Sri Lanka", description: "Crystal clear waters and golden sands.", image: "/images/unawatuna.jpg" },
    { id: "t3", title: "Essential Travel Tips", description: "Make your trip smooth and safe.", image: "/images/ella.jpg" },
  ],
};

async function getDashboardData(token: string): Promise<DashboardData | "unauthorized"> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  try {
    const res = await fetch(`${apiUrl}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    // Token expired or invalid -> caller redirects to /login
    if (res.status === 401) {
      return "unauthorized";
    }

    if (res.ok) {
      const data = await res.json();
      return {
        ...fallbackDashboard,
        full_name: data.full_name || data.name || fallbackDashboard.full_name,
        email: data.email || fallbackDashboard.email,
        role: data.role || fallbackDashboard.role,
        avatar_url: data.avatar_url || fallbackDashboard.avatar_url,
        stats: data.stats || fallbackDashboard.stats,
      };
    }
    return fallbackDashboard;
  } catch (error) {
    console.warn("Backend fetch failed, using fallback dashboard data:", error);
    return fallbackDashboard;
  }
}

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value || cookieStore.get("token")?.value;

  // Not logged in -> login page.
  // (redirect() must stay outside try/catch because it works by throwing.)
  if (!token) {
    redirect("/login");
  }

  const result = await getDashboardData(token);

  // Token expired / invalid -> login page
  if (result === "unauthorized") {
    redirect("/login");
  }

  const data = result;

  return (
    <div className="min-h-screen bg-[#071318] text-gray-100 font-sans flex flex-col justify-between">
      
      {/* Top Header Navbar */}
      <header className="w-full bg-[#0b1920] border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-950 font-serif font-bold text-emerald-400 text-sm">
              SL
            </div>
            <span className="font-serif font-bold text-base tracking-wider text-white">
              Lankara Travels
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-[#11222c] border border-zinc-700/60 rounded-full px-4 py-2 w-96 text-xs text-zinc-300">
            <Search className="w-4 h-4 text-zinc-400 mr-2" />
            <input
              type="text"
              placeholder="Search destinations, hotels, packages..."
              className="bg-transparent focus:outline-none w-full text-white placeholder-zinc-400"
            />
          </div>
        </div>

        {/* Right User Info */}
        <div className="flex items-center gap-4">
          <Bell className="w-5 h-5 text-zinc-300 cursor-pointer hover:text-emerald-400 transition" />
          <Heart className="w-5 h-5 text-zinc-300 cursor-pointer hover:text-rose-400 transition" />
          
          <div className="flex items-center gap-3 pl-4 border-l border-zinc-700">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-emerald-500">
              <Image src={data.avatar_url} alt={data.full_name} fill className="object-cover" />
            </div>
            <div className="hidden sm:block text-left text-xs">
              <p className="font-semibold text-white">{data.full_name}</p>
              <p className="text-[10px] text-zinc-400">{data.role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Body Grid: Sidebar + Dashboard Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-[1600px] mx-auto w-full">
        
        {/* Left Sidebar Navigation */}
        <aside className="hidden lg:block lg:col-span-2 bg-[#0b1920] border-r border-zinc-800 p-6 space-y-2 text-xs">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold transition">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/explore" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-800/60 transition">
            <Compass className="w-4 h-4 text-zinc-400" /> Explore
          </Link>
          <Link href="/hotels" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-800/60 transition">
            <Building2 className="w-4 h-4 text-zinc-400" /> Hotels
          </Link>
          <Link href="/packages" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-800/60 transition">
            <Package className="w-4 h-4 text-zinc-400" /> Holiday Packages
          </Link>
          <Link href="/flights" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-800/60 transition">
            <Plane className="w-4 h-4 text-zinc-400" /> Flights
          </Link>
          <Link href="/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-800/60 transition">
            <CalendarCheck className="w-4 h-4 text-zinc-400" /> Bookings
          </Link>
          <Link href="/planning-a-trip" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-800/60 transition">
            <Compass className="w-4 h-4 text-zinc-400" /> Plan Trip
          </Link>
          <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-800/60 transition">
            <User className="w-4 h-4 text-zinc-400" /> Profile
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:bg-zinc-800/60 transition">
            <Settings className="w-4 h-4 text-zinc-400" /> Settings
          </Link>
        </aside>

        {/* Center & Right Dashboard Workspace */}
        <main className="col-span-1 lg:col-span-10 p-6 lg:p-8 space-y-8 bg-[#09151b]">
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Center Main Area */}
            <div className="xl:col-span-8 space-y-8">
              
              {/* Hero Welcome Banner */}
              <div className="relative w-full h-[220px] rounded-3xl overflow-hidden bg-slate-900 p-8 flex flex-col justify-center">
                <Image src="/images/sigiriya.jpg" alt="Hero Banner" fill className="object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 space-y-2 max-w-lg">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
                    <Sun className="w-4 h-4" /> Good Morning,
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
                    {data.full_name}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-200">
                    Your next adventure is just a plan away!
                  </p>
                  <Link href="/planning-a-trip" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-md mt-2">
                    Explore Sri Lanka →
                  </Link>
                </div>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#0e1f28] p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <div className="text-zinc-400 text-[11px]">Total Bookings</div>
                  <div className="text-2xl font-bold text-white">{data.stats.total_bookings}</div>
                  <div className="text-[10px] text-emerald-400">Past Bookings →</div>
                </div>
                <div className="bg-[#0e1f28] p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <div className="text-zinc-400 text-[11px]">Wishlist</div>
                  <div className="text-2xl font-bold text-white">{data.stats.wishlist_count}</div>
                  <div className="text-[10px] text-rose-400">Saved Destinations →</div>
                </div>
                <div className="bg-[#0e1f28] p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <div className="text-zinc-400 text-[11px]">Upcoming Trips</div>
                  <div className="text-2xl font-bold text-white">{data.stats.upcoming_trips}</div>
                  <div className="text-[10px] text-amber-400">Next Trip: Ella →</div>
                </div>
                <div className="bg-[#0e1f28] p-4 rounded-2xl border border-zinc-800 space-y-1">
                  <div className="text-zinc-400 text-[11px]">Travel Points</div>
                  <div className="text-2xl font-bold text-white">{data.stats.travel_points}</div>
                  <div className="text-[10px] text-sky-400">Earn with bookings →</div>
                </div>
              </div>

              {/* Upcoming Trip Section */}
              <div className="bg-[#0e1f28] p-6 rounded-3xl border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-white text-sm flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-emerald-400" /> Upcoming Trip
                  </h3>
                  <Link href="/bookings" className="text-xs text-emerald-400 hover:underline">View All →</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#11242f] p-4 rounded-2xl border border-zinc-800">
                  <div className="relative sm:col-span-5 h-36 rounded-xl overflow-hidden">
                    <Image src={data.upcoming_trip.image} alt={data.upcoming_trip.title} fill className="object-cover" />
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full">
                      Upcoming
                    </span>
                  </div>
                  <div className="sm:col-span-7 space-y-2">
                    <h4 className="text-base font-serif font-bold text-white">{data.upcoming_trip.title}</h4>
                    <p className="text-xs text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {data.upcoming_trip.location}
                    </p>
                    <p className="text-xs text-zinc-300 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> {data.upcoming_trip.date} ({data.upcoming_trip.days})
                    </p>
                    <div className="flex gap-4 pt-1 text-[11px] text-zinc-400">
                      <span>🏨 {data.upcoming_trip.type}</span>
                      <span>👥 {data.upcoming_trip.guests}</span>
                    </div>
                    <Link href="/bookings" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition mt-2">
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Popular Destinations */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-white text-sm flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" /> Popular Destinations
                  </h3>
                  <Link href="/explore" className="text-xs text-emerald-400 hover:underline">View All →</Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {data.popular_destinations.map((dest) => (
                    <div key={dest.id} className="bg-[#0e1f28] rounded-2xl border border-zinc-800 overflow-hidden group cursor-pointer">
                      <div className="relative h-28 w-full overflow-hidden">
                        <Image src={dest.image} alt={dest.name} fill className="object-cover group-hover:scale-105 transition duration-300" />
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-white text-xs">{dest.name}</h4>
                        <p className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-400" /> {dest.province}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-[#0e1f28] p-6 rounded-3xl border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-white text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-400" /> Recent Activities
                  </h3>
                  <Link href="#" className="text-xs text-emerald-400 hover:underline">View All →</Link>
                </div>

                <div className="space-y-3">
                  {data.recent_activities.map((act) => (
                    <div key={act.id} className="flex items-center justify-between p-3 bg-[#11242f] rounded-xl border border-zinc-800 text-xs">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-white">{act.title}</p>
                        <p className="text-[11px] text-zinc-400">{act.subtitle}</p>
                      </div>
                      <div className="text-[11px] text-zinc-400">{act.date}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Sidebar Area */}
            <div className="xl:col-span-4 space-y-8">
              
              {/* User Mini Profile Card */}
              <div className="bg-[#0e1f28] p-6 rounded-3xl border border-zinc-800 text-center space-y-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-emerald-500">
                  <Image src={data.avatar_url} alt={data.full_name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-white text-base">{data.full_name}</h3>
                  <p className="text-xs text-zinc-400">{data.role}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-center text-xs">
                  <div>
                    <div className="font-bold text-white">{data.stats.total_bookings}</div>
                    <div className="text-[10px] text-zinc-400">Trips</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">{data.stats.wishlist_count}</div>
                    <div className="text-[10px] text-zinc-400">Wishlist</div>
                  </div>
                  <div>
                    <div className="font-bold text-white">{data.stats.travel_points}</div>
                    <div className="text-[10px] text-zinc-400">Points</div>
                  </div>
                </div>
                <div className="bg-[#11242f] p-3 rounded-xl border border-zinc-800 text-xs text-zinc-300 italic">
                  &quot;Collect moments, not things.&quot;
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-[#0e1f28] p-6 rounded-3xl border border-zinc-800 space-y-4">
                <h3 className="font-serif font-bold text-white text-sm flex items-center gap-2">
                  ⚡ Quick Actions
                </h3>
                <div className="space-y-2 text-xs">
                  <Link href="/planning-a-trip" className="flex items-center justify-between p-3 bg-[#11242f] hover:bg-emerald-950/40 rounded-xl transition border border-zinc-800">
                    <span className="flex items-center gap-2 font-medium text-white"><Compass className="w-4 h-4 text-emerald-400" /> Plan a New Trip</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                  <Link href="/hotels" className="flex items-center justify-between p-3 bg-[#11242f] hover:bg-emerald-950/40 rounded-xl transition border border-zinc-800">
                    <span className="flex items-center gap-2 font-medium text-white"><Building2 className="w-4 h-4 text-amber-400" /> Search Hotels</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                  <Link href="/packages" className="flex items-center justify-between p-3 bg-[#11242f] hover:bg-emerald-950/40 rounded-xl transition border border-zinc-800">
                    <span className="flex items-center gap-2 font-medium text-white"><Package className="w-4 h-4 text-sky-400" /> Explore Packages</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                  <Link href="/flights" className="flex items-center justify-between p-3 bg-[#11242f] hover:bg-emerald-950/40 rounded-xl transition border border-zinc-800">
                    <span className="flex items-center gap-2 font-medium text-white"><Plane className="w-4 h-4 text-rose-400" /> Check Flight Status</span>
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </Link>
                </div>
              </div>

              {/* Weather & Sri Lanka Card */}
              <div className="bg-[#0e1f28] rounded-3xl border border-zinc-800 overflow-hidden space-y-4">
                <div className="relative h-44 w-full p-6 flex flex-col justify-end">
                  <Image src="/images/colombo.jpg" alt="Weather" fill className="object-cover opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative z-10 space-y-1">
                    <p className="text-xs text-zinc-300">Colombo, Sri Lanka</p>
                    <div className="flex items-center gap-2">
                      <Sun className="w-6 h-6 text-amber-400" />
                      <span className="text-2xl font-bold text-white">28°C</span>
                    </div>
                    <p className="text-[11px] text-zinc-300">Partly Cloudy</p>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center bg-[#11242f] p-3 rounded-2xl border border-zinc-800 text-xs">
                    <div>
                      <p className="text-[10px] text-zinc-400">Mon</p>
                      <Sun className="w-4 h-4 text-amber-400 mx-auto my-1" />
                      <p className="font-bold text-white">28°</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400">Tue</p>
                      <Sun className="w-4 h-4 text-amber-400 mx-auto my-1" />
                      <p className="font-bold text-white">29°</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-400">Wed</p>
                      <Sun className="w-4 h-4 text-amber-400 mx-auto my-1" />
                      <p className="font-bold text-white">30°</p>
                    </div>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden p-5 bg-slate-900 border border-zinc-800 text-white space-y-2">
                    <Image src="/images/unawatuna.jpg" alt="Discover" fill className="object-cover opacity-30" />
                    <div className="relative z-10 space-y-1">
                      <h4 className="font-serif font-bold text-sm">Discover Sri Lanka with Lankara Travels</h4>
                      <p className="text-[11px] text-zinc-300">Handpicked experiences, trusted services, unforgettable journeys.</p>
                    </div>
                    <Link href="/explore" className="relative z-10 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline pt-1">
                      Explore More →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Travel Tips Section */}
              <div className="bg-[#0e1f28] p-6 rounded-3xl border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-white text-sm flex items-center gap-2">
                    💡 Travel Tips
                  </h3>
                  <Link href="#" className="text-xs text-emerald-400 hover:underline">View All →</Link>
                </div>
                <div className="space-y-3">
                  {data.travel_tips.map((tip) => (
                    <div key={tip.id} className="flex items-center gap-3 p-2 bg-[#11242f] rounded-xl border border-zinc-800">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image src={tip.image} alt={tip.title} fill className="object-cover" />
                      </div>
                      <div className="space-y-0.5 text-xs">
                        <h4 className="font-semibold text-white leading-tight">{tip.title}</h4>
                        <p className="text-[10px] text-zinc-400">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </main>

      </div>

      <Footer />
    </div>
  );
}