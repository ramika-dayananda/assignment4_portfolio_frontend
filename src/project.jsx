export default function Project() {
  return (
    <div className="page">
      <h2>Projects</h2>
      <div className="project-list">
        <div className="project-card">
          <img src="/assets/p1.jpg" alt="Fitness Tracker App" />
          <h3>Fitness Tracker App</h3>
          <p>Developed a React-based gym tracker to monitor workouts, body weight, and volume lifted. Focused on UI/UX for better tracking.</p>
        </div>
        <div className="project-card">
          <img src="/assets/p2.png" alt="Bug Smasher Game" />
          <h3>Bug Smasher Game</h3>
          <p>Created an HTML/CSS/JS game where players smash bugs for points. Demonstrated DOM interaction, game logic, and scoring.</p>
        </div>
        <div className="project-card">
          <img src="/assets/p3.png" alt="Retail Database System" />
          <h3>Retail Database System</h3>
          <p>Oracle SQL Developer database project managing customers, inventory, and sales. Designed ERD and handled complex queries.</p>
        </div>
      </div>
    </div>
  );
}
