import React, { useState } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import GroundCard from "../components/GroundCard";
import BookingDetails from "../components/BookingDetails";
import ground1 from "../assets/ground1.jpg";
import ground2 from "../assets/ground2.jpg";
import ground3 from "../assets/ground3.jpg";
import ground4 from "../assets/ground4.jpg";


const Booking = () => {
  const [selectedGround, setSelectedGround] = useState(null);

  const grounds = [
    {
      name: "Sunrise Cricket Ground",
      location: "Hyderabad",
      price: 2500,
      type: "Outdoor",
      availability: ["Mon", "Wed", "Fri"],
      image: ground1,
    },
    {
      name: "Greenfield Arena",
      location: "Mumbai",
      price: 3000,
      type: "Indoor",
      availability: ["Tue", "Thu"],
      image: ground2,
    },
    {
      name: "Pitch Paradise",
      location: "Chennai",
      price: 2200,
      type: "Outdoor",
      availability: ["Mon", "Sat"],
      image: ground3,
    },
    {
      name: "All-round Arena",
      location: "Bangalore",
      price: 2800,
      type: "Net",
      availability: ["Wed", "Fri", "Sun"],
      image: ground4,
    },
  ];
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
      <header className="py-6 px-6 sm:px-8">
        <h1 className="text-2xl font-bold text-gray-800">Book Your Cricket Ground</h1>
      </header>

      <div className="flex flex-col lg:flex-row px-6 sm:px-8 pb-8 gap-6">
        <div className="w-full lg:w-[250px]">
          <FiltersSidebar />
        </div>

        <div className="flex-1">
          <div className="grid sm:grid-cols-2 gap-6">
            {grounds.map((ground, index) => (
              <GroundCard
                key={index}
                ground={ground}
                onBook={() => setSelectedGround(ground)}
              />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[300px]">
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
  );
};

export default Booking;
