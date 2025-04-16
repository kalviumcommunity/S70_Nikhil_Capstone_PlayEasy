const express = require("express");
const router = express.Router();

// Import model
const Ground = require("../models/Ground");


// ✅ POST - Create a new ground
router.post("/", async (req, res) => {
  try {
    const newGround = new Ground(req.body);
    await newGround.save();
    res.status(201).json(newGround);
  } catch (error) {
    res.status(400).json({ message: "Error creating ground", error });
  }
});


// ✅ GET endpoint with filters
router.get("/", async (req, res) => {
  const { location, minPrice, maxPrice, type } = req.query;

  const query = {};
  if (location) query.location = location;
  if (type) query.type = type;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = parseInt(minPrice);
    if (maxPrice) query.price.$lte = parseInt(maxPrice);
  }

  try {
    const filteredGrounds = await Ground.find(query);
    res.json(filteredGrounds);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});


// ✅ PUT endpoint to update ground details
router.put("/:id", async (req, res) => {
  try {
    const groundId = req.params.id;
    const updatedData = req.body;

    const updatedGround = await Ground.findByIdAndUpdate(
      groundId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedGround) {
      return res.status(404).json({ message: "Ground not found" });
    }

    res.status(200).json(updatedGround);
  } catch (error) {
    res.status(500).json({ message: "Error updating ground", error });
  }
});

module.exports = router;
