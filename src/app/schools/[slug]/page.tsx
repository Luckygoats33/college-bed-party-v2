import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSchool, nearbySchools, schools, getSchoolColors, schoolLogoBadge, getSchoolEspnId } from "@/lib/schools";
import { SchoolLogo } from "@/components/SchoolLogo";
import { ProductImage } from "@/components/ProductImage";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import { amazonSearch, amazonImage } from "@/lib/amazon";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const school = getSchool(slug);
  if (!school) return {};
  return {
    title: `${school.name} Dorm Essentials`,
    description: `Dorm room must-haves for ${school.name} students. Bedding, storage, decor and more — curated in your school colors.`,
  };
}

export async function generateStaticParams() {
  return schools
    .filter((s) => s.enrollment > 8000)
    .slice(0, 200)
    .map((s) => ({ slug: s.slug }));
}

export const dynamicParams = true;

// Determine if a hex color is light (needs dark text)
function isLight(hex: string): boolean {
  const h = hex.replace("#", "").padEnd(6, "0");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 145;
}

export default async function SchoolPage({ params }: PageProps) {
  const { slug } = await params;
  const school = getSchool(slug);
  if (!school) notFound();

  const nearby = nearbySchools(school, 8);
  const [pc, sc] = getSchoolColors(school);
  const espnId = getSchoolEspnId(school);
  const svgBadge = schoolLogoBadge(school, 120);
  const heroTextColor = "#fff"; // always white on colored hero with overlay

  const mustHaveCount = PRODUCTS.filter(p => p.tags.includes("must-have")).length;

  return (
    <div style={{ color: "var(--ink)" }}>

      {/* ══ HERO — FULL BLEED, SCHOOL COLORS ══════════════════ */}
      <section style={{
        background: `linear-gradient(135deg, ${pc} 50%, ${sc} 50%)`,
        color: heroTextColor,
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Dark overlay for readability */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)", pointerEvents: "none" }} />

        {/* Large faded logo watermark behind content */}
        <div style={{
          position: "absolute", top: "50%", right: "-5%",
          transform: "translateY(-50%)",
          width: 400, height: 400,
          opacity: 0.08,
          filter: "blur(2px)",
          pointerEvents: "none",
        }}>
          <SchoolLogo espnId={espnId} fallbackSvg={schoolLogoBadge(school, 400)} alt="" size={400} style={{ width: 400, height: 400 }} />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", width: "100%", padding: "5rem 1.5rem 3.5rem" }}>
          <a href="/schools" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.55)", fontSize: 13, textDecoration: "none", marginBottom: "2.5rem" }}>
            ← All Schools
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            {/* Big logo badge */}
            <div style={{
              background: "#fff",
              borderRadius: 24,
              padding: 14,
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              flexShrink: 0,
            }}>
              <SchoolLogo espnId={espnId} fallbackSvg={svgBadge} alt={school.shortName} size={100} />
            </div>

            <div>
              {school.nickname && (
                <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 0.4rem" }}>
                  The {school.nickname}
                </p>
              )}
              <h1 style={{
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                fontWeight: 900,
                color: "#fff",
                margin: "0 0 0.5rem",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                textShadow: "0 4px 40px rgba(0,0,0,0.3)",
              }}>
                {school.shortName}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, margin: 0 }}>
                {school.city}, {school.state}
              </p>
            </div>
          </div>

          {/* Stats + color chips row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem", alignItems: "center" }}>
            {school.enrollment > 0 && (
              <div style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "0.45rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: 14 }}>🎓</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{school.enrollment.toLocaleString()} students</span>
              </div>
            )}
            <div style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "0.45rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: 14 }}>🛍️</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{mustHaveCount} curated picks</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "0.45rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: 14 }}>📦</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Ships from Amazon</span>
            </div>
            {/* Color swatches */}
            {[pc, sc].map(color => (
              <div key={color} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(0,0,0,0.25)", backdropFilter: "blur(8px)", borderRadius: 999, padding: "0.3rem 0.75rem 0.3rem 0.4rem", border: "1px solid rgba(255,255,255,0.12)" }}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: color, border: "1.5px solid rgba(255,255,255,0.35)", display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{color}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom angled cut */}
        <div style={{ height: 48, background: "var(--cream)", clipPath: "polygon(0 100%, 100% 100%, 100% 0)", position: "relative", zIndex: 2 }} />
      </section>

      {/* ══ SCHOOL COLOR ACCENT BAR ═══════════════════════════ */}
      <div style={{ height: 6, background: `linear-gradient(90deg, ${pc}, ${sc}, ${pc})` }} />

      {/* ══ PRODUCTS ══════════════════════════════════════════ */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "3rem 1.25rem" }}>
        {CATEGORIES.map(cat => {
          const catProducts = PRODUCTS.filter(p => p.category === cat.id);
          if (!catProducts.length) return null;
          return (
            <section key={cat.id} style={{ marginBottom: "3.5rem" }}>
              {/* Category header — school primary color left border */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: "1.25rem",
                paddingLeft: "1rem",
                borderLeft: `5px solid ${pc}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span style={{
                    width: 44, height: 44, borderRadius: 14,
                    background: pc,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, flexShrink: 0,
                  }}>{cat.emoji}</span>
                  <div>
                    <p style={{ fontWeight: 900, fontSize: 17, margin: 0 }}>{cat.label}</p>
                    <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>{catProducts.length} picks for {school.shortName} students</p>
                  </div>
                </div>
                <a
                  href={amazonSearch(`${school.shortName} dorm ${cat.label}`)}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  style={{ fontSize: 12, fontWeight: 700, color: pc, textDecoration: "none", whiteSpace: "nowrap" }}
                >
                  More on Amazon →
                </a>
              </div>

              {/* Product grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 12 }}>
                {catProducts.map(product => (
                  <a
                    key={product.id}
                    href={amazonSearch(product.searchQuery)}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="card"
                    style={{
                      background: "#fff",
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      border: "1.5px solid rgba(0,0,0,0.07)",
                    }}
                  >
                    {/* Top school-color strip */}
                    <div style={{ height: 5, background: `linear-gradient(90deg, ${pc}, ${sc})` }} />

                    {/* Product image */}
                    <div style={{ aspectRatio: "1", background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <ProductImage src={amazonImage(product.asin)} alt={product.title} padding="1.25rem" />
                    </div>

                    {/* Info */}
                    <div style={{ padding: "0.875rem 1rem 1rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                      {product.tags.includes("must-have") && (
                        <span style={{
                          display: "inline-block", alignSelf: "flex-start",
                          background: pc, color: isLight(pc) ? "#0a0a0f" : "#fff",
                          fontSize: 10, fontWeight: 800, borderRadius: 999, padding: "0.2rem 0.65rem",
                          letterSpacing: "0.04em",
                        }}>★ Must-have</span>
                      )}
                      <p style={{ fontWeight: 800, fontSize: 13, lineHeight: 1.4, margin: 0, color: "var(--ink)" }}>{product.title}</p>
                      <p style={{ fontSize: 12, color: "var(--muted)", margin: 0, lineHeight: 1.4 }}>{product.description}</p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.625rem", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                        <span style={{ fontWeight: 900, fontSize: 16, color: pc }}>{product.price}</span>
                        <span style={{ fontSize: 11, fontWeight: 800, color: "var(--muted)", background: "rgba(0,0,0,0.05)", borderRadius: 999, padding: "0.2rem 0.6rem" }}>Shop Amazon →</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* ══ SCHOOL COLOR CTA BAND ═════════════════════════════ */}
      <section style={{
        background: `linear-gradient(135deg, ${pc} 50%, ${sc} 50%)`,
        padding: "4rem 1.25rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1060, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: 16, padding: 10 }}>
              <SchoolLogo espnId={espnId} fallbackSvg={schoolLogoBadge(school, 56)} alt={school.shortName} size={56} />
            </div>
            <div>
              <p style={{ fontWeight: 900, fontSize: 22, color: "#fff", margin: 0, lineHeight: 1.1 }}>{school.shortName} Dorm Essentials</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: "0.3rem 0 0" }}>Everything you need — straight from Amazon</p>
            </div>
          </div>
          <a
            href={amazonSearch(`${school.shortName} dorm room essentials college`)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{ background: "#fff", color: pc, fontWeight: 900, fontSize: 15, padding: "0.875rem 2rem", borderRadius: 999, textDecoration: "none", flexShrink: 0 }}
          >
            Shop All on Amazon →
          </a>
        </div>
      </section>

      {/* ══ NEARBY SCHOOLS ════════════════════════════════════ */}
      {nearby.length > 0 && (
        <section style={{ background: "var(--cream2)", padding: "4rem 1.25rem" }}>
          <div style={{ maxWidth: 1060, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 0.25rem" }}>Also in {school.state}</p>
                <h2 style={{ fontWeight: 900, fontSize: 22, margin: 0 }}>More {school.state} Schools</h2>
              </div>
              <a href={`/schools?state=${school.state}`} style={{ fontSize: 13, fontWeight: 700, color: "var(--muted)", textDecoration: "none" }}>All {school.state} →</a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 10 }}>
              {nearby.map(s => {
                const [spc, ssc] = getSchoolColors(s);
                return (
                  <a
                    key={s.slug}
                    href={`/schools/${s.slug}`}
                    className="card"
                    style={{
                      background: `linear-gradient(135deg, ${spc} 50%, ${ssc} 50%)`,
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "1rem",
                      minHeight: 120,
                      position: "relative",
                    }}
                  >
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)", borderRadius: "inherit" }} />
                    <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.95)", borderRadius: 9, padding: 4 }}>
                      <SchoolLogo espnId={getSchoolEspnId(s)} fallbackSvg={schoolLogoBadge(s, 32)} alt={s.shortName} size={32} />
                    </div>
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <p style={{ color: "#fff", fontWeight: 900, fontSize: 13, margin: 0, lineHeight: 1.2 }}>{s.shortName}</p>
                      {s.nickname && <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, margin: 0 }}>{s.nickname}</p>}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Disclosure */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.25rem" }}>
        <p style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.7 }}>
          As an Amazon Associate, College Bed Party Essentials earns from qualifying purchases.
          School colors are approximate and sourced from public data.
        </p>
      </div>
    </div>
  );
}
