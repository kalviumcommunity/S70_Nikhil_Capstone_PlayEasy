const express = require("express");
const Ground = require("../models/Ground");
const router = express.Router();
const Joi = require("joi");

// Input validation schema
const groundSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().min(0).required(),
    availability: Joi.array().items(Joi.boolean()).required()
});

// POST Endpoint
router.post("/", async (req, res) => {
    const { error } = groundSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const { name, location, price, availability } = req.body;
        const newGround = new Ground({ name, location, price, availability });
        await newGround.save();
        res.status(201).json({ message: "Ground added successfully", newGround });
    } catch (error) {
        console.error("Error saving ground:", error); // ✅ Log error for debugging
        res.status(500).json({ message: "An internal server error occurred. Please try again later." });
    }
});

// ✅ Re-add the GET endpoint if missing
router.get("/", async (req, res) => {
    try {
        const grounds = await Ground.find();
        res.json(grounds);
    } catch (error) {
        console.error("Error fetching grounds:", error); // ✅ Log error for debugging
        res.status(500).json({ message: "Error retrieving grounds." });
    }
});

module.exports = router;
