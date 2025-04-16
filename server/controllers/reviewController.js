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
