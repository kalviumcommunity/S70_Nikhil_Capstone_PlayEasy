import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // For navigation

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 text-green-600 text-2xl font-bold">
            <Link to="/">Play<span className="text-black">Easy</span></Link>
          </div>

          {/* Menu */}
          <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
            <Link to="/" className="hover:text-green-600 transition duration-200">Home</Link>
            <Link to="/booking" className="hover:text-green-600 transition duration-200">Book</Link>
            <Link to="#" className="hover:text-green-600 transition duration-200">Nets</Link>
            <Link to="#" className="hover:text-green-600 transition duration-200">Pricing</Link>
            <Link to="#" className="hover:text-green-600 transition duration-200">Contact</Link>
            <Link to="/booking" className="hover:text-green-600 transition duration-200">Book</Link>

          </div>

          {/* Login/Signup (go to /auth page with tab switch) */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate("/auth")}
              className="text-gray-700 hover:text-green-600 font-medium"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
