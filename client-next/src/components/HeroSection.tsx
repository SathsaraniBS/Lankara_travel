import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.2)] relative">
      <video
        src="/videos/246462_small.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full fixed -z-10 top-0 left-0"
      />

      <h1 className="text-white text-[50px] -mt-[100px] md:text-[70px] md:-mt-[150px] lg:text-[100px] lg:-mt-[100px] text-center font-bold">
        Ceylon Compass
      </h1>

      <h3
        className="mt-2 text-white text-[25px] md:text-[32px]"
        style={{
          fontFamily:
            "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
        }}
      >
        PLAN YOUR NEXT TRIP
      </h3>

      <div className="mt-8">
        <Link
          href="/planning-a-trip"
          className="inline-block px-8 py-3 text-lg font-semibold text-white border-2 border-white rounded-md transition-all duration-300 hover:bg-white hover:text-gray-900"
        >
          Planning a Trip
        </Link>
      </div>
    </div>
  );
}