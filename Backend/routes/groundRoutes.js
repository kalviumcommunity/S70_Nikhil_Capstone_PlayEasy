const express = require("express");
const Ground = require("../models/Ground");

const router = express.Router();

// GET endpoint to fetch all grounds
router.get("/", async (req, res) => {
    try {
        const grounds = await Ground.find();
        res.json(grounds);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// ✅ Add the POST endpoint here
router.post("/", async (req, res) => {
    try {
        const { name, location, price, availability } = req.body;
        const newGround = new Ground({ name, location, price, availability });

        await newGround.save();
        res.status(201).json({ message: "Ground added successfully", newGround });
    } catch (error) {
        res.status(500).json({ message: "Error adding ground", error });
    }
});

module.exports = router;
