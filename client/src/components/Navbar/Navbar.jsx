import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);
  const handleClick = () => setClick(!click);

  return (
    <nav className="bg-transparent h-20 flex items-center sticky top-0 z-[999] text-2xl font-bold">
      <div className="flex items-center justify-between h-20 max-w-[1500px] w-full mx-auto px-5">
        {/* Logo - always pinned to the left */}
        <div className="flex items-right gap-2 shrink-0">
        <Link
          to="/"
          className="text-white cursor-pointer text-3xl flex items-center shrink-0"
          onClick={closeMobileMenu}
        >
          <img src="/images/logo.png" alt="logo" className="h-[70px] rounded-full" />
        </Link>
        </div>

        {/* Nav menu - centered on desktop, full-screen dropdown on mobile */}
        <ul
          className={`flex gap-6 list-none items-center whitespace-nowrap
          max-[960px]:flex-col max-[960px]:w-full max-[960px]:h-[90vh]
          max-[960px]:absolute max-[960px]:top-20 max-[960px]:left-0
          max-[960px]:whitespace-normal max-[960px]:transition-all max-[960px]:duration-500
          ${click
            ? "max-[960px]:flex max-[960px]:bg-[#242222] max-[960px]:z-10"
            : "max-[960px]:hidden"}`}
        >
          <li className="h-20">
            <Link
              to="/"
              className="text-white flex items-center no-underline px-4 py-2 h-full
              hover:border-b-4 hover:border-[#79a7c5] hover:text-[#79a7c5] transition-all duration-300
              max-[960px]:text-center max-[960px]:p-8 max-[960px]:w-full max-[960px]:table
              max-[960px]:hover:bg-white max-[960px]:hover:text-[#242424] max-[960px]:hover:border-none max-[960px]:hover:rounded-none"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li className="h-20">
            <Link
              to="/about-us"
              className="text-white flex items-center no-underline px-4 py-2 h-full
              hover:border-b-4 hover:border-[#79a7c5] hover:text-[#79a7c5] transition-all duration-300
              max-[960px]:text-center max-[960px]:p-8 max-[960px]:w-full max-[960px]:table
              max-[960px]:hover:bg-white max-[960px]:hover:text-[#242424] max-[960px]:hover:border-none max-[960px]:hover:rounded-none"
              onClick={closeMobileMenu}
            >
              About Us
            </Link>
          </li>
          <li className="h-20">
            <Link
              to="/contact-us"
              className="text-white flex items-center no-underline px-4 py-2 h-full
              hover:border-b-4 hover:border-[#79a7c5] hover:text-[#79a7c5] transition-all duration-300
              max-[960px]:text-center max-[960px]:p-8 max-[960px]:w-full max-[960px]:table
              max-[960px]:hover:bg-white max-[960px]:hover:text-[#242424] max-[960px]:hover:border-none max-[960px]:hover:rounded-none"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
          </li>
          <li className="h-20">
            <Link
              to="/planning-a-trip"
              className="text-white flex items-center no-underline px-4 py-2 h-full
              hover:border-b-4 hover:border-[#79a7c5] hover:text-[#79a7c5] transition-all duration-300
              max-[960px]:text-center max-[960px]:p-8 max-[960px]:w-full max-[960px]:table
              max-[960px]:hover:bg-white max-[960px]:hover:text-[#242424] max-[960px]:hover:border-none max-[960px]:hover:rounded-none"
              onClick={closeMobileMenu}
            >
              Planning a Trip
            </Link>
          </li>
          <li className="h-20">
            <Link
              to="/article"
              className="text-white flex items-center no-underline px-4 py-2 h-full
              hover:border-b-4 hover:border-[#79a7c5] hover:text-[#79a7c5] transition-all duration-300
              max-[960px]:text-center max-[960px]:p-8 max-[960px]:w-full max-[960px]:table
              max-[960px]:hover:bg-white max-[960px]:hover:text-[#242424] max-[960px]:hover:border-none max-[960px]:hover:rounded-none"
              onClick={closeMobileMenu}
            >
              Article
            </Link>
          </li>
          <li className="h-20">
            <Link
              to="/community-and-reviews"
              className="text-white flex items-center no-underline px-4 py-2 h-full
              hover:border-b-4 hover:border-[#79a7c5] hover:text-[#79a7c5] transition-all duration-300
              max-[960px]:text-center max-[960px]:p-8 max-[960px]:w-full max-[960px]:table
              max-[960px]:hover:bg-white max-[960px]:hover:text-[#242424] max-[960px]:hover:border-none max-[960px]:hover:rounded-none"
              onClick={closeMobileMenu}
            >
              Community and Reviews
            </Link>
          </li>

          {/* Mobile-only sign in link */}
          <li>
            <Link
              to="/sign-in"
              className="hidden max-[960px]:block max-[960px]:text-center max-[960px]:my-8 max-[960px]:mx-auto
              max-[960px]:rounded max-[960px]:w-4/5 max-[960px]:no-underline max-[960px]:text-2xl
              max-[960px]:bg-transparent max-[960px]:text-white max-[960px]:py-3.5 max-[960px]:px-5
              max-[960px]:border max-[960px]:border-white max-[960px]:transition-all max-[960px]:duration-300
              max-[960px]:hover:bg-white max-[960px]:hover:text-[#242424]"
              onClick={closeMobileMenu}
            >
              Sign in
            </Link>
          </li>
        </ul>

        {/* Right side: buttons (desktop) + hamburger (mobile) - always pinned to the right */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex gap-2 max-[960px]:hidden">
            <Button buttonStyle="btn--outline" to="/sign-in">SIGN IN</Button>
            <Button buttonStyle="btn--outline" to="/sign-up">Register</Button>
          </div>

          <div
            className="hidden max-[960px]:block text-3xl cursor-pointer"
            onClick={handleClick}
          >
            <i className={click ? "fas fa-times text-white" : "fas fa-bars text-white"}></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;