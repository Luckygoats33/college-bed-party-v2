import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADA Accessibility Statement",
  description: "College Bed Party Essentials ADA accessibility statement.",
};

export default function AdaPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.25rem 6rem", color: "var(--ink)" }}>
      <h1 style={{ fontWeight: 900, fontSize: 32, marginBottom: "0.5rem" }}>Accessibility Statement</h1>
      <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: "2.5rem" }}>Last updated: January 2024</p>
      <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--ink)" }}>
        <p>College Bed Party Essentials is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards.</p>
        <p><strong>Conformance status:</strong> We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.</p>
        <p><strong>Measures we take:</strong></p>
        <ul style={{ paddingLeft: "1.5rem" }}>
          <li>Semantic HTML structure throughout the site</li>
          <li>Alt text on all images</li>
          <li>Sufficient color contrast ratios</li>
          <li>Keyboard navigable interface</li>
        </ul>
        <p>If you encounter any accessibility barriers on our website, please <a href="/contact" style={{ color: "var(--accent)", fontWeight: 700 }}>contact us</a>. We will do our best to provide the information you need.</p>
      </div>
    </div>
  );
}
