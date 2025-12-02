import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.jsx";
import { getMessages, deleteMessage } from "../services/contactService.js";

export default function ContactList() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getMessages();
        setMessages(data || []);
      } catch (err) {
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      setMessages((s) => s.filter((m) => (m._id || m.id) !== id));
    } catch (err) {
      alert("Delete failed.");
    }
  };

  if (loading) return <div className="page" style={{ padding: 18 }}>Loading...</div>;

  if (!user || user.role !== "admin") return <div className="page" style={{ padding: 18 }}>Unauthorized</div>;

  return (
    <div className="page" style={{ padding: 18 }}>
      <h2>Contact Messages</h2>

      {error && <div style={{ color: "tomato", marginBottom: 8 }}>{error}</div>}

      {messages.length === 0 ? (
        <div>No messages yet.</div>
      ) : (
        <div style={{ overflowX: "auto", marginTop: 12 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <th style={{ padding: "8px 6px" }}>First Name</th>
                <th style={{ padding: "8px 6px" }}>Last Name</th>
                <th style={{ padding: "8px 6px" }}>Email</th>
                <th style={{ padding: "8px 6px" }}>Message</th>
                <th style={{ padding: "8px 6px" }}>Date</th>
                <th style={{ padding: "8px 6px", width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => {
                const id = m._id || m.id;
                const date = m.createdAt ? new Date(m.createdAt).toLocaleString() : "N/A";
                return (
                  <tr key={id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                    <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{m.firstname || "N/A"}</td>
                    <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{m.lastname || "N/A"}</td>
                    <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{m.email}</td>
                    <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{m.message}</td>
                    <td style={{ padding: "10px 6px", verticalAlign: "top" }}>{date}</td>
                    <td style={{ padding: "10px 6px", verticalAlign: "top" }}>
                      {user?.role === "admin" && (
                        <button
                          onClick={() => handleDelete(id)}
                          style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 10px", borderRadius: 8, cursor: "pointer" }}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
