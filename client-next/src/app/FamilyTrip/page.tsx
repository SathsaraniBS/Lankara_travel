'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Users, HeartHandshake, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function FamilyTripPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [guestCount, setGuestCount] = useState('4');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Family Trip package booked for ${guestCount} guests starting on ${selectedDate}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-5 max-w-[1500px] mx-auto">
      {/* Hero / Banner Section */}
      <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-10 border border-slate-800">
        <Image
          src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1600&auto=format&fit=crop"
          alt="Family Getaway & Beach Resort"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-8">
          <span className="text-emerald-400 font-semibold tracking-wide text-sm uppercase mb-2 flex items-center gap-2">
            <MapPin size={16} /> Coastal Resorts & Cultural Heritage Parks
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Unforgettable Family Vacation & Luxury Resort Getaway
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Details & Highlights */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <Calendar className="text-emerald-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="font-semibold text-sm">5 to 10 Days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-emerald-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Group Size</p>
                <p className="font-semibold text-sm">3 - 8 Family Members</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <HeartHandshake className="text-emerald-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Pace</p>
                <p className="font-semibold text-sm">Relaxed & Kid-Friendly</p>
              </div>
            </div>
          </div>

          {/* Trip Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-slate-800 pb-2">Family Vacation Overview</h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              Create lifelong memories with custom-crafted family itineraries designed for all ages. 
              Enjoy child-friendly beach resorts, gentle wildlife encounters, interactive cultural tours, 
              and spacious private transport with dedicated family coordinators.
            </p>
          </div>

          {/* Included Amenities */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-slate-800 pb-2">Family Perks & Inclusions</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Kid-Friendly Beachfront Resort Suites
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Private AC Van with Child Safety Seats
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Guided Turtle Conservation & Botanical Tours
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> All Breakfast Buffets & Family Dinner Passes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> 24/7 On-Call Medical & Assistance Support
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Booking Box */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl h-fit space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs text-slate-400 uppercase font-semibold">Starting Price</span>
            <div className="text-3xl font-black text-emerald-400 mt-1">
              $520 <span className="text-sm font-normal text-slate-400">/ family package</span>
            </div>
          </div>

          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Number of Family Members
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="3">3 Members (Small Family)</option>
                <option value="4">4 Members (Standard Family)</option>
                <option value="6">6 Members (Extended Family)</option>
                <option value="8">8+ Members (Large Group)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Select Departure Date
              </label>
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-sm text-slate-400">
              <div className="flex justify-between">
                <span>Selected Guests:</span>
                <span className="font-bold text-white">{guestCount} Guests</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-xl transition duration-300 cursor-pointer text-sm"
            >
              Book Family Vacation Now
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}