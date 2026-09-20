import "./AuthorityDashboard.css";
import { useEffect, useState } from "react";

function AuthorityDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/issues")
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="authority-dashboard">
      <h1>Authority Dashboard</h1>
      <p>Manage and update civic complaints</p>
      <div className="authority-stats">

  <div className="authority-stat">
    <span>Total Complaints</span>
    <h2>{complaints.length}</h2>
  </div>

  <div className="authority-stat">
    <span>Pending</span>
    <h2>{complaints.filter(c => c.status === "Pending").length}</h2>
  </div>

  <div className="authority-stat">
    <span>In Progress</span>
    <h2>{complaints.filter(c => c.status === "In Progress").length}</h2>
  </div>

  <div className="authority-stat">
    <span>Resolved</span>
    <h2>{complaints.filter(c => c.status === "Resolved").length}</h2>
  </div>

</div>

      <div className="authority-complaints">
        {complaints.map((complaint) => (
          <div className="authority-card" key={complaint.id}>
            <h2>{complaint.issueType}</h2>

            <p>{complaint.description}</p>
            <p>📍 {complaint.location}</p>

            <strong>Status: {complaint.status}</strong>
            <select
  value={complaint.status}
  onChange={(e) => {
    const newStatus = e.target.value;

    fetch(
      `http://localhost:8080/api/issues/${complaint.id}/status?status=${encodeURIComponent(newStatus)}`,
      {
        method: "PUT",
      }
    )
      .then((response) => response.json())
      .then((updatedComplaint) => {
        setComplaints((current) =>
          current.map((item) =>
            item.id === updatedComplaint.id ? updatedComplaint : item
          )
        );
      })
      .catch((error) => console.error(error));
  }}
>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Resolved">Resolved</option>
</select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuthorityDashboard;