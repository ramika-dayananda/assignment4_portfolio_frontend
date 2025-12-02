import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { getAllProjects, deleteProject } from "../services/projectService.js";

export default function ProjectList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fallback projects to display when backend has none
  const fallbackProjects = [
    {
      id: "fallback-p1",
      title: "Fitness Tracker App",
      description: "React-based gym tracker to monitor workouts, body weight, and volume lifted. Focused on clear UI and usability.",
      imageUrl: "/assets/p1.jpg",
      technologies: ["React", "CSS", "LocalStorage"],
    },
    {
      id: "fallback-p2",
      title: "Bug Smasher Game",
      description: "HTML/CSS/JS game where players smash bugs for points — demonstrates DOM interaction, game logic, and scoring.",
      imageUrl: "/assets/p2.png",
      technologies: ["JavaScript", "HTML", "CSS"],
    },
    {
      id: "fallback-p3",
      title: "Retail Database System",
      description: "Oracle SQL Developer project managing customers, inventory and sales. Includes ERD design and complex queries.",
      imageUrl: "/assets/p3.png",
      technologies: ["SQL", "Oracle", "Database Design"],
    },
  ];

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load projects.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects((p) => p.filter((x) => (x._id || x.id) !== id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  // Show fallback when no backend projects exist
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;
  const isShowingFallback = projects.length === 0 && !loading;

  return (
    <div className="page" style={{ padding: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Projects</h2>
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/projects/new")}
            className="button"
            style={{ background: "linear-gradient(90deg,#7c5cff,#6b46ff)", color: "white" }}
          >
            + Add New
          </button>
        )}
      </div>

      <div style={{ marginTop: 16 }}>
        {loading && <div>Loading projects...</div>}
        {error && !loading && <div style={{ color: "tomato" }}>{error}</div>}
        {!loading && projects.length === 0 && !isShowingFallback && <div>No projects found.</div>}

        <div style={{ marginTop: 12, display: "grid", gap: 16 }}>
          {displayProjects.map((proj) => {
            const id = proj._id || proj.id;
            return (
              <div
                key={id}
                className="project-card"
                style={{
                  display: "flex",
                  gap: 12,
                  padding: 12,
                  alignItems: "flex-start",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.005))",
                }}
              >
                <img
                  src={proj.imageUrl || "/assets/p1.jpg"}
                  alt={proj.title}
                  style={{ width: 180, height: 110, objectFit: "cover", borderRadius: 8 }}
                  onError={(e) => { e.target.src = "/assets/p1.jpg"; }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 8px 0" }}>{proj.title}</h3>
                  <p style={{ margin: 0, color: "var(--muted)" }}>{proj.description}</p>
                  {proj.technologies && (
                    <p style={{ marginTop: 8, color: "var(--muted)", fontSize: 13 }}>
                      Tech: {Array.isArray(proj.technologies) ? proj.technologies.join(", ") : String(proj.technologies)}
                    </p>
                  )}
                </div>

                {/* Only show admin controls for real backend projects, not fallback */}
                {!isShowingFallback && user?.role === "admin" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <button
                      onClick={() => navigate(`/projects/edit/${id}`)}
                      style={{
                        background: "#3b82f6",
                        color: "#fff",
                        borderRadius: 8,
                        padding: "8px 10px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        borderRadius: 8,
                        padding: "8px 10px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
