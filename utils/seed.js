// Imports
const connection = require('../config/connection');
const { User, Thought, Reaction } = require("../models");
const mongoose = require("mongoose");

// Seed data
const users = [
    {
      username: "Eddie",
      email: "eddievedder@gmail.com",
      thought: [],
    },
  ];

  console.log(connection);

// Connects to server
connection.once("open", async () => {
  console.log("connected");

  // Drop existing students
  await User.deleteMany({});

  // Adds seed data to database
  await User.collection.insertMany(users);

  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});