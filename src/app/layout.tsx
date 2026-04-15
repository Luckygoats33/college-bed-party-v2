import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: { default: "College Bed Party Essentials", template: "%s | College Bed Party" },
  description: "Shop dorm room essentials curated for your school's colors. Find your college and build the perfect dorm — ships from Amazon.",
  metadataBase: new URL("https://collegebedpartyessentials.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body style={{ background: "var(--cream)", color: "var(--ink)", fontFamily: "var(--font-geist-sans, sans-serif)", WebkitFontSmoothing: "antialiased", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Nav />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Nav() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(254,252,248,0.85)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,0,0,0.07)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.25rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <span style={{
            width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
            background: "#ff3d6e", fontSize: 16,
          }}>🛏️</span>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase" }}>College</div>
            <div style={{ fontSize: 14, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.02em" }}>Bed Party</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <a href="/schools" style={{ padding: "0.5rem 0.875rem", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "var(--muted)", textDecoration: "none" }}>
            Colleges
          </a>
          <a href="/blog" style={{ padding: "0.5rem 0.875rem", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "var(--muted)", textDecoration: "none" }}>
            Blog
          </a>
          <a href="/guides" style={{ padding: "0.5rem 0.875rem", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "var(--muted)", textDecoration: "none" }}>
            Guides
          </a>
          <a href="/gallery" style={{ padding: "0.5rem 0.875rem", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "var(--muted)", textDecoration: "none" }}>
            Gallery
          </a>
          <a href="/schools" className="btn btn-dark" style={{ padding: "0.55rem 1.25rem", fontSize: 14 }}>
            Find My School →
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "rgba(254,252,248,0.55)", fontSize: 13, marginTop: "auto" }}>
      {/* CTA row */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.25rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <div>
            <p style={{ color: "var(--cream)", fontWeight: 900, fontSize: 22, margin: 0 }}>Ready to dorm right?</p>
            <p style={{ marginTop: "0.25rem" }}>Find your school and shop in seconds.</p>
          </div>
          <a href="/schools" className="btn btn-pink" style={{ flexShrink: 0 }}>Find My School →</a>
        </div>
      </div>

      {/* Links */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.25rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "2rem" }}>
        <div>
          <p style={{ color: "var(--cream)", fontWeight: 900, marginBottom: "0.5rem" }}>🛏️ College Bed Party</p>
          <p style={{ fontSize: 12, lineHeight: 1.6 }}>Dorm essentials by school color. Plan. Shop. Personalize.</p>
        </div>
        <div>
          <p style={{ color: "var(--cream)", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Explore</p>
          {[["All Schools", "/schools"], ["Guides", "/guides"], ["Gallery", "/gallery"]].map(([l, h]) => (
            <div key={l} style={{ marginBottom: "0.6rem" }}><a href={h} style={{ color: "rgba(254,252,248,0.55)", textDecoration: "none" }}>{l}</a></div>
          ))}
        </div>
        <div>
          <p style={{ color: "var(--cream)", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Regions</p>
          {[
            ["New England", "/schools?region=New+England"],
            ["Mid East", "/schools?region=Mid+East"],
            ["Southeast", "/schools?region=Southeast"],
            ["Great Lakes", "/schools?region=Great+Lakes"],
            ["Plains", "/schools?region=Plains"],
            ["Southwest", "/schools?region=Southwest"],
            ["Rocky Mountains", "/schools?region=Rocky+Mountains"],
            ["Far West", "/schools?region=Far+West"],
            ["Outlying Areas", "/schools?region=Outlying+Areas"],
          ].map(([l, h]) => (
            <div key={l} style={{ marginBottom: "0.5rem" }}><a href={h} style={{ color: "rgba(254,252,248,0.55)", textDecoration: "none", fontSize: 12 }}>{l}</a></div>
          ))}
        </div>
        <div>
          <p style={{ color: "var(--cream)", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Connect</p>
          {[
            ["📸 Instagram", "https://www.instagram.com/collegebedparty"],
            ["🎵 TikTok", "https://www.tiktok.com/@collegebedparty"],
            ["📌 Pinterest", "https://www.pinterest.com/collegebedparty"],
          ].map(([l, h]) => (
            <div key={l} style={{ marginBottom: "0.6rem" }}><a href={h} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(254,252,248,0.55)", textDecoration: "none", fontSize: 12 }}>{l}</a></div>
          ))}
        </div>
        <div>
          <p style={{ color: "var(--cream)", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Legal</p>
          {[["Privacy Policy", "/privacy"], ["Terms of Use", "/terms"], ["ADA Accessibility", "/ada"], ["Affiliate Disclosure", "/affiliate-disclosure"], ["Contact", "/contact"]].map(([l, h]) => (
            <div key={l} style={{ marginBottom: "0.5rem" }}><a href={h} style={{ color: "rgba(254,252,248,0.55)", textDecoration: "none", fontSize: 12 }}>{l}</a></div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", maxWidth: 1280, margin: "0 auto", padding: "1.25rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", fontSize: 11, color: "rgba(254,252,248,0.28)" }}>
        <span>© {new Date().getFullYear()} College Bed Party Essentials.</span>
        <span>Amazon Associate — we earn from qualifying purchases.</span>
      </div>
    </footer>
  );
}
