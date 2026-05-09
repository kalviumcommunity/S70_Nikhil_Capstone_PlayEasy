import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/booking", label: "Book" },
    { to: "#nets", label: "Nets" },
    { to: "#pricing", label: "Pricing" },
    { to: "#contact", label: "Contact" },
  ];

  if (isAuthenticated) {
    navLinks.push({ to: "/my-bookings", label: "My Bookings" });
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="text-green-600 text-2xl font-bold tracking-tight">
            Play<span className="text-gray-900">Easy</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="hover:text-green-600 transition duration-200 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm font-medium text-gray-700">
                  👋 Hi, <span className="text-green-600">{user.name.split(" ")[0]}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm border border-gray-300 text-gray-700 px-4 py-1.5 rounded-full hover:border-red-400 hover:text-red-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/auth")}
                  className="text-sm text-gray-700 hover:text-green-600 font-medium transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="text-sm bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition shadow-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-green-600 py-1 transition"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-gray-100" />
            {isAuthenticated ? (
              <>
                <p className="text-sm text-gray-500">Signed in as <strong>{user.name}</strong></p>
                <button
                  onClick={handleLogout}
                  className="w-full text-sm border border-red-300 text-red-500 py-2 rounded-full hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { navigate("/auth"); setMenuOpen(false); }}
                  className="w-full text-sm border border-green-600 text-green-600 py-2 rounded-full hover:bg-green-50 transition"
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate("/auth"); setMenuOpen(false); }}
                  className="w-full text-sm bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
