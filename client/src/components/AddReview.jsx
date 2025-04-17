import React, { useState } from "react";

const AddReview = ({ movieId, userId, username, userPic, onAdd }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    await onAdd({ movieId, userId, username, userPic, comment });
    setComment("");
  };

  return (
    <div className="my-4">
      <textarea
        className="w-full border rounded p-2"
        placeholder="Add your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-1 bg-[#3E3F5B] hover:bg-[#3E3F2B] text-white rounded"
        onClick={handleSubmit}
      >
        Submit Review
      </button>
    </div>
  );
};

export default AddReview;
