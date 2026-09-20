import "./Home.css";
import { useEffect, useState } from "react";
import ReportIssue from "./ReportIssue";

function Home({ name, address }) {
  const [temperature, setTemperature] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");

  const [notifications, setNotifications] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const locationResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            address
          )}&count=1`
        );

        const locationData = await locationResponse.json();

        if (!locationData.results?.length) return;

        const { latitude, longitude } = locationData.results[0];

        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
        );

        const weatherData = await weatherResponse.json();

        setTemperature(Math.round(weatherData.current.temperature_2m));
      } catch (error) {
        console.error("Weather error:", error);
      }
    };

    if (address) {
      getWeather();
    }
  }, [address]);

  useEffect(() => {
    fetch("http://localhost:8080/api/issues")
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => {
        console.error("Failed to fetch complaints:", error);
      });
  }, []);

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  if (showReport) {
    return (
      <ReportIssue
        address={address}
        onBack={() => setShowReport(false)}
      />
    );
  }

  const openMap = (location) => {
    if (!location) return;

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;

    window.open(mapUrl, "_blank");
  };

  const goHome = () => {
    setCurrentPage("home");
  };

  /* =========================
     MY COMPLAINTS PAGE
  ========================= */

  if (currentPage === "complaints") {
    return (
      <div className="dashboard">
        <aside className="sidebar">
          <div className="dashboard-brand">
            <div className="dashboard-brand-icon">🏙️</div>
            <span>CivicCare</span>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-item" onClick={goHome}>
              🏠 <span>Home</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setShowReport(true)}
            >
              📝 <span>Report Issue</span>
            </div>

            <div className="nav-item active">
              📋 <span>My Complaints</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setCurrentPage("map")}
            >
              🗺️ <span>Map View</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setCurrentPage("profile")}
            >
              👤 <span>Profile</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setCurrentPage("settings")}
            >
              ⚙️ <span>Settings</span>
            </div>
          </nav>
        </aside>

        <main className="dashboard-main">
          <header className="topbar">
            <div>
              <h2>My Complaints</h2>
              <small>Track your submitted civic issues</small>
            </div>

            <button
              className="report-button"
              onClick={() => setShowReport(true)}
            >
              + Report New Issue
            </button>
          </header>

          <section className="complaints-card">
            <div className="complaints-list">
              {complaints.length === 0 ? (
                <p>No complaints found.</p>
              ) : (
                complaints.map((complaint) => (
                  <div
                    className="complaint-item"
                    key={complaint.id}
                  >
                    <div className="complaint-icon">
                      {complaint.status === "Resolved"
                        ? "✓"
                        : complaint.status === "In Progress"
                        ? "🔄"
                        : "⚠️"}
                    </div>

                    <div className="complaint-info">
                      <h3>{complaint.issueType}</h3>
                      <p>{complaint.description}</p>
                      <p>📍 {complaint.location}</p>
                      <small>
                        Submitted: {complaint.submittedAt || "N/A"}
                      </small>
                    </div>

                    <span
                      className={`status ${complaint.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {complaint.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    );
  }

  /* =========================
     MAP PAGE
  ========================= */

  if (currentPage === "map") {
    return (
      <div className="dashboard">
        <aside className="sidebar">
          <div className="dashboard-brand">
            <div className="dashboard-brand-icon">🏙️</div>
            <span>CivicCare</span>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-item" onClick={goHome}>
              🏠 <span>Home</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setShowReport(true)}
            >
              📝 <span>Report Issue</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setCurrentPage("complaints")}
            >
              📋 <span>My Complaints</span>
            </div>

            <div className="nav-item active">
              🗺️ <span>Map View</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setCurrentPage("profile")}
            >
              👤 <span>Profile</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setCurrentPage("settings")}
            >
              ⚙️ <span>Settings</span>
            </div>
          </nav>
        </aside>

        <main className="dashboard-main">
          <header className="topbar">
            <div>
              <h2>Map View</h2>
              <small>View reported issues near you</small>
            </div>
          </header>

          <section className="complaints-card">
            <h2>Reported Issue Locations</h2>
            <p>Click an issue to open its location in Google Maps.</p>

            <div className="complaints-list">
              {complaints.map((complaint) => (
                <div
                  className="complaint-item"
                  key={complaint.id}
                >
                  <div className="complaint-icon">📍</div>

                  <div className="complaint-info">
                    <h3>{complaint.issueType}</h3>
                    <p>{complaint.location}</p>
                    <strong>Status: {complaint.status}</strong>
                  </div>

                  <button
                    className="view-all"
                    onClick={() => openMap(complaint.location)}
                  >
                    Open Map →
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  /* =========================
     PROFILE PAGE
  ========================= */

  if (currentPage === "profile") {
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">🏙️</div>
          <span>CivicCare</span>
        </div>

        <nav className="sidebar-nav">

          <div className="nav-item" onClick={goHome}>
            🏠 <span>Home</span>
          </div>

          <div
            className="nav-item"
            onClick={() => setShowReport(true)}
          >
            📝 <span>Report Issue</span>
          </div>

          <div
            className="nav-item"
            onClick={() => setCurrentPage("complaints")}
          >
            📋 <span>My Complaints</span>
          </div>

          <div
            className="nav-item"
            onClick={() => setCurrentPage("map")}
          >
            🗺️ <span>Map View</span>
          </div>

          <div className="nav-item active">
            👤 <span>Profile</span>
          </div>

          <div
            className="nav-item"
            onClick={() => setCurrentPage("settings")}
          >
            ⚙️ <span>Settings</span>
          </div>

        </nav>
      </aside>

      <main className="dashboard-main">

        <header className="topbar">
          <div>
            <h2>My Profile</h2>
            <small>Your CivicCare account information</small>
          </div>
        </header>

        <section className="complaints-card">

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "10px 0 25px",
              borderBottom: "1px solid #e5e7eb"
            }}
          >
            <div
              style={{
                width: "75px",
                height: "75px",
                borderRadius: "50%",
                background: "#d9f5f2",
                color: "#087f79",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "700"
              }}
            >
              SJ
            </div>

            <div>
              <h2 style={{ margin: "0 0 6px" }}>
                {name}
              </h2>

              <p style={{ margin: 0, color: "#64748b" }}>
                CivicCare Citizen
              </p>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>

            <div
              style={{
                padding: "16px 0",
                borderBottom: "1px solid #f1f5f9"
              }}
            >
              <small style={{ color: "#64748b" }}>
                📍 Address
              </small>

              <p style={{ margin: "6px 0 0", fontWeight: "600" }}>
                {address || "Not provided"}
              </p>
            </div>

            <div
              style={{
                padding: "16px 0",
                borderBottom: "1px solid #f1f5f9"
              }}
            >
              <small style={{ color: "#64748b" }}>
                👤 Account Type
              </small>

              <p style={{ margin: "6px 0 0", fontWeight: "600" }}>
                Citizen
              </p>
            </div>

            <div style={{ padding: "16px 0" }}>
              <small style={{ color: "#64748b" }}>
                📋 Total Complaints
              </small>

              <p
                style={{
                  margin: "6px 0 0",
                  fontWeight: "700",
                  fontSize: "20px",
                  color: "#087f79"
                }}
              >
                {complaints.length}
              </p>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

  if (currentPage === "settings") {
    return (
      <div className="dashboard">
        <aside className="sidebar">
          <div className="dashboard-brand">
            <div className="dashboard-brand-icon">🏙️</div>
            <span>CivicCare</span>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-item" onClick={goHome}>
              🏠 <span>Home</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setShowReport(true)}
            >
              📝 <span>Report Issue</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setCurrentPage("complaints")}
            >
              📋 <span>My Complaints</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setCurrentPage("map")}
            >
              🗺️ <span>Map View</span>
            </div>

            <div
              className="nav-item"
              onClick={() => setCurrentPage("profile")}
            >
              👤 <span>Profile</span>
            </div>

            <div className="nav-item active">
              ⚙️ <span>Settings</span>
            </div>
          </nav>
        </aside>

        <main className="dashboard-main">
          <header className="topbar">
            <div>
              <h2>Settings</h2>
              <small>Manage your CivicCare preferences</small>
            </div>
          </header>

          <section className="complaints-card">
            <h3>Notifications</h3>

            <button
              className="view-all"
              onClick={() => setNotifications(!notifications)}
            >
              {notifications ? "🔔 Notifications ON" : "🔕 Notifications OFF"}
            </button>

            <hr style={{ margin: "25px 0" }} />

            <h3>Location Access</h3>

            <button
              className="view-all"
              onClick={() => setLocationAccess(!locationAccess)}
            >
              {locationAccess
                ? "📍 Location Access ON"
                : "🚫 Location Access OFF"}
            </button>

            <hr style={{ margin: "25px 0" }} />

            <button
              className="report-button"
              onClick={goHome}
            >
              ← Back to Home
            </button>
          </section>
        </main>
      </div>
    );
  }

  /* =========================
     HOME PAGE
  ========================= */

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-brand-icon">🏙️</div>
          <span>CivicCare</span>
        </div>

        <nav className="sidebar-nav">

          <div className="nav-item active" onClick={goHome}>
            🏠 <span>Home</span>
          </div>

          <div
            className="nav-item"
            onClick={() => setShowReport(true)}
          >
            📝 <span>Report Issue</span>
          </div>

          <div
            className="nav-item"
            onClick={() => setCurrentPage("complaints")}
          >
            📋 <span>My Complaints</span>
          </div>

          <div
            className="nav-item"
            onClick={() => setCurrentPage("map")}
          >
            🗺️ <span>Map View</span>
          </div>

          <div
            className="nav-item"
            onClick={() => setCurrentPage("profile")}
          >
            👤 <span>Profile</span>
          </div>

          <div
            className="nav-item"
            onClick={() => setCurrentPage("settings")}
          >
            ⚙️ <span>Settings</span>
          </div>

        </nav>

        <div className="sidebar-bottom">
          <div className="help-box">
            <strong>Need Help?</strong>
            <p>We're here to help you.</p>
            <button>Contact Support</button>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">

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
              <strong>{name}</strong>
              <small>Citizen</small>
            </div>
          </div>
        </header>

        <section className="welcome-section">

          <div>
            <p className="welcome-small">
              {greeting}, {name} 👋
            </p>

            <h1>Make your community better.</h1>

            <p>
              Report civic issues and help make Chennai a cleaner,
              safer and better place to live.
            </p>

            <div className="location">
              📍 {address} &nbsp; • &nbsp; ☀️{" "}
              {temperature !== null
                ? `${temperature}°C`
                : "Loading..."}
            </div>
          </div>

          <button
            className="report-button"
            onClick={() => setShowReport(true)}
          >
            + Report New Issue
          </button>

        </section>

        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon blue">📋</div>
            <div>
              <span>Total Complaints</span>
              <h2>{complaints.length}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">⏳</div>
            <div>
              <span>Pending</span>
              <h2>
                {complaints.filter(
                  (c) => c.status === "Pending"
                ).length}
              </h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">🔄</div>
            <div>
              <span>In Progress</span>
              <h2>
                {complaints.filter(
                  (c) => c.status === "In Progress"
                ).length}
              </h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <span>Resolved</span>
              <h2>
                {complaints.filter(
                  (c) => c.status === "Resolved"
                ).length}
              </h2>
            </div>
          </div>

        </section>

        <section className="content-grid">

          <div className="complaints-card">

            <div className="section-header">
              <div>
                <h2>Recent Complaints</h2>
                <p>Your recently submitted civic issues</p>
              </div>

              <button
                className="view-all"
                onClick={() => setCurrentPage("complaints")}
              >
                View All →
              </button>
            </div>

            <div className="complaints-list">

              {complaints.map((complaint) => (

                <div
                  className="complaint-item"
                  key={complaint.id}
                >

                  <div className="complaint-icon">
                    {complaint.status === "Resolved"
                      ? "✓"
                      : complaint.status === "In Progress"
                      ? "🔄"
                      : "⚠️"}
                  </div>

                  <div className="complaint-info">
                    <h3>{complaint.issueType}</h3>
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

          <div className="map-card">

            <div className="section-header">
              <div>
                <h2>Issues Near You</h2>
                <p>Reported civic issues</p>
              </div>

              <button
                className="view-all"
                onClick={() => setCurrentPage("map")}
              >
                Full Map →
              </button>
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
                {address || "Your Location"}
              </div>

            </div>

            <div className="map-legend">
              <span>🔴 Pending</span>
              <span>🟠 In Progress</span>
              <span>🟢 Resolved</span>
            </div>

          </div>

        </section>

        <section className="community-card">

          <div className="community-icon">🌱</div>

          <div>
            <h2>
              Together, we can make a difference.
            </h2>

            <p>
              Every complaint helps authorities identify and solve
              important problems in our community.
            </p>
          </div>

          <button
            className="community-button"
            onClick={() => setShowReport(true)}
          >
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