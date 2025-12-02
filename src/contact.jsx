import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", message: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Captured form:", form); // internal documentation: confirm capture
    alert("Thanks! Your message was captured.");
    navigate("/"); // redirect to Home
  };

  return (
    <div className="page">
      <h2>Contact Me</h2>
      <div className="panel"><p>Email: ramikadinan01@example.com</p></div>
      <form onSubmit={handleSubmit} className="contact-form">
        <input name="firstName" placeholder="First Name" onChange={onChange} required />
        <input name="lastName" placeholder="Last Name" onChange={onChange} required />
        <input name="phone" placeholder="Contact Number" onChange={onChange} />
        <input name="email" type="email" placeholder="Email Address" onChange={onChange} required />
        <textarea name="message" placeholder="Message" rows="4" onChange={onChange}></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
