import { createBrowserRouter, Navigate } from "react-router-dom";

import Register from "../Auth/Pages/Register.jsx";
import Login from "../Auth/Pages/Login.jsx";

import Dashboard from "../Task/Pages/Dashboard.jsx";
import CreateTask from "../Task/Pages/CreateTask.jsx";
import EditTask from "../Task/Pages/EditTask.jsx";

import ProtectedRoute from "../Auth/Components/ProtectedRoute.jsx";
import PublicRoute from "../Auth/Components/PublicRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },

  {
    path: "/task/create",
    element: (
      <ProtectedRoute>
        <CreateTask />
      </ProtectedRoute>
    ),
  },

  {
    path: "/task/edit/:id",
    element: (
      <ProtectedRoute>
        <EditTask />
      </ProtectedRoute>
    ),
  },

  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },

  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
]);