'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Users, Clock, ShieldCheck, CheckCircle2, Bus } from 'lucide-react';

export default function GroupTripPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [groupSize, setGroupSize] = useState(5);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Group trip reservation request submitted for ${groupSize} members on ${selectedDate}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-5 max-w-[1500px] mx-auto">
      {/* Banner / Header Section */}
      <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-10 border border-slate-800">
        <Image
          src="https://images.unsplash.com/photo-1528543606781-2f6e6857f318?q=80&w=1600&auto=format&fit=crop"
          alt="Group Travel & Expedition"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-8">
          <span className="text-cyan-400 font-semibold tracking-wide text-sm uppercase mb-2 flex items-center gap-2">
            <MapPin size={16} /> Bentota Beach, Galle & Ella Scenic Route
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Island Group Adventure & Beach Retreat
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Details & Highlights */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <Clock className="text-cyan-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="font-semibold text-sm">5 Days / 4 Nights</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-cyan-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Group Capacity</p>
                <p className="font-semibold text-sm">5 - 30 People</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bus className="text-cyan-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Transport</p>
                <p className="font-semibold text-sm">Private Luxury Coach</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-slate-800 pb-2">Trip Overview</h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              Gather your friends, colleagues, or family for an unforgettable group vacation across Sri Lanka. 
              Enjoy custom beach bonfires, private guided tours, luxury group transport, and exclusive resort stays 
              designed for seamless group coordination and maximum fun.
            </p>
          </div>

          {/* Included Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-slate-800 pb-2">What’s Included</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" /> Dedicated AC Tour Bus & Private Driver
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" /> Full-Time Tour Coordinator & Guide
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" /> 4 Nights Luxury Beach Villa / Hotel Stay
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" /> Beach Bonfire & BBQ Night Included
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" /> Group Discounts on Local Water Sports
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl h-fit space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs text-slate-400 uppercase font-semibold">Price per person</span>
            <div className="text-3xl font-black text-cyan-400 mt-1">
              $120 <span className="text-sm font-normal text-slate-400">/ traveler</span>
            </div>
          </div>

          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Select Departure Date
              </label>
              <input
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Group Size (Min 5)
              </label>
              <input
                type="number"
                min={5}
                max={50}
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-sm text-slate-400">
              <div className="flex justify-between">
                <span>Estimated Total:</span>
                <span className="font-bold text-white">${120 * groupSize}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 px-6 rounded-xl transition duration-300 cursor-pointer text-sm"
            >
              Book Group Trip
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}