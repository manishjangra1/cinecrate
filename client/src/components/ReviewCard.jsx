import React from "react";

const ReviewCard = ({ review, onLike }) => {
  return (
    <div className="p-4 border rounded shadow">
      <div className="flex justify-between">
        <h3 className="font-semibold">{review.username}</h3>
        <button onClick={() => onLike(review._id)} className="text-blue-500">
          ❤️ {review.likes.length}
        </button>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
