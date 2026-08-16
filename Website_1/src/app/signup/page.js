"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Signup() {
  const router = useRouter();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [redirectPath, setRedirectPath] = useState("/dashboard");
  
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const msg = params.get("message");
      const emailParam = params.get("email");
      const redirectParam = params.get("redirect");
      if (msg) setInfoMessage(msg);
      if (emailParam) setEmail(emailParam);
      if (redirectParam) setRedirectPath(redirectParam);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!fullname || !email || !password || !confirm) {
      setError("Please fill out all fields.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const emailKey = email.trim().toLowerCase();
    let registeredUsers = [];
    try {
      registeredUsers = JSON.parse(localStorage.getItem("registered_users") || "[]");
    } catch (err) {
      registeredUsers = [];
    }

    if (registeredUsers.length === 0) {
      const defaultUser = {
        email: "jane@example.com",
        password: "password123",
        fullname: "Jane Doe",
        username: "Jane",
        initials: "JD"
      };
      registeredUsers.push(defaultUser);
      localStorage.setItem("registered_users", JSON.stringify(registeredUsers));
    }

    const userExists = registeredUsers.some(u => u.email === emailKey);
    if (userExists) {
      setError("An account with this email already exists. Please log in.");
      setLoading(false);
      return;
    }

    let rawFullname = fullname.trim();
    let parts = rawFullname.split(/\s+/);
    let username = "Jane";
    let initials = "JD";
    if (parts.length > 0) {
      username = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
      if (parts.length > 1) {
        initials = parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
      } else {
        initials = parts[0].charAt(0).toUpperCase();
      }
    }

    const newUser = {
      email: emailKey,
      password: password,
      fullname: rawFullname,
      username: username,
      initials: initials
    };
    registeredUsers.push(newUser);
    localStorage.setItem("registered_users", JSON.stringify(registeredUsers));

    setTimeout(() => {
      router.push(`/login?message=Account created successfully! Please log in.&redirect=/dashboard&email=${encodeURIComponent(emailKey)}`);
    }, 1000);
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#f9fafc",
      fontFamily: "var(--font-body)",
      color: "#1e293b",
      padding: "24px"
    }}>
      {/* Header */}
      <header style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        padding: "24px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10
      }}>
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
          fontWeight: "800",
          fontSize: "20px",
          color: "#2563eb",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" fill="#2563eb" />
          </svg>
          <span style={{ color: "#0f172a" }}>Rent<span style={{ color: "#2563eb" }}>Right</span></span>
        </Link>
        <div style={{ display: "flex", gap: "24px", alignItems: "center", fontSize: "14px", fontWeight: "500", color: "#64748b" }}>
          <Link href="#" style={{ color: "inherit", textDecoration: "none" }}>Pricing</Link>
          <Link href="#" style={{ color: "inherit", textDecoration: "none" }}>Security</Link>
          <Link href={`/login?redirect=${encodeURIComponent(redirectPath)}`} style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}>Sign In</Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ display: "flex", width: "100%", maxWidth: "1400px", margin: "64px auto 0 auto", gap: "64px" }}>
        
        {/* Left Side: Graphic and Features */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", maxWidth: "600px" }}>
          {/* Main Blue Graphic Card */}
          <div style={{
            background: "#fff",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
            overflow: "hidden",
            marginBottom: "40px",
            aspectRatio: "1/1",
            position: "relative"
          }}>
            <Image
              src="/ai-graphic.png"
              alt="RentRight LegalTech SaaS"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <h1 style={{ fontSize: "36px", fontWeight: "800", color: "#0f172a", marginBottom: "16px", lineHeight: "1.2" }}>
            The AI layer for <span style={{ color: "#2563eb", textDecoration: "underline", textUnderlineOffset: "4px" }}>Rental Legals</span>
          </h1>
          <p style={{ fontSize: "16px", color: "#475569", marginBottom: "32px", lineHeight: "1.6", maxWidth: "500px" }}>
            Automate lease reviews, identify risky clauses, and sign with confidence. RentRight combines legal precision with modern automation.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[
              {
                icon: "✓",
                text: "Real-time clause analysis and risk scoring"
              },
              {
                icon: "⚡",
                text: "Review 50+ page documents in under 30 seconds"
              },
              {
                icon: "🛡️",
                text: "Enterprise-grade security and SOC2 compliance"
              }
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "28px", height: "28px", borderRadius: "50%", background: "#eff6ff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px",
                  color: "#2563eb", flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: "14px", color: "#334155", fontWeight: "500" }}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "48px",
            width: "100%",
            maxWidth: "440px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.04)"
          }}>
            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", textAlign: "center", marginBottom: "8px" }}>
              Create Account
            </h2>
            <p style={{ fontSize: "14px", color: "#64748b", textAlign: "center", marginBottom: "32px" }}>
              Start your 14-day free trial today.
            </p>

            {infoMessage && (
              <div style={{ background: "#eff6ff", color: "#2563eb", padding: "12px", borderRadius: "8px", fontSize: "13px", marginBottom: "24px", textAlign: "center", fontWeight: "600" }}>
                {infoMessage}
              </div>
            )}

            {error && (
              <div style={{ background: "#fef2f2", color: "#ef4444", padding: "12px", borderRadius: "8px", fontSize: "13px", marginBottom: "24px", textAlign: "center", fontWeight: "600" }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
                  Full Name
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>👤</span>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                    style={{
                      width: "100%", padding: "12px 12px 12px 36px", borderRadius: "8px",
                      border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
                  Email Address
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>✉️</span>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: "100%", padding: "12px 12px 12px 36px", borderRadius: "8px",
                      border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      width: "100%", padding: "12px", borderRadius: "8px",
                      border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box", textAlign: "center"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "600", color: "#334155", marginBottom: "6px" }}>
                    Confirm
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                    style={{
                      width: "100%", padding: "12px", borderRadius: "8px",
                      border: "1px solid #e2e8f0", fontSize: "14px", outline: "none", boxSizing: "border-box", textAlign: "center"
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "14px", background: "#3b82f6", color: "#fff",
                  border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "700",
                  cursor: "pointer", marginTop: "8px", transition: "background 0.2s"
                }}
              >
                {loading ? "Creating..." : "Get Started →"}
              </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
              <hr style={{ flex: 1, border: "none", borderTop: "1px solid #f1f5f9" }} />
              <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "700", letterSpacing: "1px" }}>OR CONTINUE WITH</span>
              <hr style={{ flex: 1, border: "none", borderTop: "1px solid #f1f5f9" }} />
            </div>

            <button style={{
              width: "100%", padding: "12px", background: "#fff", border: "1px solid #e2e8f0",
              borderRadius: "8px", fontSize: "14px", fontWeight: "600", color: "#334155",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              cursor: "pointer", marginBottom: "24px"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>

            <p style={{ textAlign: "center", fontSize: "13px", color: "#64748b", margin: "0 0 32px 0" }}>
              Already have an account? <Link href={`/login?redirect=${encodeURIComponent(redirectPath)}`} style={{ color: "#2563eb", fontWeight: "700", textDecoration: "none" }}>Log In</Link>
            </p>

            {/* Avatars section bottom */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "24px" }}>
              <div style={{ display: "flex" }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{
                    width: "28px", height: "28px", borderRadius: "50%", background: "#e2e8f0",
                    border: "2px solid #fff", marginLeft: i !== 1 ? "-10px" : "0"
                  }} />
                ))}
              </div>
              <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "500" }}>Joined by 10k+ Legal Teams</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
