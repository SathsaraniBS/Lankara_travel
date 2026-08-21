"use client";

import React, { useState, useEffect } from "react";
import { User, Mail, MapPin, Phone, ShieldCheck, History, Camera, Loader2, CheckCircle2 } from "lucide-react";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
}

interface Booking {
  id: string;
  type: string;
  title: string;
  date: string;
  status: string;
  amount: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/v1/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setProfile(data.user);
          setFullName(data.user.full_name || "");
          setPhone(data.user.phone || "");
          setLocation(data.user.location || "");
          setBookings(data.bookings || []);
        }
      } catch (err) {
        console.warn("Backend API unavailable, using fallback profile state.");
        // Mock data fallback
        const mockUser = {
          id: "usr_101",
          full_name: "Kasun Perera",
          email: "kasun@example.com",
          phone: "+94 77 123 4567",
          location: "Colombo, Sri Lanka",
        };
        setProfile(mockUser);
        setFullName(mockUser.full_name);
        setPhone(mockUser.phone);
        setLocation(mockUser.location);
        setBookings([
          { id: "bk_001", type: "Flight", title: "Colombo (CMB) to Male (MLE)", date: "2026-05-12", status: "Confirmed", amount: 320.00 },
          { id: "bk_002", type: "Hotel", title: "Heritance Kandalama", date: "2026-06-18", status: "Completed", amount: 450.00 },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(false);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/v1/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ full_name: fullName, phone, location }),
      });

      if (res.ok) {
        setSuccessMsg(true);
        setTimeout(() => setSuccessMsg(false), 3000);
      }
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b09] flex items-center justify-center text-emerald-500">
        <Loader2 size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b09] text-white py-12 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 font-bold text-2xl overflow-hidden">
              {profile?.full_name?.charAt(0) || "U"}
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Camera size={20} className="text-white" />
            </div>
          </div>

          <div className="space-y-1 text-center sm:text-left flex-1">
            <h1 className="text-2xl font-extrabold text-zinc-100">{profile?.full_name}</h1>
            <p className="text-xs text-zinc-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail size={14} className="text-emerald-500" /> {profile?.email}
            </p>
            <span className="inline-block mt-2 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Verified Account
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Edit Profile Form */}
          <div className="lg:col-span-2 bg-[#121614] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
              <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                <User size={18} className="text-emerald-500" /> Personal Details
              </h2>
              {successMsg && (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={14} /> Saved Successfully
                </span>
              )}
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#070b09] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Phone Number</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3.5 top-3 text-zinc-500" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#070b09] border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Location</label>
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-3 text-zinc-500" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#070b09] border border-zinc-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-zinc-100 focus:outline-none focus:border-emerald-500 transition"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-xl transition flex items-center gap-2 disabled:opacity-50"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Quick Security & Stats */}
          <div className="space-y-6">
            <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-500" /> Security Overview
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Your account is protected with JWT token authentication and encrypted database sessions.
              </p>
            </div>
          </div>

        </div>

        {/* Booking History Section */}
        <div className="bg-[#121614] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2 border-b border-zinc-800/80 pb-4">
            <History size={18} className="text-emerald-500" /> Recent Bookings
          </h2>

          <div className="space-y-3">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-[#070b09] border border-zinc-800/60 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      {booking.type}
                    </span>
                    <h4 className="text-xs font-bold text-zinc-200">{booking.title}</h4>
                    <p className="text-[10px] text-zinc-500">{booking.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-zinc-100">${booking.amount.toFixed(2)}</span>
                    <p className="text-[10px] text-emerald-400 font-medium">{booking.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-500">No booking history found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}