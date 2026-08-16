"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDialog } from "@/components/DialogProvider";

export default function Settings() {
  const router = useRouter();
  const { showAlert, showConfirm } = useDialog();

  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "security" | "notifications" | "preferences"

  // Profile Form State
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [avatarInitials, setAvatarInitials] = useState("");

  // Security Form State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mfaEnabled, setMfaEnabled] = useState(false);

  // Notification States
  const [emailRenewal, setEmailRenewal] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushCompletion, setPushCompletion] = useState(false);

  // App Preference States
  const [defaultRegion, setDefaultRegion] = useState("California");
  const [darkMode, setDarkMode] = useState(false);

  // Status alerts
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setMounted(true);

    // Retrieve initial values from localStorage
    const savedFullname = localStorage.getItem("fullname") || "Jane Doe";
    const savedEmail = localStorage.getItem("email") || "jane.doe@example.com";
    const savedInitials = localStorage.getItem("initials") || "JD";
    
    setFullname(savedFullname);
    setEmail(savedEmail);
    setAvatarInitials(savedInitials);

    const savedRegion = sessionStorage.getItem("lease_region") || localStorage.getItem("default_region") || "California";
    setDefaultRegion(savedRegion);
    
    const savedDarkMode = localStorage.getItem("dark_mode") === "true";
    setDarkMode(savedDarkMode);
  }, []);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!fullname.trim() || !email.trim()) {
      setErrorMsg("Full Name and Email Address cannot be empty.");
      return;
    }

    // Extract updated details
    let rawFullname = fullname.trim();
    let parts = rawFullname.split(/\s+/);
    let username = "Jane";
    let initials = "JD";
    if (parts.length > 0) {
      username = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
      if (parts.length > 1) {
        initials = parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
      } else {
        initials = parts[0].charAt(0).toUpperCase();
      }
    }

    localStorage.setItem("fullname", rawFullname);
    localStorage.setItem("username", username);
    localStorage.setItem("initials", initials);
    localStorage.setItem("email", email.trim().toLowerCase());
    
    setAvatarInitials(initials);
    setSuccessMsg("Profile details saved successfully!");
    
    // Dispatch auth-change event to update the header
    window.dispatchEvent(new Event("auth-change"));

    // Clear alert after 3 seconds
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSecuritySave = (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!oldPassword) {
      setErrorMsg("Please enter your current password to make changes.");
      return;
    }

    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setErrorMsg("New passwords do not match.");
        return;
      }
      if (newPassword.length < 6) {
        setErrorMsg("New password must be at least 6 characters.");
        return;
      }
    }

    setSuccessMsg("Security settings updated successfully!");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handlePreferenceSave = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    
    localStorage.setItem("default_region", defaultRegion);
    localStorage.setItem("dark_mode", darkMode.toString());

    // Mock Dark Mode effect
    if (darkMode) {
      document.body.classList.add("dark-theme-mock");
      await showAlert("Dark Mode theme updated in app preferences!", "App Preferences");
    } else {
      document.body.classList.remove("dark-theme-mock");
    }

    setSuccessMsg("App preferences updated!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleLogout = async () => {
    const confirmed = await showConfirm("Are you sure you want to log out?", "Log Out");
    if (confirmed) {
      localStorage.clear();
      sessionStorage.clear();
      window.dispatchEvent(new Event("auth-change"));
      router.push("/");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = await showConfirm(
      "WARNING: Are you absolutely sure you want to delete your account? This action is permanent and cannot be undone.",
      "Delete Account"
    );
    if (confirmed) {
      localStorage.clear();
      sessionStorage.clear();
      window.dispatchEvent(new Event("auth-change"));
      await showAlert("Your account has been deleted.", "Account Deleted");
      router.push("/");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="dashboard-main" style={{ marginTop: "104px", maxWidth: "1000px" }}>
      
      {/* Title */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "4px" }}>Settings</h1>
        <p style={{ color: "var(--muted)", fontSize: "15px" }}>Manage your account details, preferences, and security settings.</p>
      </div>

      {/* Main Settings Panel Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "32px", alignItems: "start" }} className="settings-grid">
        
        {/* Left Side: Navigation Pills */}
        <nav className="settings-sidebar" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <button 
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            style={{ textAlign: "left", width: "100%", padding: "12px 16px", borderRadius: "8px", border: "0", background: activeTab === "profile" ? "var(--bg-light)" : "transparent", fontWeight: activeTab === "profile" ? 700 : 500, color: activeTab === "profile" ? "var(--brand)" : "var(--navy)", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
            onClick={() => { setActiveTab("profile"); setSuccessMsg(""); setErrorMsg(""); }}
          >
            <span>👤</span> Profile & Account
          </button>
          <button 
            className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
            style={{ textAlign: "left", width: "100%", padding: "12px 16px", borderRadius: "8px", border: "0", background: activeTab === "security" ? "var(--bg-light)" : "transparent", fontWeight: activeTab === "security" ? 700 : 500, color: activeTab === "security" ? "var(--brand)" : "var(--navy)", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
            onClick={() => { setActiveTab("security"); setSuccessMsg(""); setErrorMsg(""); }}
          >
            <span>🔒</span> Security & Privacy
          </button>
          <button 
            className={`tab-btn ${activeTab === "notifications" ? "active" : ""}`}
            style={{ textAlign: "left", width: "100%", padding: "12px 16px", borderRadius: "8px", border: "0", background: activeTab === "notifications" ? "var(--bg-light)" : "transparent", fontWeight: activeTab === "notifications" ? 700 : 500, color: activeTab === "notifications" ? "var(--brand)" : "var(--navy)", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
            onClick={() => { setActiveTab("notifications"); setSuccessMsg(""); setErrorMsg(""); }}
          >
            <span>🔔</span> Notifications
          </button>
          <button 
            className={`tab-btn ${activeTab === "preferences" ? "active" : ""}`}
            style={{ textAlign: "left", width: "100%", padding: "12px 16px", borderRadius: "8px", border: "0", background: activeTab === "preferences" ? "var(--bg-light)" : "transparent", fontWeight: activeTab === "preferences" ? 700 : 500, color: activeTab === "preferences" ? "var(--brand)" : "var(--navy)", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
            onClick={() => { setActiveTab("preferences"); setSuccessMsg(""); setErrorMsg(""); }}
          >
            <span>⚙️</span> App Preferences
          </button>

          <hr style={{ border: "0", borderTop: "1px solid var(--border-color)", margin: "16px 0" }} />
          
          <button 
            className="tab-btn" 
            style={{ textAlign: "left", width: "100%", padding: "12px 16px", borderRadius: "8px", border: "0", background: "transparent", color: "var(--danger)", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
            onClick={handleLogout}
          >
            <span>🚪</span> Log Out
          </button>
        </nav>

        {/* Right Side: Form Content Panel */}
        <section className="card-wide" style={{ background: "#fff", border: "1px solid var(--border-color)", borderRadius: "16px", padding: "32px", minHeight: "400px" }}>
          
          {/* Notifications Success/Error messages */}
          {successMsg && (
            <div style={{ padding: "12px 16px", background: "rgba(16,185,129,0.08)", border: "1px solid var(--success)", color: "var(--success)", borderRadius: "8px", fontWeight: "600", fontSize: "14px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✓</span> {successMsg}
            </div>
          )}

          {errorMsg && (
            <div style={{ padding: "12px 16px", background: "rgba(239,68,68,0.08)", border: "1px solid var(--danger)", color: "var(--danger)", borderRadius: "8px", fontWeight: "600", fontSize: "14px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>⚠️</span> {errorMsg}
            </div>
          )}

          {/* TAB 1: Profile & Account */}
          {activeTab === "profile" && (
            <form onSubmit={handleProfileSave}>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", marginBottom: "24px" }}>Profile & Account Details</h3>
              
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "800", boxShadow: "0 4px 12px rgba(124,58,237,0.2)" }}>
                  {avatarInitials}
                </div>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "var(--navy)" }}>{fullname || "User Name"}</h4>
                  <p style={{ fontSize: "13px", color: "var(--muted)", margin: "2px 0 0" }}>Personal Tenant Account</p>
                </div>
              </div>

              <div className="login-form" style={{ maxWidth: "100%", gap: "16px" }}>
                <div className="form-group">
                  <label className="label">Full Name</label>
                  <input 
                    type="text" 
                    className="no-icon" 
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="label">Email Address</label>
                  <input 
                    type="email" 
                    className="no-icon" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button className="btn primary" type="submit" style={{ width: "fit-content", padding: "12px 24px", marginTop: "12px" }}>
                  Save Profile Details
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Security & Privacy */}
          {activeTab === "security" && (
            <form onSubmit={handleSecuritySave}>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", marginBottom: "24px" }}>Security & Privacy Settings</h3>
              
              <div className="login-form" style={{ maxWidth: "100%", gap: "16px", marginBottom: "30px" }}>
                <div className="form-group">
                  <label className="label">Current Password</label>
                  <input 
                    type="password" 
                    className="no-icon" 
                    placeholder="••••••••"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="label">New Password</label>
                  <input 
                    type="password" 
                    className="no-icon" 
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="no-icon" 
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button className="btn primary" type="submit" style={{ width: "fit-content", padding: "12px 24px", marginTop: "12px" }}>
                  Update Password
                </button>
              </div>

              <hr style={{ border: "0", borderTop: "1px solid var(--border-color)", margin: "32px 0 24px" }} />

              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--navy)", marginBottom: "12px" }}>Two-Factor Authentication</h4>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "var(--bg-light)", borderRadius: "12px" }}>
                <div>
                  <div style={{ fontWeight: 650, color: "var(--navy)", fontSize: "14px" }}>Secure account access via MFA</div>
                  <p style={{ fontSize: "12px", color: "var(--muted)", margin: "2px 0 0" }}>Add an extra layer of protection using authenticator codes.</p>
                </div>
                <label className="checkbox" style={{ margin: 0 }}>
                  <input 
                    type="checkbox" 
                    checked={mfaEnabled} 
                    onChange={(e) => setMfaEnabled(e.target.checked)} 
                  />
                  <span>MFA Enabled</span>
                </label>
              </div>

              <hr style={{ border: "0", borderTop: "1px solid var(--border-color)", margin: "32px 0 24px" }} />

              <h4 style={{ fontSize: "16px", fontWeight: 700, color: "var(--danger)", marginBottom: "12px" }}>Danger Zone</h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "16px" }}>Once you delete your account, there is no going back. All scanned leases, generated drafts, and profile data will be permanently wiped.</p>
              <button className="btn text-btn" type="button" style={{ color: "var(--danger)", background: "rgba(239, 68, 68, 0.08)", padding: "12px 24px", border: "1px solid var(--danger)", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }} onClick={handleDeleteAccount}>
                Permanently Delete Account
              </button>
            </form>
          )}

          {/* TAB 3: Notifications */}
          {activeTab === "notifications" && (
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", marginBottom: "24px" }}>Notification Preferences</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                
                {/* Switch 1: email renewal */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "var(--bg-light)", borderRadius: "12px" }}>
                  <div>
                    <div style={{ fontWeight: 650, color: "var(--navy)", fontSize: "14px" }}>Lease Renewal Reminders</div>
                    <p style={{ fontSize: "12px", color: "var(--muted)", margin: "2px 0 0" }}>Receive alert notifications 60, 45, and 30 days prior to lease expiry.</p>
                  </div>
                  <label className="checkbox" style={{ margin: 0 }}>
                    <input 
                      type="checkbox" 
                      checked={emailRenewal} 
                      onChange={(e) => setEmailRenewal(e.target.checked)} 
                    />
                    <span>On</span>
                  </label>
                </div>

                {/* Switch 2: legal updates */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "var(--bg-light)", borderRadius: "12px" }}>
                  <div>
                    <div style={{ fontWeight: 650, color: "var(--navy)", fontSize: "14px" }}>Tenant Rights Legal Updates</div>
                    <p style={{ fontSize: "12px", color: "var(--muted)", margin: "2px 0 0" }}>Stay informed when state/regional tenant legislation changes.</p>
                  </div>
                  <label className="checkbox" style={{ margin: 0 }}>
                    <input 
                      type="checkbox" 
                      checked={emailAlerts} 
                      onChange={(e) => setEmailAlerts(e.target.checked)} 
                    />
                    <span>On</span>
                  </label>
                </div>

                {/* Switch 3: browser push */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "var(--bg-light)", borderRadius: "12px" }}>
                  <div>
                    <div style={{ fontWeight: 650, color: "var(--navy)", fontSize: "14px" }}>Browser Scan Notifications</div>
                    <p style={{ fontSize: "12px", color: "var(--muted)", margin: "2px 0 0" }}>Get browser push alerts when AI analysis reports finish compiling.</p>
                  </div>
                  <label className="checkbox" style={{ margin: 0 }}>
                    <input 
                      type="checkbox" 
                      checked={pushCompletion} 
                      onChange={(e) => setPushCompletion(e.target.checked)} 
                    />
                    <span>On</span>
                  </label>
                </div>

              </div>

              <button className="btn primary" style={{ width: "fit-content", padding: "12px 24px", marginTop: "24px" }} onClick={() => { setSuccessMsg("Notification settings saved!"); setTimeout(() => setSuccessMsg(""), 3000); }}>
                Save Notification Settings
              </button>
            </div>
          )}

          {/* TAB 4: App Preferences */}
          {activeTab === "preferences" && (
            <form onSubmit={handlePreferenceSave}>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "var(--navy)", marginBottom: "24px" }}>App Preferences</h3>
              
              <div className="login-form" style={{ maxWidth: "100%", gap: "20px" }}>
                <div className="form-group">
                  <label className="label">Default Scanning Jurisdiction</label>
                  <select 
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid rgba(16, 24, 40, 0.15)",
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      outline: "none",
                      background: "#fff"
                    }}
                    value={defaultRegion}
                    onChange={(e) => setDefaultRegion(e.target.value)}
                  >
                    <option value="California">California</option>
                    <option value="New York">New York</option>
                    <option value="Texas">Texas</option>
                    <option value="Washington">Washington</option>
                  </select>
                  <p style={{ fontSize: "11px", color: "var(--muted)", marginTop: "4px" }}>This region's tenant statutes will be selected by default when scanning new documents.</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "var(--bg-light)", borderRadius: "12px" }}>
                  <div>
                    <div style={{ fontWeight: 650, color: "var(--navy)", fontSize: "14px" }}>Dark Mode Theme</div>
                    <p style={{ fontSize: "12px", color: "var(--muted)", margin: "2px 0 0" }}>Switch visual theme layout to dark/night mode.</p>
                  </div>
                  <label className="checkbox" style={{ margin: 0 }}>
                    <input 
                      type="checkbox" 
                      checked={darkMode} 
                      onChange={(e) => setDarkMode(e.target.checked)} 
                    />
                    <span>Dark Mode</span>
                  </label>
                </div>

                <button className="btn primary" type="submit" style={{ width: "fit-content", padding: "12px 24px", marginTop: "12px" }}>
                  Save App Preferences
                </button>
              </div>
            </form>
          )}

        </section>

      </div>
    </main>
  );
}
