import "./ReportIssue.css";

function ReportIssue({ address, onBack }) {
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
          <select>
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
          ></textarea>
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

        <div className="form-group">
          <label>Upload Photo</label>
          <input type="file" accept="image/*" />
          <small>Upload a photo as evidence of the issue.</small>
        </div>

        <button className="submit-report">
          Submit Complaint
        </button>
      </div>
    </div>
  );
}

export default ReportIssue;