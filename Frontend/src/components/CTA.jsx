// src/components/CTA.jsx
import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="bg-green-600 text-white py-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to Play?</h2>
      <p className="mb-6">Book your cricket ground or net with ease!</p>
      
      <Link to="/booking">
        <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Book a Ground
        </button>
      </Link>
    </div>
  );
};

export default CTA;
