import "./Home.css";

function Home() {
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-logo">🏙️</div>
          <div>
            <h2>CivicCare</h2>
            <span>Cleaner Communities</span>
          </div>
        </div>

        <nav className="side-nav">
          <button className="nav-item active">⌂ <span>Home</span></button>
          <button className="nav-item">＋ <span>Report Issue</span></button>
          <button className="nav-item">▣ <span>My Complaints</span></button>
          <button className="nav-item">⌖ <span>Map View</span></button>
          <button className="nav-item">◉ <span>Profile</span></button>
          <button className="nav-item">⚙ <span>Settings</span></button>
        </nav>

        <div className="sidebar-message">
          <div className="city-art">🌆</div>
          <p>
            Small actions create cleaner,
            healthier and safer communities.
          </p>
          <span>🌱</span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Top Bar */}
        <header className="topbar">
          <div className="search-box">
            🔍
            <input
              type="text"
              placeholder="Search complaints, locations, or keywords..."
            />
          </div>

          <div className="user-area">
            <button className="notification">♧<span></span></button>

            <div className="avatar">SJ</div>

            <div className="user-info">
              <strong>Sherin Joe</strong>
              <small>Citizen</small>
            </div>

            <span className="dropdown">⌄</span>
          </div>
        </header>

        {/* Dashboard Content */}
        <section className="content">

          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-text">
              <p>Good Morning,</p>
              <h1>Sherin Joe <span>👋</span></h1>

              <div className="welcome-description">
                Your voice matters! Together we can build
                cleaner, safer and healthier communities.
              </div>

              <div className="location-pill">
                📍 Chennai, Tamil Nadu <span>⌄</span>
              </div>
            </div>

            <div className="city-illustration">
              🏢 🌳 🏙️ 🌳
            </div>

            <div className="weather">
              ☀️
              <div>
                <strong>28°C</strong>
                <small>Chennai</small>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-icon blue">▣</div>
              <div>
                <span>Total Complaints</span>
                <strong>5</strong>
                <small>↑ 2 this week</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon yellow">◷</div>
              <div>
                <span>Pending</span>
                <strong>2</strong>
                <small>↑ 1 this week</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon cyan">◌</div>
              <div>
                <span>In Progress</span>
                <strong>1</strong>
                <small>↓ 1 this week</small>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">✓</div>
              <div>
                <span>Resolved</span>
                <strong>2</strong>
                <small>↑ 1 this week</small>
              </div>
            </div>

          </div>

          {/* Report Issue CTA */}
          <button className="report-banner">
            <div className="report-icon">＋</div>

            <div>
              <h3>Report New Issue</h3>
              <p>Help us keep your community clean and safe</p>
            </div>

            <div className="report-arrow">→</div>
          </button>

          {/* Bottom Grid */}
          <div className="dashboard-grid">

            {/* Recent Complaints */}
            <div className="complaints-card">
              <div className="section-heading">
                <h2>▤ &nbsp;Recent Complaints</h2>
                <button>View All →</button>
              </div>

              <Complaint
                title="Waste dumping near park"
                location="Main Road, Anna Nagar"
                status="Pending"
                date="Apr 25, 2025"
                image="🗑️"
              />

              <Complaint
                title="Drainage blockage"
                location="Lake View Road, West Mambalam"
                status="In Progress"
                date="Apr 24, 2025"
                image="💧"
              />

              <Complaint
                title="Pothole on main road"
                location="T. Nagar, Chennai"
                status="Resolved"
                date="Apr 22, 2025"
                image="🛣️"
              />

              <Complaint
                title="Street light not working"
                location="3rd Cross Street, Adyar"
                status="Pending"
                date="Apr 20, 2025"
                image="💡"
              />

              <Complaint
                title="Overflowing garbage bins"
                location="Velachery, Chennai"
                status="Resolved"
                date="Apr 18, 2025"
                image="♻️"
              />
            </div>

            {/* Right Column */}
            <div className="right-column">

              {/* Map */}
              <div className="map-card">
                <div className="section-heading">
                  <h2>📍 Issue Location</h2>
                  <button>View Map →</button>
                </div>

                <div className="fake-map">
                  <div className="road road-one"></div>
                  <div className="road road-two"></div>
                  <div className="road road-three"></div>

                  <div className="map-marker red">!</div>
                  <div className="map-marker yellow">!</div>
                  <div className="map-marker green">✓</div>
                  <div className="map-marker blue">●</div>

                  <div className="map-city">Chennai</div>
                </div>

                <div className="map-legend">
                  <span>🟡 Pending</span>
                  <span>🔵 In Progress</span>
                  <span>🟢 Resolved</span>
                  <span>🔴 High Priority</span>
                </div>
              </div>

              {/* Community Card */}
              <div className="community-card">
                <div className="community-icon">🌱</div>

                <div>
                  <h3>A cleaner tomorrow<br />starts with you!</h3>
                  <p>
                    Report issues, track progress,
                    make a difference.
                  </p>
                </div>

                <div className="plant">🌿</div>
              </div>

            </div>

          </div>

        </section>

        <footer>
          <span>CivicCare</span>
          <span>Community</span>
          <span>Transparency</span>
          <span>Change</span>

          <small>Together for a cleaner, healthier tomorrow 🌱</small>
        </footer>

      </main>
    </div>
  );
}

function Complaint({ title, location, status, date, image }) {
  return (
    <div className="complaint-row">

      <div className="complaint-image">
        {image}
      </div>

      <div className="complaint-info">
        <h3>{title}</h3>
        <p>📍 {location}</p>
      </div>

      <span className={`status ${status.toLowerCase().replace(" ", "-")}`}>
        {status}
      </span>

      <span className="complaint-date">{date}</span>

      <span className="complaint-arrow">›</span>

    </div>
  );
}

export default Home;