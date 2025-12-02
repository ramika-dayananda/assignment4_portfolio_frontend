import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../services/projectService.js";
import { useAuth } from "../AuthContext.jsx";

export default function ProjectCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user || user.role !== "admin") return null;

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setImageFile(f);
    if (f) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    setSaving(true);
    try {
      const techArray = technologies.split(",").map((t) => t.trim()).filter(Boolean);

      let payload;
      if (imageFile) {
        payload = new FormData();
        payload.append("title", title.trim());
        payload.append("description", description.trim());
        payload.append("tech", JSON.stringify(techArray));
        payload.append("image", imageFile);
      } else {
        payload = { title: title.trim(), description: description.trim(), tech: techArray, imageUrl: "" };
      }

      await createProject(payload);

      setSuccess("Project created successfully!");
      setTitle("");
      setDescription("");
      setImageFile(null);
      setPreview("");
      setTechnologies("");

      setTimeout(() => navigate("/projects", { replace: true }), 600);
    } catch (err) {
      console.error("Create project error:", err);
      const data = err?.response?.data;
      setError(data?.error || data?.message || err.message || "Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page" style={{ padding: 18 }}>
      <h2>Create Project</h2>

      <form onSubmit={handleSubmit} className="form" style={{ maxWidth: 880, marginTop: 12 }}>
        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, marginBottom: 10 }}
        />
        <textarea
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, marginBottom: 10 }}
        />

        <div style={{ marginTop: 8 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Upload Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <div style={{ marginTop: 8 }}>
              <img
                src={preview}
                alt="preview"
                style={{ width: 260, height: 150, objectFit: "cover", borderRadius: 8 }}
              />
            </div>
          )}
        </div>

        <input
          className="input"
          placeholder="Technologies (comma separated)"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          style={{ padding: 10, borderRadius: 8, marginBottom: 10 }}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <button
            type="submit"
            className="button"
            style={{
              background: "linear-gradient(90deg,#10b981,#059669)",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 8,
              border: "none",
              cursor: saving ? "not-allowed" : "pointer",
              fontWeight: 600,
              opacity: saving ? 0.7 : 1,
            }}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            className="button ghost"
            onClick={() => navigate("/projects")}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Cancel
          </button>
        </div>

        {error && (
          <div
            style={{
              color: "tomato",
              marginTop: 12,
              fontWeight: 600,
              padding: 10,
              background: "rgba(239,68,68,0.1)",
              borderRadius: 8,
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: "green",
              marginTop: 12,
              fontWeight: 600,
              padding: 10,
              background: "rgba(16,185,129,0.1)",
              borderRadius: 8,
            }}
          >
            {success}
          </div>
        )}
      </form>
    </div>
  );
}
