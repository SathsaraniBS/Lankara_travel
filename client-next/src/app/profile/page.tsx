'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, MapPin, Compass, LogOut, Settings, CreditCard } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
        Loading profile...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-16 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-black text-slate-100">Account Settings & Bookings</h1>
          <p className="text-xs text-slate-400 mt-1">Manage your personal details and view your travel itineraries</p>
        </div>

        {/* User Info Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 font-black text-2xl flex items-center justify-center">
              U
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Traveler User</h2>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <Mail size={13} className="text-emerald-400" /> user@example.com
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('access_token');
              router.push('/login');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>

        {/* Booking.com Style - Bookings & Trips Section */}
        <div id="trips" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Compass size={18} className="text-emerald-400" /> My Bookings & Itineraries
            </h3>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-semibold border border-emerald-500/20">
              2 Active Trips
            </span>
          </div>

          {/* Booked Items List */}
          <div className="space-y-3">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                    Confirmed
                  </span>
                  <h4 className="font-bold text-slate-100 text-sm">Ella Hill Country Train Tour</h4>
                </div>
                <p className="text-xs text-slate-400">Duration: 3 Days · 2 Travelers · Medium Budget</p>
              </div>
              <button className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs font-medium text-emerald-400 rounded-lg transition cursor-pointer self-start sm:self-auto">
                View Details
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded">
                    Completed
                  </span>
                  <h4 className="font-bold text-slate-100 text-sm">Sigiriya Ancient Fortress Exploration</h4>
                </div>
                <p className="text-xs text-slate-400">Duration: 2 Days · 1 Traveler · Luxury Tier</p>
              </div>
              <button className="px-4 py-2 bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs font-medium text-emerald-400 rounded-lg transition cursor-pointer self-start sm:self-auto">
                View Receipt
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}