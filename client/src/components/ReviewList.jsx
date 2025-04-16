import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews, onLike }) => {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-bold">Reviews</h2>
      {reviews.map((review) => (
        <ReviewCard key={review._id} review={review} onLike={onLike} />
      ))}
    </div>
  );
};

export default ReviewList;
