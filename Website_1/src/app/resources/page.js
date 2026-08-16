"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDialog } from "@/components/DialogProvider";

const RESOURCES_DATA = {
  "United States": [
    {
      id: "us-1",
      category: "regulations",
      title: "HUD Tenant Rights Directory",
      desc: "Official directory of tenant rights, laws, and protection agencies organized by state from the Department of Housing and Urban Development.",
      linkText: "Visit HUD Website",
      link: "https://www.hud.gov/topics/rental_assistance/tenantrights"
    },
    {
      id: "us-2",
      category: "legal",
      title: "LawHelp.org Legal Aid Finder",
      desc: "Helps low-income individuals find free legal aid programs in their local communities, answer legal questions, and access court forms.",
      linkText: "Find Legal Aid",
      link: "https://www.lawhelp.org/"
    },
    {
      id: "us-3",
      category: "regulations",
      title: "State Security Deposit Caps Guide",
      desc: "A comprehensive breakdown of legal limits on security deposits, return deadlines, and interest requirements for all 50 states.",
      linkText: "View Deposit Guide",
      link: "#"
    },
    {
      id: "us-4",
      category: "guides",
      title: "Small Claims Court Filing Kit",
      desc: "Step-by-step instructions on filing a claim against a landlord for unreturned security deposits or failure to maintain premises.",
      linkText: "Download Filing Guide",
      link: "#"
    },
    {
      id: "us-5",
      category: "legal",
      title: "Eviction Defense Network",
      desc: "Resources and legal defense strategies for tenants facing eviction notices, lockout situations, or retaliatory landlord behavior.",
      linkText: "Eviction Protections",
      link: "#"
    }
  ],
  "India": [
    {
      id: "in-1",
      category: "regulations",
      title: "Model Tenancy Act (MTA) Guide",
      desc: "Overview of the Model Tenancy Act designed to balance the rights of tenants and landlords, and regulate rent increments and eviction terms.",
      linkText: "Read MTA Summary",
      link: "#"
    },
    {
      id: "in-2",
      category: "legal",
      title: "NALSA Free Legal Services",
      desc: "National Legal Services Authority (NALSA) portal offering free legal aid and advice to eligible weaker sections of society in India.",
      linkText: "Access NALSA Help",
      link: "https://nalsa.gov.in/"
    },
    {
      id: "in-3",
      category: "regulations",
      title: "State Rent Control Acts Overview",
      desc: "State-specific rent laws including the Maharashtra Rent Control Act, Delhi Rent Control Act, and Karnataka Rent Control Act regulations.",
      linkText: "View Rent Laws",
      link: "#"
    },
    {
      id: "in-4",
      category: "guides",
      title: "11-Month Rental Agreement Standards",
      desc: "Explains why the 11-month lease convention is widely used in India, stamp duty rules, and registration requirements.",
      linkText: "View Lease Guide",
      link: "#"
    },
    {
      id: "in-5",
      category: "legal",
      title: "RERA Tenant Complaint Process",
      desc: "How to register grievances and file formal complaints with the Real Estate Regulatory Authority (RERA) against housing developers or landlords.",
      linkText: "RERA Grievance Steps",
      link: "#"
    }
  ]
};

export default function Resources() {
  const { showAlert } = useDialog();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCountry, setActiveCountry] = useState("United States");
  const [activeCategory, setActiveCategory] = useState("all"); // "all" | "legal" | "regulations" | "guides"

  useEffect(() => {
    setMounted(true);
    // Initialize based on what they scanned or preferred
    const savedCountry = sessionStorage.getItem("lease_country");
    if (savedCountry && (savedCountry === "United States" || savedCountry === "India")) {
      setActiveCountry(savedCountry);
    }

    // Read category from URL query parameters
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      if (catParam && ["all", "legal", "regulations", "guides"].includes(catParam)) {
        setActiveCategory(catParam);
      }
    }
  }, []);

  if (!mounted) {
    return null;
  }

  // Filtering Logic
  const resourcesList = RESOURCES_DATA[activeCountry] || [];
  const filteredResources = resourcesList.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="dashboard-main" style={{ marginTop: "104px" }}>
      {/* Title */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "4px" }}>Tenant Resources Portal</h1>
        <p style={{ color: "var(--muted)", fontSize: "15px" }}>
          Find legal assistance, regional guidelines, and tenant protection regulations.
        </p>
      </div>

      {/* Country Tabs Selector */}
      <div className="filter-tabs-row" style={{ display: "flex", gap: "12px", borderBottom: "1px solid var(--border-color)", paddingBottom: "16px", marginBottom: "24px" }}>
        <button
          className={`filter-btn-pill ${activeCountry === "United States" ? "active all" : ""}`}
          onClick={() => {
            setActiveCountry("United States");
            setActiveCategory("all");
          }}
          style={{ padding: "10px 20px", fontSize: "14px", borderRadius: "20px" }}
        >
          🇺🇸 United States Resources
        </button>
        <button
          className={`filter-btn-pill ${activeCountry === "India" ? "active all" : ""}`}
          onClick={() => {
            setActiveCountry("India");
            setActiveCategory("all");
          }}
          style={{ padding: "10px 20px", fontSize: "14px", borderRadius: "20px" }}
        >
          🇮🇳 India Resources
        </button>
      </div>

      {/* Control Bar: Search and Category Pills */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        {/* Category Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            className={`filter-btn-pill ${activeCategory === "all" ? "active all" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Resources ({resourcesList.length})
          </button>
          <button
            className={`filter-btn-pill warning-pill ${activeCategory === "legal" ? "active" : ""}`}
            onClick={() => setActiveCategory("legal")}
          >
            ⚖️ Legal Aid Services
          </button>
          <button
            className={`filter-btn-pill danger-pill ${activeCategory === "regulations" ? "active" : ""}`}
            onClick={() => setActiveCategory("regulations")}
          >
            📋 Housing Codes
          </button>
          <button
            className={`filter-btn-pill ${activeCategory === "guides" ? "active" : ""}`}
            onClick={() => setActiveCategory("guides")}
            style={{ border: "1px solid rgba(16,24,40,0.08)", background: activeCategory === "guides" ? "var(--brand)" : "#fff", color: activeCategory === "guides" ? "#fff" : "var(--navy)" }}
          >
            📖 Dispute Handbooks
          </button>
        </div>

        {/* Search Input */}
        <div style={{ position: "relative", minWidth: "260px" }}>
          <input
            type="text"
            placeholder="Search resources..."
            style={{
              width: "100%",
              padding: "10px 16px 10px 36px",
              borderRadius: "20px",
              border: "1px solid rgba(16,24,40,0.15)",
              fontSize: "14px",
              outline: "none",
              fontFamily: "var(--font-body)",
              background: "#fff"
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontSize: "14px" }}>
            🔍
          </span>
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginBottom: "40px" }}>
        {filteredResources.map((item) => (
          <article
            key={item.id}
            className="tool-card"
            style={{
              background: "#fff",
              border: "1px solid var(--border-color)",
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    background: item.category === "legal" ? "rgba(16,185,129,0.1)" : item.category === "regulations" ? "rgba(239,68,68,0.1)" : "rgba(124,58,237,0.1)",
                    color: item.category === "legal" ? "var(--success)" : item.category === "regulations" ? "var(--danger)" : "var(--brand)"
                  }}
                >
                  {item.category === "legal" ? "Legal Aid" : item.category === "regulations" ? "Regulations" : "Guide"}
                </span>
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "750", color: "var(--navy)", marginBottom: "8px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.5", marginBottom: "20px" }}>
                {item.desc}
              </p>
            </div>
            
            <a
              href={item.link}
              target={item.link === "#" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="btn secondary"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "10px",
                fontSize: "13px",
                fontWeight: "600"
              }}
              onClick={async (e) => {
                if (item.link === "#") {
                  e.preventDefault();
                  await showAlert(`Accessing ${item.title}... (Mock Resource PDF / Guide Download)`, "Resource Access");
                }
              }}
            >
              <span>{item.linkText}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </article>
        ))}

        {filteredResources.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "48px", background: "#fff", border: "1px dashed var(--border-color)", borderRadius: "12px", color: "var(--muted)" }}>
            <span style={{ fontSize: "36px", display: "block", marginBottom: "12px" }}>🔍</span>
            <h4 style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "4px" }}>No resources found</h4>
            <p style={{ fontSize: "13px" }}>Try searching for a different keyword or checking another category.</p>
          </div>
        )}
      </div>

      {/* Quick Action back to Home / Lease */}
      <div style={{ textAlign: "center", borderTop: "1px solid var(--border-color)", paddingTop: "24px", display: "flex", justifyContent: "center", gap: "16px" }}>
        <Link href="/dashboard" className="btn secondary" style={{ textDecoration: "none" }}>
          Back to Dashboard
        </Link>
        <Link href="/lease" className="btn primary" style={{ textDecoration: "none" }}>
          Scan a Lease
        </Link>
      </div>
    </main>
  );
}
