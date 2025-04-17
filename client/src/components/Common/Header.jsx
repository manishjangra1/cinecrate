import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional: for hamburger icon

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
    <header className="bg-[#3E3F5B] text-white px-4 py-3 shadow-md w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          CineCrate
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-4 text-lg">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/explore" className="hover:underline">
            Explore
          </Link>
        </nav>

        {/* User Section */}
        <div className="hidden md:block relative">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm">Hi, {user.name}</span>
              <img
                src={user.picture || "/default-avatar.png"}
                alt="profile"
                className="w-9 h-9 rounded-full cursor-pointer border-2 border-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-40 bg-white text-black rounded shadow-md z-50">
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
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-4 pb-4">
          <Link
            to="/"
            className="block hover:underline pl-2"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="block hover:underline pl-2"
            onClick={() => setMenuOpen(false)}
          >
            Explore
          </Link>

          {user ? (
            <div className="space-y-2 mt-2 border-t pt-2 bg-stone-300 rounded-xl pl-2 pb-2">
              <div className="text-sm text-[#3E3F5B]">Hi, {user.name}</div>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-[#3E3F5B] hover:underline"
              >
                Profile
              </Link>
              <Link
                to="/add"
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-[#3E3F5B] hover:underline"
              >
                Add Movie
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left text-sm text-red-400 hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMenuOpen(false)}
              className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 font-semibold"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
