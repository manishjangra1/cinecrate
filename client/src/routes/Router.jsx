import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import AddMovie from "../pages/AddMovie";
import UserLayout from "../components/Layout/UserLayout";
import MovieDetails from "../pages/MovieDetails";
import Authentication from "../pages/Authentication";
import UserProfile from "../pages/UserProfile";
import Explore from "../pages/Explore";
import ProtectedRoute from "./ProtectedRoutes";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/auth",
      element: <Authentication />,
    },
    {
      path: "/",
      element: <UserLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "add",
          element: (
            <ProtectedRoute>
              <AddMovie />
            </ProtectedRoute>
          ),
        },
        {
          path: "movie/:id",
          element: (
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "explore",
          element: (
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: (
            <div className="text-center mt-20 text-xl">
              404 - Page Not Found
            </div>
          ),
        },
      ],
    },
  ]);

  return routes;
}
