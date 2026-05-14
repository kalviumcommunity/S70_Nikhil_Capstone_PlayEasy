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
    type: {
        type: String,
        enum: ["Outdoor", "Indoor", "Net"],
        default: "Outdoor"
    },
    availability: {
        type: [String],
        default: []
    },
    amenities: {
        type: [String],
        default: []
    },
    ratings: {
        type: Number,
        default: 4.5,
        min: 0,
        max: 5
    },
    images: {
        type: [String],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("Ground", GroundSchema);
