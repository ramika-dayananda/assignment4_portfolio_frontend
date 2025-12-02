import { useState, useEffect } from "react";
import axiosClient from "./axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function SignIn() {
  const auth = useAuth();
  const { user } = auth;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // If already logged in → redirect away
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      const token = res?.data?.token;
      // Use AuthContext.login so the provider updates token + user
      // AuthProvider will then fetch /auth/me to populate user
      if (typeof auth?.login === "function") {
        auth.login(null, token);
      } else {
        // fallback: keep old behavior if login not present
        localStorage.setItem("token", token);
      }

      setMessage("Logged in successfully!");

      // navigate to home (AuthProvider will load user in background)
      navigate("/", { replace: true });
    } catch (err) {
      setMessage("Login failed. Check your credentials.");
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "28px auto", padding: 18 }}>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8 }}
        />

        <button
          type="submit"
          style={{ padding: "10px 14px", borderRadius: 8 }}
        >
          Log In
        </button>
      </form>

      <p style={{ color: "rgb(180,180,180)" }}>{message}</p>
    </div>
  );
}
