import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Use" };

export default function TermsPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.25rem 6rem", color: "var(--ink)" }}>
      <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Legal</p>
      <h1 style={{ fontWeight: 900, fontSize: 36, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>Terms of Use</h1>
      <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: "3rem" }}>Last updated: January 1, 2026</p>

      {[
        { heading: "Use of Site", body: "By accessing College Bed Party Essentials, you agree to use the site for lawful purposes only. You may not use the site in any way that could damage, disable, or impair the site or its servers." },
        { heading: "Product Information", body: "Product descriptions, prices, and availability are provided for informational purposes and are subject to change without notice. Always verify current pricing and availability on Amazon.com before purchasing." },
        { heading: "Affiliate Links", body: "This site contains Amazon affiliate links. We earn a commission on qualifying purchases at no extra cost to you. All product recommendations are made independently." },
        { heading: "No Warranties", body: "This site is provided 'as is' without warranties of any kind. We do not guarantee that the site will be error-free or continuously available." },
        { heading: "Limitation of Liability", body: "College Bed Party Essentials shall not be liable for any indirect, incidental, or consequential damages arising from your use of this site or any products purchased through affiliate links." },
        { heading: "Changes to Terms", body: "We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms." },
      ].map(section => (
        <div key={section.heading} style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: "0.5rem" }}>{section.heading}</h2>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{section.body}</p>
        </div>
      ))}
    </div>
  );
}
