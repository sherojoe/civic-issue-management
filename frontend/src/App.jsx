import { useState } from "react";
import "./App.css";
import Home from "./Home";
import AuthorityDashboard from "./AuthorityDashboard";

function App() {
  const [alternateLogin, setAlternateLogin] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [userName, setUserName] = useState("");
 const [showAuthority, setShowAuthority] = useState(false);
const [authorityLoggedIn, setAuthorityLoggedIn] = useState(false);
if (showAuthority && !authorityLoggedIn) {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="card-icon">👨‍💼</div>

        <h2>Authority Login</h2>

        <p className="subtitle">
          Sign in to manage civic complaints
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            const email = e.currentTarget.elements.email.value;
            const password = e.currentTarget.elements.password.value;

            if (
              email === "authority@civiccare.com" &&
              password === "admin123"
            ) {
              setAuthorityLoggedIn(true);
            } else {
              alert("Invalid authority credentials");
            }
          }}
        >
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter authority email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
  if (authorityLoggedIn) {
  return <AuthorityDashboard />;
}
  if (showHome) {
  return <Home name={userName} address={userAddress} />;
}

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="brand">
          <div className="brand-icon">🏙️</div>
          <span>CivicCare</span>
        </div>

        <div className="hero-content">
          <h1>
            Make your community
            <span> better.</span>
          </h1>

          <p>
            Report civic issues, track complaints, and work together
            to build a cleaner and better community.
          </p>

          <div className="hero-points">
            <div>✓ Report issues easily</div>
            <div>✓ Track complaint status</div>
            <div>✓ Connect with authorities</div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">

          {!alternateLogin ? (
            <>
              <div className="card-icon">👋</div>

              <h2>Welcome to CivicCare</h2>

              <p className="subtitle">
                Sign in to report and track civic issues
              </p>

              <form onSubmit={(e) => {
  e.preventDefault();
  const name = e.currentTarget.elements.name.value;
setUserName(name);
  const address = e.currentTarget.elements.address.value;
  setUserAddress(address);
  setShowHome(true);
}}>
                <div className="input-group">
                  <label>Full Name</label>
                  <input
  type="text"
  name="name"
  placeholder="Enter your full name"
/>
                </div>

                <div className="input-group">
  <label>Address</label>
  <input
    type="text"
    name="address"
    placeholder="Enter your address"
  />
</div>

                <div className="input-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>

                <button type="submit" className="login-btn">
                  Continue
                </button>
              </form>

              <div className="divider">
                <span>OR</span>
              </div>

              <button
                className="alternate-btn"
                onClick={() => setAlternateLogin(true)}
              >
                📱 Try another way
              </button>

              <p className="help-text">
                Don't have an email address? No problem.
              </p>
              <button
  type="button"
  className="alternate-btn"
  onClick={() => setShowAuthority(true)}
>
  👨‍💼 Authority Dashboard
</button>
            </>
          ) : (
            <>
              <button
                className="back-btn"
                onClick={() => setAlternateLogin(false)}
              >
                ← Back
              </button>

              <div className="card-icon">📱</div>

              <h2>Sign in with your phone</h2>

              <p className="subtitle">
                No email? No problem. Use your phone number.
              </p>

              <form>
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="input-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="input-group">
                  <label>Address</label>
                  <input
  type="text"
  name="address"
  placeholder="Enter your address"
/>
                </div>

                <div className="input-group">
                  <label>OTP</label>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                  />
                </div>

                <button type="submit" className="login-btn">
                  Verify & Continue
                </button>
              </form>

              <p className="help-text">
                We'll send a verification code to your phone.
              </p>
            </>
          )}

        </div>
      </div>

    </div>
  );
}
export default App;