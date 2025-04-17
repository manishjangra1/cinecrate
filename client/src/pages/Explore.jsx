import { useEffect, useState } from "react";
import axios from "axios";
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
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Explore Movies
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full sm:w-1/2 focus:outline-none focus:ring focus:border-blue-400 transition"
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full sm:w-1/3 focus:outline-none focus:ring focus:border-blue-400 transition"
        >
          <option value="">Filter By Genre</option>
          {availableGenres.map((g, index) => (
            <option key={index} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Movies Grid */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
        ) : (
          <p className="col-span-full text-center text-gray-600">
            No movies found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Explore;
