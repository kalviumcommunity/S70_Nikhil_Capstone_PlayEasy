/**
 * seed_owners.js
 * ──────────────────────────────────────────────────────────────────────
 * Creates demo ground-owner accounts and links all 9 grounds to them.
 *
 * Usage:
 *   node seed_owners.js
 * ──────────────────────────────────────────────────────────────────────
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const User = require("./models/User");
const Ground = require("./models/Ground");

const DEMO_OWNERS = [
  {
    name: "Mumbai International Stadium Owner",
    email: "mumbaiinternational@gmail.com",
    password: "owner@mumbai",
    groundKeyword: "Mumbai International Stadium",
  },
  {
    name: "Willow Creek Village Ground Owner",
    email: "willowcreek@gmail.com",
    password: "owner@willow",
    groundKeyword: "Willow Creek Village Ground",
  },
  {
    name: "Pro-Strike Indoor Arena Owner",
    email: "prostrike@gmail.com",
    password: "owner@prostrike",
    groundKeyword: "Pro-Strike Indoor Arena",
  },
  {
    name: "Sunset Valley Oval Owner",
    email: "sunsetvalley@gmail.com",
    password: "owner@sunset",
    groundKeyword: "Sunset Valley Oval",
  },
  {
    name: "Chennai Super Nets Owner",
    email: "chennaisupernets@gmail.com",
    password: "owner@chennai",
    groundKeyword: "Chennai Super Nets",
  },
  {
    name: "Sunrise Cricket Ground Owner",
    email: "sunrisecricket@gmail.com",
    password: "owner@sunrise",
    groundKeyword: "Sunrise Cricket Ground",
  },
  {
    name: "Greenfield Arena Owner",
    email: "greenfieldarena@gmail.com",
    password: "owner@greenfield",
    groundKeyword: "Greenfield Arena",
  },
  {
    name: "Pitch Paradise Owner",
    email: "pitchparadise@gmail.com",
    password: "owner@pitch",
    groundKeyword: "Pitch Paradise",
  },
  {
    name: "All-round Arena Owner",
    email: "allroundarena@gmail.com",
    password: "owner@allround",
    groundKeyword: "All-round Arena",
  },
];

async function seedOwners() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is missing.");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    for (const owner of DEMO_OWNERS) {
      // Check if user already exists
      let user = await User.findOne({ email: owner.email });

      if (!user) {
        user = await User.create({
          name: owner.name,
          email: owner.email,
          password: owner.password, // will be hashed by pre-save hook
        });
        console.log(`✅ Created owner account: ${owner.email}`);
      } else {
        // Update password just in case it has changed
        user.password = owner.password;
        await user.save();
        console.log(`⏩ Owner already exists (updated password if changed): ${owner.email}`);
      }

      // Link matching grounds to this owner
      const grounds = await Ground.find({
        name: { $regex: new RegExp(`^${owner.groundKeyword}$`, "i") },
      });

      for (const ground of grounds) {
        if (ground.ownerEmail !== owner.email) {
          const oldOwner = ground.ownerEmail;
          ground.ownerEmail = owner.email;
          await ground.save();
          console.log(`  🔗 Linked ground "${ground.name}" → ${owner.email} (was ${oldOwner || 'unowned'})`);
        } else {
          console.log(`  ⏩ Ground "${ground.name}" already has owner: ${ground.ownerEmail}`);
        }
      }
    }

    console.log("\n✅ Seeding complete!");
    console.log("\n📋 Demo Owner Login Credentials (Gmail style):");
    console.log("─────────────────────────────────────────────────");
    DEMO_OWNERS.forEach((o) => {
      console.log(`  Ground:   ${o.groundKeyword}`);
      console.log(`  Email:    ${o.email}`);
      console.log(`  Password: ${o.password}`);
      console.log("─────────────────────────────────────────────────");
    });

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seedOwners();
