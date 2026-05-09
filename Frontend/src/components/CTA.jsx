import React from "react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-gray-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl px-8 py-14 text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Play? 🏏
          </h2>
          <p className="text-green-100 text-base max-w-lg mx-auto mb-8">
            Join over 50,000 cricketers who book their grounds with PlayEasy. Instant confirmation, no hassle.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => navigate("/booking")}
              className="bg-white text-green-700 font-bold px-8 py-3 rounded-full hover:bg-green-50 transition shadow"
            >
              Book a Ground
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
