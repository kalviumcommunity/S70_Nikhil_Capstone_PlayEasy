import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Lock, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/Toast";
import { createBooking } from "../api";
import cricketImage from "../assets/ground-hero.png.png";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [billingInfo, setBillingInfo] = useState({ fullName: "", email: "", phone: "" });
  const [bookingInfo, setBookingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [paid, setPaid] = useState(false);
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("bookingInfo");
    if (data) {
      const parsed = JSON.parse(data);
      setBookingInfo(parsed);
      if (user) {
        setBillingInfo((prev) => ({ ...prev, fullName: user.name, email: user.email }));
      }
    }
  }, [user]);

  if (!bookingInfo) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-gray-600 gap-4">
        <p className="text-5xl">🏟️</p>
        <p className="text-lg font-semibold text-gray-700">No booking found.</p>
        <p className="text-gray-400 text-sm">Please select a ground first.</p>
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

  // Simulated payment processing steps
  const PROCESSING_STEPS = [
    "Verifying payment details...",
    "Securing your transaction...",
    "Confirming booking slot...",
    "Payment successful!",
  ];

  const handleConfirmPay = async () => {
    if (!billingInfo.fullName || !billingInfo.email || !billingInfo.phone) {
      toast.error("Please fill in all billing information.");
      return;
    }
    if (paymentMethod === "upi" && !upiId) {
      toast.error("Please enter your UPI ID.");
      return;
    }

    setLoading(true);
    setProcessingStep(1);

    // Simulate payment processing animation
    await new Promise((r) => setTimeout(r, 900));
    setProcessingStep(2);
    await new Promise((r) => setTimeout(r, 800));
    setProcessingStep(3);
    await new Promise((r) => setTimeout(r, 700));
    setProcessingStep(4);

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
      setTimeout(() => navigate("/my-bookings"), 3500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking save failed. Please try again.");
      setLoading(false);
      setProcessingStep(0);
    }
  };

  // Processing overlay
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white gap-6">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          {processingStep < 4 ? (
            <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
          ) : (
            <CheckCircle className="w-10 h-10 text-green-600" />
          )}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {processingStep < 4 ? "Processing Payment" : "Payment Complete!"}
          </h2>
          <p className="text-gray-500 text-sm">{PROCESSING_STEPS[processingStep - 1]}</p>
        </div>
        {/* Progress bar */}
        <div className="w-64 bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(processingStep / 4) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 flex items-center gap-1.5">
          <Lock className="w-3 h-3" /> 256-bit SSL Encrypted
        </p>
      </div>
    );
  }

  // Success screen
  if (paid) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-5 bg-gradient-to-br from-green-50 to-white">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
          <CheckCircle className="text-green-500 w-14 h-14" />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Booking Confirmed! 🏏</h2>
          <p className="text-gray-500 text-base">Your ground is booked. See you on the pitch!</p>
          <p className="text-gray-400 text-sm mt-2">Redirecting to My Bookings...</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 max-w-sm w-full mx-4 text-sm">
          <p className="font-bold text-gray-900">{name}</p>
          <p className="text-gray-500 text-xs mb-3">{location}</p>
          <div className="flex gap-4 text-gray-500">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-green-500" />{date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-green-500" />{timeSlot}</span>
          </div>
          <div className="flex justify-between mt-3 pt-3 border-t">
            <span className="text-gray-500">Total Paid</span>
            <span className="font-bold text-green-600">₹{total?.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    { id: "upi", label: "UPI", icon: "💳" },
    { id: "card", label: "Debit / Credit Card", icon: "🏦" },
    { id: "netbanking", label: "Net Banking", icon: "🌐" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-7">Complete Your Booking</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ─── LEFT ─── */}
          <div className="space-y-5">
            {/* Booking Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-base font-bold text-gray-900">Booking Summary</h2>
                <img src={cricketImage} alt="Ground" className="w-14 h-14 rounded-xl object-cover" />
              </div>
              <h3 className="font-bold text-xl text-gray-800">{name}</h3>
              <p className="text-gray-500 text-sm mb-4 flex items-center gap-1"><span>📍</span>{location}</p>

              <div className="flex gap-3 mb-5 flex-wrap">
                <div className="flex items-center gap-1.5 text-gray-500 text-sm bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 text-sm bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span>{timeSlot}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Base Price (2 hours)</span><span>₹{basePrice?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>🎉 10% Discount</span><span>-₹{discount?.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t">
                  <span>Total</span><span className="text-green-600">₹{total?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Billing Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Billing Information</h2>
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
            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Payment Method</h2>
              <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-4">
                🔒 Demo Mode — No real payment will be charged. This is a simulated checkout.
              </p>
              <div className="space-y-2.5">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 rounded-xl border flex items-center gap-3 transition ${
                      paymentMethod === method.id
                        ? "border-green-500 bg-green-50 shadow-sm"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      paymentMethod === method.id ? "border-green-500" : "border-gray-300"
                    }`}>
                      {paymentMethod === method.id && (
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                      )}
                    </div>
                    <span className="text-lg">{method.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{method.label}</span>
                  </button>
                ))}
              </div>

              {/* UPI ID input shown when UPI selected */}
              {paymentMethod === "upi" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                  />
                </div>
              )}
              {paymentMethod === "card" && (
                <div className="mt-4 space-y-3">
                  <input type="text" placeholder="Card Number (demo)" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50" readOnly value="4242 4242 4242 4242" />
                  <div className="flex gap-2">
                    <input type="text" placeholder="MM/YY" className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50" readOnly value="12/28" />
                    <input type="text" placeholder="CVV" className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50" readOnly value="•••" />
                  </div>
                </div>
              )}
              {paymentMethod === "netbanking" && (
                <div className="mt-4">
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50">
                    <option>Select Bank</option>
                    <option>State Bank of India</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="space-y-2 text-sm mb-5">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{basePrice?.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount?.toLocaleString("en-IN")}</span></div>
                <div className="flex justify-between font-bold text-base border-t pt-2"><span>Total</span><span className="text-green-600">₹{total?.toLocaleString("en-IN")}</span></div>
              </div>
              <button
                onClick={handleConfirmPay}
                className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition shadow-md active:scale-95 text-sm"
              >
                Confirm &amp; Pay ₹{total?.toLocaleString("en-IN")}
              </button>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Lock className="w-3.5 h-3.5" />
                <span>100% Secured &amp; Encrypted (Demo)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
