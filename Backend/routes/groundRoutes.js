const express = require("express");
const Ground = require("../models/Ground");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const grounds = await Ground.find();
        res.json(grounds);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
