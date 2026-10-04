import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Compass,
  Heart,
  Star,
  Bookmark,
  Settings,
  Mail,
  MapPin,
  Edit2,
  Upload,
  Calendar,
  Send,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Footer from "@/components/layout/Footer";

// Data Models matching FastAPI & PostgreSQL schema
interface Trip {
  id: string;
  title: string;
  location: string;
  date: string;
  status: "Completed" | "Planned" | "Cancelled";
  image: string;
}

interface FavoriteDestination {
  id: string;
  name: string;
  image: string;
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  bio?: string;
  role?: string;
  avatar_url?: string;
  stats: {
    trips_planned: number;
    destinations_visited: number;
    reviews_written: number;
    favorite_places: number;
  };
  recent_trips: Trip[];
  favorites: FavoriteDestination[];
}

// Fallback data when API returns null or empty
const fallbackProfile: UserProfile = {
  id: "usr-1",
  full_name: "Sanduni Sathsarani",
  email: "sanduni.sathsarani@example.com",
  phone: "+94 71 234 5678",
  location: "Colombo, Sri Lanka",
  bio: "Traveling is not just about places, it's about the people, culture and stories that stay with you forever.",
  role: "Traveler",
  avatar_url: "/images/colombo.jpg",
  stats: {
    trips_planned: 12,
    destinations_visited: 8,
    reviews_written: 5,
    favorite_places: 32,
  },
  recent_trips: [
    {
      id: "t1",
      title: "Cultural Triangle Tour",
      location: "Sigiriya",
      date: "12 Apr 2025 - 16 Apr 2025",
      status: "Completed",
      image: "/images/sigiriya.jpg",
    },
    {
      id: "t2",
      title: "Beach Getaway",
      location: "Mirissa",
      date: "5 Mar 2025 - 8 Mar 2025",
      status: "Completed",
      image: "/images/unawatuna.jpg",
    },
    {
      id: "t3",
      title: "Hill Country Adventure",
      location: "Ella",
      date: "10 Jan 2025 - 22 Jan 2025",
      status: "Completed",
      image: "/images/ella.jpg",
    },
    {
      id: "t4",
      title: "City Explorer",
      location: "Colombo",
      date: "10 Dec 2024 - 12 Dec 2024",
      status: "Completed",
      image: "/images/colombo.jpg",
    },
  ],
  favorites: [
    { id: "f1", name: "Sigiriya", image: "/images/sigiriya.jpg" },
    { id: "f2", name: "Ella", image: "/images/ella.jpg" },
    { id: "f3", name: "Mirissa", image: "/images/unawatuna.jpg" },
    { id: "f4", name: "Kandy", image: "/images/Kandy.jpg" },
  ],
};

// SSR Server-side Fetch function
async function getUserProfile(token: string): Promise<UserProfile> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  try {
    const res = await fetch(`${apiUrl}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      return { ...fallbackProfile, ...data };
    }
    return fallbackProfile;
  } catch (error) {
    console.warn("Backend error, using local fallback profile UI:", error);
    return fallbackProfile;
  }
}

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value || cookieStore.get("token")?.value;

  // Optional: Redirect to login if token is missing (Uncomment if strict auth needed)
  // if (!token) {
  //   redirect("/login");
  // }

  const profile = token ? await getUserProfile(token) : fallbackProfile;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-gray-800 font-sans flex flex-col justify-between">
      <div>
        {/* Banner Hero Section */}
        <section className="relative w-full h-[280px] sm:h-[320px] bg-slate-900 overflow-hidden">
          <Image
            src="/images/sigiriya.jpg"
            alt="Profile Banner"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto h-full px-6 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-amber-400 text-xs font-medium uppercase tracking-widest flex items-center gap-1 mb-1">
                  👋 Welcome Back,
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">
                  {profile.full_name}
                </h1>
                <p className="text-gray-200 text-xs sm:text-sm mt-2 font-serif italic">
                  Keep exploring, keep creating memories!
                </p>
              </div>

              <div className="hidden md:block text-right text-amber-300 font-serif italic text-lg leading-snug">
                <p>Sri Lanka is always a</p>
                <p>good idea ♡</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Profile Layout */}
        <main className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-16 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sidebar Menu */}
            <div className="lg:col-span-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-1">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-semibold text-xs transition"
              >
                <User className="w-4 h-4 text-emerald-700" /> Profile
              </Link>
              <Link
                href="#trips"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 text-xs font-medium transition"
              >
                <Compass className="w-4 h-4 text-gray-400" /> My Trips
              </Link>
              <Link
                href="#favorites"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 text-xs font-medium transition"
              >
                <Heart className="w-4 h-4 text-gray-400" /> Favorites
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 text-xs font-medium transition"
              >
                <Star className="w-4 h-4 text-gray-400" /> Reviews
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 text-xs font-medium transition"
              >
                <Bookmark className="w-4 h-4 text-gray-400" /> Saved Places
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 text-xs font-medium transition"
              >
                <Settings className="w-4 h-4 text-gray-400" /> Settings
              </Link>

              {/* Decorative Card */}
              <div className="pt-6">
                <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 text-center space-y-2">
                  <span className="font-serif italic text-emerald-900 text-xs font-medium block">
                    Explore Sri Lanka ♡
                  </span>
                </div>
              </div>
            </div>

            {/* Middle & Right Content */}
            <div className="lg:col-span-9 space-y-8">
              
              {/* Top Row: User Card & Travel Stats */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* User Main Details */}
                <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-emerald-600">
                    <Image
                      src={profile.avatar_url || "/images/colombo.jpg"}
                      alt={profile.full_name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left flex-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h2 className="text-xl font-serif font-bold text-gray-900">
                        {profile.full_name}
                      </h2>
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                        {profile.role || "Traveler"}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 flex items-center justify-center sm:justify-start gap-1">
                      <Mail className="w-3.5 h-3.5 text-emerald-700" />
                      {profile.email}
                    </p>

                    <p className="text-xs text-gray-500 flex items-center justify-center sm:justify-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      {profile.location || "Colombo, Sri Lanka"}
                    </p>

                    <p className="text-xs text-gray-600 italic pt-1 border-t border-gray-100 leading-relaxed">
                      &quot;{profile.bio}&quot;
                    </p>
                  </div>
                </div>

                {/* Travel Stats Grid */}
                <div className="md:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="font-serif font-bold text-gray-900 text-sm flex items-center gap-2">
                    📊 Travel Stats
                  </h3>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50/80">
                      <Compass className="w-5 h-5 text-emerald-800 shrink-0" />
                      <div>
                        <div className="text-lg font-bold text-gray-900 leading-tight">
                          {profile.stats.trips_planned}
                        </div>
                        <div className="text-[10px] text-gray-500">Trips Planned</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50/80">
                      <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                      <div>
                        <div className="text-lg font-bold text-gray-900 leading-tight">
                          {profile.stats.destinations_visited}
                        </div>
                        <div className="text-[10px] text-gray-500">Destinations Visited</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50/80">
                      <Star className="w-5 h-5 text-amber-400 shrink-0" />
                      <div>
                        <div className="text-lg font-bold text-gray-900 leading-tight">
                          {profile.stats.reviews_written}
                        </div>
                        <div className="text-[10px] text-gray-500">Reviews Written</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50/80">
                      <Heart className="w-5 h-5 text-rose-500 shrink-0" />
                      <div>
                        <div className="text-lg font-bold text-gray-900 leading-tight">
                          {profile.stats.favorite_places}
                        </div>
                        <div className="text-[10px] text-gray-500">Favorite Places</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile & Photo Upload Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Edit Profile Form Card */}
                <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <h3 className="font-serif font-bold text-gray-900 text-sm flex items-center gap-2">
                        <Edit2 className="w-4 h-4 text-emerald-800" />
                        Edit Profile
                      </h3>
                      <p className="text-[11px] text-gray-400">Update your personal information and profile details.</p>
                    </div>
                    <button className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs rounded-lg transition flex items-center gap-1">
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="text-gray-500 font-medium">Full Name</label>
                      <input
                        type="text"
                        defaultValue={profile.full_name}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-500 font-medium">Email Address</label>
                      <input
                        type="email"
                        defaultValue={profile.email}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-500 font-medium">Phone Number</label>
                      <input
                        type="text"
                        defaultValue={profile.phone}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-500 font-medium">Location</label>
                      <input
                        type="text"
                        defaultValue={profile.location}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-gray-500 font-medium">Bio</label>
                      <textarea
                        rows={2}
                        defaultValue={profile.bio}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2.5 text-gray-800 focus:outline-none focus:border-emerald-600 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Add Photo Card */}
                <div className="md:col-span-4 relative rounded-2xl overflow-hidden min-h-[220px] bg-slate-900 p-6 text-white flex flex-col justify-between">
                  <Image
                    src="/images/sigiriya.jpg"
                    alt="Add Photo"
                    fill
                    className="object-cover opacity-30"
                  />
                  <div className="relative z-10 space-y-1">
                    <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" /> Add a profile photo
                    </span>
                    <p className="text-xs text-gray-200 leading-relaxed">
                      Show the world your travel spirit! Upload a photo and let others know who you are.
                    </p>
                  </div>

                  <button className="relative z-10 w-fit px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition flex items-center gap-1.5 shadow-sm mt-4">
                    Upload Photo →
                  </button>
                </div>
              </div>

              {/* Recent Trips Section */}
              <div id="trips" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-gray-900 text-lg flex items-center gap-2">
                      <Compass className="w-5 h-5 text-emerald-800" /> Recent Trips
                    </h3>
                    <p className="text-xs text-gray-500">Your latest travel adventures with Lankara Travels.</p>
                  </div>
                  <Link
                    href="/planning-a-trip"
                    className="text-xs text-emerald-800 font-semibold hover:underline flex items-center gap-1"
                  >
                    View All Trips →
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {profile.recent_trips.map((trip) => (
                    <div
                      key={trip.id}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition group"
                    >
                      <div className="relative h-32 w-full overflow-hidden">
                        <Image
                          src={trip.image}
                          alt={trip.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <div className="p-3 space-y-1.5">
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                          <MapPin className="w-3 h-3 text-emerald-700" />
                          <span>{trip.location}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-xs leading-snug">{trip.title}</h4>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {trip.date}
                        </p>
                        <div className="pt-2">
                          <span className="bg-emerald-50 text-emerald-800 text-[9px] font-semibold px-2 py-0.5 rounded">
                            {trip.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Favorites & Quick Links Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Favorite Destinations */}
                <div id="favorites" className="md:col-span-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <div>
                      <h3 className="font-serif font-bold text-gray-900 text-sm flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-500" /> Favorite Destinations
                      </h3>
                      <p className="text-[10px] text-gray-400">Places you love</p>
                    </div>
                    <Link href="/destinations" className="text-[10px] text-emerald-800 font-semibold hover:underline">
                      View All →
                    </Link>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {profile.favorites.map((fav) => (
                      <div key={fav.id} className="text-center space-y-1 group cursor-pointer">
                        <div className="relative h-16 w-full rounded-xl overflow-hidden border border-gray-100">
                          <Image
                            src={fav.image}
                            alt={fav.name}
                            fill
                            className="object-cover group-hover:scale-105 transition"
                          />
                        </div>
                        <p className="text-[10px] font-semibold text-gray-800">{fav.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="md:col-span-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <div className="pb-2 border-b border-gray-100">
                    <h3 className="font-serif font-bold text-gray-900 text-sm flex items-center gap-2">
                      <Send className="w-4 h-4 text-emerald-800" /> Quick Links
                    </h3>
                    <p className="text-[10px] text-gray-400">Get quick access to your account options</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <Link
                      href="#trips"
                      className="p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition flex items-center justify-between group border border-gray-100"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 text-xs">My Trips</p>
                        <p className="text-[10px] text-gray-400">View booked trips</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition" />
                    </Link>

                    <Link
                      href="#favorites"
                      className="p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition flex items-center justify-between group border border-gray-100"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 text-xs">Favorites</p>
                        <p className="text-[10px] text-gray-400">Saved plans</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition" />
                    </Link>

                    <Link
                      href="#"
                      className="p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition flex items-center justify-between group border border-gray-100"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 text-xs">Reviews</p>
                        <p className="text-[10px] text-gray-400">Your travel reviews</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition" />
                    </Link>

                    <Link
                      href="#"
                      className="p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition flex items-center justify-between group border border-gray-100"
                    >
                      <div>
                        <p className="font-semibold text-gray-900 text-xs">Settings</p>
                        <p className="text-[10px] text-gray-400">Account preferences</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Plan Banner */}
              <div className="relative rounded-2xl overflow-hidden p-6 text-white bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Image
                  src="/images/unawatuna.jpg"
                  alt="CTA Banner"
                  fill
                  className="object-cover opacity-25"
                />
                <div className="relative z-10 space-y-1">
                  <h4 className="text-xl font-serif font-bold">Let&apos;s Plan Your Next Adventure</h4>
                  <p className="text-xs text-gray-300">
                    Discover new places, experience amazing cultures and create memories that last a lifetime.
                  </p>
                </div>
                <Link
                  href="/planning-a-trip"
                  className="relative z-10 bg-amber-400 hover:bg-amber-500 text-gray-900 text-xs font-semibold px-5 py-2.5 rounded-full transition shadow-md shrink-0"
                >
                  Plan My Trip →
                </Link>
              </div>

            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}