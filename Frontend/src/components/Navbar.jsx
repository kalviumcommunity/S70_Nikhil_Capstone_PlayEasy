import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/booking", label: "Browse Grounds" },
  ];

  if (isAuthenticated) {
    navLinks.push({ to: "/my-bookings", label: "My Bookings" });
    navLinks.push({ to: "/manage-grounds", label: "Manage Grounds" });
  }

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <Link to="/" className="text-green-600 text-2xl font-bold tracking-tight flex items-center gap-1.5">
            <span className="text-xl">🏏</span>
            Play<span className="text-gray-900">Easy</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm transition duration-200 ${
                  isActive(link.to)
                    ? "bg-green-50 text-green-700 font-semibold"
                    : "hover:text-green-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 hover:border-green-300 hover:bg-green-50 transition"
                  title="View Profile"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.name.split(" ")[0]}
                  </span>
                </button>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-500 hover:text-red-600 transition flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/auth")}
                  className="text-sm text-gray-700 hover:text-green-600 font-medium transition px-3 py-1.5"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="text-sm bg-green-600 text-white px-5 py-2.5 rounded-full font-medium hover:bg-green-700 hover:shadow-md transition active:scale-95"
                >
                  Sign Up Free
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
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg font-medium transition ${
                  isActive(link.to)
                    ? "bg-green-50 text-green-700 font-semibold"
                    : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-gray-100 my-1" />
            {isAuthenticated ? (
              <>
                <p className="text-sm text-gray-500 px-4">Signed in as <strong>{user.name}</strong></p>
                <button
                  onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                  className="w-full text-sm border border-green-300 text-green-700 py-2 rounded-full hover:bg-green-50 transition mt-1"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-sm border border-red-300 text-red-500 py-2 rounded-full hover:bg-red-50 transition mt-1"
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
                  Sign Up Free
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
