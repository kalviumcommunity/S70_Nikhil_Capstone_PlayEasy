/**
 * seed_owners.js
 * ──────────────────────────────────────────────────────────────────────
 * Creates demo ground-owner accounts and links existing grounds to them.
 *
 * Usage:
 *   node seed_owners.js
 *
 * Demo Owner Accounts Created:
 *   Email: greenfieldarena@playeasy.com   Password: owner@1234
 *   Email: sunrisecricket@playeasy.com    Password: owner@1234
 *   Email: pitchparadise@playeasy.com     Password: owner@1234
 *   Email: allroundarena@playeasy.com     Password: owner@1234
 * ──────────────────────────────────────────────────────────────────────
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const bcrypt = require("bcryptjs");

dotenv.config({ path: path.join(__dirname, ".env") });

const User = require("./models/User");
const Ground = require("./models/Ground");

const DEMO_OWNERS = [
  {
    name: "Greenfield Arena",
    email: "greenfieldarena@playeasy.com",
    password: "owner@1234",
    groundKeyword: "greenfield",
  },
  {
    name: "Sunrise Cricket Ground",
    email: "sunrisecricket@playeasy.com",
    password: "owner@1234",
    groundKeyword: "sunrise",
  },
  {
    name: "Pitch Paradise",
    email: "pitchparadise@playeasy.com",
    password: "owner@1234",
    groundKeyword: "pitch paradise",
  },
  {
    name: "All-round Arena",
    email: "allroundarena@playeasy.com",
    password: "owner@1234",
    groundKeyword: "all-round",
  },
];

async function seedOwners() {
  try {
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
        console.log(`⏩ Owner already exists: ${owner.email}`);
      }

      // Link matching grounds to this owner
      const grounds = await Ground.find({
        name: { $regex: owner.groundKeyword, $options: "i" },
      });

      for (const ground of grounds) {
        if (!ground.ownerEmail) {
          ground.ownerEmail = owner.email;
          await ground.save();
          console.log(`  🔗 Linked ground "${ground.name}" → ${owner.email}`);
        } else {
          console.log(`  ⏩ Ground "${ground.name}" already has owner: ${ground.ownerEmail}`);
        }
      }
    }

    console.log("\n✅ Seeding complete!");
    console.log("\n📋 Demo Owner Login Credentials:");
    console.log("─────────────────────────────────────────────────");
    DEMO_OWNERS.forEach((o) => {
      console.log(`  Ground: ${o.name}`);
      console.log(`  Email:  ${o.email}`);
      console.log(`  Pass:   ${o.password}`);
      console.log("─────────────────────────────────────────────────");
    });

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seedOwners();
