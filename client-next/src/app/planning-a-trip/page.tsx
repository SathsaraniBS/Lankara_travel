"use client";

import React, { useState } from "react";
import { Calendar, MapPin, Users, DollarSign, Sparkles } from "lucide-react";

export default function PlanningATripPage() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState("Medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Trip plan generated for ${days} days in ${destination || "Sri Lanka"}!`);
  };

  const topDestinations = [
    { title: "Ella", desc: "Hiking, tea plantations, and scenic train views.", days: "2-3 Days" },
    { title: "Sigiriya & Dambulla", desc: "Ancient rock fortress and cave temples.", days: "1-2 Days" },
    { title: "Mirissa", desc: "Whale watching, surfing, and golden beaches.", days: "3-4 Days" },
    { title: "Kandy", desc: "Cultural heart of Sri Lanka & Temple of the Tooth.", days: "2 Days" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-16 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
            Plan Your Dream Trip
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Customize your ideal Sri Lankan itinerary based on your preferences, budget, and travel duration.
          </p>
        </div>

        {/* Trip Planner Form & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Planner Form */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
              <Sparkles size={24} /> Customized Itinerary Generator
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-emerald-400" /> Preferred Region / City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ella, Mirissa, Kandy"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <Calendar size={18} className="text-emerald-400" /> Duration (Days)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <Users size={18} className="text-emerald-400" /> Travelers
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                    <DollarSign size={18} className="text-emerald-400" /> Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition"
                  >
                    <option value="Budget">Budget</option>
                    <option value="Medium">Medium</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg transition duration-300"
              >
                Create Trip Plan
              </button>
            </form>
          </div>

          {/* Suggested Destinations */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold text-slate-100">Popular Travel Routes</h2>
            
            <div className="space-y-4">
              {topDestinations.map((item, index) => (
                <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-emerald-400">{item.title}</h3>
                    <span className="text-xs text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {item.days}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}