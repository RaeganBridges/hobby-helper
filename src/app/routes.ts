import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Sewing from "./pages/Sewing";
import CarRepair from "./pages/CarRepair";
import Games from "./pages/Games";
import Reading from "./pages/Reading";
import RootLayout from "./components/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "sewing",
        Component: Sewing,
      },
      {
        path: "car-repair",
        Component: CarRepair,
      },
      {
        path: "games",
        Component: Games,
      },
      {
        path: "reading",
        Component: Reading,
      },
    ],
  },
]);