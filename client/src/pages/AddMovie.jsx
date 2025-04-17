import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function AddMovie() {
  const [form, setForm] = useState({
    Title: "",
    Year: "",
    Rated: "",
    Released: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Writer: "",
    Actors: "",
    Plot: "",
    Language: "",
    Country: "",
    Awards: "",
    Poster: "",
    imdbRating: "",
    BoxOffice: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        Genre: form.Genre.split(",").map((g) => g.trim()),
      };

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/movies`,
        payload
      );
      toast.success("Movie Added Successfully 🎉");
      navigate("/");
    } catch (err) {
      toast.error("Failed to add movie ❌");
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <ToastContainer />
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        🎬 Add New Movie
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-6 sm:p-8 rounded-xl shadow"
      >
        {/* Left Column */}
        <div className="space-y-4">
          <input
            name="Title"
            placeholder="Title *"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="Year"
            placeholder="Year"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="Rated"
            placeholder="Rated (e.g. PG-13)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="Released"
            placeholder="Released (e.g. 15 Oct 1999)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="Runtime"
            placeholder="Runtime (e.g. 139 min)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="Genre"
            placeholder="Genres (comma-separated)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="Director"
            placeholder="Director"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="Writer"
            placeholder="Writer(s)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <input
            name="Actors"
            placeholder="Actors"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="Language"
            placeholder="Language(s)"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="Country"
            placeholder="Country"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="Awards"
            placeholder="Awards"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="Poster"
            placeholder="Poster URL *"
            required
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="imdbRating"
            placeholder="IMDb Rating"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="BoxOffice"
            placeholder="Box Office Collection"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Plot Field Full Width */}
        <div className="sm:col-span-2">
          <textarea
            name="Plot"
            placeholder="Plot / Description"
            rows={4}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 flex flex-col sm:flex-row justify-end gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddMovie;
