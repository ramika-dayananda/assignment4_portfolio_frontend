import React, { useState } from "react";
import { sendMessage } from "../services/contactService.js";

export default function ContactForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validate = () => {
    if (!firstname.trim()) return "First name is required";
    if (!lastname.trim()) return "Last name is required";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) return "Valid email is required";
    if (!message.trim()) return "Message is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setBusy(true);
    try {
      await sendMessage({
        firstname: firstname.trim(),
        lastname: lastname.trim(),
        email: email.trim(),
        message: message.trim(),
      });
      setSuccess("Message sent. Thank you!");
      setFirstname("");
      setLastname("");
      setEmail("");
      setMessage("");
    } catch (err) {
      const data = err?.response?.data;
      setError((data && (data.error || data.message)) || "Failed to send message");
    } finally {
      setBusy(false);
    }
  };

  const isValid = !validate();

  return (
    <div className="page" style={{ padding: 18, maxWidth: 720, margin: "0 auto" }}>
      <h2>Contact Me</h2>
      <div className="panel" style={{ marginBottom: 12 }}>Email: ramikadinan01@example.com</div>

      <form onSubmit={handleSubmit} className="contact-form" style={{ display: "grid", gap: 10 }}>
        <input
          className="input"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          className="input"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          required
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="submit"
            className="button"
            disabled={!isValid || busy}
            style={{
              background: busy ? "#9ca3af" : "linear-gradient(90deg,#7c5cff,#6b46ff)",
              color: "white",
            }}
          >
            {busy ? "Sending..." : "Send Message"}
          </button>
        </div>

        {error && <div style={{ color: "tomato", marginTop: 6 }}>{error}</div>}
        {success && <div style={{ color: "green", marginTop: 6 }}>{success}</div>}
      </form>
    </div>
  );
}
