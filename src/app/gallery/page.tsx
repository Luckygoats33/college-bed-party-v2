import type { Metadata } from "next";
import { schools, getSchoolColors, schoolLogoBadge, getSchoolEspnId, getSchoolDomain } from "@/lib/schools";
import { SchoolLogo } from "@/components/SchoolLogo";

export const metadata: Metadata = {
  title: "Gallery — Real College Bed Parties & Top Schools",
  description: "Real dorm bed party photos and top Big Ten colleges. Find your school and shop essentials in team colors.",
};

const BIG_TEN = [
  { slug: "university-of-michigan-ann-arbor", name: "University of Michigan", tag: "Ann Arbor, MI", bullets: ["Elite academics + powerhouse athletics", "Known for business, engineering, law", "Massive alumni network and brand value"] },
  { slug: "northwestern-university", name: "Northwestern University", tag: "Evanston, IL", bullets: ["Only private Big Ten school", "Top-tier for journalism, business, law", "Strong academics + smaller, selective feel"] },
  { slug: "university-of-wisconsin-madison", name: "University of Wisconsin–Madison", tag: "Madison, WI", bullets: ["Top public university", "Strong in research, business, engineering", "Great college town + school spirit"] },
  { slug: "university-of-illinois-urbana-champaign", name: "University of Illinois Urbana-Champaign", tag: "Champaign, IL", bullets: ["Elite engineering & computer science", "Feeds heavily into tech (Google, Meta, etc.)", "Strong ROI for STEM"] },
  { slug: "university-of-california-los-angeles", name: "University of California, Los Angeles", tag: "Los Angeles, CA", bullets: ["Recently joined Big Ten (2024)", "Top-tier academics + global reputation", "Strong across almost every field"] },
  { slug: "university-of-southern-california", name: "University of Southern California", tag: "Los Angeles, CA", bullets: ["Also new to Big Ten", "Elite for business, film, entrepreneurship", "Huge alumni network (especially in LA)"] },
  { slug: "pennsylvania-state-university-main-campus", name: "Pennsylvania State University", tag: "University Park, PA", bullets: ["Massive school + loyal alumni base", "Strong engineering, business, communications", "Big-time athletics + school pride"] },
];

const BED_PARTIES = [
  { slug: "ohio-state-university-main-campus", title: "Ohio State Buckeyes", image: "/images/ohio-state-bed-party-2.jpeg", alt: "Ohio State bed party with scarlet and gray merchandise and balloons" },
  { slug: "the-university-of-alabama", title: "Alabama Crimson Tide", image: "/images/alabama-bed-party-2.jpeg", alt: "Alabama bed party with BAMA balloon letters, red streamers, elephant plush, and extensive Crimson Tide merchandise" },
  { slug: "pennsylvania-state-university-main-campus", title: "Penn State Nittany Lions", image: "/images/penn-state-bed-party-2.jpeg", alt: "Penn State bed party with PSU balloon letters, blue streamers, and extensive Nittany Lions merchandise and decorations" },
  { slug: "university-of-georgia", title: "Georgia Bulldogs", image: "/images/georgia-bed-party-2.jpeg", alt: "Georgia Bulldogs bed party with GO DAWGS balloon letters, red and black streamers covering walls, and extensive UGA merchandise" },
];

export default function GalleryPage() {
  const schoolBySlug = Object.fromEntries(schools.map(s => [s.slug, s]));

  return (
    <div style={{ color: "var(--ink)" }}>
      {/* ── HEADER ──────────────────────────────── */}
      <div style={{
        background: "linear-gradient(180deg, #fff 0%, #fff5f8 60%, #ffeaf1 100%)",
        color: "var(--ink)",
        padding: "3.5rem 1.25rem 3.5rem",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-25%", right: "-8%", width: 420, height: 420, borderRadius: "50%", background: "#ff3d6e", opacity: 0.10, filter: "blur(90px)" }} />
          <div style={{ position: "absolute", bottom: "-25%", left: "15%", width: 340, height: 340, borderRadius: "50%", background: "#ffb3c8", opacity: 0.18, filter: "blur(70px)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#ff3d6e", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Gallery</p>
          <h1 className="d-lg" style={{ color: "var(--ink)", margin: "0 0 0.5rem" }}>Real College Bed Parties</h1>
          <p style={{ color: "rgba(10,10,15,0.55)", fontSize: 15, margin: 0, maxWidth: 520 }}>
            Real setups from real dorms — plus the top Big Ten schools to build your party around.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.25rem 4rem" }}>

        {/* ── REAL BED PARTIES (TOP) ─────────────────────── */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: "#ff3d6e", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.375rem" }}>IRL</p>
            <h2 style={{ fontWeight: 900, fontSize: 28, margin: 0, letterSpacing: "-0.02em" }}>Real College Bed Parties</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {BED_PARTIES.map(party => {
              const school = schoolBySlug[party.slug];
              const [spc, ssc] = school ? getSchoolColors(school) : ["#0a0a0f", "#6b7280"];
              return (
                <a
                  key={party.slug + party.title}
                  href={`/schools/${party.slug}`}
                  className="card"
                  style={{
                    borderRadius: 20,
                    overflow: "hidden",
                    background: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    color: "var(--ink)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", background: "var(--cream2)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={party.image} alt={party.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${spc} 50%, ${ssc} 50%)` }} />
                  </div>
                  <div style={{ padding: "1rem 1.1rem 1.1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    {school ? (
                      <div style={{ flexShrink: 0, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <SchoolLogo espnId={getSchoolEspnId(school)} domain={getSchoolDomain(school)} fallbackSvg={schoolLogoBadge(school, 40)} alt={school.shortName} size={40} />
                      </div>
                    ) : null}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 900, fontSize: 14, margin: 0, lineHeight: 1.25 }}>{party.title}</p>
                      <p style={{ fontSize: 12, fontWeight: 800, color: "#ff3d6e", margin: "0.25rem 0 0" }}>View Products →</p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <a href="/schools" className="btn btn-outline" style={{ textDecoration: "none" }}>View More in Gallery →</a>
          </div>
        </section>

        {/* ── FEATURED: TOP BIG TEN ───────────────── */}
        <section style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#ff3d6e", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.375rem" }}>Featured</p>
              <h2 style={{ fontWeight: 900, fontSize: 28, margin: 0, letterSpacing: "-0.02em" }}>Top Big Ten Colleges</h2>
            </div>
            <a href="/schools" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", textDecoration: "none" }}>Browse all 2,773 →</a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {BIG_TEN.map((item, i) => {
              const school = schoolBySlug[item.slug];
              const [spc, ssc] = school ? getSchoolColors(school) : ["#0a0a0f", "#6b7280"];
              return (
                <a
                  key={item.slug}
                  href={`/schools/${item.slug}`}
                  className="card"
                  style={{
                    background: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    padding: "1.25rem",
                    textDecoration: "none",
                    color: "var(--ink)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${spc} 50%, ${ssc} 50%)` }} />
                  <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "0.875rem" }}>
                    <div style={{ flexShrink: 0, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {school ? (
                        <SchoolLogo espnId={getSchoolEspnId(school)} domain={getSchoolDomain(school)} fallbackSvg={schoolLogoBadge(school, 52)} alt={school.shortName} size={52} />
                      ) : null}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: 2 }}>
                        <span style={{ background: "#ff3d6e", color: "#fff", borderRadius: 999, padding: "0.15rem 0.5rem", fontSize: 10, fontWeight: 800 }}>#{i + 1}</span>
                      </div>
                      <p style={{ fontWeight: 900, fontSize: 15, margin: 0, lineHeight: 1.25 }}>{item.name}</p>
                      <p style={{ color: "var(--muted)", fontSize: 11, fontWeight: 600, margin: "0.125rem 0 0" }}>{item.tag}</p>
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 12.5, color: "rgba(10,10,15,0.68)", lineHeight: 1.55, flex: 1 }}>
                    {item.bullets.map(b => (
                      <li key={b} style={{ paddingLeft: "1rem", position: "relative", marginBottom: "0.3rem" }}>
                        <span style={{ position: "absolute", left: 0, top: 0, color: "#ff3d6e", fontWeight: 900 }}>•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: "1rem", fontSize: 12.5, fontWeight: 800, color: "var(--ink)" }}>Shop Essentials →</div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ── SUBMIT CTA ───────────────────────────── */}
        <div style={{ padding: "3rem 2rem", background: "var(--ink)", borderRadius: 24, textAlign: "center", color: "var(--cream)" }}>
          <h2 style={{ fontWeight: 900, fontSize: 22, margin: "0 0 0.5rem", color: "var(--cream)" }}>Show Us Your Setup</h2>
          <p style={{ color: "rgba(254,252,248,0.55)", fontSize: 14, marginBottom: "1.5rem" }}>Tag us on Instagram with your dorm room. Best setups get featured here.</p>
          <a href="/schools" className="btn btn-pink" style={{ textDecoration: "none" }}>Find Your School →</a>
        </div>
      </div>
    </div>
  );
}
