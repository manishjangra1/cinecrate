import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [userReviews, setUserReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setProfilePic(parsed.picture || "");
      fetchUserReviews(parsed._id);
    }
  }, []);

  const fetchUserReviews = async (userId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/reviews/user/${userId}`
      );
      setUserReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch user reviews", err);
    }
  };

  const handleUpdateProfilePic = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/users/update-profile-pic`,
        {
          userId: user._id,
          profilePic,
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update profile picture", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/auth");
    window.location.reload();
  };

  if (!user)
    return <div className="text-center py-10">Please log in first.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div className="bg-white shadow-md rounded-xl p-6 text-center space-y-4">
        <img
          src={user.picture || "/default-avatar.png"}
          alt="User avatar"
          className="w-24 h-24 mx-auto rounded-full border object-cover"
        />
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>

        {editMode ? (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter new profile picture URL"
              className="w-full px-3 py-2 border rounded"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleUpdateProfilePic}
            >
              Save Picture
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-[#3E3F5B] hover:bg-[#3e3f2b] text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        )}

        <button
          onClick={handleLogout}
          className="bg-rose-500 hover:bg-red-800 text-white px-4 py-2 rounded mt-4 ml-2"
        >
          Logout
        </button>
      </div>

      {/* User Reviews */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Your Reviews</h3>
        {userReviews.length === 0 ? (
          <p className="text-gray-500">You haven't reviewed any movies yet.</p>
        ) : (
          <ul className="space-y-4">
            {userReviews.map((review) => (
              <Link
                to={`/movie/${review.movie._id}`}
                key={review._id}
                className="flex items-start gap-4 border-b pb-4"
              >
                {review.movie && (
                  <img
                    src={review.movie.Poster}
                    alt={review.movie.Title}
                    className="w-16 h-24 object-cover rounded"
                  />
                )}
                <div>
                  <h4 className="text-md font-semibold">
                    {review.movie?.Title}
                  </h4>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Likes: {review.likes.length}
                  </p>
                </div>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
