import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const Explore = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [availableGenres, setAvailableGenres] = useState([]);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/movies`,
        {
          params: {
            search: query,
            genre: genre,
          },
        }
      );
      setMovies(res.data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/movies/genres`
      );
      setAvailableGenres(res.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, [query, genre]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore Movies</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-1/2 rounded"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Filter By Genre</option>
          {availableGenres.map((g, index) => (
            <option key={index} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          // <Link
          //   to={`/movie/${movie._id}`}
          //   key={movie._id}
          //   className="border rounded shadow hover:shadow-lg transition duration-300"
          // >
          //   <img
          //     src={movie.Poster}
          //     alt={movie.Title}
          //     className="h-64 w-full object-cover rounded-t"
          //   />
          //   <div className="p-2">
          //     <h2 className="text-lg font-semibold">{movie.Title}</h2>
          //     <p className="text-sm text-gray-600">{movie.Genre}</p>
          //   </div>
          // </Link>
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
