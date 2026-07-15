import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);
  const handleClick = () => setClick(!click);

  return (
    <nav className="bg-transparent h-20 flex justify-center items-center sticky top-0 z-[999] text-2xl font-bold">
      <div className="relative flex justify-center items-center h-20 max-w-[1500px] w-full">
        {/* Logo */}
        <Link
          to="/"
          className="text-white ml-5 cursor-pointer text-3xl flex items-center"
          onClick={closeMobileMenu}
        >
          <img src="/images/logo.png" alt="logo" className="h-[70px] rounded-full" />
        </Link>

        {/* Hamburger icon - mobile only */}
        <div
          className="hidden max-[960px]:block absolute top-0 right-0 -translate-x-full translate-y-[60%] text-3xl cursor-pointer"
          onClick={handleClick}
        >
          <i
            className={
              click
                ? "fas fa-times text-white max-[960px]:text-[2rem]"
                : "fas fa-bars text-white"
            }
          ></i>
        </div>

        {/* Nav menu */}
        <ul
          className={`grid grid-cols-6 gap-2.5 list-none text-center w-[60vw] justify-center mr-8
          max-[960px]:flex max-[960px]:flex-col max-[960px]:w-full max-[960px]:h-[90vh]
          max-[960px]:absolute max-[960px]:top-20 max-[960px]:opacity-100
          max-[960px]:transition-all max-[960px]:duration-500
          ${click
            ? "max-[960px]:left-0 max-[960px]:bg-[#242222] max-[960px]:z-10"
            : "max-[960px]:left-[-100%]"}`}
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
          <li>
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

        {/* Desktop-only buttons */}
        <div className="hidden max-[960px]:!hidden lg:flex gap-2">
          <Button buttonStyle="btn--outline" to="/sign-in">SIGN IN</Button>
          <Button buttonStyle="btn--outline" to="/sign-up">Register</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;