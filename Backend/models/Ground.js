const mongoose = require("mongoose");

const GroundSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    pricePerHour: {
        type: Number,
        required: true,
        min: 0
    },
    availability: {
        type: [String], // e.g. ["Monday 9-10", "Tuesday 10-11"]
        default: []
    },
    amenities: {
        type: [String], // e.g. ["Floodlights", "Parking"]
        default: []
    },
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    images: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Ground", GroundSchema);
