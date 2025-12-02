import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getQualification,
  updateQualification,
} from "../services/qualificationService.js";

export default function QualificationEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getQualification(id);
        setSchool(data.school || "");
        setDegree(data.degree || "");
        setYear(data.year || "");
        setDescription(data.description || "");
      } catch (err) {
        setError("Failed to load qualification.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateQualification(id, { school, degree, year, description });
      navigate("/qualifications", { replace: true });
    } catch (err) {
      setError("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="page" style={{ padding: 18 }}>Loading...</div>;

  return (
    <div className="page" style={{ padding: 18 }}>
      <h2>Edit Qualification</h2>

      <form onSubmit={handleSubmit} className="form" style={{ maxWidth: 720, marginTop: 12 }}>
        <input className="input" placeholder="School" value={school} onChange={(e) => setSchool(e.target.value)} required />
        <input className="input" placeholder="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} required />
        <input className="input" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required />
        <textarea className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <button type="submit" className="button" style={{ background: "linear-gradient(90deg,#10b981,#059669)", color: "#fff" }} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button type="button" className="button ghost" onClick={() => navigate("/qualifications")}>
            Cancel
          </button>
        </div>

        {error && <div style={{ color: "tomato", marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
}
