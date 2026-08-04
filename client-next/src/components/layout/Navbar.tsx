"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);
  const handleClick = () => setClick(!click);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about-us", label: "About Us" },
    { to: "/contact-us", label: "Contact Us" },
    { to: "/planning-a-trip", label: "Planning a Trip" },
    { to: "/article", label: "Article" },
    { to: "/community-and-reviews", label: "Community and Reviews" },
  ];

  return (
    <nav className="bg-transparent h-20 flex items-center sticky top-0 z-50">
      <div className="flex items-center justify-between h-20 max-w-[1500px] w-full mx-auto px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" onClick={closeMobileMenu}>
          <Image src="/images/logo.png" alt="logo" width={70} height={70} className="h-[70px] w-auto rounded-full" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-6 list-none items-center">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                href={link.to}
                className="text-white px-4 py-2 hover:border-b-4 hover:border-[#79a7c5] hover:text-[#79a7c5] transition-all duration-300"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Dropdown */}
        {click && (
          <ul className="flex md:hidden flex-col w-full h-[90vh] absolute top-20 left-0 bg-[#242222] z-10 list-none">
            {navLinks.map((link) => (
              <li key={link.to} className="w-full">
                <Link
                  href={link.to}
                  className="text-white block text-center p-8 w-full hover:bg-white hover:text-[#242424] transition-all duration-300"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/sign-in"
                className="block text-center my-8 mx-auto rounded w-4/5 text-2xl bg-transparent text-white py-3.5 px-5 border border-white transition-all duration-300 hover:bg-white hover:text-[#242424]"
                onClick={closeMobileMenu}
              >
                Sign in
              </Link>
            </li>
          </ul>
        )}

        {/* Right side buttons + hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden md:flex gap-2">
            <Link
              href="/login"
              className="text-center border-2 border-white text-white font-semibold py-2 px-5 hover:bg-red-600 hover:border-red-600 transition duration-300"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="rounded-[2px] px-5 py-2 flex justify-center items-center bg-transparent text-white border border-white transition-all duration-500 hover:bg-white hover:text-[#222]"
            >
              Register
            </Link>
          </div>

          <button className="md:hidden text-3xl" onClick={handleClick} aria-label="Toggle menu">
            {click ? <X className="text-white w-8 h-8" /> : <Menu className="text-white w-8 h-8" />}
          </button>
        </div>
      </div>
    </nav>
  );
}