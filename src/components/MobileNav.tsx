"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Colleges", href: "/schools" },
  { label: "Blog", href: "/blog" },
  { label: "Guides", href: "/guides" },
  { label: "Gallery", href: "/gallery" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  // Close on route change (clicking a link)
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Hamburger button */}
      <button
        className="hamburger"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(o => !o)}
      >
        <span className={`hamburger-bar ${open ? "hamburger-open" : ""}`} />
        <span className={`hamburger-bar ${open ? "hamburger-open" : ""}`} />
        <span className={`hamburger-bar ${open ? "hamburger-open" : ""}`} />
      </button>

      {/* Overlay + drawer */}
      {open && (
        <div className="mobile-overlay" onClick={() => setOpen(false)}>
          <nav
            className="mobile-drawer"
            onClick={e => e.stopPropagation()}
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="mobile-nav-link"
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="/schools"
              className="btn btn-pink"
              style={{ width: "100%", textAlign: "center", textDecoration: "none", marginTop: "0.5rem" }}
              onClick={() => setOpen(false)}
            >
              Find My School →
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)" }}>Follow us <strong style={{ color: "var(--ink)" }}>@</strong></span>
              <a href="https://instagram.com/cbpe" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="site-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://tiktok.com/@cbpe" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="site-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"></path></svg>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
