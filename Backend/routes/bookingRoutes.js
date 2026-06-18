const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { protect } = require("../middleware/authMiddleware");

// GET /api/bookings/for-ground?groundName=X&date=Y — Owner: see all bookings for a ground
router.get("/for-ground", protect, async (req, res) => {
  try {
    const { groundName, date } = req.query;
    if (!groundName) {
      return res.status(400).json({ message: "groundName is required" });
    }
    const query = { groundName: { $regex: new RegExp(`^${groundName}$`, "i") } };
    if (date) query.date = date;
    const bookings = await Booking.find(query).sort({ date: 1, timeSlot: 1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/bookings/slots?groundName=X&date=Y — Public: get booked slots for a ground on a date
router.get("/slots", async (req, res) => {
  try {
    const { groundName, date } = req.query;
    if (!groundName || !date) {
      return res.status(400).json({ message: "groundName and date are required" });
    }
    const bookings = await Booking.find({
      groundName,
      date,
      status: { $ne: "cancelled" }, // exclude cancelled bookings
    }).select("timeSlot -_id");
    const bookedSlots = bookings.map((b) => b.timeSlot);
    res.json({ bookedSlots });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/bookings  — create a booking (Protected)
router.post("/", protect, async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      userEmail: req.user.email // Ensure the booking belongs to the authenticated user
    });
    res.status(201).json({ message: "Booking confirmed!", booking });
  } catch (error) {
    res.status(400).json({ message: "Error creating booking", error: error.message });
  }
});

// GET /api/bookings — get current user's bookings (Protected)
router.get("/", protect, async (req, res) => {
  try {
    // Securely fetch bookings for the logged-in user only
    const bookings = await Booking.find({ userEmail: req.user.email }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/bookings/:id (Protected)
router.get("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    
    // Ensure the user owns this booking
    if (booking.userEmail !== req.user.email) {
      return res.status(401).json({ message: "Not authorized to view this booking" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PATCH /api/bookings/:id/cancel (Protected)
router.patch("/:id/cancel", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Ensure the user owns this booking
    if (booking.userEmail !== req.user.email) {
      return res.status(401).json({ message: "Not authorized to cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();
    
    res.json({ message: "Booking cancelled", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
