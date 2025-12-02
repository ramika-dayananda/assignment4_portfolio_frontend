import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext.jsx";

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const linkStyle = {
    display: "block",
    padding: "10px 12px",
    color: "var(--muted)",
    textDecoration: "none",
    borderRadius: 8,
  };

  const activeStyle = {
    background: "rgba(124,92,255,0.08)",
    color: "var(--accent)",
    fontWeight: 700,
  };

  return (
    <aside style={{ width: 220, padding: 12 }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontWeight: 800, color: "var(--text)", marginBottom: 6 }}>Admin</div>
        <div style={{ color: "var(--muted)", fontSize: 13 }}>Dashboard</div>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <NavLink to="/admin" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Manage Users
        </NavLink>
        <NavLink to="/projects" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Manage Projects
        </NavLink>
        <NavLink to="/qualifications" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Qualifications
        </NavLink>
        <NavLink to="/admin/contacts" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
          Contact Messages
        </NavLink>
        <NavLink to="/projects/new" style={linkStyle}>
          + Add New Project
        </NavLink>
        <NavLink to="/qualifications/new" style={linkStyle}>
          + Add Qualification
        </NavLink>
      </nav>

      <div style={{ marginTop: 18 }}>
        <button
          onClick={handleLogout}
          style={{
            background: "linear-gradient(90deg,#ef4444,#dc2626)",
            color: "#fff",
            padding: "8px 10px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
