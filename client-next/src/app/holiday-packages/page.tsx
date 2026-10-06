import React from "react";
import PackagesClient, { PackageItem } from "./PackagesClient";

const FASTAPI_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function getPackages(): Promise<PackageItem[]> {
  try {
    const res = await fetch(`${FASTAPI_URL}/api/packages`, {
      next: { revalidate: 60 }, // තත්පර 60 කට වරක් Cache එක Refresh වේ
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch packages: ${res.statusText}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.results || [];
  } catch (error) {
    console.error("Error fetching packages from FastAPI:", error);
    return [];
  }
}

export default async function HolidayPackagesPage() {
  const packages = await getPackages();

  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-800 font-sans flex flex-col justify-between">
      <PackagesClient initialPackages={packages} />
    </div>
  );
}