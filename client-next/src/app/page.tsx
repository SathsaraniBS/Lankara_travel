import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />

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