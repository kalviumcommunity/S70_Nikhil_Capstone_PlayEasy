import React from "react";
import FilterSidebar from "../components/FilterSidebar";
import GroundCard from "../components/GroundCard";
import BookingDetails from "../components/BookingDetails";

const Booking = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 flex gap-6">
        {/* Filters Section */}
        <div className="w-1/4">
          <FilterSidebar />
        </div>

        {/* Grounds + Booking Details */}
        <div className="w-3/4 flex flex-col gap-6">
          {/* Grounds List */}
          <div className="flex gap-4">
            <GroundCard
              name="Cricket Central Arena"
              location="Mumbai Central, Mumbai"
              price="₹2500"
              rating="4.8"
              image="https://via.placeholder.com/300x180"
            />
            <GroundCard
              name="Sports Hub Nets"
              location="Andheri West, Mumbai"
              price="₹850"
              rating="4.4"
              image="https://via.placeholder.com/300x180"
            />
          </div>

          {/* Booking Details Section */}
          <BookingDetails />
        </div>
      </div>
    </div>
  );
};

export default Booking;
