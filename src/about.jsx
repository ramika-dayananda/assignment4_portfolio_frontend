export default function About() {
  return (
    <div className="page">
      <div className="card about-grid">
        <img src="/assets/profile.jpg" alt="Ramika Dinan Dayananda" />
        <div>
          <h2>About Me</h2>
          <p style={{color:"var(--muted)"}}>My name is Ramika Dinan Dayananda. I’m a Software Engineering Technology – Co-op student at Centennial College. I enjoy building full‑stack web apps and learning modern tools.</p>
          <p style={{marginTop:12}}>
            <a href="/resume.pdf" download className="button">Download My Resume (PDF)</a>
          </p>
        </div>
      </div>
    </div>
  );
}
