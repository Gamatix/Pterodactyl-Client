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
import Contact from "./pages/Contact.jsx";
import Settings from "./pages/Settings.jsx";
import CreateServer from "./pages/CreateServer.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NotFoundPage from "./pages/404.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Protected from "./Protected/Protected.jsx";
import EditServer from "./pages/EditServer.jsx";
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
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
      {
        path: "servers",
        element: (
          <Protected>
            <Servers />
          </Protected>
        ),
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "blogs",
        element: (
          <Protected>
            <Blogs />
          </Protected>
        ),
      },
      {
        path: "panel",
        element: (
          <Protected>
            <Panel />
          </Protected>
        ),
      },
      {
        path: "referrals",
        element: (
          <Protected>
            <Referrals />
          </Protected>
        ),
      },
      {
        path: "shop",
        element: (
          <Protected>
            <Shops />
          </Protected>
        ),
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "create-server",
        element: (
          <Protected>
            <CreateServer />
          </Protected>
        ),
      },
      {
        path: `/edit-server/:id`,
        element: (
          <Protected>
            <EditServer />
          </Protected>
        ),
      },
      
    ],
  },
  {
    path: "/login",
    element: (
      <Protected>
        <Login />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: (
      <Protected>
        <Signup />
      </Protected>
    ),
  },
  {
    path: `/join/:referralCode`,
    element: (
      <Protected>
        <Signup />
      </Protected>
    ),
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
