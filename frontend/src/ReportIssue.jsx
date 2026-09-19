import "./ReportIssue.css";
import { useState } from "react";

function ReportIssue({ address, onBack }) {
  const [submitted, setSubmitted] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  const submitComplaint = async () => {
    if (!issueType) {
      alert("Please select an issue type.");
      return;
    }

    if (!description.trim()) {
      alert("Please describe the issue.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          issueType: issueType,
          description: description,
          location: address || "Not provided",
          status: "Pending"
        })
      });

      if (!response.ok) {
        alert("Failed to submit complaint.");
        return;
      }

      setSubmitted(true);

    } catch (error) {
      alert("Backend connection failed.");
      console.error(error);
    }
  };

  if (submitted) {
    return (
      <div className="report-page">
        <div className="report-card">
          <h1>✅ Complaint Submitted</h1>
          <p>Your civic issue has been reported successfully.</p>

          <button
            className="submit-report"
            onClick={onBack}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page">

      <div className="report-header">
        <button onClick={onBack} className="back-button">
          ← Back to Dashboard
        </button>

        <h1>Report a Civic Issue</h1>
        <p>Help your community by reporting an issue.</p>
      </div>

      <div className="report-card">

        <div className="form-group">
          <label>Issue Type</label>

          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
          >
            <option value="">Select an issue type</option>
            <option>Waste / Garbage</option>
            <option>Drainage Blockage</option>
            <option>Road / Pothole</option>
            <option>Street Light</option>
            <option>Water Supply</option>
            <option>Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            placeholder="Describe the issue..."
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Location</label>

          <input
            type="text"
            value={address || ""}
            placeholder="Enter issue location"
            readOnly
          />
        </div>

        <button
          className="submit-report"
          onClick={submitComplaint}
        >
          Submit Complaint
        </button>

      </div>
    </div>
  );
}

export default ReportIssue;