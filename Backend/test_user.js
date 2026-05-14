require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    try {
      const user = await User.create({ name: "Test User", email: `test${Date.now()}@example.com`, password: "password123" });
      console.log("User created:", user);
    } catch (err) {
      console.error("Error creating user:", err);
    }
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection error:", err);
    process.exit(1);
  });
