"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";

export default function TripPlannerForm() {
  const router = useRouter();

  const [fromLocation, setFromLocation] = useState("Colombo");
  const [toLocation, setToLocation] = useState("Sigiriya");
  const [startDate, setStartDate] = useState("2025-04-12");
  const [endDate, setEndDate] = useState("2025-04-16");
  const [travelType, setTravelType] = useState("Family Trip");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      from: fromLocation,
      to: toLocation,
      startDate,
      endDate,
      type: travelType,
    });

    router.push(`/trip-results?${queryParams.toString()}`);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
      <div>
        <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
          🗺️ Plan Your Trip
        </h2>
        <p className="text-xs text-gray-500">
          Choose your preferences and let us help you create the perfect itinerary.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* FROM */}
        <div className="md:col-span-3 bg-gray-50/70 p-3 rounded-2xl border border-gray-100 flex items-center gap-3">
          <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              FROM
            </label>
            <input
              type="text"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none"
              placeholder="Starting Location"
              required
            />
          </div>
        </div>

        {/* TO */}
        <div className="md:col-span-3 bg-gray-50/70 p-3 rounded-2xl border border-gray-100 flex items-center gap-3">
          <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              TO
            </label>
            <input
              type="text"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none"
              placeholder="Destination Location"
              required
            />
          </div>
        </div>

        {/* TRAVEL DATES */}
        <div className="md:col-span-3 bg-gray-50/70 p-3 rounded-2xl border border-gray-100 flex items-center gap-3">
          <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              TRAVEL DATES
            </label>
            <div className="flex items-center gap-1 text-xs font-semibold text-gray-800">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-xs font-semibold focus:outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* TRAVEL TYPE */}
        <div className="md:col-span-2 bg-gray-50/70 p-3 rounded-2xl border border-gray-100 flex items-center gap-3">
          <Users className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="w-full">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              TRAVEL TYPE
            </label>
            <select
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
              className="w-full bg-transparent text-xs font-semibold text-gray-800 focus:outline-none cursor-pointer"
            >
              <option value="Solo Trip">Solo Trip</option>
              <option value="Couples Trip">Couples Trip</option>
              <option value="Family Trip">Family Trip</option>
              <option value="Friends Trip">Friends Trip</option>
            </select>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="md:col-span-1 flex justify-center">
          <button
            type="submit"
            className="w-full h-12 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl flex items-center justify-center transition shadow-md"
            title="Generate Itinerary"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}