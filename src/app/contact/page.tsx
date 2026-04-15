import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with College Bed Party Essentials.",
};

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "4rem 1.25rem 6rem", color: "var(--ink)" }}>
      <h1 style={{ fontWeight: 900, fontSize: 32, marginBottom: "0.5rem" }}>Contact Us</h1>
      <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: "2.5rem", lineHeight: 1.7 }}>
        Questions, partnerships, or just want to share your dorm setup? We&apos;d love to hear from you.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <a href="mailto:hello@collegebedpartyessentials.com" className="btn btn-dark" style={{ textAlign: "center", textDecoration: "none", padding: "0.875rem 2rem", fontSize: 15 }}>
          📧 hello@collegebedpartyessentials.com
        </a>
        <a href="https://www.instagram.com/collegebedparty" target="_blank" rel="noopener noreferrer" className="btn btn-pink" style={{ textAlign: "center", textDecoration: "none", padding: "0.875rem 2rem", fontSize: 15 }}>
          📸 DM us on Instagram
        </a>
      </div>
      <p style={{ color: "var(--muted)", fontSize: 13, marginTop: "2rem", lineHeight: 1.6 }}>
        For press inquiries or affiliate partnerships, include &quot;Partnership&quot; in your subject line.
      </p>
    </div>
  );
}
