import React from "react";

const ReviewCard = ({ review, onLike }) => {
  const formattedDate = new Date(review.createdAt).toLocaleString();

  return (
    <div className="p-4 sm:p-5 border border-stone-200 rounded-xl shadow bg-stone-100">
      {/* User Info and Date */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
        <div className="flex items-center gap-2">
          <img
            src={review.userPic || "/default-avatar.png"}
            alt={review.username}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
          <h3 className="font-semibold text-sm sm:text-base">
            {review.username}
          </h3>
        </div>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>

      <hr className="border-stone-300 mb-2" />

      {/* Comment and Like Button */}
      <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
        <p className="text-gray-700 text-sm">{review.comment}</p>

        <button
          onClick={() => onLike(review._id)}
          className="text-red-500 text-sm hover:scale-105 transition-transform"
        >
          ❤️ {review.likes.length}
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
