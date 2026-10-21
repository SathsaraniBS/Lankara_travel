import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
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
  ChevronRight,
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudFog,
  CloudLightning,
  Clock,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */

// NEXT_PUBLIC_API_URL may end with "/api" (used by the axios client) -> keep only the server origin
const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000")
  .replace(/\/api(\/v1)?\/?$/, "")
  .replace(/\/$/, "");

// FastAPI route: server/routers/dashboard.py  ->  GET /api/dashboard
const DASHBOARD_ENDPOINT = "/api/dashboard";

const PLACEHOLDER_IMAGE = "/images/sigiriya.jpg";
const DEFAULT_AVATAR = "/images/colombo.jpg";

// Weather location (Colombo). Live data from Open-Meteo (free, no API key).
const WEATHER = { label: "Colombo, Sri Lanka", latitude: 6.9271, longitude: 79.8612 };

/* -------------------------------------------------------------------------- */
/*  Types (match DashboardResponse in dashboard.py)                           */
/* -------------------------------------------------------------------------- */

interface TripItem {
  title: string;
  location: string;
  date: string;
  days: string;
  type: string;
  guests: string;
  image: string;
}

interface DestinationItem {
  id: string;
  name: string;
  province: string;
  image: string;
}

interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
}

interface TipItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

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
  upcoming_trip: TripItem | null;
  popular_destinations: DestinationItem[];
  recent_activities: ActivityItem[];
  travel_tips: TipItem[];
}

interface WeatherData {
  current: { temp: number; label: string; Icon: LucideIcon; color: string };
  daily: Array<{ day: string; max: number; Icon: LucideIcon; color: string }>;
}

type DashboardResult =
  | { status: "ok"; data: DashboardData }
  | { status: "unauthorized" }
  | { status: "error" };

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function resolveImage(url: string | null | undefined, fallback = PLACEHOLDER_IMAGE): string {
  if (!url) return fallback;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith("/images/")) return url; // local file in /public/images
  return `${API_URL}${url.startsWith("/") ? "" : "/"}${url}`; // file served by the backend (/static/...)
}

// Remote images skip the Next.js optimizer so no next.config host setup is required.
const isRemote = (src: string) => /^https?:\/\//i.test(src);

function getGreeting(): string {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hour12: false,
      timeZone: "Asia/Colombo",
    }).format(new Date())
  );
  if (hour < 12) return "Good Morning,";
  if (hour < 17) return "Good Afternoon,";
  return "Good Evening,";
}

async function getDashboard(token: string): Promise<DashboardResult> {
  try {
    const res = await fetch(`${API_URL}${DASHBOARD_ENDPOINT}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (res.status === 401) return { status: "unauthorized" };
    if (!res.ok) {
      console.error(`Dashboard: ${DASHBOARD_ENDPOINT} returned ${res.status}`);
      return { status: "error" };
    }

    const raw = await res.json();

    return {
      status: "ok",
      data: {
        full_name: raw.full_name || "Traveler",
        email: raw.email ?? "",
        role: raw.role || "Traveler",
        avatar_url: resolveImage(raw.avatar_url, DEFAULT_AVATAR),
        stats: {
          total_bookings: raw.stats?.total_bookings ?? 0,
          wishlist_count: raw.stats?.wishlist_count ?? 0,
          upcoming_trips: raw.stats?.upcoming_trips ?? 0,
          travel_points: raw.stats?.travel_points ?? 0,
        },
        upcoming_trip: raw.upcoming_trip
          ? {
              title: raw.upcoming_trip.title ?? "",
              location: raw.upcoming_trip.location ?? "",
              date: raw.upcoming_trip.date ?? "",
              days: raw.upcoming_trip.days ?? "",
              type: raw.upcoming_trip.type ?? "",
              guests: raw.upcoming_trip.guests ?? "",
              image: resolveImage(raw.upcoming_trip.image),
            }
          : null,
        popular_destinations: (raw.popular_destinations ?? []).map((d: any) => ({
          id: String(d.id),
          name: d.name ?? "",
          province: d.province ?? "",
          image: resolveImage(d.image),
        })),
        recent_activities: (raw.recent_activities ?? []).map((a: any) => ({
          id: String(a.id),
          title: a.title ?? "",
          subtitle: a.subtitle ?? "",
          date: a.date ?? "",
        })),
        travel_tips: (raw.travel_tips ?? []).map((t: any) => ({
          id: String(t.id),
          title: t.title ?? "",
          description: t.description ?? "",
          image: resolveImage(t.image),
        })),
      },
    };
  } catch (error) {
    console.error("Dashboard: request failed (is the FastAPI server running?)", error);
    return { status: "error" };
  }
}

/* ---- Live weather (Open-Meteo) ---- */

function weatherInfo(code: number): { label: string; Icon: LucideIcon; color: string } {
  if (code === 0) return { label: "Clear Sky", Icon: Sun, color: "text-amber-400" };
  if (code === 1 || code === 2) return { label: "Partly Cloudy", Icon: CloudSun, color: "text-amber-400" };
  if (code === 3) return { label: "Overcast", Icon: Cloud, color: "text-zinc-300" };
  if (code === 45 || code === 48) return { label: "Foggy", Icon: CloudFog, color: "text-zinc-300" };
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
    return { label: "Rain", Icon: CloudRain, color: "text-sky-400" };
  if (code >= 95) return { label: "Thunderstorm", Icon: CloudLightning, color: "text-amber-400" };
  return { label: "Cloudy", Icon: Cloud, color: "text-zinc-300" };
}

async function getWeather(): Promise<WeatherData | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER.latitude}&longitude=${WEATHER.longitude}` +
      `&current=temperature_2m,weather_code&daily=temperature_2m_max,weather_code` +
      `&timezone=Asia%2FColombo&forecast_days=3`;

    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (!res.ok) return null;
    const json = await res.json();

    const current = weatherInfo(json.current.weather_code);

    return {
      current: { temp: Math.round(json.current.temperature_2m), ...current },
      daily: json.daily.time.map((date: string, i: number) => ({
        day: new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: "UTC",
        }),
        max: Math.round(json.daily.temperature_2m_max[i]),
        ...weatherInfo(json.daily.weather_code[i]),
      })),
    };
  } catch (error) {
    console.error("Dashboard: weather request failed", error);
    return null;
  }
}

function DashboardUnavailable() {
  return (
    <div className="min-h-screen bg-[#071318] text-gray-100 font-sans flex flex-col justify-between">
      <div className="max-w-md mx-auto px-6 pt-40 text-center space-y-3">
        <h1 className="text-xl font-serif font-bold text-white">Dashboard unavailable</h1>
        <p className="text-xs text-zinc-400">
          We couldn&apos;t load your dashboard right now. Please try again in a moment.
        </p>
        <Link
          href="/dashboard"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
        >
          Retry
        </Link>
      </div>
      <Footer />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value || cookieStore.get("token")?.value;

  // Not logged in -> login page
  if (!token) {
    redirect("/login");
  }

  const [result, weather] = await Promise.all([getDashboard(token), getWeather()]);

  // Token expired / invalid -> login page
  if (result.status === "unauthorized") {
    redirect("/login");
  }

  // Backend down or route missing -> never show fake data
  if (result.status === "error") {
    return <DashboardUnavailable />;
  }

  const data = result.data;
  const greeting = getGreeting();
  const trip = data.upcoming_trip;
  const WeatherIcon = weather ? weather.current.Icon : Sun;

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
              <Image
                src={data.avatar_url}
                alt={data.full_name}
                fill
                sizes="36px"
                unoptimized={isRemote(data.avatar_url)}
                className="object-cover"
              />
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
                <Image src="/images/sigiriya.jpg" alt="Hero Banner" fill sizes="100vw" className="object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 space-y-2 max-w-lg">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
                    <Sun className="w-4 h-4" /> {greeting}
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
                  <div className="text-[10px] text-amber-400">
                    {trip ? `Next Trip: ${trip.location.split(",")[0] || trip.title} →` : "No upcoming trips"}
                  </div>
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

                {trip ? (
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-[#11242f] p-4 rounded-2xl border border-zinc-800">
                    <div className="relative sm:col-span-5 h-36 rounded-xl overflow-hidden">
                      <Image
                        src={trip.image}
                        alt={trip.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 40vw"
                        unoptimized={isRemote(trip.image)}
                        className="object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full">
                        Upcoming
                      </span>
                    </div>
                    <div className="sm:col-span-7 space-y-2">
                      <h4 className="text-base font-serif font-bold text-white">{trip.title}</h4>
                      {trip.location && (
                        <p className="text-xs text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {trip.location}
                        </p>
                      )}
                      <p className="text-xs text-zinc-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" /> {trip.date}
                        {trip.days && ` (${trip.days})`}
                      </p>
                      {(trip.type || trip.guests) && (
                        <div className="flex gap-4 pt-1 text-[11px] text-zinc-400">
                          {trip.type && <span>🏨 {trip.type}</span>}
                          {trip.guests && <span>👥 {trip.guests}</span>}
                        </div>
                      )}
                      <Link href="/bookings" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition mt-2">
                        View Details →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#11242f] p-4 rounded-2xl border border-zinc-800 text-xs text-zinc-400">
                    You have no upcoming trips.{" "}
                    <Link href="/planning-a-trip" className="text-emerald-400 font-semibold hover:underline">
                      Plan a new trip →
                    </Link>
                  </div>
                )}
              </div>

              {/* Popular Destinations */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-white text-sm flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-400" /> Popular Destinations
                  </h3>
                  <Link href="/explore" className="text-xs text-emerald-400 hover:underline">View All →</Link>
                </div>

                {data.popular_destinations.length === 0 ? (
                  <p className="text-xs text-zinc-400">No destinations available right now.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {data.popular_destinations.map((dest) => (
                      <div key={dest.id} className="bg-[#0e1f28] rounded-2xl border border-zinc-800 overflow-hidden group cursor-pointer">
                        <div className="relative h-28 w-full overflow-hidden">
                          <Image
                            src={dest.image}
                            alt={dest.name}
                            fill
                            sizes="(max-width: 640px) 50vw, 20vw"
                            unoptimized={isRemote(dest.image)}
                            className="object-cover group-hover:scale-105 transition duration-300"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-semibold text-white text-xs">{dest.name}</h4>
                          {dest.province && (
                            <p className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-emerald-400" /> {dest.province}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Activities */}
              <div className="bg-[#0e1f28] p-6 rounded-3xl border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-white text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-400" /> Recent Activities
                  </h3>
                  <Link href="#" className="text-xs text-emerald-400 hover:underline">View All →</Link>
                </div>

                {data.recent_activities.length === 0 ? (
                  <p className="text-xs text-zinc-400">No recent activity yet.</p>
                ) : (
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
                )}
              </div>

            </div>

            {/* Right Sidebar Area */}
            <div className="xl:col-span-4 space-y-8">
              
              {/* User Mini Profile Card */}
              <div className="bg-[#0e1f28] p-6 rounded-3xl border border-zinc-800 text-center space-y-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-emerald-500">
                  <Image
                    src={data.avatar_url}
                    alt={data.full_name}
                    fill
                    sizes="80px"
                    unoptimized={isRemote(data.avatar_url)}
                    className="object-cover"
                  />
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
                  <Image src="/images/colombo.jpg" alt="Weather" fill sizes="(max-width: 1280px) 100vw, 33vw" className="object-cover opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative z-10 space-y-1">
                    <p className="text-xs text-zinc-300">{WEATHER.label}</p>
                    {weather ? (
                      <>
                        <div className="flex items-center gap-2">
                          <WeatherIcon className={`w-6 h-6 ${weather.current.color}`} />
                          <span className="text-2xl font-bold text-white">{weather.current.temp}°C</span>
                        </div>
                        <p className="text-[11px] text-zinc-300">{weather.current.label}</p>
                      </>
                    ) : (
                      <p className="text-[11px] text-zinc-300">Weather unavailable right now</p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-3">
                  {weather && (
                    <div className="grid grid-cols-3 gap-2 text-center bg-[#11242f] p-3 rounded-2xl border border-zinc-800 text-xs">
                      {weather.daily.map((d) => (
                        <div key={d.day}>
                          <p className="text-[10px] text-zinc-400">{d.day}</p>
                          <d.Icon className={`w-4 h-4 ${d.color} mx-auto my-1`} />
                          <p className="font-bold text-white">{d.max}°</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="relative rounded-2xl overflow-hidden p-5 bg-slate-900 border border-zinc-800 text-white space-y-2">
                    <Image src="/images/unawatuna.jpg" alt="Discover" fill sizes="(max-width: 1280px) 100vw, 33vw" className="object-cover opacity-30" />
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
                  <Link href="/article" className="text-xs text-emerald-400 hover:underline">View All →</Link>
                </div>

                {data.travel_tips.length === 0 ? (
                  <p className="text-xs text-zinc-400">No travel tips available yet.</p>
                ) : (
                  <div className="space-y-3">
                    {data.travel_tips.map((tip) => (
                      <div key={tip.id} className="flex items-center gap-3 p-2 bg-[#11242f] rounded-xl border border-zinc-800">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={tip.image}
                            alt={tip.title}
                            fill
                            sizes="48px"
                            unoptimized={isRemote(tip.image)}
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-0.5 text-xs">
                          <h4 className="font-semibold text-white leading-tight">{tip.title}</h4>
                          <p className="text-[10px] text-zinc-400">{tip.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>

        </main>

      </div>

      <Footer />
    </div>
  );
}