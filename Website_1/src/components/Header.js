"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDialog } from "@/components/DialogProvider";

export default function Header() {
  const pathname = usePathname();

  // Hide header completely on login and signup pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initials, setInitials] = useState("JD");
  const { showConfirm } = useDialog();

  useEffect(() => {
    setMounted(true);
    const checkAuth = () => {
      const username = localStorage.getItem("username");
      if (username) {
        setIsLoggedIn(true);
        setInitials(localStorage.getItem("initials") || "JD");
      } else {
        setIsLoggedIn(false);
      }
    };
    checkAuth();

    // Listen to custom event for login changes (if any page updates auth state)
    window.addEventListener("auth-change", checkAuth);
    // Also listen to storage events to sync across tabs
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, [pathname]);

  const handleLogout = async () => {
    const confirmed = await showConfirm("Are you sure you want to log out?", "Log Out");
    if (confirmed) {
      localStorage.clear();
      setIsLoggedIn(false);
      window.dispatchEvent(new Event("auth-change"));
      router.push("/");
    }
  };

  // Prevent hydration flicker by not rendering auth buttons on the server
  const renderNavLinks = () => {
    if (!mounted) return null;

    if (isLoggedIn) {
      return (
        <>
          <Link href="/dashboard" className={pathname === "/dashboard" ? "active" : ""}>
            Dashboard
          </Link>
          <Link href="/upload" className={pathname === "/upload" ? "active" : ""}>
            Upload
          </Link>
          <Link href="/results" className={pathname === "/results" ? "active" : ""}>
            Results
          </Link>
          <Link href="/compare" className={pathname === "/compare" ? "active" : ""}>
            Compare
          </Link>
          <Link href="/history" className={pathname === "/history" ? "active" : ""}>
            History
          </Link>
          <Link href="/generate-letter" className={pathname === "/generate-letter" ? "active" : ""}>
            Generate Letter
          </Link>
        </>
      );
    } else {
      if (pathname === "/") {
        return (
          <>
            <a href="#steps">Platform</a>
            <a href="#features">Solutions</a>
            <a href="#impact">Our Mission</a>
          </>
        );
      } else {
        return (
          <>
            <Link href="/">Home</Link>
            <Link href="/resources?category=legal">Legal Aid</Link>
            <Link href="/resources" className={pathname === "/resources" ? "active" : ""}>
              Resources
            </Link>
          </>
        );
      }
    }
  };

  const renderNavRight = () => {
    if (!mounted) return null;

    if (isLoggedIn) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Notification Bell Icon */}
          <a href="#" aria-label="Notifications" style={{ color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px", borderRadius: "50%" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </a>
          {/* Settings Gear Icon */}
          <Link href="/settings" aria-label="Settings" style={{ color: pathname === "/settings" ? "var(--brand)" : "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", padding: "6px", borderRadius: "50%" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l-.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l-.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </Link>
          {/* Initials Avatar Badge */}
          <div 
            className="user-profile-avatar" 
            id="avatarInitials" 
            style={{ cursor: "pointer" }} 
            title="Click to Log Out"
            onClick={handleLogout}
          >
            {initials}
          </div>
        </div>
      );
    } else {
      if (pathname && pathname.startsWith("/dashboard")) {
        return null;
      }
      return (
        <>
          <Link href="/login" className="btn-signin">
            Sign In
          </Link>
        </>
      );
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="brand" aria-label="RentRight Home">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" fill="var(--brand)" />
            <path d="M9 14h6v7H9v-7z" fill="#fff" opacity="0.3" />
          </svg>
          <span>Rent<span className="brand-text">Right</span></span>
        </Link>
        <nav className="nav-center" aria-label="Main navigation">
          {renderNavLinks()}
        </nav>
        <div className="nav-right">
          {renderNavRight()}
        </div>
      </div>
    </header>
  );
}
