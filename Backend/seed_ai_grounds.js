require("dotenv").config();
const mongoose = require("mongoose");
const Ground = require("./models/Ground");

const seedGrounds = [
  {
    name: "Mumbai International Stadium",
    location: "Mumbai, Maharashtra",
    pricePerHour: 15000,
    type: "Outdoor",
    ratings: 4.9,
    description: "A world-class professional stadium experience in the heart of Mumbai with high-intensity floodlights and a pristine turf pitch. Feel like a pro under the lights.",
    amenities: ["Professional Floodlights", "International Standard Pitch", "VIP Pavilion", "Dressing Rooms"],
    images: ["https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=800&q=80"]
  },
  {
    name: "Willow Creek Village Ground",
    location: "Bangalore, Karnataka",
    pricePerHour: 2500,
    type: "Outdoor",
    ratings: 4.6,
    description: "A serene, traditional village-style cricket ground in Bangalore surrounded by lush greenery. Perfect for a relaxed weekend match with friends.",
    amenities: ["Matting Pitch", "Natural Shade", "Seating Gallery", "Cafeteria"],
    images: ["https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Pro-Strike Indoor Arena",
    location: "Delhi, NCR",
    pricePerHour: 1200,
    type: "Indoor",
    ratings: 4.8,
    description: "State-of-the-art indoor facility in Delhi with high-quality artificial turf and advanced bowling machines for serious practice.",
    amenities: ["Bowling Machine", "Astra-Turf", "Air Conditioning", "Locker Rooms"],
    images: ["https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Sunset Valley Oval",
    location: "Hyderabad, Telangana",
    pricePerHour: 3000,
    type: "Outdoor",
    ratings: 4.7,
    description: "A picturesque Hyderabad ground known for its stunning sunset views. Features a well-maintained outfield and excellent bounce.",
    amenities: ["Floodlights", "Matting Pitch", "Parking", "First Aid"],
    images: ["https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=1000"]
  },
  {
    name: "Chennai Super Nets",
    location: "Chennai, Tamil Nadu",
    pricePerHour: 800,
    type: "Net",
    ratings: 4.5,
    description: "Premium practice nets in Chennai with both cement and turf pitches. Ideal for intense batting and bowling drills.",
    amenities: ["Turf & Cement Pitches", "Net Bowlers", "Coaching Staff"],
    images: ["https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=1000"]
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB for Seeding...");
    
    // Clear ALL existing grounds to ensure a clean, professional state
    await Ground.deleteMany({});
    console.log("Cleared all existing grounds for fresh seed");

    const inserted = await Ground.insertMany(seedGrounds);
    console.log(`Successfully added ${inserted.length} premium AI grounds!`);
    process.exit(0);
  })
  .catch(err => {
    console.error("Database error:", err);
    process.exit(1);
  });
