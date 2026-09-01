'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Navigation, Car, ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';

export default function RoadTripPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [vehicleType, setVehicleType] = useState('SUV');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Road trip booked with ${vehicleType} starting on ${selectedDate}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-16 px-5 max-w-[1500px] mx-auto">
      {/* Banner / Header Section */}
      <div className="relative w-full h-[400px] rounded-3xl overflow-hidden mb-10 border border-slate-800">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop"
          alt="Scenic Coastal & Mountain Road Trip"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-8">
          <span className="text-emerald-400 font-semibold tracking-wide text-sm uppercase mb-2 flex items-center gap-2">
            <MapPin size={16} /> Southern Express & Central Highlands Highway
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white">
            Ultimate Cross-Island Coastal & Hill Country Road Trip
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Details & Highlights */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <Navigation className="text-emerald-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Total Distance</p>
                <p className="font-semibold text-sm">650 km</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-emerald-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Recommended</p>
                <p className="font-semibold text-sm">7 Days Route</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Car className="text-emerald-400" size={24} />
              <div>
                <p className="text-xs text-slate-400">Vehicle Options</p>
                <p className="font-semibold text-sm">Self-Drive / Private Driver</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-slate-800 pb-2">Road Trip Overview</h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              Experience the ultimate freedom on the open road. Cruise along scenic coastal highways, 
              winding mountain passes, and historic tea plantations. Complete with GPS route planning, 
              24/7 roadside assistance, and flexible stay points along Sri Lanka's finest scenic roads.
            </p>
          </div>

          {/* Included Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-slate-800 pb-2">Package Includes</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Premium Rental Vehicle with Unlimited Mileage
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Pre-programmed Custom GPS Itinerary
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Comprehensive Comprehensive Auto Insurance
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> 24/7 Roadside Assistance & Vehicle Exchange
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Curated Scenic Rest Stops & Pit-Stop Map
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl h-fit space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs text-slate-400 uppercase font-semibold">Starting Price</span>
            <div className="text-3xl font-black text-emerald-400 mt-1">
              $350 <span className="text-sm font-normal text-slate-400">/ trip package</span>
            </div>
          </div>

          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Select Vehicle Type
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="SUV">Luxury 4WD SUV ($350)</option>
                <option value="Convertible">Open-Top Convertible ($450)</option>
                <option value="Van">7-Seater Passenger Van ($400)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Select Start Date
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
                <span>Selected Vehicle:</span>
                <span className="font-bold text-white">{vehicleType}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-xl transition duration-300 cursor-pointer text-sm"
            >
              Book Road Trip Now
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}