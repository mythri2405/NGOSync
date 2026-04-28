import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { NGOs } from "./pages/NGOs";
import { Donations } from "./pages/Donations";
import { Matching } from "./pages/Matching";
import { Map } from "./pages/Map";
import { Leaderboard } from "./pages/Leaderboard";
import { AIInterpreter } from "./pages/AIInterpreter";
import { Login } from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "ngos", Component: NGOs },
      { path: "donations", Component: Donations },
      { path: "matching", Component: Matching },
      { path: "map", Component: Map },
      { path: "leaderboard", Component: Leaderboard },
      { path: "ai-interpreter", Component: AIInterpreter },
    ],
  },
]);
