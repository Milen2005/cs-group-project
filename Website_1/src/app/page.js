"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountUp from "@/components/CountUp";
import { useDialog } from "@/components/DialogProvider";

export default function Home() {
  const router = useRouter();
  const { showAlert } = useDialog();

  const handleScanMyLeaseClick = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    if (!username) {
      await showAlert(
        "Please log in or sign up to scan your lease agreement.",
        "Authentication Required"
      );
      router.push("/signup?message=Please sign up to scan your lease agreement&redirect=/lease");
    } else {
      router.push("/lease");
    }
  };

  useEffect(() => {
    // Set up scroll reveal observer
    const reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
      const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      };

      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      reveals.forEach((el) => revealObserver.observe(el));

      return () => {
        reveals.forEach((el) => revealObserver.unobserve(el));
      };
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-landing" style={{ background: "linear-gradient(135deg, #fbfbfe 0%, #ffffff 100%)", paddingBottom: "120px" }}>
        <div className="hero-landing-container">
          <div className="hero-landing-split">
            <div className="hero-content reveal active" style={{ flex: 1.1 }}>
              <div className="hero-badge">
                <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "var(--brand)" }}></span>
                Next-Gen Housing Protection
              </div>
              <h1 style={{ fontSize: "56px", lineHeight: "1.1", marginBottom: "20px", fontWeight: "800" }}>
                Know Your Rights.
                <br />
                <span style={{ color: "var(--brand)" }}>Defend Your Home.</span>
              </h1>
              <p className="hero-desc" style={{ fontSize: "17px", lineHeight: "1.6", color: "var(--muted)", marginBottom: "32px", maxWidth: "520px" }}>
                AI-powered lease analysis that identifies illegal clauses and empowers tenants with professional legal documentation in seconds.
              </p>
              <div className="hero-buttons" style={{ display: "flex", gap: "16px" }}>
                <button 
                  className="btn primary" 
                  onClick={handleScanMyLeaseClick}
                  style={{ border: "none", cursor: "pointer", padding: "14px 28px", display: "inline-flex", alignItems: "center", gap: "10px" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Scan My Lease
                </button>
                <a className="btn secondary" href="#steps" style={{ padding: "14px 28px", display: "inline-flex", alignItems: "center", gap: "10px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                  </svg>
                  Watch Demo
                </a>
              </div>
            </div>

            {/* Simulated Live Integrity Check Visual */}
            <div className="hero-visual reveal active reveal-delay-2" style={{ flex: 0.9, position: "relative" }}>
              <div className="hero-mockup-wrapper">
                {/* Backing lease page visual */}
                <div className="hero-mockup-document">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px", marginBottom: "10px" }}>
                    <span style={{ fontSize: "10px", fontWeight: "700", color: "#94a3b8" }}>LEASE AGREEMENT - ANALYSIS</span>
                    <span style={{ fontSize: "9px", color: "#cbd5e1" }}>PAGE 1 OF 6</span>
                  </div>
                  <div className="document-line"></div>
                  <div className="document-line" style={{ width: "90%" }}></div>
                  <div className="document-line" style={{ width: "40%" }}></div>
                  <div style={{ height: "1px", background: "#f8fafc", margin: "8px 0" }}></div>
                  <div className="document-line" style={{ height: "10px", background: "rgba(124, 58, 237, 0.05)" }}></div>
                  <div className="document-line" style={{ height: "10px", background: "rgba(124, 58, 237, 0.05)", width: "70%" }}></div>
                  <div style={{ marginTop: "auto", display: "flex", gap: "10px" }}>
                    <div style={{ height: "16px", background: "#f1f5f9", width: "80px", borderRadius: "4px" }}></div>
                    <div style={{ height: "16px", background: "#f1f5f9", width: "60px", borderRadius: "4px" }}></div>
                  </div>
                </div>

                {/* Glassmorphism check overlay */}
                <div className="hero-mockup-glass-card">
                  <div className="hero-mockup-laser"></div>
                  <div className="hero-mockup-header">
                    <div className="hero-mockup-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                    </div>
                    <div className="hero-mockup-text">
                      <h4>Lease Integrity Check</h4>
                      <p>Scanning legal databases...</p>
                    </div>
                  </div>

                  <div className="hero-mockup-progress">
                    <div className="progress-line"></div>
                    <div className="progress-line filled"></div>
                    <div className="progress-line" style={{ width: "50%" }}></div>
                  </div>

                  <div className="hero-mockup-footer">
                    <span>Protection Score</span>
                    <span className="hero-mockup-score">98.4%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Steps Section */}
      <section id="steps" className="section-steps" style={{ position: "relative", marginTop: "-60px", zIndex: 10, background: "transparent", padding: "0 24px 96px" }}>
        <div className="section-container-centered">
          <div className="steps-grid" style={{ display: "flex", gap: "32px", justifyContent: "center" }}>
            {/* Step 1 */}
            <div className="step-card reveal reveal-delay-1" style={{ flex: 1, minWidth: "280px", padding: "40px 32px", borderRadius: "16px", background: "#ffffff", border: "1px solid var(--border-color)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
              <div className="step-icon-bg upload" style={{ width: "48px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyItems: "center", paddingLeft: "12px", background: "rgba(124, 58, 237, 0.08)", color: "var(--brand)", marginBottom: "24px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--navy)", marginBottom: "12px" }}>01. Upload</h3>
              <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6" }}>
                Securely drag and drop your lease agreement. We handle PDF, DOCX, and high-res images.
              </p>
            </div>
            {/* Step 2 */}
            <div className="step-card reveal reveal-delay-2" style={{ flex: 1, minWidth: "280px", padding: "40px 32px", borderRadius: "16px", background: "#ffffff", border: "1px solid var(--border-color)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
              <div className="step-icon-bg analyze" style={{ width: "48px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyItems: "center", paddingLeft: "12px", background: "rgba(20, 184, 166, 0.08)", color: "#14b8a6", marginBottom: "24px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--navy)", marginBottom: "12px" }}>02. Analyze</h3>
              <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6" }}>
                Our proprietary AI cross-references 10,000+ local housing statutes to find irregularities.
              </p>
            </div>
            {/* Step 3 */}
            <div className="step-card reveal reveal-delay-3" style={{ flex: 1, minWidth: "280px", padding: "40px 32px", borderRadius: "16px", background: "#ffffff", border: "1px solid var(--border-color)", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
              <div className="step-icon-bg act" style={{ width: "48px", height: "48px", borderRadius: "10px", display: "flex", alignItems: "center", justifyItems: "center", paddingLeft: "12px", background: "rgba(217, 70, 239, 0.08)", color: "#d946ef", marginBottom: "24px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--navy)", marginBottom: "12px" }}>03. Execute</h3>
              <p style={{ fontSize: "14px", color: "var(--muted)", lineHeight: "1.6" }}>
                Download professional dispute letters, or plain-English explanations of your rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Built for the Modern Tenant Section */}
      <section className="section-features" style={{ background: "#ffffff", padding: "40px 0 96px" }}>
        <div className="features-section-header">
          <div className="features-section-title reveal">
            <h2>Built for the Modern Tenant</h2>
            <p>We've combined cutting-edge NLP technology with expert legal frameworks to put power back in your hands.</p>
          </div>
          <Link href="/resources" className="explore-link reveal">
            Explore All Features
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        <div className="features-cards-grid">
          {/* Card 1: Violation Detection */}
          <div className="feature-card-violet-light reveal reveal-delay-1">
            <div className="feature-card-content">
              <div className="feature-badge-violet">Advanced Engine</div>
              <h3>Violation Detection 2.0</h3>
              <p>
                Our engine automatically flags clauses that violate local housing codes, state statutes, or federal fair housing laws.
              </p>
            </div>
            <a href="#" className="feature-link-violet">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Updated for 2024 Regulations
            </a>
          </div>

          {/* Card 2: Plain English */}
          <div className="feature-card-violet-solid reveal reveal-delay-2">
            <div className="feature-card-content">
              <h3>Plain English</h3>
              <p>
                We translate complex "Legalese" into actionable steps that anyone can understand.
              </p>
              <div className="translation-preview-box">
                <span>BEFORE (LEGALESE):</span>
                <p>"Tenants taking the aforementioned clause 4.2 sub-section d..."</p>
              </div>
            </div>
            <div className="feature-card-bg-watermark">文</div>
          </div>

          {/* Card 3: Dispute Generator */}
          <div className="feature-card-full reveal">
            <div className="feature-card-full-content">
              <h3>One-Click Dispute Generator</h3>
              <p>
                Generate legally-sound notice letters for maintenance delays, security deposit returns, or illegal entry issues instantly.
              </p>
            </div>
            <Link 
              href="/letters" 
              className="btn primary" 
              style={{ 
                background: "#ffffff", 
                color: "#1e293b", 
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                display: "inline-flex", 
                alignItems: "center", 
                gap: "8px",
                whiteSpace: "nowrap"
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="9"></line>
                <line x1="9" y1="13" x2="15" y2="13"></line>
                <line x1="9" y1="17" x2="15" y2="17"></line>
                <polyline points="5 9 5.01 9"></polyline>
                <polyline points="5 13 5.01 13"></polyline>
                <polyline points="5 17 5.01 17"></polyline>
              </svg>
              Browse Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="section-impact" style={{ background: "#F5F3FF", padding: "96px 24px" }}>
        <div className="reveal">
          <div className="impact-subtitle" style={{ textTransform: "uppercase", fontSize: "12px", fontWeight: "750", letterSpacing: "1px", color: "var(--brand)", marginBottom: "8px" }}>
            Leveling the Playing Field
          </div>
          <h2 style={{ fontSize: "38px", fontWeight: "800", color: "var(--navy)", marginBottom: "16px" }}>
            Empowering tenants for a more stable future.
          </h2>
          <div style={{ width: "48px", height: "4px", background: "var(--brand)", borderRadius: "2px", margin: "0 auto 48px" }}></div>
        </div>

        <div className="stats-grid reveal reveal-delay-2">
          <div className="stat-item" style={{ background: "#ffffff" }}>
            <div className="stat-number">
              <CountUp target="150" suffix="k+" duration={1500} />
            </div>
            <div className="stat-label">Leases Scanned</div>
          </div>
          <div className="stat-item" style={{ background: "#ffffff" }}>
            <div className="stat-number">
              <CountUp target="2" prefix="$" suffix="M+" duration={1500} />
            </div>
            <div className="stat-label">Deposits Recovered</div>
          </div>
          <div className="stat-item" style={{ background: "#ffffff" }}>
            <div className="stat-number">
              <CountUp target="48" duration={1500} />
            </div>
            <div className="stat-label">States Covered</div>
          </div>
          <div className="stat-item" style={{ background: "#ffffff" }}>
            <div className="stat-number">
              <CountUp target="100" suffix="%" duration={1500} />
            </div>
            <div className="stat-label">Secure & Private</div>
          </div>
        </div>
      </section>
    </>
  );
}
