"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function History() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main style={{ padding: "100px 32px 48px", maxWidth: "1280px", margin: "0 auto", fontFamily: "var(--font-body)", color: "#1e293b", background: "#f8fafc", minHeight: "100vh" }}>
      
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
          Lease History
        </h1>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", gap: "16px" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: "480px" }}>
          <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input type="text" placeholder="Search leases..." style={{ width: "100%", padding: "12px 16px 12px 42px", borderRadius: "12px", border: "1px solid #e2e8f0", background: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "10px 16px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px", fontWeight: "600", color: "#475569", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
            Risk Level ∨
          </button>
          <button style={{ padding: "10px 16px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px", fontWeight: "600", color: "#475569", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            Date Range ∨
          </button>
          <button style={{ padding: "10px 16px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "13px", fontWeight: "600", color: "#475569", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            Status ∨
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", overflow: "hidden", marginBottom: "24px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f8fafc", color: "#64748b", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px" }}>
              <th style={{ padding: "20px 24px", fontWeight: "700" }}>Lease Name</th>
              <th style={{ padding: "20px 24px", fontWeight: "700" }}>Upload Date</th>
              <th style={{ padding: "20px 24px", fontWeight: "700" }}>Risk Score</th>
              <th style={{ padding: "20px 24px", fontWeight: "700" }}>Status</th>
              <th style={{ padding: "20px 24px", fontWeight: "700", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Standard Manhattan Lease v4", date: "Oct 12, 2023", risk: "High (82/100)", rcolor: "#ef4444", rbg: "#fef2f2", status: "Completed", icon: "📄" },
              { name: "Brooklyn Commercial Temp", date: "Oct 10, 2023", risk: "Moderate (45/100)", rcolor: "#d97706", rbg: "#fffbeb", status: "Completed", icon: "📄" },
              { name: "Queens Residential Addendum", date: "Oct 12, 2023", risk: "- N/A", rcolor: "#64748b", rbg: "#f1f5f9", status: "Processing...", icon: "📄" },
              { name: "Staten Island Retail Lease Rev2", date: "Oct 05, 2023", risk: "Low (12/100)", rcolor: "#2563eb", rbg: "#eff6ff", status: "Completed", icon: "📄" }
            ].map((row, i) => (
              <tr key={i} style={{ borderTop: "1px solid #f1f5f9", transition: "background 0.2s" }} className="hover-row">
                <td style={{ padding: "20px 24px", fontSize: "14px", fontWeight: "600", color: "#0f172a", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#eff6ff", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>{row.icon}</div>
                  {row.name}
                </td>
                <td style={{ padding: "20px 24px", fontSize: "14px", color: "#475569" }}>{row.date}</td>
                <td style={{ padding: "20px 24px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: row.rcolor, background: row.rbg, padding: "6px 12px", borderRadius: "20px", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    {row.rcolor === "#ef4444" && "⚠️"}
                    {row.rcolor === "#d97706" && "!"}
                    {row.rcolor === "#2563eb" && "ℹ"}
                    {row.risk}
                  </span>
                </td>
                <td style={{ padding: "20px 24px", fontSize: "13px", fontWeight: "600", color: row.status === "Completed" ? "#2563eb" : "#64748b" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {row.status === "Completed" ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    ) : (
                      <svg style={{ animation: "spin 2s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l5.67-1.35"/></svg>
                    )}
                    {row.status}
                  </span>
                </td>
                <td style={{ padding: "20px 24px", textAlign: "right" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px", color: "#94a3b8" }}>
                    <a href="/results" style={{ color: "inherit" }} title="View Results"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></a>
                    {row.status === "Completed" && (
                      <>
                        <a href="#" style={{ color: "inherit" }} title="Download PDF"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></a>
                        <a href="/generate-letter" style={{ color: "inherit" }} title="Generate Letter"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
                      </>
                    )}
                    <a href="#" style={{ color: "inherit" }} title="Options"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#64748b" }}>
        <span>Showing 1 to 10 of 48 results</span>
        <div style={{ display: "flex", gap: "4px" }}>
          <button style={{ padding: "8px 12px", border: "1px solid #e2e8f0", background: "#fff", borderRadius: "8px", cursor: "pointer", color: "#475569", fontWeight: "600" }}>&lt;</button>
          <button style={{ padding: "8px 12px", border: "1px solid #3b82f6", background: "#3b82f6", borderRadius: "8px", cursor: "pointer", color: "#fff", fontWeight: "600" }}>1</button>
          <button style={{ padding: "8px 12px", border: "1px solid #e2e8f0", background: "#fff", borderRadius: "8px", cursor: "pointer", color: "#475569", fontWeight: "600" }}>2</button>
          <button style={{ padding: "8px 12px", border: "1px solid #e2e8f0", background: "#fff", borderRadius: "8px", cursor: "pointer", color: "#475569", fontWeight: "600" }}>3</button>
          <span style={{ padding: "8px", color: "#94a3b8" }}>...</span>
          <button style={{ padding: "8px 12px", border: "1px solid #e2e8f0", background: "#fff", borderRadius: "8px", cursor: "pointer", color: "#475569", fontWeight: "600" }}>5</button>
          <button style={{ padding: "8px 12px", border: "1px solid #e2e8f0", background: "#fff", borderRadius: "8px", cursor: "pointer", color: "#475569", fontWeight: "600" }}>&gt;</button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hover-row:hover { background: #f8fafc; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </main>
  );
}
