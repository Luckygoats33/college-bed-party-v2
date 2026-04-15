import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "4rem 1.25rem 6rem", color: "var(--ink)" }}>
      <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Legal</p>
      <h1 style={{ fontWeight: 900, fontSize: 36, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>Privacy Policy</h1>
      <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: "3rem" }}>Last updated: January 1, 2026</p>

      {[
        {
          heading: "Information We Collect",
          body: "We do not collect personal information unless you voluntarily provide it (e.g., via a contact form). We use standard analytics tools that may collect anonymized data such as page views, browser type, and general location.",
        },
        {
          heading: "Amazon Affiliate Disclosure",
          body: "College Bed Party Essentials participates in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you click a product link and make a purchase, we may earn a commission at no additional cost to you.",
        },
        {
          heading: "Cookies",
          body: "This site may use cookies for analytics purposes. You can disable cookies in your browser settings at any time. We do not use cookies for advertising targeting.",
        },
        {
          heading: "Third-Party Links",
          body: "Our site contains links to Amazon.com and other third-party sites. We are not responsible for the privacy practices of those sites. Please review their privacy policies independently.",
        },
        {
          heading: "Children's Privacy",
          body: "This site is not directed to children under 13. We do not knowingly collect information from children under 13.",
        },
        {
          heading: "Contact",
          body: "If you have questions about this policy, please contact us at privacy@collegebedpartyessentials.com.",
        },
      ].map(section => (
        <div key={section.heading} style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontWeight: 800, fontSize: 18, marginBottom: "0.5rem" }}>{section.heading}</h2>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.7, margin: 0 }}>{section.body}</p>
        </div>
      ))}
    </div>
  );
}
