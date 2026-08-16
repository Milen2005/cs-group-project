"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Upload() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleAnalyze = () => {
    setIsUploading(true);
    setTimeout(() => {
      router.push("/results");
    }, 1500);
  };

  return (
    <main style={{ padding: "100px 32px 48px", maxWidth: "800px", margin: "0 auto", fontFamily: "var(--font-body)", color: "#1e293b", background: "#f8fafc", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
          Upload Rental Agreement
        </h1>
        <p style={{ color: "#64748b", fontSize: "15px" }}>
          Upload PDF or DOCX for AI-powered legal analysis
        </p>
      </div>

      <div style={{ width: "100%", background: "#fff", borderRadius: "24px", padding: "40px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        {/* Drag & Drop Area */}
        <div style={{
          width: "100%", border: "2px dashed #cbd5e1", borderRadius: "16px", background: "#f8fafc",
          padding: "64px 32px", display: "flex", flexDirection: "column", alignItems: "center",
          marginBottom: "32px", transition: "border 0.2s, background 0.2s", cursor: "pointer"
        }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#eff6ff", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#334155", marginBottom: "8px" }}>Drag and drop your lease here</h3>
          <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "24px" }}>Supported formats: PDF, DOCX (Max 20MB)</p>
          <button style={{ background: "#fff", border: "1px solid #3b82f6", color: "#3b82f6", padding: "10px 24px", borderRadius: "8px", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>
            Choose File
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAnalyze}
          disabled={isUploading}
          style={{
            width: "100%", maxWidth: "400px", background: "#3b82f6", color: "#fff", border: "none",
            padding: "16px", borderRadius: "12px", fontWeight: "700", fontSize: "16px", cursor: "pointer",
            opacity: isUploading ? 0.7 : 1, transition: "opacity 0.2s", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)"
          }}
        >
          {isUploading ? "Analyzing..." : "Analyze Lease"}
        </button>

        <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "24px", textAlign: "center" }}>
          By uploading, you agree to our <a href="#" style={{ color: "#3b82f6", textDecoration: "underline" }}>Terms of Service</a>. Your data is encrypted and used only for analysis.
        </p>

      </div>
    </main>
  );
}
