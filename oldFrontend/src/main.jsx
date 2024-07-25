import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import AllProjects from "./components/AllProjects.jsx";
import AllBlogs from "./components/AllBlogs.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <ErrorPage /> },
  { path: "/projects", element: <AllProjects /> },
  { path: "/blogs", element: <AllBlogs /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
