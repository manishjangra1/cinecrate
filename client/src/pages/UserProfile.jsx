import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage (or context)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user)
    return <div className="text-center py-10">Please log in first.</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="bg-white shadow-md rounded-xl p-6 text-center space-y-4">
        <img
          src={user.picture || "/default-avatar.png"}
          alt="User avatar"
          className="w-24 h-24 mx-auto rounded-full border"
        />
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/auth");
              window.location.reload();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>

          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
