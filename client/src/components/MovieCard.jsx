import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link
      to={localStorage.getItem("user") ? `/movie/${movie._id}` : `/auth`}
      className="bg-stone-100 shadow border-stone-200 hover:shadow-lg rounded-2xl overflow-hidden border max-w-xs transition-transform hover:scale-102 mb-5"
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-52 object-cover object-top"
      />
      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold truncate">{movie.Title}</h2>
        <p className="text-sm text-gray-600">{movie.Genre}</p>
        <p className="text-sm text-gray-500">
          Rating: <span className="font-medium">{movie.imdbRating}</span>
        </p>
        {/* <p className="text-xs text-gray-400 line-clamp-2">{movie.Plot}</p> */}
      </div>
    </Link>
  );
}

export default MovieCard;
