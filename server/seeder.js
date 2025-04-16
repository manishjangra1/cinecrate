import mongoose from "mongoose";
import movies from "./data/movies.js";
import Movie from "./models/Movie.js";
import dotenv from "dotenv";

dotenv.config();

//connect to MONGODB
mongoose.connect(process.env.MONGO_URI);

//function to seed data
const seedData = async () => {
  try {
    //clear existing data
    await Movie.deleteMany();

    const sampleMovies = movies;
    //insert movies into database
    await Movie.insertMany(sampleMovies);
    console.log("Products data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.log("Error seeding the data:", error);
    process.exit(1);
  }
};

seedData();
