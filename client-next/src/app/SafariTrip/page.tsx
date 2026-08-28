'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Clock, Users, ShieldCheck, Calendar, CheckCircle2 } from 'lucide-react';

export default function SafariTripPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [travelers, setTravelers] = useState(1);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking requested for ${travelers} traveler(s) on ${selectedDate}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-5 max-w-[1500px] mx-auto">
      {/* Banner / Header Section */}
      <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-10 border border-slate-800">
        <Image
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1600&auto=format&fit=crop"
          alt="Wild Safari Adventure"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-8">
          <span className="text-sky-400 font-semibold tracking-wide text-sm uppercase mb-2 flex items-center gap-2">
            <MapPin size={16} /> Yala & Udawalawe National Parks
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Wild Safari Adventure
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Details & Highlights */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <Clock className="text-sky-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Duration</p>
                <p className="font-semibold text-sm">Full Day (10 Hrs)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-sky-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Group Size</p>
                <p className="font-semibold text-sm">1 - 6 People</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-sky-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Guide</p>
                <p className="font-semibold text-sm">Expert Naturalist</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-slate-800 pb-2">Trip Overview</h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              Experience Sri Lanka’s ultimate wildlife safari adventure. Explore dense forests and open grasslands 
              home to leopards, Asian elephants, sloth bears, and exotic bird species. Our custom 4x4 safari 
              jeeps ensure maximum safety and uninterrupted views of the national park.
            </p>
          </div>

          {/* Included Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-slate-800 pb-2">What’s Included</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Private 4x4 Safari Jeep Transfer
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> National Park Entrance Fees
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> English Speaking Driver/Guide
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Complimentary Bottled Water & Snacks
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Hotel Pickup & Drop-off
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl h-fit space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs text-slate-400 uppercase font-semibold">Price per person</span>
            <div className="text-3xl font-black text-sky-400 mt-1">
              $120 <span className="text-sm font-normal text-slate-400">/ traveler</span>
            </div>
          </div>

          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Select Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Number of Travelers
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="border-t border-slate-800 pt-4 space-y-2 text-sm text-slate-400">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold text-white">${120 * travelers}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-xl transition duration-300 cursor-pointer text-sm"
            >
              Book Safari Now
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}