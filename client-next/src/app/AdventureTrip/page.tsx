"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Heart,
  User,
  Compass,
  MapPin,
  Star,
  Footprints,
  Ship,
  Trees,
  Waves,
  Globe,
  Binoculars,
  ArrowLeft,
} from "lucide-react";

interface AdventureCard {
  id: string;
  title: string;
  location: string;
  rating: number;
  price: number;
  category: string;
  image: string;
}

const categories = [
  { id: "hiking", label: "Hiking", icon: Footprints },
  { id: "rafting", label: "Rafting", icon: Ship },
  { id: "safari", label: "Safari", icon: Binoculars },
  { id: "surfing", label: "Surfing", icon: Waves },
  { id: "culture", label: "Culture", icon: Globe },
  { id: "wildlife", label: "Wildlife", icon: Trees },
];

const adventureItems: AdventureCard[] = [
  {
    id: "1",
    title: "Sigiriya Rock",
    location: "Sigiriya Rock",
    rating: 4.8,
    price: 750,
    category: "hiking",
    image: "/images/sigiriya.jpg",
  },
  {
    id: "2",
    title: "Ella Tea Fields",
    location: "Ella Tea Fields",
    rating: 4.8,
    price: 750,
    category: "hiking",
    image: "/images/ella.jpg",
  },
  {
    id: "3",
    title: "Yala Safari",
    location: "Yala Safari",
    rating: 4.8,
    price: 750,
    category: "safari",
    image: "/images/safari-trip.jpg",
  },
  {
    id: "4",
    title: "Kitulgala Rafting",
    location: "Kitulgala",
    rating: 4.9,
    price: 680,
    category: "rafting",
    image: "/images/adventures_trips.jpg",
  },
  {
    id: "5",
    title: "Arugam Bay Surf",
    location: "Arugam Bay",
    rating: 4.7,
    price: 620,
    category: "surfing",
    image: "/images/Trincomalee.jpg",
  },
  {
    id: "6",
    title: "Kandy Cultural Tour",
    location: "Kandy",
    rating: 4.8,
    price: 550,
    category: "culture",
    image: "/images/Kandy.jpg",
  },
];

export default function AdventureTripPage() {
  

 

  return (
    <div className="min-h-screen bg-[#111417] text-zinc-100 flex flex-col items-center p-4 sm:p-6 md:p-8 ">
      <div className="w-full bg-white">
        
       
                 
              
            
          
        
      </div>  

    </div>
  );
}