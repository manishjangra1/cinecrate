import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-[#3E3F5B] text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">
        CineCrate
      </Link>

      <nav className="space-x-4 text-lg">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/explore" className="hover:underline">
          Explore
        </Link>
      </nav>

      <div className="relative">
        {user ? (
          <div className="flex justify-center items-center gap-2">
            <h2>Hii, {user.name}</h2>
            <img
              src={user.picture || "/default-avatar.png"}
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-40 w-40 bg-white text-black rounded shadow-md z-50">
                <div className="px-4 py-2 border-b text-sm">{user.name}</div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/add"
                  className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setDropdownOpen(false)}
                >
                  Add Movie
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/auth"
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 font-semibold"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
