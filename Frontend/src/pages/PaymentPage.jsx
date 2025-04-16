// src/pages/PaymentPage.jsx
import React, { useState, useEffect } from "react";
import { Calendar, Clock, ChevronDown, Lock } from "lucide-react";
import cricketImage from "../assets/ground-hero.png.png"; // Replace with actual cricket image

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [couponCode, setCouponCode] = useState("");
  const [bookingInfo, setBookingInfo] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("bookingInfo");
    if (data) {
      setBookingInfo(JSON.parse(data));
    }
  }, []);

  if (!bookingInfo) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600 text-lg">
        Booking details not found. Please select a ground.
      </div>
    );
  }

  const {
    name,
    location,
    date,
    timeSlot,
    basePrice,
    discount,
    total,
  } = bookingInfo;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Payment Details</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div>
            {/* Booking Summary */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">Booking Summary</h2>
                <img
                  src={cricketImage}
                  alt="Ground"
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </div>

              <div className="mb-4">
               <h3 className="font-bold text-xl text-gray-800">{name}</h3>
               <p className="text-gray-600 text-base">{location}</p>
              </div>


              <div className="flex gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{timeSlot}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Price (2 Hours)</span>
                  <span>₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

            {/* Billing Info */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="same" className="rounded text-green-500" />
                  <label htmlFor="same" className="text-sm text-gray-600">
                    Billing address same as contact details
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* Payment Summary */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>

              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  Apply
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600">
                Confirm and Pay ₹{total}
              </button>

              <div className="mt-4 text-center text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lock className="w-4 h-4" />
                  <span>100% Secured Payment</span>
                </div>
                <p>Your payment details are encrypted and secure</p>
              </div>

              <div className="mt-4 flex justify-center gap-4">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Razorpay"
                  className="h-16 w-auto object-contain "
                  padding = "10px"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                  alt="Stripe"
                  className="h-9 w-auto object-contain mt-2"
                  padding = "10px"
                />
              </div>
            </div>

            {/* Payment Method Options */}
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {["upi", "card", "netbanking"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`w-full p-4 rounded-lg border flex items-center justify-between ${
                      paymentMethod === method ? "border-green-500 bg-green-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          paymentMethod === method ? "bg-green-500 border-green-500" : ""
                        }`}
                      />
                      <span className="capitalize">{method}</span>
                    </div>
                    {method === "upi" ? (
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg"
                        alt="UPI"
                        className="h-6"
                      />
                    ) : method === "card" ? (
                      <div className="flex gap-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                          alt="Mastercard"
                          className="h-6"
                        />
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                          alt="Visa"
                          className="h-6"
                        />
                      </div>
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
