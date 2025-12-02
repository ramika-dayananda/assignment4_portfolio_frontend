import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar.jsx";
import { getDashboardStats } from "../../services/adminService.js";
import { useAuth } from "../../AuthContext.jsx";
import { deleteMessage } from "../../services/contactService.js";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalQualifications: 0,
    totalContacts: 0,
    totalUsers: 0,
    recentContacts: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadStats = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleDeleteMessage = async (id) => {
    if (!confirm("Delete message?")) return;
    try {
      await deleteMessage(id);
      setStats((s) => ({ ...s, recentContacts: s.recentContacts.filter((m) => (m._id || m.id) !== id), totalContacts: s.totalContacts - 1 }));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="page" style={{ display: "flex", gap: 18, padding: 18 }}>
      <AdminSidebar />

      <main style={{ flex: 1 }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
          <div style={{ color: "var(--muted)" }}>Welcome, {user.name}</div>
        </header>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "tomato" }}>{error}</div>
        ) : (
          <>
            <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 18 }}>
              <div className="panel" style={{ padding: 12, borderRadius: 10 }}>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>Total Users</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{stats.totalUsers}</div>
              </div>

              <div className="panel" style={{ padding: 12, borderRadius: 10 }}>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>Total Projects</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{stats.totalProjects}</div>
              </div>

              <div className="panel" style={{ padding: 12, borderRadius: 10 }}>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>Qualifications</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{stats.totalQualifications}</div>
              </div>

              <div className="panel" style={{ padding: 12, borderRadius: 10 }}>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>Contact Messages</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>{stats.totalContacts}</div>
              </div>
            </section>

            <section style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="button" onClick={() => navigate("/projects")} style={{ background: "linear-gradient(90deg,#7c5cff,#6b46ff)", color: "#fff" }}>
                  Manage Projects
                </button>
                <button className="button" onClick={() => navigate("/projects/new")} style={{ background: "linear-gradient(90deg,#10b981,#059669)", color: "#fff" }}>
                  Add New Project
                </button>
                <button className="button" onClick={() => navigate("/qualifications")} style={{ background: "linear-gradient(90deg,#7c5cff,#6b46ff)", color: "#fff" }}>
                  Manage Qualifications
                </button>
                <button className="button" onClick={() => navigate("/qualifications/new")} style={{ background: "linear-gradient(90deg,#10b981,#059669)", color: "#fff" }}>
                  Add Qualification
                </button>
                <button className="button" onClick={() => navigate("/admin/contacts")} style={{ background: "linear-gradient(90deg,#7c5cff,#6b46ff)", color: "#fff" }}>
                  View Contacts
                </button>
              </div>
            </section>

            <section>
              <h3 style={{ marginTop: 0 }}>Recent Messages</h3>
              {stats.recentContacts.length === 0 ? (
                <div>No recent messages.</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <th style={{ padding: "8px 6px" }}>First Name</th>
                        <th style={{ padding: "8px 6px" }}>Last Name</th>
                        <th style={{ padding: "8px 6px" }}>Email</th>
                        <th style={{ padding: "8px 6px" }}>Message</th>
                        <th style={{ padding: "8px 6px" }}>Date</th>
                        <th style={{ padding: "8px 6px" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentContacts.map((m) => {
                        const id = m._id || m.id;
                        const date = new Date(m.createdAt || m.created_at || m.date || Date.now()).toLocaleString();
                        const short = (m.message || "").length > 120 ? (m.message || "").slice(0, 120) + "…" : m.message;
                        return (
                          <tr key={id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                            <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{m.firstname || "N/A"}</td>
                            <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{m.lastname || "N/A"}</td>
                            <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{m.email}</td>
                            <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{short}</td>
                            <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{date}</td>
                            <td style={{ padding: "10px 6px", verticalAlign: "top" }}>
                              <button
                                onClick={() => handleDeleteMessage(id)}
                                style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
