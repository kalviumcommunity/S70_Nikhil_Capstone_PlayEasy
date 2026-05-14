import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";

const Footer = () => {
  const { isAuthenticated } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Socials */}
          <div className="md:col-span-1">
            <Link to="/" className="text-white text-2xl font-bold tracking-tight flex items-center gap-1.5 mb-4">
              <span className="text-xl">🏏</span>
              Play<span className="text-green-500">Easy</span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Book cricket grounds and practice nets with ease. India's #1 platform for cricketers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-green-500 transition-colors">Home</Link></li>
              <li><Link to="/booking" className="hover:text-green-500 transition-colors">Browse Grounds</Link></li>
              {isAuthenticated ? (
                <li><Link to="/my-bookings" className="hover:text-green-500 transition-colors">My Bookings</Link></li>
              ) : (
                <li><Link to="/auth" className="hover:text-green-500 transition-colors">Sign Up</Link></li>
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-green-500 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Help Centre</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Cancellation Policy</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-green-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4 text-base">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest ground listings and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-gray-800 text-sm text-white px-4 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2.5 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
                <span className="sr-only sm:not-sr-only">Join</span>
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-3">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {currentYear} PlayEasy. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="flex items-center gap-1">Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
