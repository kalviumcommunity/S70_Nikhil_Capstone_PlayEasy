// src/components/BookingDetails.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingDetails = ({ ground }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const navigate = useNavigate();

  const timeSlots = [
    "06:00 AM - 08:00 AM",
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM",
  ];

  const isReadyToBook = selectedDate && selectedTimeSlot;
  const discountedPrice = ground?.price ? ground.price - 1000 : 0;

  const handleProceed = () => {
    if (!isReadyToBook) {
      alert("Please select a date and time slot.");
      return;
    }

    const bookingData = {
      name: ground?.name || "N/A",
      location: ground?.location || "N/A",
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      basePrice: ground?.price || 0,
      discount: 1000,
      total: discountedPrice,
    };

    localStorage.setItem("bookingInfo", JSON.stringify(bookingData));
    navigate("/payment");
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Booking Details</h2>

      <div className="mb-3">
        <label className="block text-gray-700 font-medium mb-1">Select Date:</label>
        <input
          type="date"
          className="w-full border rounded-md p-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Select Time Slot:</label>
        <select
          className="w-full border rounded-md p-2"
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
        >
          <option value="">-- Select a Slot --</option>
          {timeSlots.map((slot, idx) => (
            <option key={idx} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      {isReadyToBook && (
        <div className="space-y-2 border-t pt-4">
          <p><strong>Ground:</strong> {ground?.name}</p>
          <p><strong>Location:</strong> {ground?.location}</p>
          <p><strong>Date:</strong> {selectedDate}</p>
          <p><strong>Time Slot:</strong> {selectedTimeSlot}</p>
          <p><strong>Base Price (2 hrs):</strong> ₹{ground?.price}</p>
          <p><strong>Discount:</strong> -₹1000</p>
          <p className="font-bold text-lg">Total: ₹{discountedPrice}</p>

          <button
            onClick={handleProceed}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
