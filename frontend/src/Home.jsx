import "./Home.css";

function Home({ address }) {
  const complaints = [
    {
      title: "Waste dumping near park",
      location: "Main Road, Anna Nagar",
      status: "Pending",
    },
    {
      title: "Drainage blockage",
      location: "Lake View Road, West Mambalam",
      status: "In Progress",
    },
    {
      title: "Pothole on main road",
      location: "T. Nagar, Chennai",
      status: "Resolved",
    },
    {
      title: "Street light not working",
      location: "3rd Cross Street, Adyar",
      status: "Pending",
    },
    {
      title: "Overflowing garbage bins",
      location: "Velachery, Chennai",
      status: "Resolved",
    },
  ];

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">🏙️</div>
          <span>CivicCare</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item active">🏠 <span>Home</span></div>
          <div className="nav-item">📝 <span>Report Issue</span></div>
          <div className="nav-item">📋 <span>My Complaints</span></div>
          <div className="nav-item">🗺️ <span>Map View</span></div>
          <div className="nav-item">👤 <span>Profile</span></div>
          <div className="nav-item">⚙️ <span>Settings</span></div>
        </nav>

        <div className="sidebar-bottom">
          <div className="help-box">
            <strong>Need Help?</strong>
            <p>We're here to help you.</p>
            <button>Contact Support</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* TOP BAR */}
        <header className="topbar">
          <div className="search-box">
            🔍
            <input
              type="text"
              placeholder="Search complaints..."
            />
          </div>

          <div className="topbar-user">
            <div className="notification">🔔</div>

            <div className="avatar">SJ</div>

            <div>
              <strong>Sherin Joe</strong>
              <small>Citizen</small>
            </div>
          </div>
        </header>

        {/* WELCOME */}
        <section className="welcome-section">
          <div>
            <p className="welcome-small">Good Morning, Sherin Joe 👋</p>

            <h1>Make your community better.</h1>

            <p>
              Report civic issues and help make Chennai a cleaner,
              safer and better place to live.
            </p>

            <div className="location">
              📍 {address} &nbsp; • &nbsp; ☀️ 28°C
            </div>
          </div>

          <button className="report-button">
            + Report New Issue
          </button>
        </section>

        {/* STAT CARDS */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon blue">📋</div>
            <div>
              <span>Total Complaints</span>
              <h2>5</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">⏳</div>
            <div>
              <span>Pending</span>
              <h2>2</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">🔄</div>
            <div>
              <span>In Progress</span>
              <h2>1</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <span>Resolved</span>
              <h2>2</h2>
            </div>
          </div>

        </section>

        {/* CONTENT GRID */}
        <section className="content-grid">

          {/* RECENT COMPLAINTS */}
          <div className="complaints-card">
            <div className="section-header">
              <div>
                <h2>Recent Complaints</h2>
                <p>Your recently submitted civic issues</p>
              </div>

              <button className="view-all">View All →</button>
            </div>

            <div className="complaints-list">
              {complaints.map((complaint, index) => (
                <div className="complaint-item" key={index}>

                  <div className="complaint-icon">
                    {complaint.status === "Resolved"
                      ? "✓"
                      : complaint.status === "In Progress"
                      ? "🔄"
                      : "⚠️"}
                  </div>

                  <div className="complaint-info">
                    <h3>{complaint.title}</h3>
                    <p>📍 {complaint.location}</p>
                  </div>

                  <span
                    className={`status ${complaint.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {complaint.status}
                  </span>

                </div>
              ))}
            </div>
          </div>

          {/* MAP */}
          <div className="map-card">
            <div className="section-header">
              <div>
                <h2>Issues Near You</h2>
                <p>Reported civic issues in Chennai</p>
              </div>

              <button className="view-all">Full Map →</button>
            </div>

            <div className="fake-map">

              <div className="map-road road-one"></div>
              <div className="map-road road-two"></div>
              <div className="map-road road-three"></div>

              <div className="map-marker marker-one">📍</div>
              <div className="map-marker marker-two">📍</div>
              <div className="map-marker marker-three">📍</div>
              <div className="map-marker marker-four">📍</div>

              <div className="map-label">
                Chennai
              </div>

            </div>

            <div className="map-legend">
              <span>🔴 Pending</span>
              <span>🟠 In Progress</span>
              <span>🟢 Resolved</span>
            </div>
          </div>

        </section>

        {/* COMMUNITY CARD */}
        <section className="community-card">
          <div className="community-icon">🌱</div>

          <div>
            <h2>Together, we can make a difference.</h2>
            <p>
              Every complaint helps authorities identify and solve
              important problems in our community.
            </p>
          </div>

          <button className="community-button">
            Report an Issue →
          </button>
        </section>

        <footer>
          © 2026 CivicCare • Building cleaner and better communities
        </footer>

      </main>
    </div>
  );
}

export default Home;