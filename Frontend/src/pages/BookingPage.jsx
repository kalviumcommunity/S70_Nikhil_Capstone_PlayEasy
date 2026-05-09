// src/pages/BookingPage.jsx
import React, { useState } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import GroundCard from "../components/GroundCard";
import BookingDetails from "../components/BookingDetails";
import ground1 from "../assets/ground1.jpg";
import ground2 from "../assets/ground2.jpg";

const grounds = [
  {
    name: "Cricket Central Arena",
    location: "Mumbai Central, Mumbai",
    price: 2500,
    rating: 4.8,
    image: ground1,
  },
  {
    name: "Sports Hub Nets",
    location: "Andheri West, Mumbai",
    price: 850,
    rating: 4.4,
    image: ground2,
  },
];

const BookingPage = () => {
  const [selectedGround, setSelectedGround] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-4">
      <h1 className="text-2xl font-bold mb-1">Book your Cricket Ground</h1>
      <p className="text-sm text-gray-500 mb-6">Home &gt; Booking</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="col-span-1">
          <FiltersSidebar />
        </div>

        {/* Ground Cards + Booking Details */}
        <div className="col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ground Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {grounds.map((ground, index) => (
              <GroundCard
                key={index}
                ground={ground}
                onBook={() => setSelectedGround(ground)}
              />
            ))}
          </div>

          {/* Booking Details */}
          <div className="lg:col-span-1">
            {selectedGround ? (
              <BookingDetails ground={selectedGround} />
            ) : (
              <div className="text-gray-500 text-center mt-8">
                Select a ground to view booking details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;

