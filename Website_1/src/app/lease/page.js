"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDialog } from "@/components/DialogProvider";

export default function Lease() {
  const router = useRouter();
  const { showAlert } = useDialog();

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("upload"); // "upload" | "paste"
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [selectedRegion, setSelectedRegion] = useState("Select Region");

  // Scanning simulation state
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState("Uploading lease agreement... ⏳");

  const fileInputRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Restore any pending lease details from a previous unauthenticated session
    const pendingCountry = sessionStorage.getItem("pending_lease_country");
    const pendingRegion = sessionStorage.getItem("pending_lease_region");
    const pendingText = sessionStorage.getItem("pending_lease_pasted_text");
    const pendingTab = sessionStorage.getItem("pending_lease_active_tab");
    if (pendingCountry) {
      setSelectedCountry(pendingCountry);
      sessionStorage.removeItem("pending_lease_country");
    }
    if (pendingRegion) {
      setSelectedRegion(pendingRegion);
      sessionStorage.removeItem("pending_lease_region");
    }
    if (pendingText) {
      setPastedText(pendingText);
      sessionStorage.removeItem("pending_lease_pasted_text");
    }
    if (pendingTab) {
      setActiveTab(pendingTab);
      sessionStorage.removeItem("pending_lease_active_tab");
    }
  }, []);

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleScanClick = async () => {
    // Check if the user is logged in
    const username = localStorage.getItem("username");
    if (!username) {
      // Save current input state in sessionStorage to restore after login
      sessionStorage.setItem("pending_lease_country", selectedCountry);
      sessionStorage.setItem("pending_lease_region", selectedRegion);
      sessionStorage.setItem("pending_lease_pasted_text", pastedText);
      sessionStorage.setItem("pending_lease_active_tab", activeTab);

      await showAlert("Please log in or sign up to scan your lease agreement.", "Authentication Required");
      router.push("/signup?message=Please sign up to scan your lease agreement&redirect=/lease");
      return;
    }

    if (selectedRegion === "Select Region") {
      await showAlert("Please select your region to check local laws.", "Region Required");
      return;
    }

    if (activeTab === "upload" && !selectedFile) {
      await showAlert("Please upload a lease document before scanning.", "Document Required");
      return;
    }

    if (activeTab === "paste" && pastedText.trim().length < 50) {
      await showAlert("Please paste a substantial portion of your lease agreement (minimum 50 characters).", "Text Too Short");
      return;
    }

    // Start simulated scanning animation
    setIsScanning(true);
    setScanProgress(0);
    setScanStatus("Uploading lease agreement... ⏳");
  };

  // Run progress simulation when isScanning is true
  useEffect(() => {
    if (!isScanning) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      if (progress > 100) {
        progress = 100;
      }
      
      setScanProgress(progress);

      if (progress >= 25 && progress < 55) {
        setScanStatus("Scanning document contents... 🔍");
      } else if (progress >= 55 && progress < 85) {
        setScanStatus("Analyzing clauses with AI... 🤖");
      } else if (progress >= 85) {
        setScanStatus("Generating compliance report... 📋");
      }

      if (progress >= 100) {
        clearInterval(interval);
        
        // Save scan metadata in session/local storage
        localStorage.setItem("scanned", "true");
        sessionStorage.setItem("lease_region", selectedRegion);
        sessionStorage.setItem("lease_country", selectedCountry);
        sessionStorage.setItem(
          "lease_doc_name",
          activeTab === "upload" ? selectedFile.name : "Pasted Lease Agreement"
        );
        
        // Wait slightly then redirect to report
        setTimeout(() => {
          router.push("/report");
        }, 300);
      }
    }, 48); // ~2.4 seconds total duration

    return () => clearInterval(interval);
  }, [isScanning, activeTab, selectedFile, selectedRegion, router]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Title Section */}
      <div className="lease-heading-box" style={{ marginTop: "100px" }}>
        <h1>Analyze Your Lease</h1>
        <p>Upload your agreement to identify hidden clauses and legal protections.</p>
      </div>

      {/* Main Scanner Card Container */}
      <main className="centered-lease-container">
        <section className="card-wide" style={{ position: "relative", overflow: "hidden" }}>
          
          {/* Scanning Progress Overlay */}
          {isScanning && (
            <div className="scan-container active">
              <div className="scan-laser-line"></div>
              <div className="scan-progress-percent">{scanProgress}%</div>
              <p style={{ fontWeight: 600, marginTop: "10px", color: "var(--navy)", fontSize: "15px" }}>
                {scanStatus}
              </p>
              <div className="scan-progress-bar-wrap">
                <div className="scan-progress-bar-fill" style={{ width: `${scanProgress}%`, transition: "width 0.05s linear" }}></div>
              </div>
            </div>
          )}

          {/* Tabs Header */}
          <div className="tabs-header" role="tablist">
            <div 
              className={`tab-btn ${activeTab === "upload" ? "active" : ""}`} 
              role="tab" 
              aria-selected={activeTab === "upload"}
              onClick={() => setActiveTab("upload")}
            >
              Upload File
            </div>
            <div 
              className={`tab-btn ${activeTab === "paste" ? "active" : ""}`} 
              role="tab" 
              aria-selected={activeTab === "paste"}
              onClick={() => setActiveTab("paste")}
            >
              Paste Text
            </div>
          </div>

          {/* Tab Contents */}
          {activeTab === "upload" ? (
            <div id="uploadArea">
              <div 
                className="upload-drag-area" 
                id="dropzone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="upload-cloud-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <h3>{selectedFile ? `Selected: ${selectedFile.name}` : "Drag and drop file"}</h3>
                <p>{selectedFile ? `${((selectedFile.size) / 1024 / 1024).toFixed(2)} MB` : "PDF, JPG, or PNG up to 16MB"}</p>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept=".pdf,image/*" 
                  style={{ display: "none" }} 
                  onChange={handleFileChange}
                />
                <button className="btn secondary" style={{ padding: "10px 18px", fontSize: "14px" }} onClick={handleBrowseClick}>
                  Browse Files
                </button>
              </div>
            </div>
          ) : (
            <div id="pasteArea">
              <div style={{ marginBottom: "20px" }}>
                <textarea
                  placeholder="Paste your lease agreement text here (minimum 50 characters)..."
                  rows="8"
                  style={{
                    width: "100%",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "2px dashed rgba(124, 58, 237, 0.25)",
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    outline: "none",
                    background: "var(--bg-light)",
                    resize: "vertical"
                  }}
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {/* Region Dropdowns */}
          <div className="region-row">
            <select 
              className="region-select" 
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedRegion("Select Region");
              }}
            >
              <option value="United States">United States</option>
              <option value="India">India</option>
            </select>
            <select 
              className="region-select" 
              value={selectedRegion} 
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="Select Region">Select Region</option>
              {selectedCountry === "United States" ? (
                <>
                  <option value="California">California</option>
                  <option value="New York">New York</option>
                  <option value="Texas">Texas</option>
                  <option value="Washington">Washington</option>
                </>
              ) : (
                <>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                </>
              )}
            </select>
          </div>

          {/* Scan Button */}
          <button className="btn primary" style={{ width: "100%", marginTop: "20px" }} onClick={handleScanClick}>
            Scan My Lease 📋
          </button>

          {/* Security lock note */}
          <div className="security-lock-text">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#6D28D9" }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Your document is processed securely. We use bank-level encryption to protect your privacy.</span>
          </div>

        </section>
      </main>

      {/* Badges Grid at the Bottom */}
      <div className="badge-row-container">
        <div className="badge-item-mini">
          <div className="badge-mini-icon gavel">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div className="badge-mini-content">
            <h4>Legal Accuracy</h4>
            <p>Cross-referenced with local statutes.</p>
          </div>
        </div>

        <div className="badge-item-mini">
          <div className="badge-mini-icon eye">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <div className="badge-mini-content">
            <h4>Hidden Fees</h4>
            <p>We spot complex fee structures easily.</p>
          </div>
        </div>

        <div className="badge-item-mini">
          <div className="badge-mini-icon calendar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div className="badge-mini-content">
            <h4>Renewal Alerts</h4>
            <p>Get notified of mandatory deadlines.</p>
          </div>
        </div>
      </div>
    </>
  );
}
