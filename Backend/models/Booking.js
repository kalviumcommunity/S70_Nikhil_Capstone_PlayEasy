const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    groundName: { type: String, required: true },
    location: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String, default: "" },
    date: { type: String, required: true },
    timeSlot: { type: String, required: true },
    basePrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["upi", "card", "netbanking"],
      default: "upi",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
