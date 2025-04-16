import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/movies?page=${pageParam}&limit=24`
        );
        setMovies(res.data.movies);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [pageParam]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() }); // ✅ Ensure it's a string
      window.scrollTo({ top: 0, behavior: "smooth" }); // optional
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movie List</h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          // <Link
          //   to={`/movie/${movie._id}`}
          //   key={movie._id}
          //   className="mb-3 p-3 border rounded shadow w-52"
          // >
          //   <img
          //     src={movie.Poster}
          //     alt={movie.Title}
          //     className="h-[300px] object-cover"
          //   />
          //   <h2 className="text-xl">{movie.Title}</h2>
          //   <p className="hidden">{movie.Plot}</p>
          //   <p>{movie.Genre}</p>
          // </Link>

          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => handlePageChange(pageParam - 1)}
          disabled={pageParam === 1}
          className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-3 py-1 border rounded ${
              pageParam === idx + 1
                ? "bg-gray-300 font-bold"
                : "hover:bg-gray-200"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(pageParam + 1)}
          disabled={pageParam === totalPages}
          className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
