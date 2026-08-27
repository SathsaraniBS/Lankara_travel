import React from "react";
import { Compass, Heart, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "About Us | Lankara Travel",
  description: "Learn more about our mission and story.",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-16 px-6 sm:px-12">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
          About Our Journey
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We are passionate about uncovering the beauty of Sri Lanka, connecting travelers with unforgettable local experiences and hidden gems.
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-400">
            <Compass size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-200">Local Insights</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Discover destinations through authentic guides curated by experts and locals who know the island best.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-400">
            <Heart size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-200">Passionate Community</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Join thousands of travelers sharing stories, recommendations, and memorable experiences across the island.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
          <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-400">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-200">Trusted Guidance</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Plan your trips stress-free with reliable recommendations, updated info, and clear safety tips.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-4xl mx-auto mt-20 border-t border-slate-800 pt-12 grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
        <div>
          <h4 className="text-3xl sm:text-4xl font-extrabold text-emerald-400">500+</h4>
          <p className="text-slate-400 text-sm mt-1">Destinations Covered</p>
        </div>
        <div>
          <h4 className="text-3xl sm:text-4xl font-extrabold text-emerald-400">10k+</h4>
          <p className="text-slate-400 text-sm mt-1">Happy Travelers</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-3xl sm:text-4xl font-extrabold text-emerald-400">100%</h4>
          <p className="text-slate-400 text-sm mt-1">Local Insights</p>
        </div>
      </section>
    </main>
  );
}