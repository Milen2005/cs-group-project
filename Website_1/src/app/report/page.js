"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountUp from "@/components/CountUp";
import { useDialog } from "@/components/DialogProvider";

export default function Report() {
  const router = useRouter();
  const { showAlert } = useDialog();

  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [region, setRegion] = useState("California");
  const [country, setCountry] = useState("United States");
  
  // Accordion open states
  const [openAccordions, setOpenAccordions] = useState({
    security: false,
    termination: false,
    maintenance: false,
  });

  // Active filter states
  const [filter, setFilter] = useState("all"); // "all" | "warning" | "danger"

  useEffect(() => {
    setMounted(true);
    // Add page loaded transition delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    const savedRegion = sessionStorage.getItem("lease_region");
    const savedCountry = sessionStorage.getItem("lease_country");
    if (savedRegion) {
      setRegion(savedRegion);
    }
    if (savedCountry) {
      setCountry(savedCountry);
    }

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDownloadPDF = async () => {
    await showAlert("Preparing PDF preview...", "Download Report");
    window.print();
  };

  const issues = [
    {
      id: "security",
      risk: "Medium Risk",
      riskClass: "medium",
      title: "Security Deposit Clause",
      original: `"Tenant agrees to pay a security deposit equal to two months' rent, which will be held in a non-interest-bearing account."`,
      concern: "Under local tenant laws, security deposits must be held in interest-bearing accounts, with interest paid annually to the tenant.",
      action: "Ask the landlord to specify that the deposit will be held in an interest-bearing account as required by state law."
    },
    {
      id: "termination",
      risk: "Medium Risk",
      riskClass: "medium",
      title: "Early Termination Clause",
      original: `"Tenant may terminate lease early with a 60-day notice and payment of a fee equivalent to three months' rent."`,
      concern: "Early termination fees are capped at two months' rent under local statutes. A three-month fee is legally excessive.",
      action: "Negotiate to reduce the termination fee to a maximum of two months' rent to align with local tenant protections."
    },
    {
      id: "maintenance",
      risk: "High Priority",
      riskClass: "high",
      title: "Maintenance Responsibility Clause",
      original: `"Tenant is responsible for all minor repairs under $150, including plumbing, heating, and structural issues."`,
      concern: "Landlords are legally responsible for maintaining habitability, which includes plumbing, heating, and structural components. Shifting this burden to the tenant violates state habitability codes.",
      action: "Request removal of plumbing and heating maintenance clauses from tenant responsibility. These essential utilities must be maintained by the landlord."
    }
  ];

  // Filtering logic
  const filteredIssues = issues.filter(issue => {
    if (filter === "all") return true;
    if (filter === "warning" && issue.riskClass === "medium") return true;
    if (filter === "danger" && issue.riskClass === "high") return true;
    return false;
  });

  return (
    <div className={isLoaded ? "dashboard-loaded" : ""}>
      <main className="dashboard-main" style={{ marginTop: "104px" }}>
        
        {/* Top Header Label */}
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "4px" }}>Lease Analysis Report</h1>
          <p style={{ color: "var(--muted)", fontSize: "15px" }}>Jurisdiction: {region}, {country}</p>
        </div>

        {/* Top Summary Metrics Grid */}
        <div className="stats-summary-row">
          {/* Card 1: Clauses Analyzed */}
          <div className="stat-summary-card">
            <div className="label">Clauses Analyzed</div>
            <div className="value">
              <CountUp target="42" duration={1200} />
            </div>
          </div>

          {/* Card 2: Issues Found */}
          <div className="stat-summary-card">
            <div className="label">Potential Issues</div>
            <div className="value" style={{ color: "var(--danger)" }}>
              <CountUp target="3" duration={900} />
            </div>
          </div>

          {/* Card 3: Compliance Gauge */}
          <div className="stat-summary-card">
            <div className="label">Compliance Score</div>
            <div className="compliance-gauge-wrapper">
              <svg width="48" height="48" viewBox="0 0 36 36" className="compliance-circle-svg">
                <path className="compliance-circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="compliance-circle-fill"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="compliance-percentage-text">
                <CountUp target="92" suffix="%" duration={1500} />
              </div>
            </div>
          </div>

          {/* Card 4: Risk Level */}
          <div className="stat-summary-card">
            <div className="label">Risk Level</div>
            <div className="value" style={{ display: "flex", flexDirection: "column" }}>
              <span className="risk-badge-span">Low</span>
            </div>
          </div>
        </div>

        {/* AI Analysis Executive Summary Card */}
        <div className="summary-container-box">
          <h3>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--brand)" }}>
              <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
              <polyline points="2 17 12 22 22 17"></polyline>
              <polyline points="2 12 12 17 22 12"></polyline>
            </svg>
            AI Analysis Executive Summary
          </h3>
          <p>"This lease is generally compliant with tenant protection guidelines. However, several clauses should be
            reviewed carefully before signing."</p>
        </div>

        {/* Filter Buttons Bar */}
        <div className="filter-tabs-row">
          <button 
            className={`filter-btn-pill ${filter === "all" ? "active all" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Clauses ({issues.length})
          </button>
          <button 
            className={`filter-btn-pill warning-pill ${filter === "warning" ? "active" : ""}`}
            onClick={() => setFilter("warning")}
          >
            Items Requiring Attention (2)
          </button>
          <button 
            className={`filter-btn-pill danger-pill ${filter === "danger" ? "active" : ""}`}
            onClick={() => setFilter("danger")}
          >
            Potential Legal Concerns (1)
          </button>
        </div>

        {/* Flagged Clauses Accordion List */}
        <div className="accordion-list">
          {filteredIssues.map((issue) => (
            <div 
              key={issue.id} 
              className={`accordion-item ${openAccordions[issue.id] ? "expanded" : ""}`}
              id={`accordion-${issue.id}`}
            >
              <button 
                className="accordion-header-btn" 
                aria-expanded={openAccordions[issue.id]} 
                onClick={() => toggleAccordion(issue.id)}
              >
                <div className="accordion-header-left">
                  <span className={`risk-indicator-tag ${issue.riskClass}`}>{issue.risk}</span>
                  <span className="clause-name-text">{issue.title}</span>
                </div>
                <svg 
                  className="accordion-chevron" 
                  width="20" height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              <div 
                className="accordion-content-box"
                style={{
                  maxHeight: openAccordions[issue.id] ? "500px" : "0px",
                  transition: "max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                <div className="accordion-content-inner">
                  <div className="content-block">
                    <h4>Original Text</h4>
                    <p style={{ fontStyle: "italic", color: "#334155" }}>{issue.original}</p>
                  </div>
                  <div className="content-block">
                    <h4>Legal Concern</h4>
                    <p>{issue.concern}</p>
                  </div>
                  <div className="content-block">
                    <h4>Action Suggested</h4>
                    <p>{issue.action}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredIssues.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--muted)", background: "#fff", border: "1px solid var(--border-color)", borderRadius: "12px" }}>
              No clauses matches the active filter.
            </div>
          )}
        </div>

        {/* Bottom Report Action Buttons */}
        <div className="report-actions-row">
          <Link href="/letters" className="btn primary">
            Create Dispute Letter
          </Link>
          <button className="btn secondary" onClick={handleDownloadPDF}>
            Download PDF Report
          </button>
          <Link href="/lease" className="btn text-btn">
            Upload Another Lease
          </Link>
        </div>

      </main>
    </div>
  );
}
