import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: { default: "College Bed Party Guide", template: "%s | College Bed Party Guide" },
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
  const navLinks = [
    { label: "Colleges", href: "/schools" },
    { label: "Blog",     href: "/blog" },
    { label: "Guides",   href: "/guides" },
    { label: "Gallery",  href: "/gallery" },
  ];

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(254,252,248,0.92)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(0,0,0,0.07)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.25rem", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>

        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          <span style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: "#ff3d6e", fontSize: 16, flexShrink: 0 }}>🛏️</span>
          <div style={{ lineHeight: 1.15 }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: "var(--ink)", letterSpacing: "-0.01em" }}>College Bed Party</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.04em" }}>Guide</div>
          </div>
        </a>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}>
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href} style={{ padding: "0.5rem 0.875rem", borderRadius: 10, fontSize: 14, fontWeight: 600, color: "var(--muted)", textDecoration: "none" }}>
              {label}
            </a>
          ))}
          <a href="/schools" className="btn btn-dark" style={{ marginLeft: "0.375rem", padding: "0.55rem 1.25rem", fontSize: 14 }}>
            Find My School →
          </a>
        </nav>

      </div>
    </header>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <div style={{ marginBottom: "0.55rem" }}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        style={{ color: "rgba(254,252,248,0.55)", textDecoration: "none", fontSize: 13, lineHeight: 1.5 }}
      >
        {children}
      </a>
    </div>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: "var(--cream)", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem", marginTop: 0 }}>
      {children}
    </p>
  );
}

function Footer() {
  return (
    <footer style={{ background: "var(--ink)", color: "rgba(254,252,248,0.55)", fontSize: 13, marginTop: "auto" }}>

      {/* CTA band */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.25rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <div>
            <p style={{ color: "var(--cream)", fontWeight: 900, fontSize: 22, margin: "0 0 0.25rem" }}>Ready to dorm right?</p>
            <p style={{ margin: 0 }}>Find your college and shop in seconds.</p>
          </div>
          <a href="/schools" className="btn btn-pink" style={{ flexShrink: 0 }}>Find My School →</a>
        </div>
      </div>

      {/* Link columns */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.25rem 2rem", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "2rem" }}>

        {/* Brand */}
        <div>
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", marginBottom: "0.75rem" }}>
            <span style={{ width: 30, height: 30, borderRadius: 8, background: "#ff3d6e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🛏️</span>
            <span style={{ color: "var(--cream)", fontWeight: 900, fontSize: 13 }}>College Bed Party Guide</span>
          </a>
          <p style={{ fontSize: 12, lineHeight: 1.7, maxWidth: 240, margin: 0 }}>
            Dorm essentials curated by school color. Find your college, shop Amazon, personalize your space.
          </p>
          {/* Social icons */}
          <div style={{ display: "flex", gap: "0.625rem", marginTop: "1.25rem" }}>
            {[
              { label: "Instagram", href: "https://instagram.com", icon: "📸" },
              { label: "TikTok",    href: "https://tiktok.com",    icon: "🎵" },
              { label: "Pinterest", href: "https://pinterest.com", icon: "📌" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, textDecoration: "none" }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <FooterHeading>Navigation</FooterHeading>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/schools">Colleges</FooterLink>
          <FooterLink href="/guides">Guides</FooterLink>
          <FooterLink href="/blog">Blog</FooterLink>
          <FooterLink href="/gallery">Gallery</FooterLink>
        </div>

        {/* Popular Schools */}
        <div>
          <FooterHeading>Popular Schools</FooterHeading>
          <FooterLink href="/schools/pennsylvania-state-university-main-campus">Penn State</FooterLink>
          <FooterLink href="/schools/boston-university">Boston University</FooterLink>
          <FooterLink href="/schools/university-of-georgia">Georgia</FooterLink>
          <FooterLink href="/schools/the-university-of-alabama">Alabama</FooterLink>
          <FooterLink href="/schools/ohio-state-university-main-campus">Ohio State</FooterLink>
          <FooterLink href="/schools/university-of-michigan-ann-arbor">Michigan</FooterLink>
        </div>

        {/* Resources */}
        <div>
          <FooterHeading>Resources</FooterHeading>
          <FooterLink href="/guides">How-To Guides</FooterLink>
          <FooterLink href="/affiliate-disclosure">Affiliate Disclosure</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </div>

        {/* Legal */}
        <div>
          <FooterHeading>Legal</FooterHeading>
          <FooterLink href="/terms">Terms</FooterLink>
          <FooterLink href="/privacy">Privacy</FooterLink>
          <FooterLink href="/ada">ADA</FooterLink>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", maxWidth: 1280, margin: "0 auto", padding: "1.25rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", fontSize: 11, color: "rgba(254,252,248,0.28)" }}>
        <span>© {new Date().getFullYear()} College Bed Party Guide. All rights reserved.</span>
        <span>Amazon Associate — we earn from qualifying purchases. <a href="/affiliate-disclosure" style={{ color: "rgba(254,252,248,0.35)", textDecoration: "none" }}>Learn more</a></span>
      </div>

    </footer>
  );
}
