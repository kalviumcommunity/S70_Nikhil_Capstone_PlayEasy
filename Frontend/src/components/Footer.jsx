import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 md:px-12 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand Section */}
          <div>
            <h2 className="text-xl font-bold flex items-center gap-1.5 mb-3">
              <span>🏏</span>
              <span className="text-green-400">Play</span>Easy
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Book cricket grounds and practice nets with ease. India's #1 platform for cricketers.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              {[
                { href: "#", label: "Twitter/X", icon: "𝕏" },
                { href: "#", label: "Instagram", icon: "📷" },
                { href: "#", label: "LinkedIn", icon: "in" },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center text-sm font-bold transition duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-green-400 transition">Home</Link></li>
              <li><Link to="/booking" className="hover:text-green-400 transition">Browse Grounds</Link></li>
              <li><Link to="/my-bookings" className="hover:text-green-400 transition">My Bookings</Link></li>
              <li><Link to="/auth" className="hover:text-green-400 transition">Sign Up</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Help Centre</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Terms &amp; Conditions</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-base font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">Get the latest ground listings and exclusive offers.</p>
            <div className="flex items-center bg-gray-800 rounded-xl overflow-hidden border border-gray-700 focus-within:border-green-500 transition">
              <input
                type="email"
                placeholder="your@email.com"
                className="p-2.5 px-4 flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <button className="bg-green-600 hover:bg-green-700 transition px-4 py-2.5 text-white text-sm font-semibold">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-2">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <p>© {currentYear} PlayEasy. All rights reserved.</p>
          <p className="text-xs">Made with ❤️ for cricketers across India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
