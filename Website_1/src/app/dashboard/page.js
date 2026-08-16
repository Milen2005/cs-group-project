"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main style={{ padding: "100px 32px 48px", maxWidth: "1280px", margin: "0 auto", fontFamily: "var(--font-body)", color: "#1e293b", background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
            Legal Intelligence Dashboard
          </h1>
          <p style={{ color: "#64748b", fontSize: "14px" }}>
            Welcome back. Your portfolio is currently at 12.5% risk capacity.
          </p>
        </div>
        <button
          onClick={() => router.push("/upload")}
          style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          Upload Lease
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "24px" }}>
        {[
          { label: "Documents Uploaded", value: "1,248", icon: "📄", change: "+12%", changeColor: "#10b981", changeBg: "#d1fae5" },
          { label: "Violations Found", value: "42", icon: "⚠️", change: "-2%", changeColor: "#ef4444", changeBg: "#fee2e2" },
          { label: "Avg Risk Score", value: "12.5/100", icon: "📊", badge: "Low" },
          { label: "Letters Generated", value: "86", icon: "✉️", badge: "Active" }
        ].map((stat, idx) => (
          <div key={idx} style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                {stat.icon}
              </div>
              {stat.change && (
                <span style={{ color: stat.changeColor, background: stat.changeBg, padding: "4px 8px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                  {stat.change}
                </span>
              )}
              {stat.badge && (
                <span style={{ color: "#3b82f6", background: "#eff6ff", padding: "4px 8px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                  {stat.badge}
                </span>
              )}
            </div>
            <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "600", marginBottom: "4px" }}>{stat.label}</div>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a" }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Chart */}
          <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Compliance Velocity</h3>
                <p style={{ fontSize: "13px", color: "#64748b" }}>Monthly breakdown of document processing volume.</p>
              </div>
              <select style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #e2e8f0", fontSize: "13px", outline: "none" }}>
                <option>Last 6 Months</option>
              </select>
            </div>
            {/* Mock Chart Area */}
            <div style={{ height: "240px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", padding: "0 16px" }}>
              {[60, 80, 45, 90, 65, 85].map((h, i) => (
                <div key={i} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div style={{ position: "relative", width: "100%", height: "200px", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                    {i === 2 && (
                      <div style={{ position: "absolute", top: `${200 - h - 30}px`, background: "#1e293b", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "700" }}>
                        112
                      </div>
                    )}
                    <div style={{ width: "100%", height: `${h}%`, background: i === 2 ? "#3b82f6" : "#e2e8f0", borderRadius: "6px 6px 0 0", transition: "height 0.3s" }}></div>
                  </div>
                  <span style={{ fontSize: "12px", color: "#64748b" }}>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Audits Table */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", overflow: "hidden" }}>
            <div style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9" }}>
              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Recent Lease Audits</h3>
              <a href="/history" style={{ fontSize: "13px", color: "#3b82f6", fontWeight: "600", textDecoration: "none" }}>View All</a>
            </div>
            
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#f8fafc", color: "#64748b", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  <th style={{ padding: "16px 24px", fontWeight: "600" }}>Lease Name</th>
                  <th style={{ padding: "16px 24px", fontWeight: "600" }}>Upload Date</th>
                  <th style={{ padding: "16px 24px", fontWeight: "600" }}>Risk Score</th>
                  <th style={{ padding: "16px 24px", fontWeight: "600" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Madison_Sq_Gardens_L5.pdf", date: "Oct 24, 2023", risk: "08/100", rcolor: "#10b981", status: "Completed", scolor: "#10b981" },
                  { name: "Brooklyn_Heights_Lease.docx", date: "Oct 23, 2023", risk: "45/100", rcolor: "#f59e0b", status: "In Progress", scolor: "#f59e0b" },
                  { name: "Corporate_HQ_Ref_202.pdf", date: "Oct 22, 2023", risk: "82/100", rcolor: "#ef4444", status: "Action Required", scolor: "#ef4444" }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i !== 2 ? "1px solid #f1f5f9" : "none" }}>
                    <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                      📄 {row.name}
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "13px", color: "#64748b" }}>{row.date}</td>
                    <td style={{ padding: "16px 24px" }}>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: row.rcolor, border: `1px solid ${row.rcolor}40`, padding: "4px 8px", borderRadius: "12px" }}>
                        {row.risk}
                      </span>
                    </td>
                    <td style={{ padding: "16px 24px", fontSize: "13px", fontWeight: "500", color: "#334155" }}>
                      <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: row.scolor, marginRight: "8px" }}></span>
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* AI Accelerators */}
          <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "16px" }}>AI Accelerators</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link href="/compare" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid #e2e8f0", borderRadius: "12px", textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "14px", transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "#3b82f6" }}>✨</span> Compare Leases
                </div>
                <span style={{ color: "#94a3b8" }}>→</span>
              </Link>
              <Link href="/generate-letter" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid #e2e8f0", borderRadius: "12px", textDecoration: "none", color: "#334155", fontWeight: "600", fontSize: "14px", transition: "all 0.2s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ color: "#3b82f6" }}>📝</span> Generate Letter
                </div>
                <span style={{ color: "#94a3b8" }}>→</span>
              </Link>
            </div>
          </div>

          {/* Risk Distribution */}
          <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "24px" }}>Risk Distribution</h3>
            
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
              {/* Fake Doughnut Chart */}
              <div style={{ width: "160px", height: "160px", borderRadius: "50%", background: "conic-gradient(#062244 0% 75%, #e2e8f0 75% 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>75%</span>
                  <span style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" }}>Secure</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Compliant", count: 938, color: "#1d4ed8" },
                { label: "Warning", count: 212, color: "#facc15" },
                { label: "Critical", count: 100, color: "#b91c1c" }
              ].map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", fontWeight: "500", color: "#334155" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color }}></div>
                    {item.label}
                  </div>
                  <span>{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{ background: "#fff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a", marginBottom: "16px" }}>Recent Activity</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                { title: "Lease Approved", desc: "Madison_Sq_Gardens_L5.pdf successfully audited.", time: "2 hours ago", color: "#2563eb", icon: "✓" },
                { title: "Letter Sent", desc: "Termination notice sent to Property Mgmt Inc.", time: "8 hours ago", color: "#f59e0b", icon: "✉" },
                { title: "New Upload", desc: "System received 'Brooklyn_Heights_Lease.docx'", time: "Yesterday", color: "#64748b", icon: "⬆" }
              ].map((act, idx) => (
                <div key={idx} style={{ display: "flex", gap: "12px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: `1px solid ${act.color}`, color: act.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>
                    {act.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a", marginBottom: "4px" }}>{act.title}</h4>
                    <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px 0", lineHeight: "1.4" }}>{act.desc}</p>
                    <span style={{ fontSize: "10px", color: "#94a3b8" }}>{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
