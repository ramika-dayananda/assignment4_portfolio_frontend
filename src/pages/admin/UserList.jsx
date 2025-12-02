import React, { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { useAuth } from "../../AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosClient.get("/users");
        setUsers(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await axiosClient.delete(`/users/${id}`);
      setUsers((s) => s.filter((u) => (u._id || u.id) !== id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="page" style={{ padding: 18 }}>
      <h2>Manage Users</h2>
      <div style={{ marginBottom: 12 }}>
        <button className="button" onClick={() => navigate("/admin")} style={{ marginRight: 8 }}>Back to Dashboard</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "tomato" }}>{error}</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <th style={{ padding: "8px 6px" }}>Name</th>
                <th style={{ padding: "8px 6px" }}>Email</th>
                <th style={{ padding: "8px 6px" }}>Role</th>
                <th style={{ padding: "8px 6px" }}>Created Date</th>
                <th style={{ padding: "8px 6px", width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: "10px 6px", textAlign: "center" }}>No users found.</td>
                </tr>
              ) : (
                users.map((u) => {
                  const id = u._id || u.id;
                  const createdDate = u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A";
                  return (
                    <tr key={id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                      <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{u.name}</td>
                      <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{u.email}</td>
                      <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{u.role || "user"}</td>
                      <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{createdDate}</td>
                      <td style={{ padding: "10px 6px", verticalAlign: "top" }}>
                        <button
                          onClick={() => handleDelete(id)}
                          style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
