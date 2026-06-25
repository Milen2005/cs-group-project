"use client";

import { useEffect } from "react";
import Link from "next/link";
import CountUp from "@/components/CountUp";

export default function Home() {
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
      <section className="hero-landing">
        <div className="hero-landing-container">
          <div className="hero-content reveal active">
            <div className="hero-tagline">Tenant Rights Assistant</div>
            <h1>
              Know Your Rights.
              <br />
              <span>Protect Your Home.</span>
            </h1>
            <p className="hero-desc">
              Upload your lease to instantly identify illegal clauses, understand your obligations in plain English, and generate professional dispute letters.
            </p>
            <div className="hero-buttons">
              <Link className="btn primary" href="/lease">
                <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Scan My Lease
                </span>
              </Link>
              <a className="btn secondary" href="#steps">
                How It Works
              </a>
            </div>
          </div>

          <div className="hero-visual reveal active reveal-delay-2">
            {/* Document Analysis Widget Mockup */}
            <div className="mockup-container">
              <div className="mockup-header">
                <div className="mockup-header-dot"></div>
                <div className="mockup-header-dot"></div>
                <div className="mockup-header-dot"></div>
                <span style={{ color: "var(--muted)", fontSize: "12px", marginLeft: "auto" }}>
                  lease_agreement.pdf
                </span>
              </div>
              <div className="mockup-content">
                <div className="mockup-title">Lease Agreement Analysis</div>
                <div className="mockup-bar"></div>
                <div className="mockup-bar short"></div>

                <div className="mockup-card-item">
                  <div className="mockup-icon" style={{ background: "rgba(239,68,68,0.1)", color: "var(--danger)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--danger)" }}>
                      Illegal Entry Clause Flagged
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Landlord entry requires 24h notice.
                    </div>
                  </div>
                </div>

                <div className="mockup-card-item">
                  <div className="mockup-icon" style={{ background: "rgba(245,158,11,0.1)", color: "var(--warning)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--warning)" }}>
                      Maintenance Deposit Issue
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                      Excessive security deposit terms found.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="steps" className="section-steps">
        <div className="section-container-centered">
          <div className="section-header-center reveal">
            <h2>Empowering You in Three Simple Steps</h2>
            <div className="section-title-divider"></div>
          </div>
          <div className="steps-grid">
            {/* Step 1 */}
            <div className="step-card reveal reveal-delay-1">
              <div className="step-icon-bg upload">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              </div>
              <h3>Upload</h3>
              <p>Securely upload your lease agreement in PDF or image format.</p>
            </div>
            {/* Step 2 */}
            <div className="step-card reveal reveal-delay-2">
              <div className="step-icon-bg analyze">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <h3>Analyze</h3>
              <p>Our AI scans for legal violations and unfair terms specific to your local laws.</p>
            </div>
            {/* Step 3 */}
            <div className="step-card reveal reveal-delay-3">
              <div className="step-icon-bg act">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3>Act</h3>
              <p>Get a plain-English breakdown and generate a formal letter to your landlord.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-tools">
        <div className="section-header-left reveal">
          <h2>Powerful Tools for Every Tenant</h2>
          <p>Advanced technology meets legal expertise.</p>
        </div>

        <div className="tools-grid">
          {/* Tool 1 */}
          <div className="tool-card reveal reveal-delay-1">
            <div className="tool-icon-wrap" style={{ background: "rgba(30,109,249,0.08)", color: "var(--brand)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="tool-content">
              <div className="tool-badge" style={{ background: "rgba(30,109,249,0.1)", color: "var(--brand)" }}>
                Legal Compliance
              </div>
              <h3>Violation Detection</h3>
              <p>
                Our engine automatically flags clauses that violate local housing codes, state statutes, or federal fair housing laws. We keep track of the fine print so you don't have to.
              </p>
            </div>
          </div>

          {/* Tool 2 */}
          <div className="tool-card reveal reveal-delay-2">
            <div className="tool-icon-wrap" style={{ background: "rgba(16,185,129,0.08)", color: "var(--success)" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div className="tool-content">
              <div className="tool-badge" style={{ background: "rgba(16,185,129,0.1)", color: "var(--success)" }}>
                Plain-English Translation
              </div>
              <h3>Plain English Explainer</h3>
              <p>
                Translates complex legal jargon into clear, actionable information you can actually understand. Know exactly what rights you retain and what duties you owe.
              </p>
            </div>
          </div>
        </div>

        {/* Callout Banner Card */}
        <div className="banner-card reveal">
          <div>
            <h3>Dispute Letter Generator</h3>
            <p>
              Creates ready-to-send formal notices for common maintenance and lease issues. Professional, firm, and legally sound documents generated in seconds.
            </p>
          </div>
          <Link href="/letters" className="btn" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            View Templates
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="section-impact">
        <div className="reveal">
          <div className="impact-subtitle">Why It Matters</div>
          <h2>Empowering tenants for a more stable future.</h2>
          <p>
            Housing is a human right. We believe that technology should be used to bridge the legal knowledge gap, ensuring that every tenant, regardless of their background, can defend their right to a safe and fair home.
          </p>
        </div>

        <div className="stats-grid reveal reveal-delay-2">
          <div className="stat-item">
            <div className="stat-number">
              <CountUp target="10" suffix="k+" duration={1500} />
            </div>
            <div className="stat-label">Leases Scanned</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <CountUp target="50" suffix="+" duration={1500} />
            </div>
            <div className="stat-label">Cities Covered</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              <CountUp target="24" suffix="/7" duration={1500} />
            </div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </section>
    </>
  );
}
