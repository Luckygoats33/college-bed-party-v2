import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dorm Inspiration Gallery",
  description: "Real dorm room setups by school. Get inspired before move-in day.",
};

// Curated color combos representing real schools — used for visual gallery cards
const INSPO = [
  { school: "Ohio State", slug: "ohio-state-university-main-campus", colors: ["#BB0000","#666666"], emoji: "🏟️", tag: "Scarlet & Gray", vibe: "Bold & minimal — red bedding, gray storage bins, block letter pennant above the desk." },
  { school: "Alabama", slug: "the-university-of-alabama", colors: ["#9E1B32","#828A8F"], emoji: "🐘", tag: "Crimson & White", vibe: "Crimson duvet with white accent pillows. String lights along lofted frame. Houndstooth throw blanket." },
  { school: "Michigan", slug: "university-of-michigan-ann-arbor", colors: ["#00274C","#FFCB05"], emoji: "〽️", tag: "Maize & Blue", vibe: "Deep navy walls via tapestry, maize string lights, minimalist desk with gold lamp." },
  { school: "Georgia", slug: "university-of-georgia", colors: ["#BA0C2F","#000000"], emoji: "🐾", tag: "Red & Black", vibe: "Red comforter, black storage bins, LED strips behind the monitor in team colors." },
  { school: "Florida", slug: "university-of-florida", colors: ["#0021A5","#FA4616"], emoji: "🐊", tag: "Blue & Orange", vibe: "Navy blue tapestry backdrop, orange throw pillows, Gator pennant centerpiece." },
  { school: "Texas", slug: "the-university-of-texas-at-austin", colors: ["#BF5700","#FFFFFF"], emoji: "🤘", tag: "Burnt Orange", vibe: "All burnt orange everything. Longhorn bedding, Edison bulb string lights, terracotta plant pots." },
  { school: "UCLA", slug: "university-of-california-los-angeles", colors: ["#2D68C4","#F2A900"], emoji: "🐻", tag: "Blue & Gold", vibe: "Pacific blue walls, gold accent pillows, white fairy lights, minimal Scandinavian desk setup." },
  { school: "Penn State", slug: "pennsylvania-state-university-main-campus", colors: ["#1E407C","#FFFFFF"], emoji: "🦁", tag: "Navy & White", vibe: "Clean navy + white palette. Jersey sheets, navy command-strip frames, white LED desk lamp." },
  { school: "Tennessee", slug: "the-university-of-tennessee-knoxville", colors: ["#FF8200","#FFFFFF"], emoji: "🐶", tag: "Tennessee Orange", vibe: "The boldest dorm on campus. Full orange comforter, checkerboard rug, vintage Vols poster." },
  { school: "Duke", slug: "duke-university", colors: ["#003087","#FFFFFF"], emoji: "😈", tag: "Duke Blue", vibe: "Royal blue accent wall (tapestry), white bedding, structured desk with blue lamp and plant." },
  { school: "LSU", slug: "louisiana-state-university-and-agricultural-mechanical-college", colors: ["#461D7C","#FDD023"], emoji: "🐯", tag: "Purple & Gold", vibe: "Deep purple tapestry, gold string lights, tiger eye throw pillow, minimalist white desk." },
  { school: "Clemson", slug: "clemson-university", colors: ["#F56600","#522D80"], emoji: "🐅", tag: "Orange & Purple", vibe: "Clemson orange duvet with purple accent pillow. Gradient LED strips cycling between team colors." },
];

export default function GalleryPage() {
  return (
    <div style={{ color: "var(--ink)" }}>
      {/* Header */}
      <div style={{ background: "var(--ink)", color: "var(--cream)", padding: "3.5rem 1.25rem 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: "var(--violet)", opacity: 0.12, filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "var(--violet)", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Inspo</p>
          <h1 className="d-lg" style={{ color: "var(--cream)", margin: "0 0 0.75rem" }}>Dorm Inspiration</h1>
          <p style={{ color: "rgba(254,252,248,0.55)", fontSize: 15, margin: 0, maxWidth: 440 }}>
            Real room ideas by school color. Find your vibe before move-in day.
          </p>
        </div>
      </div>

      {/* Gallery grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.25rem 6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {INSPO.map(item => (
            <a
              key={item.school}
              href={`/schools/${item.slug}`}
              style={{ borderRadius: 20, overflow: "hidden", background: "var(--cream2)", display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit", transition: "transform 0.15s, box-shadow 0.15s" }}
              onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.12)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; (e.currentTarget as HTMLAnchorElement).style.boxShadow = ""; }}
            >
              {/* Color hero — click goes to school page */}
              <div style={{
                height: 160,
                background: `linear-gradient(135deg, ${item.colors[0]} 50%, ${item.colors[1]} 50%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 52,
                position: "relative",
                cursor: "pointer",
              }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
                <span style={{ position: "relative", zIndex: 1 }}>{item.emoji}</span>
                {/* Color chips */}
                <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", gap: 6 }}>
                  {item.colors.map(c => (
                    <span key={c} style={{ width: 20, height: 20, borderRadius: "50%", background: c, border: "2px solid rgba(255,255,255,0.4)", display: "inline-block" }} />
                  ))}
                </div>
                <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.45)", borderRadius: 8, padding: "3px 8px", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>
                  VIEW →
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.625rem" }}>
                  <p style={{ fontWeight: 900, fontSize: 16, margin: 0 }}>{item.school}</p>
                  <span style={{ background: "rgba(0,0,0,0.07)", borderRadius: 999, padding: "0.2rem 0.6rem", fontSize: 10, fontWeight: 700, color: "var(--muted)" }}>{item.tag}</span>
                </div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: "0 0 1rem", flex: 1 }}>{item.vibe}</p>
                <div
                  className="btn btn-dark"
                  style={{ width: "100%", padding: "0.6rem", minHeight: "auto", fontSize: 13, textAlign: "center" }}
                >
                  Shop {item.school} Essentials →
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Submit CTA */}
        <div style={{ marginTop: "4rem", padding: "3rem 2rem", background: "var(--ink)", borderRadius: 24, textAlign: "center", color: "var(--cream)" }}>
          <p style={{ fontSize: 32, marginBottom: "0.75rem" }}>📸</p>
          <h2 style={{ fontWeight: 900, fontSize: 22, margin: "0 0 0.5rem", color: "var(--cream)" }}>Show Us Your Setup</h2>
          <p style={{ color: "rgba(254,252,248,0.55)", fontSize: 14, marginBottom: "1.5rem" }}>Tag us on Instagram with your dorm room. Best setups get featured here.</p>
          <a href="/schools" className="btn btn-pink" style={{ textDecoration: "none" }}>Find Your School →</a>
        </div>
      </div>
    </div>
  );
}
