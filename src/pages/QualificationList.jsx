import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import {
  getAllQualifications,
  deleteQualification,
} from "../services/qualificationService.js";

export default function QualificationList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllQualifications();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load qualifications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this qualification?")) return;
    try {
      await deleteQualification(id);
      setItems((s) => s.filter((i) => (i._id || i.id) !== id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  // Static fallback content to show to visitors when backend has no entries
  const fallback = [
    {
      key: "centennial",
      school: "Centennial College",
      degree: "Software Engineering Technology — Co‑op",
      year: "2025–Present",
      description:
        "Currently studying Software Engineering Technology with a focus on full‑stack web development and UI/UX.",
    },
    {
      key: "highschool",
      school: "High School",
      degree: "High School Diploma",
      year: "Completed",
      description: "Completed high school prior to starting college studies.",
    },
  ];

  return (
    <div className="page" style={{ padding: 18 }}>
      <div style={{ marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>Qualifications</h1>
        <p style={{ color: "var(--muted)", marginTop: 8 }}>
          Education and qualifications — overview of studies and training. I’m
          currently a Centennial College student in Software Engineering
          Technology (Co‑op), and I enjoy building web apps, learning new
          technologies, and exploring UI/UX design.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/qualifications/new")}
            className="button"
            style={{
              background: "linear-gradient(90deg,#2ecc71,#22c55e)",
              color: "#fff",
            }}
          >
            + Add Qualification
          </button>
        )}
      </div>

      <div style={{ marginTop: 14 }}>
        {loading && <div>Loading qualifications...</div>}
        {error && <div style={{ color: "tomato" }}>{error}</div>}

        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {(!loading && items.length === 0 ? fallback : items).map((q) => {
            const id = q._id || q.id || q.key;
            return (
              <div
                key={id}
                className="project-card"
                style={{
                  padding: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 6px 0" }}>
                    {q.school} — {q.degree} {q.year ? `(${q.year})` : ""}
                  </h3>
                  <p style={{ margin: 0, color: "var(--muted)" }}>
                    {q.description}
                  </p>
                </div>

                {user?.role === "admin" && items.length > 0 && (
                  <div
                    style={{
                      marginLeft: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <button
                      onClick={() => navigate(`/qualifications/edit/${id}`)}
                      style={{
                        background: "#3b82f6",
                        color: "white",
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
                        color: "white",
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
