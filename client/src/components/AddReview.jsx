import React, { useState } from "react";

const AddReview = ({ movieId, userId, username, onAdd }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    await onAdd({ movieId, userId, username, comment });
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
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
        onClick={handleSubmit}
      >
        Submit Review
      </button>
    </div>
  );
};

export default AddReview;
