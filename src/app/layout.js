import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "RentRight — Tenant Rights Assistant",
  description: "Upload your lease to instantly identify illegal clauses, understand your obligations in plain English, and generate professional dispute letters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ position: "relative", overflowX: "hidden" }}>
        {/* Shared Decorative Animated Glowing Blobs in Background */}
        <div className="glow-blob blue" style={{ opacity: 0.08 }}></div>
        <div className="glow-blob cyan" style={{ opacity: 0.08 }}></div>
        
        {/* Navigation Header */}
        <Header />
        
        {/* Page Content */}
        {children}
        
        {/* Shared Footer */}
        <Footer />
      </body>
    </html>
  );
}
