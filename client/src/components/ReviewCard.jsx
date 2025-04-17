import React from "react";

const ReviewCard = ({ review, onLike }) => {
  const formattedDate = new Date(review.createdAt).toLocaleString();

  return (
    <div className="p-4 border-stone-200 rounded shadow bg-stone-100">
      <div className="flex justify-between items-center mb-1">
        <div className="flex justify-center items-center gap-2">
          <img
            src={review.userPic || "/default-avatar.png"}
            alt={review.username}
            className="w-8 h-8 rounded-full object-cover border"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
          <h3 className="font-semibold">{review.username}</h3>
        </div>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>

      <hr className="text-stone-300 mb-2" />

      <div className="flex items-center justify-between">
        <p className="text-gray-700 text-sm">{review.comment}</p>

        <button
          onClick={() => onLike(review._id)}
          className="text-red-500 text-sm"
        >
          ❤️ {review.likes.length}
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
