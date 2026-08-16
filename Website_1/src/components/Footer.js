"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }
  return (
    <footer className="site-footer">
      <div className="footer-main-container">
        <div className="footer-brand-side">
          <Link className="logo" href="/">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5z" fill="var(--brand)" />
            </svg>
            <span>Rent<span>Right</span></span>
          </Link>
          <p style={{ maxWidth: "340px" }}>
            Protecting tenants through accessible legal intelligence and innovative technology. Your home, your rights, our mission.
          </p>
        </div>
        
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link href="/lease">Lease Scanner</Link></li>
              <li><Link href="/letters">Letter Generator</Link></li>
              <li><Link href="/resources">Law Database</Link></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Impact Report</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Disclaimer</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", maxWidth: "1200px", margin: "48px auto 0", padding: "24px 0 0", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
        <p>&copy; 2024 RentRight Technologies Group. Empowering tenants worldwide.</p>
        <Link 
          href="/lease" 
          className="btn primary" 
          style={{ 
            padding: "8px 16px", 
            fontSize: "13px", 
            borderRadius: "6px", 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "8px", 
            boxShadow: "none" 
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Scan Now
        </Link>
      </div>
    </footer>
  );
}
