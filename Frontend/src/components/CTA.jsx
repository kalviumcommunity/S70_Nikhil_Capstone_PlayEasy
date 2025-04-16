// src/components/CTA.jsx
import React from 'react';

const CTA = () => {
  return (
    <div className="bg-green-600 text-white py-12 px-6 text-center rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-4">Book Your Cricket Ground Now!</h2>
      <p className="mb-6 text-xl">
        Don't miss the chance to play at the best cricket grounds in your area. Secure your spot today!
      </p>
      <a
        href="/booking"
        className="bg-white text-green-600 py-2 px-6 rounded-md font-semibold hover:bg-gray-200 transition duration-300"
      >
        Book Now
      </a>
    </div>
  );
};

export default CTA;
