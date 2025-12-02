import { Link } from "react-router-dom";
import { useAuth } from "../src/AuthContext.jsx";

export default function Home() {
  const { user } = useAuth();
  const displayName = user?.name || "there";

  return (
    <div className="page">
      <div className="hero">
        <div className="card">
          <h1>Hi — I'm {displayName}.</h1>
          <p>I build clean, useful web apps focused on accessibility and delightful UI. Currently studying Software Engineering Technology and exploring full‑stack development.</p>

          <div className="cta-row">
            <Link to="/about" className="button">Learn More</Link>
            <Link to="/project" className="button ghost">My Projects</Link>
          </div>
        </div>

        <aside>
          <div className="panel">
            <h3 style={{marginTop:0}}>Quick links</h3>
            <p style={{margin:"8px 0"}}><Link to="/about" style={{color:"var(--accent)"}}>About</Link> · <Link to="/project" style={{color:"var(--accent)"}}>Projects</Link></p>
            <p style={{color:"var(--muted)", margin:0}}>Open to co-op opportunities | Always learning</p>
          </div>
        </aside>
      </div>

      <div className="content">
        <h2 style={{marginTop:0}}>Featured Projects</h2>
        <div className="project-list">
          <div className="project-card">
            <img src="/assets/p1.jpg" alt="Fitness Tracker App" />
            <h3>Fitness Tracker App</h3>
            <p>React-based gym tracker to monitor workouts, body weight, and volume lifted. Focused on UI/UX for better tracking.</p>
          </div>
          <div className="project-card">
            <img src="/assets/p2.png" alt="Bug Smasher Game" />
            <h3>Bug Smasher Game</h3>
            <p>HTML/CSS/JS game demonstrating DOM interaction, game logic, and scoring.</p>
          </div>
          <div className="project-card">
            <img src="/assets/p3.png" alt="Retail Database System" />
            <h3>Retail Database System</h3>
            <p>Oracle SQL Developer database project managing customers, inventory, and sales with complex queries.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
