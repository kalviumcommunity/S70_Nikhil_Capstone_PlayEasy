import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "./Toast";
import { fetchBookedSlots } from "../api";

const BookingDetails = ({ ground }) => {
  const [searchParams] = useSearchParams();
  const defaultDate = searchParams.get("date") || "";
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // Reset selections whenever the user picks a different ground
  useEffect(() => {
    setSelectedDate(defaultDate);
    setSelectedTimeSlot("");
    setBookedSlots([]);
  }, [ground?._id, defaultDate]);

  // Fetch booked slots whenever ground name or date changes
  useEffect(() => {
    if (!ground?.name || !selectedDate) {
      setBookedSlots([]);
      return;
    }
    setLoadingSlots(true);
    fetchBookedSlots(ground.name, selectedDate)
      .then((res) => setBookedSlots(res.data.bookedSlots || []))
      .catch(() => setBookedSlots([])) // fail silently — show all slots if API fails
      .finally(() => setLoadingSlots(false));
  }, [ground?.name, selectedDate]);

  const timeSlots = [
    "06:00 AM - 08:00 AM",
    "08:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
    "06:00 PM - 08:00 PM",
  ];

  const today = new Date().toISOString().split("T")[0];
  const isReadyToBook = selectedDate && selectedTimeSlot;

  const basePrice = ground?.price || ground?.pricePerHour || 0;
  const discount = Math.round(basePrice * 0.1); // 10% off
  const total = basePrice - discount;

  const handleProceed = () => {
    if (!selectedDate) {
      toast.error("Please select a date.");
      return;
    }
    if (!selectedTimeSlot) {
      toast.error("Please select a time slot.");
      return;
    }

    const bookingData = {
      name: ground?.name || "N/A",
      location: ground?.location || "N/A",
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      basePrice,
      discount,
      total,
    };

    localStorage.setItem("bookingInfo", JSON.stringify(bookingData));
    navigate("/payment");
  };

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-5 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900 mb-4">📋 Booking Details</h2>

      {/* Ground Summary */}
      {ground && (
        <div className="bg-green-50 rounded-xl p-3 mb-4 border border-green-100">
          <p className="font-semibold text-gray-900 text-sm">{ground.name}</p>
          <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
            <span>📍</span> {ground.location}
          </p>
        </div>
      )}

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Date</label>
        <input
          type="date"
          min={today}
          className="w-full border border-gray-200 rounded-xl p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setSelectedTimeSlot(""); // reset slot when date changes
          }}
        />
      </div>

      {/* Time Slot */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
          {loadingSlots && (
            <span className="text-xs text-gray-400 animate-pulse">Checking availability...</span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {timeSlots.map((slot) => {
            const isBooked = bookedSlots.includes(slot);
            const isSelected = selectedTimeSlot === slot;

            return (
              <button
                key={slot}
                onClick={() => !isBooked && setSelectedTimeSlot(slot)}
                disabled={isBooked}
                title={isBooked ? "Already booked" : slot}
                className={`text-xs py-2 px-2 rounded-xl border font-medium transition relative ${
                  isBooked
                    ? "bg-red-50 text-red-300 border-red-100 cursor-not-allowed line-through"
                    : isSelected
                    ? "bg-green-600 text-white border-green-600 shadow-sm"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:border-green-400 hover:text-green-600"
                }`}
              >
                {slot}
                {isBooked && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] px-1 rounded-full leading-4">
                    Booked
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {bookedSlots.length > 0 && (
          <p className="text-xs text-gray-400 mt-2">
            🔴 Strikethrough slots are already booked for this date.
          </p>
        )}
      </div>

      {/* Price Summary */}
      {isReadyToBook && (
        <div className="space-y-2 border-t border-gray-100 pt-4 mb-4 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Base Price (2 hrs)</span>
            <span>₹{basePrice.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>10% Discount 🎉</span>
            <span>-₹{discount.toLocaleString("en-IN")}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
            <span>Total Payable</span>
            <span className="text-green-600">₹{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      )}

      <button
        onClick={handleProceed}
        disabled={!isReadyToBook}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed text-sm active:scale-95"
      >
        {isReadyToBook ? `Proceed to Payment →` : "Select Date & Time"}
      </button>
    </div>
  );
};

export default BookingDetails;
