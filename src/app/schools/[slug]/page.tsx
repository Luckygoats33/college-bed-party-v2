import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSchool, nearbySchools, schools, getSchoolColors, schoolLogoBadge, getSchoolEspnId, getSchoolDomain } from "@/lib/schools";
import { SchoolLogo } from "@/components/SchoolLogo";
import { ProductImage } from "@/components/ProductImage";
import { PRODUCTS, CATEGORIES, CATEGORY_PHOTOS } from "@/lib/products";
import { amazonSearch, amazonImage, productImage } from "@/lib/amazon";

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
  const domain = getSchoolDomain(school);
  const svgBadge = schoolLogoBadge(school, 120);
  const logoFallback = schoolLogoBadge(school, 80);

  const mustHaveCount = PRODUCTS.filter(p => p.tags.includes("must-have")).length;

  return (
    <div style={{ color: "var(--ink)" }}>

      {/* ══ HERO — BRIGHT, AIRY, WHITES WITH SCHOOL-COLOR ACCENTS ══ */}
      <section style={{
        background: "linear-gradient(180deg, #fff 0%, #fff5f8 70%, #ffeaf1 100%)",
        color: "var(--ink)",
        minHeight: "62vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Soft pink bloom top-right */}
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 520, height: 520, borderRadius: "50%", background: "#ffb3c8", opacity: 0.35, filter: "blur(100px)", pointerEvents: "none" }} />
        {/* School primary color bloom bottom-left (subtle) */}
        <div style={{ position: "absolute", bottom: "-15%", left: "-10%", width: 420, height: 420, borderRadius: "50%", background: pc, opacity: 0.18, filter: "blur(90px)", pointerEvents: "none" }} />

        {/* Large faded logo watermark */}
        <div style={{
          position: "absolute", top: "50%", right: "-4%",
          transform: "translateY(-50%)",
          width: 420, height: 420,
          opacity: 0.10,
          pointerEvents: "none",
        }}>
          <SchoolLogo espnId={espnId} domain={domain} fallbackSvg={schoolLogoBadge(school, 420)} alt="" size={420} style={{ width: 420, height: 420 }} />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", width: "100%", padding: "5rem 1.5rem 3.5rem" }}>
          <a href="/schools" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--muted)", fontSize: 13, textDecoration: "none", marginBottom: "2.5rem", fontWeight: 600 }}>
            ← All Schools
          </a>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            {/* Big logo badge — bright */}
            <div style={{
              background: "#fff",
              borderRadius: 24,
              padding: 14,
              boxShadow: `0 20px 60px ${pc}33, 0 4px 20px rgba(0,0,0,0.08)`,
              flexShrink: 0,
              border: `2px solid ${pc}22`,
            }}>
              <SchoolLogo espnId={espnId} domain={domain} fallbackSvg={svgBadge} alt={school.shortName} size={100} />
            </div>

            <div>
              {school.nickname && (
                <p style={{ fontSize: 13, fontWeight: 800, color: pc, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 0.4rem" }}>
                  The {school.nickname}
                </p>
              )}
              <h1 style={{
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                fontWeight: 900,
                color: "var(--ink)",
                margin: "0 0 0.5rem",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}>
                {school.shortName}
              </h1>
              <p style={{ color: "var(--muted)", fontSize: 15, margin: 0 }}>
                {school.city}, {school.state}
              </p>
            </div>
          </div>

          {/* Stats + color chips row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem", alignItems: "center" }}>
            {school.enrollment > 0 && (
              <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 999, padding: "0.45rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
                <span style={{ fontSize: 14 }}>🎓</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{school.enrollment.toLocaleString()} students</span>
              </div>
            )}
            <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 999, padding: "0.45rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: 14 }}>🛍️</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{mustHaveCount} curated picks</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 999, padding: "0.45rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: 14 }}>📦</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Ships from Amazon</span>
            </div>
            {/* Color swatches */}
            {[pc, sc].map(color => (
              <div key={color} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", borderRadius: 999, padding: "0.3rem 0.75rem 0.3rem 0.4rem", border: "1px solid rgba(0,0,0,0.06)" }}>
                <span style={{ width: 16, height: 16, borderRadius: "50%", background: color, border: "1.5px solid rgba(255,255,255,0.7)", display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 700 }}>{color}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SCHOOL COLOR ACCENT BAR ═══════════════════════════ */}
      <div style={{ height: 6, background: `linear-gradient(90deg, ${pc}, ${sc}, ${pc})` }} />

      {/* ══ SCHOOL INTRO ═════════════════════════════════════ */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2.5rem 1.25rem 0" }}>
        <div style={{ background: `${pc}12`, border: `1px solid ${pc}30`, borderRadius: 16, padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: 10, padding: 6 }}>
            <SchoolLogo espnId={espnId} domain={domain} fallbackSvg={schoolLogoBadge(school, 40)} alt={school.shortName} size={40} />
          </div>
          <div>
            <p style={{ fontWeight: 900, fontSize: 15, margin: 0, color: "var(--ink)" }}>
              Curated for {school.name} Students
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: "0.125rem 0 0" }}>
              {mustHaveCount} must-haves · all sized Twin XL · ships from Amazon with your {school.shortName} pride
            </p>
          </div>
          <a
            href={amazonSearch(`${school.shortName} dorm room essentials`)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{ marginLeft: "auto", flexShrink: 0, background: pc, color: isLight(pc) ? "#0a0a0f" : "#fff", fontWeight: 800, fontSize: 13, padding: "0.5rem 1.25rem", borderRadius: 999, textDecoration: "none" }}
          >
            Shop All on Amazon →
          </a>
        </div>
      </div>

      {/* ══ PRODUCTS ══════════════════════════════════════════ */}
      <div style={{ maxWidth: 1060, margin: "0 auto", padding: "2rem 1.25rem" }}>
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
                    href={amazonSearch(`${school.shortName} ${product.searchQuery}`)}
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
                    {/* Top school-color strip — hard 2-tone split */}
                    <div style={{ height: 5, background: `linear-gradient(90deg, ${pc} 50%, ${sc} 50%)` }} />

                    {/* Product image */}
                    <div style={{ aspectRatio: "1", background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <ProductImage src={productImage(product.id) || amazonImage(product.asin)} alt={product.title} padding="0.75rem" categoryPhoto={CATEGORY_PHOTOS[product.category]} fallbackSrc={logoFallback} />
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

      {/* ══ BRIGHT CTA BAND ═══════════════════════════════════ */}
      <section style={{
        background: "linear-gradient(180deg, #fff 0%, #fff5f8 100%)",
        padding: "4rem 1.25rem",
        position: "relative",
        overflow: "hidden",
        borderTop: `4px solid ${pc}`,
      }}>
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 360, height: 360, borderRadius: "50%", background: pc, opacity: 0.12, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1060, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
            <div style={{ background: "#fff", borderRadius: 16, padding: 10, border: `1.5px solid ${pc}22`, boxShadow: `0 6px 24px ${pc}22` }}>
              <SchoolLogo espnId={espnId} domain={domain} fallbackSvg={schoolLogoBadge(school, 56)} alt={school.shortName} size={56} />
            </div>
            <div>
              <p style={{ fontWeight: 900, fontSize: 22, color: "var(--ink)", margin: 0, lineHeight: 1.1 }}>{school.shortName} Dorm Essentials</p>
              <p style={{ color: "var(--muted)", fontSize: 14, margin: "0.3rem 0 0" }}>Everything you need — straight from Amazon</p>
            </div>
          </div>
          <a
            href={amazonSearch(`${school.shortName} dorm room essentials college`)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            style={{ background: pc, color: isLight(pc) ? "#0a0a0f" : "#fff", fontWeight: 900, fontSize: 15, padding: "0.875rem 2rem", borderRadius: 999, textDecoration: "none", flexShrink: 0, boxShadow: `0 8px 24px ${pc}55` }}
          >
            Shop All on Amazon →
          </a>
        </div>
      </section>

      {/* ══ GUIDES & GALLERY ══════════════════════════════════ */}
      <section style={{ maxWidth: 1060, margin: "0 auto", padding: "4rem 1.25rem" }}>
        <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Resources</p>
        <h2 style={{ fontWeight: 900, fontSize: 22, margin: "0 0 1.5rem" }}>Guides & Inspiration</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {/* Blog / Guides card */}
          <a href="/guides" style={{ borderRadius: 18, background: "var(--ink)", padding: "2rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem", textDecoration: "none" }}>
            <span style={{ fontSize: 36 }}>📋</span>
            <p style={{ fontWeight: 900, fontSize: 18, color: "var(--cream)", margin: 0, lineHeight: 1.2 }}>Dorm Room Guides</p>
            <p style={{ fontSize: 13, color: "rgba(254,252,248,0.55)", margin: 0, lineHeight: 1.6 }}>
              Step-by-step how-tos for bedding, storage, lighting, and more — before move-in day.
            </p>
            <span style={{ fontSize: 13, fontWeight: 800, color: "var(--accent)", marginTop: "auto" }}>Read the Guides →</span>
          </a>
          {/* Gallery card */}
          <a href="/gallery" style={{ borderRadius: 18, background: pc, padding: "2rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem", textDecoration: "none", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <span style={{ fontSize: 36 }}>🎨</span>
              <p style={{ fontWeight: 900, fontSize: 18, color: "#fff", margin: 0, lineHeight: 1.2 }}>Dorm Inspiration Gallery</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6 }}>
                See how other {school.shortName} students styled their rooms in {school.shortName} colors.
              </p>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginTop: "auto" }}>See the Gallery →</span>
            </div>
          </a>
          {/* Amazon search card */}
          <a href={amazonSearch(`${school.shortName} dorm decor college`)} target="_blank" rel="noopener noreferrer sponsored"
            style={{ borderRadius: 18, background: "#FF9900", padding: "2rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem", textDecoration: "none" }}>
            <span style={{ fontSize: 36 }}>📦</span>
            <p style={{ fontWeight: 900, fontSize: 18, color: "#0F1111", margin: 0, lineHeight: 1.2 }}>Shop on Amazon</p>
            <p style={{ fontSize: 13, color: "rgba(0,0,0,0.6)", margin: 0, lineHeight: 1.6 }}>
              Browse all {school.shortName} dorm picks — Prime eligible, easy returns, Amazon&apos;s price.
            </p>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#0F1111", marginTop: "auto" }}>Shop Now →</span>
          </a>
        </div>
      </section>

      {/* ══ NEARBY SCHOOLS ════════════════════════════════════ */}
      {nearby.length > 0 && (
        <section style={{ background: "linear-gradient(180deg, #fff 0%, #fff5f8 100%)", padding: "4rem 1.25rem", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
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
                      background: "#fff",
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "1rem 0.875rem 0.875rem",
                      minHeight: 150,
                      position: "relative",
                      border: "1px solid rgba(0,0,0,0.06)",
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${spc} 50%, ${ssc} 50%)` }} />
                    <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56 }}>
                      <SchoolLogo espnId={getSchoolEspnId(s)} domain={getSchoolDomain(s)} fallbackSvg={schoolLogoBadge(s, 56)} alt={s.shortName} size={56} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ color: "var(--ink)", fontWeight: 900, fontSize: 13, margin: 0, lineHeight: 1.2 }}>{s.shortName}</p>
                      {s.nickname && <p style={{ color: "var(--muted)", fontSize: 11, margin: "0.125rem 0 0" }}>{s.nickname}</p>}
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
