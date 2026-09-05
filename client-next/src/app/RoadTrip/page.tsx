'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function RoadTripPage() {

  return (
      <section 
      id="destinations"
      className="relative min-h-screen w-full flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat px-4 py-16 text-white scroll-mt-20"
      style={{
        backgroundImage: "url('/images/road-trip.png')",
      }}
    ></section>
      

  );
}