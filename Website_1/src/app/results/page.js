"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Results() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main style={{ padding: "100px 32px 48px", maxWidth: "1280px", margin: "0 auto", fontFamily: "var(--font-body)", color: "#1e293b", background: "#f8fafc", minHeight: "100vh" }}>
      
      {/* Header section */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
          Analysis Results
        </h1>
        <p style={{ color: "#64748b", fontSize: "15px" }}>
          Legal Intelligence Report for <Link href="#" style={{ color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}>Standard Manhattan Residential Lease v4</Link>
        </p>
      </div>

      {/* Property Summary Row */}
      <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", marginBottom: "32px", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
        {[
          { label: "PROPERTY", value: "120 Wall St, New York, NY" },
          { label: "TENANT", value: "Aria Kensington" },
          { label: "RENT", value: "$4,250 / mo" },
          { label: "DURATION", value: "12 Months" },
          { label: "DEPOSIT", value: "$8,500", alert: "(Alert)" }
        ].map((item, idx) => (
          <div key={idx}>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>{item.label}</div>
            <div style={{ fontSize: "15px", fontWeight: "600", color: item.alert ? "#ea580c" : "#1e293b" }}>
              {item.value} {item.alert && <span style={{ fontSize: "12px", fontWeight: "700" }}>{item.alert}</span>}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr", gap: "32px" }}>
        
        {/* Left Column: Issues */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: 0 }}>3 Potential Issues Detected</h2>
            <span style={{ background: "#fee2e2", color: "#ef4444", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>Priority Action Required</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            
            {/* Issue 1 */}
            <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", borderLeft: "4px solid #ef4444", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 8px 0" }}>
                    <span style={{ color: "#ef4444" }}>⚠️</span> Unlawful Late Fee Clause
                  </h3>
                  <span style={{ background: "#f1f5f9", color: "#3b82f6", padding: "2px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>NY RPL § 238-a</span>
                </div>
                <span style={{ background: "#fef2f2", color: "#ef4444", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase" }}>High Severity</span>
              </div>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", marginBottom: "16px" }}>
                The current clause stipulates a late fee of 15% of the monthly rent after 3 days. Under New York State Law, late fees cannot exceed $50 or 5% of the monthly rent, whichever is less, and must allow a 5-day grace period.
              </p>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: "700", color: "#3b82f6", marginBottom: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  AI Suggested Fix
                </div>
                <p style={{ fontSize: "13px", color: "#1e293b", fontStyle: "italic", margin: 0 }}>
                  "A late fee of $50 or 5% of the monthly rent, whichever is less, may be charged if the rent is more than five (5) days late."
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#10b981" }}>✓</span> 98% Confidence
                </span>
                <Link href="#" style={{ fontSize: "13px", fontWeight: "600", color: "#3b82f6", textDecoration: "none" }}>View Details →</Link>
              </div>
            </div>

            {/* Issue 2 */}
            <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", borderLeft: "4px solid #f59e0b", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 8px 0" }}>
                    <span style={{ color: "#f59e0b" }}>!</span> Security Deposit Cap Violation
                  </h3>
                  <span style={{ background: "#f1f5f9", color: "#3b82f6", padding: "2px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>Tenant Protection Act of 2019</span>
                </div>
                <span style={{ background: "#fffbeb", color: "#d97706", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase" }}>Medium Severity</span>
              </div>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", marginBottom: "16px" }}>
                The landlord is requesting a two-month security deposit ($8,500). For residential leases in New York, the security deposit is strictly capped at one month's rent.
              </p>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: "700", color: "#3b82f6", marginBottom: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  AI Suggested Fix
                </div>
                <p style={{ fontSize: "13px", color: "#1e293b", fontStyle: "italic", margin: 0 }}>
                  "The security deposit shall not exceed $4,250, equivalent to one month's rent."
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#10b981" }}>✓</span> 94% Confidence
                </span>
                <Link href="#" style={{ fontSize: "13px", fontWeight: "600", color: "#3b82f6", textDecoration: "none" }}>View Details →</Link>
              </div>
            </div>

            {/* Issue 3 */}
            <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", borderLeft: "4px solid #3b82f6", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", display: "flex", alignItems: "center", gap: "8px", margin: "0 0 8px 0" }}>
                    <span style={{ color: "#3b82f6" }}>ℹ</span> Vague Maintenance Responsibilities
                  </h3>
                  <span style={{ background: "#f1f5f9", color: "#3b82f6", padding: "2px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>Standard Habitability Warranty</span>
                </div>
                <span style={{ background: "#eff6ff", color: "#2563eb", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: "800", textTransform: "uppercase" }}>Low Severity</span>
              </div>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6", marginBottom: "16px" }}>
                The maintenance clause places undue burden on the tenant for "all repairs including structural elements." This conflicts with the implied warranty of habitability which mandates the landlord maintain essential systems.
              </p>
              <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: "700", color: "#3b82f6", marginBottom: "8px" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  AI Suggested Fix
                </div>
                <p style={{ fontSize: "13px", color: "#1e293b", fontStyle: "italic", margin: 0 }}>
                  "The Landlord shall be responsible for structural repairs and maintenance of heating, electrical, and plumbing systems."
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                <span style={{ fontSize: "12px", fontWeight: "600", color: "#64748b", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#10b981" }}>✓</span> 88% Confidence
                </span>
                <Link href="#" style={{ fontSize: "13px", fontWeight: "600", color: "#3b82f6", textDecoration: "none" }}>View Details →</Link>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Profile & Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Overall Risk Profile */}
          <div style={{ background: "#fff", padding: "32px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <h3 style={{ fontSize: "11px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "24px" }}>Overall Risk Profile</h3>
            
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", border: "8px solid #f59e0b", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
              <span style={{ fontSize: "36px", fontWeight: "800", color: "#0f172a", lineHeight: "1" }}>78</span>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#94a3b8" }}>/ 100</span>
            </div>

            <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", margin: "0 0 8px 0" }}>Moderate Risk</h2>
            <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.5", margin: 0 }}>
              Several clauses are non-compliant with local residential laws.
            </p>
          </div>

          {/* Accordions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: "700", fontSize: "14px", color: "#1e293b" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: "#3b82f6" }}>⚖️</span> Legal Tips
              </div>
              <span style={{ color: "#94a3b8" }}>∨</span>
            </div>
            
            <div style={{ background: "#f8fafc", padding: "16px 20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: "700", fontSize: "14px", color: "#3b82f6", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span>📝</span> Suggested Amendments
                </div>
                <span>∧</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>Clause 14: Repair Protocol</div>
                  <div style={{ fontSize: "12px", color: "#475569" }}>Specify 24-hour notice requirement for non-emergency entry.</div>
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>Section 9: Renewal</div>
                  <div style={{ fontSize: "12px", color: "#475569" }}>Clarify automatic renewal terms and notice periods.</div>
                </div>
              </div>
            </div>

            <div style={{ background: "#fff", padding: "16px 20px", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontWeight: "700", fontSize: "14px", color: "#1e293b" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ color: "#3b82f6" }}>☑️</span> Next Steps
              </div>
              <span style={{ color: "#94a3b8" }}>∨</span>
            </div>
          </div>

          <button style={{ width: "100%", padding: "16px", background: "#1d4ed8", color: "#fff", borderRadius: "12px", fontWeight: "700", fontSize: "14px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 4px 12px rgba(29, 78, 216, 0.25)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download Analysis PDF
          </button>

          <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: "0 0 8px 0" }}>Need a Lawyer?</h3>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0", lineHeight: "1.5" }}>Get a 30-minute consultation with a NYC tenant-rights attorney for $49.</p>
            <button style={{ width: "100%", padding: "12px", background: "#fff", color: "#3b82f6", borderRadius: "8px", fontWeight: "700", fontSize: "13px", border: "1px solid #3b82f6", cursor: "pointer" }}>
              Book Consultation
            </button>
          </div>

        </div>

      </div>

      <div style={{ marginTop: "64px", textAlign: "center", fontSize: "11px", color: "#94a3b8" }}>
        © 2024 RentRight AI. All analysis is for informational purposes only and does not constitute legal advice.
      </div>
    </main>
  );
}
