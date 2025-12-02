import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProject, updateProject } from "../services/projectService.js";

export default function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getProject(id);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setPreview(data.image || data.imageUrl || "");
        setTechnologies(Array.isArray(data.tech) ? data.tech.join(", ") : (data.technologies || data.tech || ""));
      } catch (err) {
        setError("Failed to load project.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setImageFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
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
        payload = { title: title.trim(), description: description.trim(), tech: techArray, imageUrl: preview };
      }

      await updateProject(id, payload);
      navigate("/projects", { replace: true });
    } catch (err) {
      console.error("Update failed:", err);
      const data = err?.response?.data;
      setError(data?.error || data?.message || "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="page" style={{ padding: 18 }}>Loading...</div>;

  return (
    <div className="page" style={{ padding: 18 }}>
      <h2>Edit Project</h2>

      <form onSubmit={handleSubmit} className="form" style={{ maxWidth: 880, marginTop: 12 }}>
        <input className="input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <div style={{ marginTop: 8 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Replace Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {preview && (
            <div style={{ marginTop: 8 }}>
              <img src={preview} alt="preview" style={{ width: 260, height: 150, objectFit: "cover", borderRadius: 8 }} />
            </div>
          )}
        </div>

        <input className="input" placeholder="Technologies (comma separated)" value={technologies} onChange={(e) => setTechnologies(e.target.value)} />

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button type="submit" className="button" style={{ background: "linear-gradient(90deg,#10b981,#059669)", color: "white" }} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button type="button" className="button ghost" onClick={() => navigate("/projects")}>
            Cancel
          </button>
        </div>

        {error && <div style={{ color: "tomato", marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
}
