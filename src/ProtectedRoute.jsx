import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function ProtectedRoute({ children, adminOnly = false, roles = null }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signin" replace />;

  if (adminOnly && user.role !== "admin") return <Navigate to="/" replace />;

  if (Array.isArray(roles) && roles.length > 0 && !roles.includes(user.role)) return <Navigate to="/" replace />;

  return <>{children}</>;
}
