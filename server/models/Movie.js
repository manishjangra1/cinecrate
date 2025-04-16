import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    Source: { type: String, required: true },
    Value: { type: String, required: true },
  },
  { _id: false }
);

const movieSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Year: { type: String },
    Rated: { type: String },
    Released: { type: String },
    Runtime: { type: String },
    Genre: { type: String },
    Director: { type: String },
    Writer: { type: String },
    Actors: { type: String },
    Plot: { type: String },
    Language: { type: String },
    Country: { type: String },
    Awards: { type: String },
    Poster: { type: String },
    Ratings: [ratingSchema],
    Metascore: { type: String },
    imdbRating: { type: String },
    imdbVotes: { type: String },
    imdbID: { type: String, unique: true, required: true },
    Type: { type: String },
    DVD: { type: String },
    BoxOffice: { type: String },
    Production: { type: String },
    Website: { type: String },
    Response: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Movie", movieSchema);
