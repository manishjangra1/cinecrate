import Movie from "../models/Movie.js";

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 24;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const genre = req.query.genre || "";

    const query = {};

    if (search) {
      query.Title = { $regex: search, $options: "i" }; // case-insensitive search
    }

    if (genre) {
      query.Genre = { $regex: genre, $options: "i" }; // partial match on Genre string
    }

    const movies = await Movie.find(query).skip(skip).limit(limit);
    const total = await Movie.countDocuments(query);

    res.status(200).json({
      movies,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

// Get selected movie
export const getSelectedMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: "Movie Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Sort by genre
export const getGenres = async (req, res) => {
  try {
    const genreStrings = await Movie.find().distinct("Genre");

    const allGenres = genreStrings.flatMap((genreStr) =>
      genreStr.split(",").map((g) => g.trim())
    );

    const uniqueGenres = [...new Set(allGenres)];

    res.status(200).json({ genres: uniqueGenres });
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ message: "Failed to fetch genres" });
  }
};

// Add a new movie
export const addMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(400).json({ error: "Error adding movie" });
  }
};
