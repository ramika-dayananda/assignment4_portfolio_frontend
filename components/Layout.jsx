import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/AuthContext.jsx";

export default function Layout() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  if (loading) {
    return (
      <nav style={{ padding: "15px", background: "#0b1220", color: "#9aa6bf" }}>
        <Link to="/" style={{ color: "inherit", marginRight: 12 }}>Home</Link>
        <span style={{ marginLeft: 12 }}>Loading...</span>
      </nav>
    );
  }

  return (
    <nav style={{ padding: "15px", background: "#0b1220", color: "#d9e6ff", borderRadius: 6, display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flex: 1 }}>
        <Link to="/" style={{ color: "inherit", marginRight: 12 }}>Home</Link>
        <Link to="/about" style={{ color: "inherit", marginRight: 12 }}>About</Link>
        <Link to="/projects" style={{ color: "inherit", marginRight: 12 }}>Projects</Link>
        <Link to="/services" style={{ color: "inherit", marginRight: 12 }}>Services</Link>
        <Link to="/qualifications" style={{ color: "inherit", marginRight: 12 }}>Education</Link>
        <Link to="/contact" style={{ color: "inherit", marginRight: 12 }}>Contact</Link>
        {user?.role === "admin" && (
          <div style={{ marginLeft: 8 }}>
            <Link to="/admin" style={{ color: "var(--accent)", fontWeight: 700, marginLeft: 8 }}>Admin</Link>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {user ? (
          <>
            <div style={{ color: "var(--muted)" }}>Welcome, <span style={{ fontWeight: 700, color: "var(--text)" }}>{user.name}</span> ({user.role})</div>

            <button
              onClick={handleLogout}
              style={{ padding: "6px 10px", borderRadius: 8, cursor: "pointer" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" style={{ marginRight: 12, color: "inherit" }}>Sign In</Link>
            <Link to="/signup" style={{ color: "inherit" }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
