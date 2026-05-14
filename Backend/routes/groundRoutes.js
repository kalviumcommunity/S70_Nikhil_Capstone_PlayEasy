const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Import model
const Ground = require("../models/Ground");


// ✅ POST - Create a new ground
router.post("/", protect, async (req, res) => {
  try {
    const newGround = new Ground(req.body);
    const savedGround = await newGround.save();
    res.status(201).json({ message: "Ground added successfully!", data: savedGround });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ✅ GET endpoint with filters
router.get("/", async (req, res) => {
  const { location, minPrice, maxPrice, type } = req.query;

  const query = {};
  if (location) query.location = { $regex: location, $options: "i" }; // case-insensitive partial match
  if (type) query.type = type;
  if (minPrice || maxPrice) {
    query.pricePerHour = {};
    if (minPrice) query.pricePerHour.$gte = parseInt(minPrice);
    if (maxPrice) query.pricePerHour.$lte = parseInt(maxPrice);
  }

  try {
    const filteredGrounds = await Ground.find(query).sort({ ratings: -1 });
    res.json(filteredGrounds);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});



// ✅ PUT endpoint to update ground details
router.put("/:id", protect, async (req, res) => {
  try {
    const updatedGround = await Ground.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedGround) {
      return res.status(404).json({ message: "Ground not found" });
    }

    res.status(200).json({ message: "Ground updated successfully!", data: updatedGround });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ DELETE endpoint to remove a ground
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedGround = await Ground.findByIdAndDelete(req.params.id);

    if (!deletedGround) {
      return res.status(404).json({ message: "Ground not found" });
    }

    res.status(200).json({ message: "Ground deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
