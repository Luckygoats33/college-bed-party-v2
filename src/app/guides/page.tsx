import type { Metadata } from "next";
import { amazonSearch } from "@/lib/amazon";

export const metadata: Metadata = {
  title: "Dorm Room Guides",
  description: "Step-by-step guides to building the perfect dorm room — from Twin XL bedding to storage solutions.",
};

const GUIDES = [
  {
    emoji: "🛏️",
    title: "The Ultimate Dorm Bedding Guide",
    subtitle: "Twin XL sheets, mattress toppers, and how to make a dorm bed actually comfortable.",
    time: "5 min read",
    tags: ["Bedding", "Freshman Essential"],
    slug: "dorm-bedding",
    steps: [
      { n: "01", heading: "Get a mattress topper — first", body: "Dorm mattresses are 3 inches of foam that's been slept on for 10 years. A 3-inch memory foam topper (around $45–60) is the single highest-impact purchase you'll make. Buy Twin XL." },
      { n: "02", heading: "Twin XL is not Twin", body: "Dorm beds are 80\" long — 5 inches longer than standard Twin. Everything you buy (sheets, mattress pad, comforter) must say 'Twin XL'. Standard Twin sheets will slip off and ruin your life." },
      { n: "03", heading: "Jersey sheets over microfiber", body: "Jersey (T-shirt material) stays soft, breathes well, and doesn't slide. Get a set with a deep pocket (15\"+) to fit over your topper." },
      { n: "04", heading: "One good comforter, one lightweight blanket", body: "Don't bring your childhood bedding. Get a machine-washable down alternative comforter + a lightweight cotton throw for studying. Two separate layers is better than one heavy one." },
      { n: "05", heading: "Waterproof mattress pad under the topper", body: "Yes, even you. Spills, humidity, and general college life happen. A $20 waterproof pad goes between the dorm mattress and your topper. You'll thank us." },
    ],
  },
  {
    emoji: "📦",
    title: "Dorm Storage: Every Inch Counts",
    subtitle: "How to fit your life into a 12×10 room with a roommate.",
    time: "4 min read",
    tags: ["Storage", "Organization"],
    slug: "dorm-storage",
    steps: [
      { n: "01", heading: "Loft your bed on Day 1", body: "Almost every dorm lets you loft or bunk the bed. Do it. It unlocks 30+ square feet of under-bed real estate. Under-bed storage bins (rolling) become your closet extension." },
      { n: "02", heading: "Hang everything possible", body: "Over-the-door organizers, command hooks, and hanging closet shelves multiply your space without taking any floor area. Your closet is 10x more usable with a hanging organizer inside it." },
      { n: "03", heading: "The rolling cart trick", body: "A 3-tier rolling cart ($35–45) is the most versatile dorm item. Park it next to your desk for supplies, roll it to the bathroom, use it as a nightstand. Moves with you." },
      { n: "04", heading: "Vertical space above the desk", body: "A floating shelf or desktop organizer above your monitor adds critical surface area. Keep your desk clear — you'll actually use it." },
      { n: "05", heading: "One storage ottoman", body: "A storage cube ottoman at the foot of your bed holds extra bedding, serves as extra seating for guests, and keeps the floor clear. Worth every inch." },
    ],
  },
  {
    emoji: "🪩",
    title: "Dorm Decor Without Losing Your Deposit",
    subtitle: "How to make a cinderblock room feel like home — legally.",
    time: "3 min read",
    tags: ["Decor", "Aesthetic"],
    slug: "dorm-decor",
    steps: [
      { n: "01", heading: "Command strips are law", body: "No nails. No tape. Command strips come in sizes for everything from fairy lights to framed art. Buy the variety pack on Day 1. Follow the weight limits." },
      { n: "02", heading: "String lights beat overhead lighting every time", body: "Dorm overhead lighting is fluorescent and depressing. Warm white string lights (33ft for ~$12) transform the whole vibe. Drape them along your lofted bed frame or around your desk." },
      { n: "03", heading: "One large tapestry covers a lot", body: "A wall tapestry covers 9 square feet of cinderblock with a single command strip. Pick one in your school colors or a pattern you genuinely like — you'll stare at it daily for 9 months." },
      { n: "04", heading: "RGB strips for ambient color", body: "LED strip lights (app-controlled, music-reactive) go behind your monitor or along the bed frame. They're $15–20 and dramatically upgrade how the room photographs for social media." },
      { n: "05", heading: "Plants are allowed (usually)", body: "A small pothos or succulent adds life. Low light, low water, survives neglect. Check your school's plant policy — most allow small potted plants." },
    ],
  },
];

export default function GuidesPage() {
  return (
    <div style={{ color: "var(--ink)" }}>
      {/* Header — vibrant */}
      <div style={{
        background: "linear-gradient(135deg, #fff4f7 0%, #ffdbe6 30%, #ffc2d4 60%, #f8a8e3 85%, #d4b3ff 100%)",
        color: "var(--ink)",
        padding: "4rem 1.25rem 4rem",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}>
        <div style={{ position: "absolute", top: "-25%", right: "-5%", width: 480, height: 480, borderRadius: "50%", background: "#ff3d6e", opacity: 0.30, filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-30%", left: "-8%", width: 420, height: 420, borderRadius: "50%", background: "#7c3aed", opacity: 0.25, filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", left: "45%", width: 260, height: 260, borderRadius: "50%", background: "#f59e0b", opacity: 0.22, filter: "blur(70px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "15%", right: "18%", fontSize: 24, opacity: 0.75, pointerEvents: "none" }}>✨</div>
        <div style={{ position: "absolute", bottom: "18%", left: "12%", fontSize: 22, opacity: 0.65, pointerEvents: "none" }}>💖</div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#ff3d6e", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.75rem" }}>Learn</p>
          <h1 className="d-lg" style={{ color: "var(--ink)", margin: "0 0 0.75rem" }}>
            Dorm Room{" "}
            <span style={{
              background: "linear-gradient(90deg, #ff3d6e 0%, #f59e0b 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Guides</span>
          </h1>
          <p style={{ color: "rgba(10,10,15,0.65)", fontSize: 16, margin: 0, maxWidth: 520, lineHeight: 1.55, fontWeight: 500 }}>
            Everything you actually need to know before move-in day.
          </p>
        </div>
      </div>

      {/* Guides */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "3.5rem 1.25rem 6rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {GUIDES.map((guide, i) => {
            const accents = ["#ff3d6e", "#7c3aed", "#f59e0b"];
            const accent = accents[i % accents.length];
            return (
            <article key={guide.slug} style={{ background: "#fff", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 20px 40px -20px rgba(10,10,15,0.1)", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${accent} 0%, #ffb3c8 100%)` }} />
              {/* Guide header */}
              <div style={{ padding: "2rem 2rem 1.5rem", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ flexShrink: 0, width: 56, height: 56, borderRadius: 16, background: `linear-gradient(135deg, ${accent} 0%, #f472b6 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, boxShadow: `0 10px 24px -8px ${accent}88` }}>{guide.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                      {guide.tags.map(tag => (
                        <span key={tag} style={{ background: `${accent}15`, color: accent, borderRadius: 999, padding: "0.2rem 0.7rem", fontSize: 11, fontWeight: 800 }}>{tag}</span>
                      ))}
                      <span style={{ fontSize: 11, color: "var(--muted)", padding: "0.2rem 0", fontWeight: 600 }}>{guide.time}</span>
                    </div>
                    <h2 style={{ fontWeight: 900, fontSize: 22, margin: "0 0 0.4rem", lineHeight: 1.2 }}>{guide.title}</h2>
                    <p style={{ fontSize: 15, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>{guide.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div style={{ padding: "1.5rem 2rem 2rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {guide.steps.map(step => (
                    <div key={step.n} style={{ display: "flex", gap: "1.25rem" }}>
                      <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${accent} 0%, #f472b6 100%)`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>
                        {step.n}
                      </div>
                      <div>
                        <p style={{ fontWeight: 800, fontSize: 15, margin: "0 0 0.25rem" }}>{step.heading}</p>
                        <p style={{ fontSize: 14, color: "var(--muted)", margin: 0, lineHeight: 1.6 }}>{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <a href="/schools" className="btn btn-pink" style={{ padding: "0.6rem 1.25rem", minHeight: "auto", fontSize: 14 }}>
                    Find My School →
                  </a>
                  <a
                    href={amazonSearch(`dorm room ${guide.tags[0]?.toLowerCase() ?? "essentials"}`)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    style={{ fontSize: 13, fontWeight: 800, color: accent, textDecoration: "none" }}
                  >
                    Shop on Amazon →
                  </a>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
