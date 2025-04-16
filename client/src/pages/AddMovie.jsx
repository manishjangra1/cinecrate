import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

function AddMovie() {
  const [form, setForm] = useState({
    title: "",
    genre: "",
    description: "",
    posterUrl: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/movies`, {
      ...form,
      genre: form.genre.split(","),
    });
    toast("Movie Added Successfully");
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Movie</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="genre"
          placeholder="Genre (comma-separated)"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <input
          name="posterUrl"
          placeholder="Poster URL"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-2 border"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
