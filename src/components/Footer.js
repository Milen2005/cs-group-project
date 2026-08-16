import Link from "next/link";

export default function Footer() {
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
          <p>Empowering tenants through technology and accessible legal information.</p>
        </div>
        
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="/#steps">How It Works</Link></li>
              <li><Link href="/#features">Features</Link></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Contact Support</a></li>
              <li><a href="#">Legal Disclaimer</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 RentRight Advocacy. All rights reserved. Empowering tenants through technology.</p>
      </div>
    </footer>
  );
}
