import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Mail, Compass, LogOut } from "lucide-react";
import Link from "next/link";

// Interfaces matching your FastAPI models & PostgreSQL database schema
interface Booking {
  id: string;
  title: string;
  duration: string;
  travelers: number;
  tier: string;
  status: "Confirmed" | "Completed" | "Pending" | "Cancelled";
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bookings: Booking[];
}

// Helper function to fetch profile data from FastAPI server-side
async function getUserProfile(token: string): Promise<UserProfile | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  try {
    const res = await fetch(`${apiUrl}/api/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // SSR: Ensure real-time user profile fetching
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch profile from FastAPI backend:", error);
    return null;
  }
}

export default async function ProfilePage() {
  // Read JWT authentication token directly from cookies on the server
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value || cookieStore.get("token")?.value;

  // If unauthenticated, redirect to login page server-side before rendering
  if (!token) {
    redirect("/login");
  }

  // Fetch authenticated user data from FastAPI backend
  const user = await getUserProfile(token);

  // If JWT is invalid or expired
  if (!user) {
    redirect("/login");
  }

  // Active bookings count filter
  const activeTrips = user.bookings?.filter((b) => b.status === "Confirmed").length || 0;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-16 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-black text-slate-100">Account Settings & Bookings</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your personal details and view your travel itineraries
          </p>
        </div>

        {/* User Info Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 font-black text-2xl flex items-center justify-center uppercase">
              {user.name ? user.name.charAt(0) : "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">{user.name || "Traveler User"}</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <Mail size={13} className="text-emerald-400" /> {user.email}
              </p>
            </div>
          </div>

          {/* Server-side / Route-based Logout Action */}
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-semibold rounded-xl transition cursor-pointer"
            >
              <LogOut size={14} /> Sign out
            </button>
          </form>
        </div>

        {/* Bookings & Itineraries Section */}
        <div id="trips" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Compass size={18} className="text-emerald-400" /> My Bookings & Itineraries
            </h3>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-semibold border border-emerald-500/20">
              {activeTrips} Active {activeTrips === 1 ? "Trip" : "Trips"}
            </span>
          </div>

          {/* Booked Items List */}
          <div className="space-y-3">
            {user.bookings && user.bookings.length > 0 ? (
              user.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          booking.status === "Confirmed"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : booking.status === "Completed"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {booking.status}
                      </span>
                      <h4 className="font-bold text-slate-100 text-sm">{booking.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400">
                      Duration: {booking.duration} · {booking.travelers} {booking.travelers === 1 ? "Traveler" : "Travelers"} · {booking.tier}
                    </p>
                  </div>
                  <Link
                    href={`/bookings/${booking.id}`}
                    className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs font-medium text-emerald-400 rounded-lg transition cursor-pointer self-start sm:self-auto text-center"
                  >
                    {booking.status === "Completed" ? "View Receipt" : "View Details"}
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                No bookings found yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}