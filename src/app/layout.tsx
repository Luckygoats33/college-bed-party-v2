import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { NewsletterForm } from "@/components/NewsletterForm";
import { MobileNav } from "@/components/MobileNav";

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
      background: "#fff",
      borderBottom: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 2px 12px rgba(10,10,15,0.04)",
    }}>
      <div className="site-header-inner">
        {/* Logo */}
        <a href="/" className="site-logo" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cbpe.png" alt="College Bed Party Essentials" />
        </a>

        {/* Desktop nav */}
        <nav className="site-nav desktop-nav">
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
          <a href="/schools" className="btn btn-dark">Find My School →</a>
          <div className="site-social">
            <span className="site-social-label">Follow us <strong>@</strong></span>
            <a href="https://instagram.com/cbpe" target="_blank" rel="noopener noreferrer" aria-label="Instagram @cbpe" className="site-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://tiktok.com/@cbpe" target="_blank" rel="noopener noreferrer" aria-label="TikTok @cbpe" className="site-social-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"></path></svg>
            </a>
          </div>
        </nav>

        {/* Mobile hamburger (left) */}
        <MobileNav />

        {/* Mobile search icon (right) */}
        <a href="/schools" className="mobile-search-btn" aria-label="Search schools" style={{ display: "none" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </a>

        {/* Mobile-only follow row below logo */}
        <div className="mobile-follow-row" style={{ display: "none" }}>
          <span className="site-social-label">Follow us <strong>@</strong></span>
          <a href="https://instagram.com/cbpe" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="site-social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://tiktok.com/@cbpe" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="site-social-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"></path></svg>
          </a>
        </div>
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

      {/* Newsletter band */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-50%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "var(--accent)", opacity: 0.08, filter: "blur(100px)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "2.75rem 1.25rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.75rem" }}>
          <div style={{ flex: "1 1 280px", minWidth: 0 }}>
            <p style={{ color: "var(--cream)", fontWeight: 900, fontSize: 20, margin: "0 0 0.25rem", letterSpacing: "-0.01em" }}>
              Signup for new updates to your school merch!
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "rgba(254,252,248,0.55)" }}>
              New drops + restocks — matched to your school. No spam.
            </p>
          </div>
          <div style={{ flex: "1 1 360px", minWidth: 0 }}>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Follow Us band — fun gradient IG + TikTok */}
      <div style={{
        background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.18 }}>
          <div style={{ position: "absolute", top: "-30%", right: "10%", width: 300, height: 300, borderRadius: "50%", background: "#fff", filter: "blur(60px)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "2.25rem 1.25rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.25rem" }}>
          <div>
            <p style={{ color: "#fff", fontWeight: 900, fontSize: 22, margin: "0 0 0.25rem", letterSpacing: "-0.01em" }}>Follow the bed party ✨</p>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.88)", fontSize: 14 }}>Dorm tours, drops, and setups — first on IG & TikTok.</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href="https://instagram.com/collegebedparty" target="_blank" rel="noopener noreferrer" className="social-chip">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              <span>Follow on Instagram</span>
            </a>
            <a href="https://tiktok.com/@collegebedparty" target="_blank" rel="noopener noreferrer" className="social-chip">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"></path></svg>
              <span>Follow on TikTok</span>
            </a>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="footer-cols" style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.25rem 2rem", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "2rem" }}>

        {/* Brand */}
        <div className="site-footer-logo">
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", marginBottom: "0.75rem" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cbpe.png" alt="College Bed Party Essentials" style={{ height: 36, width: "auto", display: "block" }} />
          </a>
          <p style={{ fontSize: 12, lineHeight: 1.7, maxWidth: 240, margin: 0 }}>
            Dorm essentials curated by school color. Find your college, shop Amazon, personalize your space.
          </p>
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
