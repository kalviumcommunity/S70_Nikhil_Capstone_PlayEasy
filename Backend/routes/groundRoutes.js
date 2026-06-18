const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Ground = require("../models/Ground");


// ✅ POST - Create a new ground (saves ownerEmail from logged-in user)
router.post("/", protect, async (req, res) => {
  try {
    const newGround = new Ground({
      ...req.body,
      ownerEmail: req.user.email,  // tag ground with creator's email
    });
    const savedGround = await newGround.save();
    res.status(201).json({ message: "Ground added successfully!", data: savedGround });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// ✅ GET /my-grounds — Return only grounds owned by logged-in user (Protected)
router.get("/my-grounds", protect, async (req, res) => {
  try {
    const grounds = await Ground.find({ ownerEmail: req.user.email }).sort({ createdAt: -1 });
    res.json(grounds);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});


// ✅ GET endpoint with filters (public)
router.get("/", async (req, res) => {
  const { location, minPrice, maxPrice, type } = req.query;

  const query = {};
  if (location) query.location = { $regex: location, $options: "i" };
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

// ✅ GET - Get a single ground by ID
router.get("/:id", async (req, res) => {
  try {
    const ground = await Ground.findById(req.params.id);
    if (!ground) {
      return res.status(404).json({ message: "Ground not found" });
    }
    res.json(ground);
  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
});

// ✅ PUT endpoint to update ground details
router.put("/:id", protect, async (req, res) => {
  try {
    const ground = await Ground.findById(req.params.id);
    if (!ground) {
      return res.status(404).json({ message: "Ground not found" });
    }

    // Ownership check
    if (ground.ownerEmail && ground.ownerEmail !== req.user.email) {
      return res.status(403).json({ message: "Access denied. You do not own this ground." });
    }

    const updatedGround = await Ground.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "Ground updated successfully!", data: updatedGround });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ DELETE endpoint to remove a ground
router.delete("/:id", protect, async (req, res) => {
  try {
    const ground = await Ground.findById(req.params.id);
    if (!ground) {
      return res.status(404).json({ message: "Ground not found" });
    }

    // Ownership check
    if (ground.ownerEmail && ground.ownerEmail !== req.user.email) {
      return res.status(403).json({ message: "Access denied. You do not own this ground." });
    }

    await Ground.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Ground deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
