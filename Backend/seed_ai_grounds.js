require("dotenv").config();
const mongoose = require("mongoose");
const Ground = require("./models/Ground");

const seedGrounds = [
  {
    name: "Future Arena International",
    location: "Mumbai, Maharashtra",
    pricePerHour: 15000,
    type: "Outdoor",
    ratings: 4.9,
    description: "A futuristic 3D rendered cricket stadium with neon accents and 8K lighting. The most advanced facility in the country.",
    amenities: ["Neon Floodlights", "Smart Pitch", "VR Replay", "VIP Lounge"],
    image: "/images/stadium_ai_1778754390352.png"
  },
  {
    name: "Cotswolds Heritage Ground",
    location: "Bangalore, Karnataka",
    pricePerHour: 2500,
    type: "Outdoor",
    ratings: 4.6,
    description: "An impressionist-style English village ground. Experience cricket like a classic oil painting with lush greens and historic vibes.",
    amenities: ["Classic Pavilion", "Tea Service", "Natural Grass", "Picnic Area"],
    image: "/images/outdoor_ai_1778754409577.png"
  },
  {
    name: "Velocity Training Nets",
    location: "Delhi, NCR",
    pricePerHour: 1200,
    type: "Indoor",
    ratings: 4.8,
    description: "High-speed action photography themed indoor nets. Designed for professional training with high-speed motion analysis.",
    amenities: ["Motion Capture", "Bowling Machine", "Rubber Turf", "Data Analytics"],
    image: "/images/indoor_ai_1778754456377.png"
  },
  {
    name: "Oasis Desert Oval",
    location: "Hyderabad, Telangana",
    pricePerHour: 3000,
    type: "Outdoor",
    ratings: 4.7,
    description: "A unique drone-shot oasis ground. A stunning contrast of golden desert sands and vibrant green grass.",
    amenities: ["Desert View", "Eco Friendly", "Sand Dunes Backdrop", "Open Air"],
    image: "/images/sunset_ai_1778754685804.png"
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
