import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQualification } from "../services/qualificationService.js";
import { useAuth } from "../AuthContext.jsx";

export default function QualificationCreate() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user || user.role !== "admin") return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!school.trim()) {
      setError("School is required");
      return;
    }
    if (!degree.trim()) {
      setError("Degree is required");
      return;
    }
    if (!year.trim()) {
      setError("Year is required");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        school: school.trim(),
        degree: degree.trim(),
        year: year.trim(),
        description: description.trim(),
      };
      
      console.log("Sending qualification data:", payload);
      
      const res = await createQualification(payload);
      
      console.log("Qualification created:", res);
      
      setSuccess("Qualification created successfully!");
      setSchool("");
      setDegree("");
      setYear("");
      setDescription("");

      setTimeout(() => {
        navigate("/qualifications", { replace: true });
      }, 500);
    } catch (err) {
      console.error("Create qualification error:", err);
      const data = err?.response?.data;
      if (data?.error) {
        setError(data.error);
      } else if (data?.message) {
        setError(data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Save failed. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page" style={{ padding: 18 }}>
      <h2>Create Qualification</h2>

      <form onSubmit={handleSubmit} className="form" style={{ maxWidth: 720, marginTop: 12 }}>
        <input
          className="input"
          placeholder="School"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, marginBottom: 10 }}
        />
        <input
          className="input"
          placeholder="Degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, marginBottom: 10 }}
        />
        <input
          className="input"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, marginBottom: 10 }}
        />
        <textarea
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
            onClick={() => navigate("/qualifications")}
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

        {error && <div style={{ color: "tomato", marginTop: 12, fontWeight: 600 }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: 12, fontWeight: 600 }}>{success}</div>}
      </form>
    </div>
  );
}
