"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GenerateLetter() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main style={{ padding: "100px 32px 48px", maxWidth: "1280px", margin: "0 auto", fontFamily: "var(--font-body)", color: "#1e293b", background: "#f8fafc", minHeight: "100vh" }}>
      
      {/* Header & Breadcrumbs */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", marginBottom: "12px", display: "flex", gap: "8px" }}>
          <Link href="/history" style={{ color: "inherit", textDecoration: "none" }}>History</Link>
          <span>›</span>
          <Link href="/results" style={{ color: "inherit", textDecoration: "none" }}>Lease Analysis</Link>
          <span>›</span>
          <span style={{ color: "#3b82f6" }}>Generate Letter</span>
        </div>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
          Generate Legal Letter
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "32px", alignItems: "start" }}>
        
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Lease Summary */}
          <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>Lease Summary</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <div style={{ fontSize: "10px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>PROPERTY</div>
                <div style={{ fontSize: "13px", fontWeight: "500", color: "#1e293b" }}>1242 Redwood Terrace, Apt 4B</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>TENANT</div>
                  <div style={{ fontSize: "13px", fontWeight: "500", color: "#1e293b" }}>Sarah J. Miller</div>
                </div>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>LANDLORD</div>
                  <div style={{ fontSize: "13px", fontWeight: "500", color: "#1e293b" }}>Apex Realty Group</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: "10px", fontWeight: "800", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>ANALYZED DATE</div>
                <div style={{ fontSize: "13px", fontWeight: "500", color: "#1e293b" }}>October 14, 2023</div>
              </div>
            </div>
          </div>

          {/* Detected Violations */}
          <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0f172a", margin: 0 }}>Detected Violations</h3>
              <span style={{ background: "#fee2e2", color: "#ef4444", padding: "4px 8px", borderRadius: "12px", fontSize: "10px", fontWeight: "800" }}>3 issues</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "Unlawful Late Fee", desc: "Section 4.2: Exceeds 5% cap.", badge: "CRITICAL", color: "#ef4444", bg: "#fef2f2" },
                { title: "Security Deposit Cap", desc: "Section 2.1: Non-compliance.", badge: "WARNING", color: "#d97706", bg: "#fffbeb" },
                { title: "Maintenance Clause", desc: "Section 9.0: Vague language.", badge: "MINOR", color: "#2563eb", bg: "#eff6ff" }
              ].map((v, i) => (
                <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>{v.title}</div>
                    <span style={{ background: v.color, color: "#fff", padding: "2px 8px", borderRadius: "8px", fontSize: "9px", fontWeight: "800", letterSpacing: "0.5px" }}>{v.badge}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Pro-Tip */}
          <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: "800", color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" }}>
              ✨ AI PRO-TIP
            </div>
            <p style={{ fontSize: "13px", color: "#475569", fontStyle: "italic", lineHeight: "1.6", margin: 0 }}>
              "Including specific RCW or Civil Code citations in your letter increases resolution probability by 34%."
            </p>
          </div>

        </div>

        {/* Right Column: Editor */}
        <div style={{ position: "relative" }}>
          
          {/* Toolbar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", background: "#e2e8f0", borderRadius: "8px", padding: "4px" }}>
              <button className="tb-btn" style={{ fontWeight: "bold" }}>B</button>
              <button className="tb-btn" style={{ fontStyle: "italic", fontFamily: "serif" }}>I</button>
              <button className="tb-btn">≡</button>
              <div style={{ width: "1px", background: "#cbd5e1", margin: "0 8px" }}></div>
              <button className="tb-btn">↶</button>
              <button className="tb-btn">↷</button>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button className="action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download PDF
              </button>
              <button className="action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                Copy
              </button>
              <button className="action-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Email
              </button>
            </div>
          </div>

          {/* Paper Editor */}
          <div style={{ background: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", padding: "64px", minHeight: "700px", fontFamily: "serif", color: "#1e293b", lineHeight: "1.8", fontSize: "15px" }}>
            
            <div style={{ textAlign: "right", marginBottom: "48px" }}>
              October 24, 2023
            </div>

            <div style={{ marginBottom: "32px", fontWeight: "bold" }}>
              To: Apex Realty Group<br/>
              <span style={{ fontWeight: "normal" }}>
                Compliance Department<br/>
                900 Urban Ave, Suite 100<br/>
                Seattle, WA 98101
              </span>
            </div>

            <div style={{ fontWeight: "bold", marginBottom: "32px" }}>
              RE: Formal Notice of Lease Non-Compliance - 1242 Redwood Terrace, Apt 4B
            </div>

            <div style={{ marginBottom: "24px" }}>Dear Management Team,</div>
            
            <div style={{ marginBottom: "24px" }}>
              I am writing this formal letter to address several concerns identified during a professional review of the residential lease agreement for the above-referenced property. It has come to my attention that certain provisions within the current lease structure do not align with jurisdictional housing regulations. Specifically, we identify the following points of contention:
            </div>

            <ol style={{ marginBottom: "24px", paddingLeft: "24px" }}>
              <li style={{ marginBottom: "16px" }}>
                <strong>Unlawful Late Fees:</strong> Section 4.2 of the lease stipulates a late fee of $150.00 for payments received after the 3rd. Pursuant to local ordinance, late fees may not exceed 5% of the total monthly rent ($2,200), which caps the legal limit at $110.00.
              </li>
              <li style={{ marginBottom: "16px" }}>
                <strong>Security Deposit Cap:</strong> The collected deposit of $4,500 exceeds the legal maximum of two months' rent as mandated by RCW § 59.18.260.
              </li>
              <li style={{ marginBottom: "16px" }}>
                <strong>Maintenance Responsibility:</strong> Clause 9.0 vaguely assigns "all general repairs" to the tenant. Under the Implied Warranty of Habitability, essential structural and utility maintenance remains the non-delegable duty of the landlord.
              </li>
            </ol>

            <div style={{ marginBottom: "48px" }}>
              I kindly request a written response acknowledging these discrepancies and a revised lease addendum correcting these points by November 1, 2023. I value our tenancy relationship and aim to resolve these technical inaccuracies promptly and amicably.
            </div>

            <div style={{ marginBottom: "64px" }}>
              Sincerely,
            </div>

            <div>
              Sarah J. Miller
            </div>

          </div>

          {/* Floating Regenerate Button */}
          <button style={{ position: "absolute", bottom: "32px", right: "32px", background: "#1d4ed8", color: "#fff", padding: "16px 24px", borderRadius: "12px", border: "none", cursor: "pointer", fontWeight: "800", fontSize: "14px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 10px 25px rgba(29, 78, 216, 0.4)", transition: "transform 0.2s" }} onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseOut={e => e.currentTarget.style.transform = "none"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9"></path></svg>
            Regenerate with AI
          </button>

        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .tb-btn { background: transparent; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; color: #475569; font-size: 14px; }
        .tb-btn:hover { background: #fff; }
        .action-btn { background: #fff; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 8px; cursor: pointer; color: #475569; font-size: 13px; font-weight: 600; display: flex; alignItems: center; gap: 8px; transition: all 0.2s; }
        .action-btn:hover { border-color: #cbd5e1; background: #f8fafc; }
      `}} />
    </main>
  );
}
