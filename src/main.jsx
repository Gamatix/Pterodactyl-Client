import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Layout from "./Layout/Layout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Servers from "./pages/Servers.jsx";
import Users from "./pages/Users.jsx";
import Blogs from "./pages/Blogs.jsx";
import Panel from "./pages/Panel.jsx";
import Referrals from "./pages/Referrals.jsx";
import Shops from "./pages/Shops.jsx";
import Home from "./pages/Home.jsx";
import Support from "./pages/Support.jsx";
import Settings from "./pages/Settings.jsx";
import CreateServer from "./pages/CreateServer.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NotFoundPage from "./pages/404.jsx";
const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "servers",
        element: <Servers />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "panel",
        element: <Panel />,
      },
      {
        path: "referrals",
        element: <Referrals />,
      },
      {
        path: "shop",
        element: <Shops />,
      },
      {
        path: "support",
        element: <Support />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "create-server",
        element: <CreateServer />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
