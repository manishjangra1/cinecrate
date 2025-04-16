import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import AddMovie from "../pages/AddMovie";
import UserLayout from "../components/Layout/UserLayout";
import MovieDetails from "../pages/MovieDetails";
import Authentication from "../pages/Authentication";
import UserProfile from "../pages/UserProfile";
import Explore from "../pages/Explore";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/add", element: <AddMovie /> },
        { path: "/movie/:id", element: <MovieDetails /> },
        { path: "/explore", element: <Explore /> },
        { path: "/profile", element: <UserProfile /> },
        { path: "/auth", element: <Authentication /> },
      ],
    },
  ]);

  return routes;
}
