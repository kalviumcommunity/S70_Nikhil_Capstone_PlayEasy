require("dotenv").config();
const mongoose = require("mongoose");
const Ground = require("./models/Ground");

const seedGrounds = [
  {
    name: "PlayEasy International Stadium",
    location: "Mumbai, Maharashtra",
    pricePerHour: 15000,
    type: "Outdoor",
    ratings: 4.9,
    description: "A world-class premium cricket stadium with stunning floodlights and a lightning-fast outfield. Perfect for professional corporate tournaments.",
    amenities: ["Floodlights", "Pavilion", "Live Scoring", "Umpire Available", "Dressing Rooms"],
    image: "/images/stadium_night_1778750742670.png"
  },
  {
    name: "Green Valley Community Ground",
    location: "Bangalore, Karnataka",
    pricePerHour: 2500,
    type: "Outdoor",
    ratings: 4.6,
    description: "A beautiful, scenic outdoor local cricket ground with lush green grass and a clear blue sky backdrop. Great for weekend matches.",
    amenities: ["Grass Pitch", "Parking", "Refreshments", "Seating Area"],
    image: "/images/outdoor_ground_1778750764595.png"
  },
  {
    name: "ProStrike Indoor Nets Facility",
    location: "Delhi, NCR",
    pricePerHour: 1200,
    type: "Indoor",
    ratings: 4.8,
    description: "Premium indoor cricket net practice facility with high-quality artificial turf, excellent lighting, and a bowling machine.",
    amenities: ["Bowling Machine", "Artificial Turf", "Air Conditioned", "Equipment Rental"],
    image: "/images/indoor_nets_1778750780578.png"
  },
  {
    name: "Golden Hour Oval",
    location: "Hyderabad, Telangana",
    pricePerHour: 3000,
    type: "Outdoor",
    ratings: 4.7,
    description: "A magnificent community cricket ground best experienced during sunset. Features a well-maintained pitch and a picturesque cinematic vibe.",
    amenities: ["Matting Pitch", "Floodlights", "Cafeteria", "First Aid"],
    image: "/images/community_sunset_1778750798165.png"
  },
  {
    name: "Elite Practice Nets",
    location: "Mumbai, Maharashtra",
    pricePerHour: 800,
    type: "Net",
    ratings: 4.5,
    description: "Standard outdoor practice nets with cemented and turf pitches for robust batting and bowling practice.",
    amenities: ["Cement Pitch", "Turf Pitch", "Net Bowlers Available"],
    image: "/images/indoor_nets_1778750780578.png"
  },
  {
    name: "Sunset Arena",
    location: "Chennai, Tamil Nadu",
    pricePerHour: 4500,
    type: "Outdoor",
    ratings: 4.4,
    description: "A wide, sprawling cricket arena on the outskirts of the city. Excellent bounce and carry.",
    amenities: ["Turf Pitch", "Changing Rooms", "Umpire Available"],
    image: "/images/community_sunset_1778750798165.png"
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB for Seeding...");
    
    // Optional: Only clear grounds that have local images so we don't duplicate
    await Ground.deleteMany({ image: { $regex: "^/images/" } });
    console.log("Cleared old AI generated grounds");

    const inserted = await Ground.insertMany(seedGrounds);
    console.log(`Successfully added ${inserted.length} premium AI grounds!`);
    process.exit(0);
  })
  .catch(err => {
    console.error("Database error:", err);
    process.exit(1);
  });
