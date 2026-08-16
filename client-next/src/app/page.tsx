import HeroSection from "@/components/HeroSection";
import Link from "next/link";
import { Plane, Hotel, ShieldCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      <HeroSection />

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Flight Deals */}
          <div className="text-center p-6 flex flex-col items-center">
            <div className="p-4 bg-sky-500/10 rounded-2xl text-sky-400 mb-4">
              <Plane size={36} />
            </div>
            <h3 className="font-semibold text-white text-lg mb-2">Best Flight Deals</h3>
            <p className="text-slate-300 text-sm">
              Compare prices across airlines and find the best deals for your trip.
            </p>
          </div>

          {/* Handpicked Hotels Card (Clickable Route to /bookings) */}
          <Link 
            href="/bookings" 
            className="text-center p-6 flex flex-col items-center rounded-2xl transition duration-300 hover:bg-slate-800/50 hover:scale-105 group cursor-pointer"
          >
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 mb-4 group-hover:bg-emerald-500/20 transition">
              <Hotel size={36} />
            </div>
            <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-emerald-400 transition">
              Handpicked Hotels
            </h3>
            <p className="text-slate-300 text-sm">
              From beach resorts to hill country retreats, find your perfect stay.
            </p>
          </Link>

          {/* Secure Booking */}
          <div className="text-center p-6 flex flex-col items-center">
            <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-400 mb-4">
              <ShieldCheck size={36} />
            </div>
            <h3 className="font-semibold text-white text-lg mb-2">Secure Booking</h3>
            <p className="text-slate-300 text-sm">
              Book with confidence — your data and payments are always protected.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}