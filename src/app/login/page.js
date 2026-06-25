"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set body styles on mount and restore on unmount
    const origOverflow = document.body.style.overflow;
    const origHeight = document.body.style.height;
    
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    
    return () => {
      document.body.style.overflow = origOverflow;
      document.body.style.height = origHeight;
    };
  }, []);

  function extractUserFromEmail(emailVal) {
    let namePart = emailVal.split("@")[0];
    let parts = namePart.split(/[._-]/);
    let username = "Jane";
    let fullname = "Jane Doe";
    let initials = "JD";
    
    if (parts.length > 0) {
      let firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
      username = firstName;
      if (parts.length > 1) {
        let lastName = parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase();
        fullname = firstName + " " + lastName;
        initials = firstName.charAt(0) + lastName.charAt(0);
      } else {
        fullname = firstName;
        initials = firstName.charAt(0);
      }
    }
    return { username, fullname, initials };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);

    const userData = extractUserFromEmail(email);
    localStorage.setItem("username", userData.username);
    localStorage.setItem("fullname", userData.fullname);
    localStorage.setItem("initials", userData.initials);
    localStorage.setItem("scanned", "false");

    setTimeout(() => {
      // Dispatch custom event to notify Header of auth state change
      window.dispatchEvent(new Event("auth-change"));
      router.push("/dashboard");
    }, 800);
  };

  return (
    <>
      <main className="hero" role="main">
        <div className="bg-overlay" aria-hidden="true"></div>

        {/* Glassmorphic Login Card */}
        <section className="card" aria-labelledby="login-title">
          <div className="card-top">
            <div className="logo">
              {/* House SVG with Tenant Outline */}
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="12" cy="13" r="2" stroke="white" strokeWidth="2"/>
                <path d="M9 18c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5" stroke="white" stroke-width="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 id="login-title" className="title">RentRight</h1>
            <p class="subtitle">Your Trusted Tenant Rights Assistant</p>
          </div>

          <form id="loginForm" className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="label">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="username"
                placeholder="e.g. jdoe@example.com"
                className="no-icon"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
              />
            </div>

            <div className="form-group">
              <div className="forgot-row">
                <label htmlFor="password" className="label" style={{ margin: 0 }}>Password</label>
                <a className="forgot" href="#">Forgot password?</a>
              </div>
              <div className="password-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-required="true"
                />
                <button
                  id="togglePwd"
                  type="button"
                  className="toggle-pwd"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div id="loginError" className="form-error" role="alert" aria-live="assertive" style={{ color: "var(--danger)", fontSize: "13px", fontWeight: "500" }}>
                {error}
              </div>
            )}

            <label className="checkbox">
              <input type="checkbox" name="remember" />
              <span>Remember this device</span>
            </label>

            <button id="loginBtn" className="btn primary" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="signup-footer">
              Don't have an account? <Link id="signupLink" href="/signup">Sign up</Link>
            </p>
          </form>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="page-footer-simple" role="contentinfo">
        <div className="footer-simple-container">
          <div>&copy; 2024 RentRight Tenant Advocacy. All rights reserved.</div>
          <div className="footer-simple-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Tenant Resources</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </footer>
    </>
  );
}
