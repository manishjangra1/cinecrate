import Movie from "../models/Movie.js";
import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
  const { movieId } = req.params;
  const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });
  res.json(reviews);
};

export const addReview = async (req, res) => {
  const newReview = new Review(req.body);
  await newReview.save();
  res.status(201).json(newReview);
};

export const likeReview = async (req, res) => {
  const { reviewId } = req.params;
  const { userId } = req.body;

  const review = await Review.findById(reviewId);
  const index = review.likes.indexOf(userId);

  if (index === -1) {
    review.likes.push(userId);
  } else {
    review.likes.splice(index, 1);
  }

  await review.save();
  res.json(review);
};

export const getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const reviews = await Review.find({ userId });

    // Fetch movie info for each review
    const movieIds = reviews.map((r) => r.movieId);
    const movies = await Movie.find({ _id: { $in: movieIds } });

    // Merge movie info with reviews
    const reviewsWithMovie = reviews.map((review) => {
      const movie = movies.find((m) => m._id.equals(review.movieId));
      return {
        ...review._doc,
        movie: movie
          ? {
              _id: movie._id,
              Title: movie.Title,
              Poster: movie.Poster,
            }
          : null,
      };
    });

    res.json(reviewsWithMovie);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user reviews" });
  }
};
