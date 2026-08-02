import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-3">
              <span className="text-orange-500">Lankara</span>{" "}
              <span className="text-white">Travel</span>
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Your all-in-one travel booking platform for flights, hotels,
              and holiday packages across Sri Lanka.
            </p>
            <div className="flex gap-3">
              
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/flights" className="hover:text-orange-400 transition">
                  Flights
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="hover:text-orange-400 transition">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-orange-400 transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact-us" className="hover:text-orange-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/planning-a-trip" className="hover:text-orange-400 transition">
                  Planning a Trip
                </Link>
              </li>
              <li>
                <Link href="/article" className="hover:text-orange-400 transition">
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/community-and-reviews"
                  className="hover:text-orange-400 transition"
                >
                  Community &amp; Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-orange-400 shrink-0" />
                <span>Colombo, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>+94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>info@lankaratravel.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          © {currentYear} Lankara Travel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}