"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [click, setClick] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // LocalStorage හි access_token පරීක්ෂා කිරීම
    const activeToken = localStorage.getItem("access_token");
    setToken(activeToken);
  }, []);

  const closeMobileMenu = () => setClick(false);
  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    closeMobileMenu();
    router.push("/login");
  };

  // "Planning a Trip" click කළ විට Login තත්ත්වය පරීක්ෂා කිරීම
  const handlePlanningTripClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMobileMenu();

    const activeToken = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

    if (activeToken) {
      router.push("/planning-a-trip");
    } else {
      router.push("/login");
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/aboutus", label: "About Us" },
    { to: "/contact-us", label: "Contact Us" },
    { to: "/planning-a-trip", label: "Planning a Trip", isProtected: true },
    { to: "/article", label: "Article" },
    { to: "/community-and-reviews", label: "Community and Reviews" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-20 flex items-center z-50 bg-gradient-to-b from-black/70 via-black/40 to-transparent backdrop-blur-[2px]">
      <div className="flex items-center justify-between h-20 max-w-[1500px] w-full mx-auto px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" onClick={closeMobileMenu}>
          <Image src="/images/logo.png" alt="logo" width={70} height={70} className="h-[70px] w-auto rounded-full" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-6 list-none items-center">
          {navLinks.map((link) => (
            <li key={link.to}>
              {link.isProtected ? (
                <button
                  onClick={handlePlanningTripClick}
                  className="text-white font-medium px-3 py-2 hover:border-b-2 hover:border-[#79a7c5] hover:text-[#79a7c5] transition-all duration-300 drop-shadow-md cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  href={link.to}
                  className="text-white font-medium px-3 py-2 hover:border-b-2 hover:border-[#79a7c5] hover:text-[#79a7c5] transition-all duration-300 drop-shadow-md"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Dropdown */}
        {click && (
          <ul className="flex md:hidden flex-col w-full h-[90vh] absolute top-20 left-0 bg-[#242222]/95 backdrop-blur-md z-10 list-none">
            {navLinks.map((link) => (
              <li key={link.to} className="w-full">
                {link.isProtected ? (
                  <button
                    onClick={handlePlanningTripClick}
                    className="text-white block text-center p-6 w-full hover:bg-white hover:text-[#242424] transition-all duration-300 font-medium"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    href={link.to}
                    className="text-white block text-center p-6 w-full hover:bg-white hover:text-[#242424] transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            {token ? (
              <>
                <li className="w-full">
                  <Link
                    href="/profile"
                    className="text-white block text-center p-6 w-full hover:bg-white hover:text-[#242424] transition-all duration-300"
                    onClick={closeMobileMenu}
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block text-center my-6 mx-auto rounded w-4/5 text-xl bg-transparent text-white py-3 px-5 border border-white transition-all duration-300 hover:bg-white hover:text-[#242424]"
                  >
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block text-center my-6 mx-auto rounded w-4/5 text-xl bg-transparent text-white py-3 px-5 border border-white transition-all duration-300 hover:bg-white hover:text-[#242424]"
                  onClick={closeMobileMenu}
                >
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        )}

        {/* Right side buttons + hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex gap-3">
            {token ? (
              <>
                <Link
                  href="/profile"
                  className="text-center border border-white/80 text-white font-semibold py-2 px-5 rounded hover:bg-white hover:text-black transition duration-300 flex items-center gap-2"
                >
                  <User size={18} /> My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded px-5 py-2 flex justify-center items-center bg-sky-500 text-white font-semibold transition-all duration-300 hover:bg-sky-600"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-center border border-white/80 text-white font-semibold py-2 px-5 rounded hover:bg-white hover:text-black transition duration-300"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded px-5 py-2 flex justify-center items-center bg-sky-500 text-white font-semibold transition-all duration-300 hover:bg-sky-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-3xl" onClick={handleClick} aria-label="Toggle menu">
            {click ? <X className="text-white w-8 h-8" /> : <Menu className="text-white w-8 h-8" />}
          </button>
        </div>
      </div>
    </nav>
  );
}