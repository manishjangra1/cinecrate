import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews, onLike }) => {
  return (
    <div className="mt-6 px-4 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} onLike={onLike} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
