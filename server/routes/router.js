import express from "express";
import {
  addMovie,
  getAllMovies,
  getGenres,
  getSelectedMovie,
} from "../controllers/movieController.js";
import { googleLogin } from "../controllers/authController.js";
import { addReview, getReviews, likeReview } from "../controllers/reviewController.js";

//initialize router
const router = express.Router();

//google auth routes
router.post("/api/auth/google-login", googleLogin);

//movies routes
router.get("/api/movies", getAllMovies);
router.post("/api/movies", addMovie);
router.get("/api/movies/genres", getGenres);
router.get("/api/movies/:movieId", getSelectedMovie);

//review routes
router.post("/api/movies/reviews/:movieId", addReview);
router.get("/api/movies/reviews/:movieId", getReviews);
router.put("/api/movies/reviews/like/:reviewId", likeReview);

export default router;
