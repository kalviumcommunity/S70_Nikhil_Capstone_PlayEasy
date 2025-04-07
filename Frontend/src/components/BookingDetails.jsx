import React from "react";

const BookingDetails = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Booking Details</h2>
      <div className="flex gap-4 mb-4">
        <input type="date" className="p-2 border rounded w-1/2" />
        <select className="p-2 border rounded w-1/2">
          <option>09:00 AM – 11:00 AM</option>
          <option>11:00 AM – 01:00 PM</option>
          <option>01:00 PM – 03:00 PM</option>
        </select>
      </div>

      <div className="border p-4 rounded text-sm">
        <div className="flex justify-between">
          <span>Base Price (2 Hours)</span>
          <span>₹5000</span>
        </div>
        <div className="flex justify-between">
          <span>Peak Hour Charge</span>
          <span>₹500</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>Bulk Booking Discount</span>
          <span>- ₹1000</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total Amount</span>
          <span>₹4500</span>
        </div>
      </div>

      <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Proceed to payment
      </button>
    </div>
  );
};

export default BookingDetails;
