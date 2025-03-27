const express = require("express");
const Ground = require("../models/Ground");
const router = express.Router();
const Joi = require("joi");

// Define schema for input validation
const groundSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    price: Joi.number().min(0).required(),
    availability: Joi.array().items(Joi.boolean()).required()
});

// POST endpoint to create a new ground with validation
router.post("/", async (req, res) => {
    // Validate request body
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
        res.status(500).json({ message: "An internal server error occurred. Please try again later." });
    }
});

module.exports = router;
