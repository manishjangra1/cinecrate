import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddReview from "../components/AddReview";
import ReviewList from "../components/ReviewList";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchMovie = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/movies/${id}`
      );
      setMovie(res.data);
    } catch (err) {
      console.error("Error fetching movie:", err);
    }
  };

  const fetchReviews = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/movies/reviews/${id}`
    );
    setReviews(res.data);
  };

  const handleAddReview = async (newReview) => {
    await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/movies/reviews/${id}`,
      newReview
    );
    fetchReviews();
  };

  const handleLike = async (reviewId) => {
    await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/movies/reviews/like/${reviewId}`,
      {
        userId: user._id,
      }
    );
    fetchReviews();
  };

  useEffect(() => {
    fetchMovie();
    fetchReviews();
  }, [id]);

  if (!movie) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full md:w-72 rounded-lg shadow-md object-cover"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <p className="text-gray-600 text-sm">
            {movie.Year} • {movie.Genre}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Rating:</strong> {movie.imdbRating || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="text-sm text-gray-500">
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p className="text-gray-500 leading-relaxed">
            <strong>Plot:</strong>
            {movie.Plot}
          </p>
        </div>
      </div>
      {/* Review Section below */}

      <AddReview
        movieId={id}
        userId={user._id}
        username={user.name}
        userPic={user.picture}
        onAdd={handleAddReview}
      />

      <ReviewList reviews={reviews} onLike={handleLike} />
    </div>
  );
}

export default MovieDetails;
