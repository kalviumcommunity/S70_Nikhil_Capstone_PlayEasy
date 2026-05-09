import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Lock, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";
import { createBooking } from "../api";
import cricketImage from "../assets/ground-hero.png.png";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [couponCode, setCouponCode] = useState("");
  const [billingInfo, setBillingInfo] = useState({ fullName: "", email: "", phone: "" });
  const [bookingInfo, setBookingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("bookingInfo");
    if (data) {
      const parsed = JSON.parse(data);
      setBookingInfo(parsed);
      // Pre-fill billing from logged-in user
      if (user) {
        setBillingInfo((prev) => ({ ...prev, fullName: user.name, email: user.email }));
      }
    }
  }, [user]);

  if (!bookingInfo) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-600 gap-4">
        <p className="text-lg">No booking found. Please select a ground first.</p>
        <button
          onClick={() => navigate("/booking")}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
        >
          Browse Grounds
        </button>
      </div>
    );
  }

  const { name, location, date, timeSlot, basePrice, discount, total } = bookingInfo;

  const handleBillingChange = (e) =>
    setBillingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleConfirmPay = async () => {
    if (!billingInfo.fullName || !billingInfo.email || !billingInfo.phone) {
      toast.error("Please fill in all billing information.");
      return;
    }
    setLoading(true);
    try {
      await createBooking({
        groundName: name,
        location,
        userName: billingInfo.fullName,
        userEmail: billingInfo.email,
        userPhone: billingInfo.phone,
        date,
        timeSlot,
        basePrice,
        discount,
        total,
        paymentMethod,
      });
      localStorage.removeItem("bookingInfo");
      setPaid(true);
      toast.success("Booking confirmed! See you on the pitch 🏏");
      setTimeout(() => navigate("/my-bookings"), 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (paid) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-5 bg-green-50">
        <CheckCircle className="text-green-500 w-16 h-16" />
        <h2 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h2>
        <p className="text-gray-500">Redirecting to your bookings...</p>
      </div>
    );
  }

  const paymentMethods = [
    { id: "upi", label: "UPI", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" },
    { id: "card", label: "Card", logos: [
      "https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    ]},
    { id: "netbanking", label: "Net Banking" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-7">Complete Your Booking</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ─── LEFT ─── */}
          <div className="space-y-5">
            {/* Booking Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Booking Summary</h2>
                <img src={cricketImage} alt="Ground" className="w-14 h-14 rounded-xl object-cover" />
              </div>
              <h3 className="font-bold text-xl text-gray-800">{name}</h3>
              <p className="text-gray-500 text-sm mb-4">{location}</p>

              <div className="flex gap-4 mb-5">
                <div className="flex items-center gap-1.5 text-gray-500 text-sm bg-gray-50 px-3 py-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm bg-gray-50 px-3 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span>{timeSlot}</span>
                </div>
              </div>

              <div className="space-y-2.5 text-sm border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Base Price (2 hours)</span><span>₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-red-500">
                  <span>Discount</span><span>-₹{discount}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t">
                  <span>Total</span><span className="text-green-600">₹{total}</span>
                </div>
              </div>
            </div>

            {/* Billing Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h2>
              <div className="space-y-3">
                {[
                  { name: "fullName", placeholder: "Full Name", type: "text", auto: "name" },
                  { name: "email", placeholder: "Email Address", type: "email", auto: "email" },
                  { name: "phone", placeholder: "Phone Number", type: "tel", auto: "tel" },
                ].map((f) => (
                  <input
                    key={f.name}
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    autoComplete={f.auto}
                    value={billingInfo[f.name]}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT ─── */}
          <div className="space-y-5">
            {/* Payment Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h2>

              {/* Coupon */}
              <div className="flex gap-2 mb-5">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                />
                <button className="px-5 py-2.5 bg-green-500 text-white text-sm rounded-xl hover:bg-green-600 font-medium transition">
                  Apply
                </button>
              </div>

              <div className="space-y-2 text-sm mb-5">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{total}</span></div>
                <div className="flex justify-between font-bold text-base"><span>Total</span><span className="text-green-600">₹{total}</span></div>
              </div>

              <button
                onClick={handleConfirmPay}
                disabled={loading}
                className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {loading ? "Processing..." : `Confirm & Pay ₹${total}`}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Lock className="w-3.5 h-3.5" />
                <span>100% Secured & Encrypted Payment</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
              <div className="space-y-2.5">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 rounded-xl border flex items-center justify-between transition ${
                      paymentMethod === method.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === method.id ? "border-green-500" : "border-gray-300"
                      }`}>
                        {paymentMethod === method.id && (
                          <div className="w-2 h-2 rounded-full bg-green-500" />
                        )}
                      </div>
                      <span className="text-sm font-medium capitalize">{method.label}</span>
                    </div>
                    {method.id === "upi" && (
                      <img src={method.logo} alt="UPI" className="h-5" />
                    )}
                    {method.id === "card" && (
                      <div className="flex gap-2">
                        {method.logos.map((l) => (
                          <img key={l} src={l} alt="" className="h-5" />
                        ))}
                      </div>
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
