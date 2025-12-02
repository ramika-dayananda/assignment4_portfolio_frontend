import { useState, useEffect } from "react";
import axiosClient from "./axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function SignUp() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // If already logged in → redirect
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post("/auth/register", {
        name,
        email,
        password,
      });

      setMessage("Account created successfully!");

      setTimeout(() => navigate("/signin"), 1500);
    } catch (err) {
      setMessage("Signup failed.");
    }
  };

  return (
    <div className="page">
      <div className="card" style={{ maxWidth: 520, margin: "20px auto" }}>
        <h2>Create an account</h2>

        <form onSubmit={handleSubmit} className="form">
          <input
            className="input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              marginTop: 6,
            }}
          >
            <button className="button" type="submit">
              Create Account
            </button>
            <div style={{ color: "var(--muted)" }}>{message}</div>
          </div>
        </form>
      </div>
    </div>
  );
}
