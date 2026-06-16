const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Review = require("../models/Review");
const Ground = require("../models/Ground");
const Booking = require("../models/Booking");

// @route   POST /api/reviews
// @desc    Add a review for a ground and update the ground's average rating
// @access  Private
router.post("/", protect, async (req, res) => {
  const { groundId, rating, comment } = req.body;

  if (!groundId || !rating || !comment) {
    return res.status(400).json({ message: "Please provide groundId, rating, and comment." });
  }

  try {
    const ground = await Ground.findById(groundId);
    if (!ground) {
      return res.status(404).json({ message: "Ground not found." });
    }

    // Check if the user has a confirmed booking for this ground
    const booking = await Booking.findOne({
      userEmail: req.user.email,
      groundName: ground.name,
      status: "confirmed",
    });
    const isVerified = !!booking;

    // Create the review
    const review = await Review.create({
      groundId,
      userId: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      comment,
      isVerified,
    });

    // Recalculate average rating of the ground
    const reviews = await Review.find({ groundId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    // Update the Ground model ratings (rounded to 1 decimal place)
    ground.ratings = Math.round(avgRating * 10) / 10;
    await ground.save();

    res.status(201).json({
      message: "Review added successfully!",
      review,
      avgRating: ground.ratings,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/reviews/:groundId
// @desc    Get all reviews for a specific ground
// @access  Public
router.get("/:groundId", async (req, res) => {
  try {
    const reviews = await Review.find({ groundId: req.params.groundId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
