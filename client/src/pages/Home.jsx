import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
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
      setSearchParams({ page: page.toString() });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Movies
      </h1>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(pageParam - 1)}
          disabled={pageParam === 1}
          className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-3 py-1 border rounded transition text-sm sm:text-base ${
              pageParam === idx + 1
                ? "bg-gray-300 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(pageParam + 1)}
          disabled={pageParam === totalPages}
          className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
