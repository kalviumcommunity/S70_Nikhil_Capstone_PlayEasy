const mongoose = require("mongoose");

const GroundSchema = new mongoose.Schema({
    name: String,
    location: String,
    pricePerHour: Number,
    availability: [String],
    amenities: [String],
    ratings: Number,
    images: [String]
});

module.exports = mongoose.model("Ground", GroundSchema);
