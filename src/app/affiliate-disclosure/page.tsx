import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: "College Bed Party Essentials affiliate disclosure statement.",
};

export default function AffiliatePage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.25rem 6rem", color: "var(--ink)" }}>
      <h1 style={{ fontWeight: 900, fontSize: 32, marginBottom: "0.5rem" }}>Affiliate Disclosure</h1>
      <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: "2.5rem" }}>Last updated: January 2024</p>
      <div style={{ fontSize: 15, lineHeight: 1.8, color: "var(--ink)" }}>
        <p>College Bed Party Essentials is a participant in the <strong>Amazon Services LLC Associates Program</strong>, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
        <p>When you click on a product link on this site and make a purchase on Amazon, we may earn a small commission — at no additional cost to you. This helps us keep the site running and continue providing free dorm room guides.</p>
        <p>Our affiliate tag is <code>bedpartyprodu-20</code>. All product links on this site use this tag.</p>
        <p>We only recommend products we believe are genuinely useful for college students. Our editorial recommendations are not influenced by affiliate commissions.</p>
        <p>If you have any questions, please <a href="/contact" style={{ color: "var(--accent)", fontWeight: 700 }}>contact us</a>.</p>
      </div>
    </div>
  );
}
