import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-orange-50 to-cyan-50 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Discover Sri Lanka with{" "}
            <span className="text-orange-500">Lankara Travel</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Flights, hotels, and holiday packages — all in one place.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/flights"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Search Flights
            </Link>
            <Link
              href="/hotels"
              className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold border border-gray-300 hover:border-orange-400 transition"
            >
              Browse Hotels
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-3">✈️</div>
            <h3 className="font-semibold text-lg mb-2">Best Flight Deals</h3>
            <p className="text-gray-500 text-sm">
              Compare prices across airlines and find the best deals for your trip.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-3">🏨</div>
            <h3 className="font-semibold text-lg mb-2">Handpicked Hotels</h3>
            <p className="text-gray-500 text-sm">
              From beach resorts to hill country retreats, find your perfect stay.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-semibold text-lg mb-2">Secure Booking</h3>
            <p className="text-gray-500 text-sm">
              Book with confidence — your data and payments are always protected.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}