import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Sewing from "./pages/Sewing";
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
    ],
  },
]);
