import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import CreateprojectPage from "./pages/CreateprojectPage.jsx";
import CreatepledgePage from "./pages/CreatepledgePage.jsx";
import "./main.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />, // The "parent" route
    children: [ // The "child" routes
      { path: "/", element: <HomePage /> }, // When URL is "/", show HomePage
      { path: "/login", element: <LoginPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/createproject", element: <CreateprojectPage /> },
      { path: "/project/:id/createpledge", element: <CreatepledgePage /> }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(

  // Finds the < div id = "root" > in your HTML file and tells React to render everything there.

  <React.StrictMode>
    {/* Here we wrap our app in the router provider so they render, RouterProvider
    This wraps your entire app and connects it to the router */}
    <AuthProvider>
      <RouterProvider router={router} />
      <footer className="footer">
        <p>&copy; 2024 UpliftU. All Rights Reserved.</p>
      </footer>
    </AuthProvider>

  </React.StrictMode>

  // React.StrictMode is a special tool in React that helps developers catch potential problems in their code during development.It doesn’t change how your app works in production but provides additional warnings and checks to ensure your app is following best practices.

);