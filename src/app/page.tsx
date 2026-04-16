import type { Metadata } from "next";
import { featuredSchools, schools, getSchoolColors, schoolLogoBadge, getSchoolEspnId, getSchoolDomain } from "@/lib/schools";
import { CATEGORIES, mustHaves } from "@/lib/products";
import { amazonSearch, amazonImage, productImage } from "@/lib/amazon";
import { SchoolLogo } from "@/components/SchoolLogo";
import { ProductImage } from "@/components/ProductImage";
import { NewsletterForm } from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "College Bed Party Essentials — Dorm Room Essentials by School",
  description: "Shop dorm room essentials curated for your school's colors. Find bedding, storage, decor, and tech for 2,773+ US colleges. Ships from Amazon.",
  keywords: ["dorm essentials", "college dorm", "dorm room", "dorm bedding", "college bedding", "dorm decor", "dorm storage"],
  openGraph: {
    title: "College Bed Party Essentials",
    description: "Dorm room essentials matched to your school's exact colors.",
    url: "https://collegebedpartyessentials.com",
    siteName: "College Bed Party Essentials",
    type: "website",
  },
};

const FEATURES = [
  { icon: "🏠", title: "Real College Bed Parties", body: "Dorm setups from real students at Ohio State, Alabama, Penn State, Georgia and more.", href: "/gallery", cta: "See the Gallery →", bg: "#ff3d6e", fg: "#fff" },
  { icon: "🎓", title: "Shop by School", body: "Curated dorm essentials for every university — matched to your school's exact colors.", href: "/schools", cta: "Find Your School →", bg: "#7c3aed", fg: "#fff" },
  { icon: "📋", title: "Easy How-To Guides", body: "Step-by-step tips to set up the perfect dorm room — bedding, storage, decor and more.", href: "/guides", cta: "Read the Guides →", bg: "#0a0a0f", fg: "#fefcf8" },
  { icon: "📦", title: "Ships from Amazon", body: "Every link goes straight to Amazon. Prime eligible. No markup. No middleman.", href: "/schools", cta: "Start Shopping →", bg: "#FF9900", fg: "#0a0a0f" },
];


export default function HomePage() {
  const featured = featuredSchools(18);
  const topProducts = mustHaves().slice(0, 6);
  const marqueeItems = schools
    .filter(s => s.nickname)
    .map(s => ({ slug: s.slug, label: `${s.shortName} ${s.nickname}` }))
    .sort(() => Math.random() - 0.5)
    .slice(0, 40);

  return (
    <div style={{ color: "var(--ink)" }}>

      {/* ══ HERO — vibrant gradient ════════════════════════════ */}
      <section style={{
        position: "relative",
        minHeight: "calc(100svh - var(--header-h, 128px))",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "linear-gradient(135deg, #fff4f7 0%, #ffdbe6 30%, #ffc2d4 55%, #f8a8e3 75%, #d4b3ff 100%)",
        color: "var(--ink)",
      }}>
        {/* Colorful floating blobs */}
        <div style={{ position: "absolute", top: "-12%", right: "-5%", width: 520, height: 520, borderRadius: "50%", background: "#ff3d6e", opacity: 0.45, filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-18%", left: "-8%", width: 560, height: 560, borderRadius: "50%", background: "#7c3aed", opacity: 0.35, filter: "blur(110px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", left: "40%", width: 360, height: 360, borderRadius: "50%", background: "#f59e0b", opacity: 0.28, filter: "blur(90px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "8%", right: "20%", width: 280, height: 280, borderRadius: "50%", background: "#fef08a", opacity: 0.55, filter: "blur(70px)", pointerEvents: "none" }} />

        {/* Sparkle dots */}
        <div style={{ position: "absolute", top: "15%", right: "25%", fontSize: 28, opacity: 0.85, pointerEvents: "none" }}>✨</div>
        <div style={{ position: "absolute", top: "65%", right: "10%", fontSize: 22, opacity: 0.7, pointerEvents: "none" }}>💖</div>
        <div style={{ position: "absolute", top: "22%", left: "8%", fontSize: 20, opacity: 0.6, pointerEvents: "none" }}>⭐</div>

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "3rem 1.25rem", display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "3rem", alignItems: "center", width: "100%" }} className="hero-grid">

          {/* LEFT: Copy + search */}
          <div style={{ textAlign: "left" }} className="hero-copy">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.4rem 0.875rem", borderRadius: 999,
              background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,61,110,0.25)",
              fontSize: 12, fontWeight: 700, color: "var(--ink)",
              marginBottom: "1.75rem",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
              {schools.length.toLocaleString()} colleges · All 50 states · Ships from Amazon
            </div>

            <h1 className="hero-title" style={{
              fontSize: "clamp(2.5rem, 7.5vw, 5.75rem)",
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: "-0.035em",
              margin: "0 0 1.25rem",
              color: "var(--ink)",
            }}>
              Your Dorm.<br />
              <span style={{
                background: "linear-gradient(90deg, #ff3d6e 0%, #f59e0b 50%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Your Colors.</span>
            </h1>

            <p style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", color: "rgba(10,10,15,0.7)", maxWidth: 520, margin: "0 0 2rem", lineHeight: 1.6, fontWeight: 500 }}>
              Shop dorm essentials matched to your school&apos;s exact colors. Every product ships from Amazon.
            </p>

            <form action="/schools" method="get" style={{ width: "100%", maxWidth: 520, margin: "0 0 1.5rem" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center", boxShadow: "0 20px 50px -12px rgba(255,61,110,0.35)", borderRadius: 18 }}>
                <span style={{ position: "absolute", left: "1.1rem", fontSize: 18, pointerEvents: "none" }}>🔍</span>
                <input
                  name="q"
                  type="search"
                  placeholder="Ohio State, Alabama, Duke..."
                  autoComplete="off"
                  style={{ width: "100%", height: 62, paddingLeft: "3rem", paddingRight: "8.75rem", borderRadius: 18, border: "1.5px solid rgba(10,10,15,0.08)", background: "#fff", color: "var(--ink)", fontSize: 15, fontWeight: 500, outline: "none" }}
                />
                <button type="submit" style={{ position: "absolute", right: 6, height: 50, padding: "0 1.5rem", background: "linear-gradient(135deg, #ff3d6e 0%, #f472b6 100%)", color: "#fff", fontWeight: 800, borderRadius: 14, border: "none", fontSize: 14, cursor: "pointer", boxShadow: "0 6px 18px rgba(255,61,110,0.4)" }}>
                  Search →
                </button>
              </div>
            </form>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", alignItems: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(10,10,15,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginRight: "0.25rem" }}>Popular</span>
              {["FL","TX","CA","NY","OH","GA","NC","TN","MI","AL","PA","IL"].map(st => (
                <a key={st} href={`/schools?state=${st}`} style={{
                  padding: "0.35rem 0.75rem",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(10,10,15,0.08)",
                  fontSize: 12,
                  fontWeight: 800,
                  color: "var(--ink)",
                  textDecoration: "none",
                  backdropFilter: "blur(8px)",
                }}>{st}</a>
              ))}
            </div>
          </div>

          {/* RIGHT: Photo card with tilt */}
          <div className="hero-photo" style={{ position: "relative", aspectRatio: "4 / 5", maxHeight: 560, justifySelf: "center", width: "100%", maxWidth: 460 }}>
            {/* Color blocks behind photo */}
            <div style={{ position: "absolute", top: "-4%", right: "-6%", width: "70%", height: "70%", borderRadius: 32, background: "linear-gradient(135deg, #ff3d6e 0%, #f472b6 100%)", transform: "rotate(6deg)", boxShadow: "0 30px 60px -20px rgba(255,61,110,0.55)" }} />
            <div style={{ position: "absolute", bottom: "-3%", left: "-5%", width: "55%", height: "55%", borderRadius: 28, background: "linear-gradient(135deg, #7c3aed 0%, #c084fc 100%)", transform: "rotate(-5deg)", boxShadow: "0 30px 60px -20px rgba(124,58,237,0.5)" }} />
            {/* Photo */}
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 28, overflow: "hidden", boxShadow: "0 40px 80px -20px rgba(10,10,15,0.35), 0 0 0 6px #fff", transform: "rotate(-2deg)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-dorm.png"
                alt="College dorm room setup"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                loading="eager"
              />
            </div>
            {/* Floating stat pills */}
            <div style={{ position: "absolute", top: "8%", left: "-8%", padding: "0.625rem 0.875rem", background: "#fff", borderRadius: 14, boxShadow: "0 16px 32px -8px rgba(10,10,15,0.2)", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", transform: "rotate(-4deg)" }}>
              <span style={{ fontSize: 20 }}>🎓</span>
              <span>2,773 Schools</span>
            </div>
            <div style={{ position: "absolute", bottom: "12%", right: "-6%", padding: "0.625rem 0.875rem", background: "#fff", borderRadius: 14, boxShadow: "0 16px 32px -8px rgba(10,10,15,0.2)", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", gap: "0.5rem", transform: "rotate(4deg)" }}>
              <span style={{ fontSize: 20 }}>📦</span>
              <span>Ships from Amazon</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE ═══════════════════════════════════════════ */}
      <div style={{ background: "var(--accent)", padding: "0.875rem 0", overflow: "hidden" }}>
        <div className="marquee-wrap">
          <div className="marquee-inner">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <a
                key={`${item.slug}-${i}`}
                href={`/schools/${item.slug}`}
                className="marquee-item"
              >
                {item.label} <span style={{ opacity: 0.4, margin: "0 0.25rem" }}>✦</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 4 FEATURES ════════════════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "4.5rem 1.25rem" }}>
        <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Why us</p>
        <h2 className="d-lg" style={{ marginBottom: "2.5rem" }}>Everything You Need</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {FEATURES.map(f => (
            <a key={f.title} href={f.href} className="card" style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}>
              <div style={{ background: f.bg, padding: "2.5rem 1.75rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                <span style={{ fontSize: 40 }}>{f.icon}</span>
                <p style={{ fontWeight: 900, fontSize: 20, color: f.fg, margin: 0, lineHeight: 1.2 }}>{f.title}</p>
              </div>
              <div style={{ background: "var(--cream2)", padding: "1.25rem 1.75rem 1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{f.body}</p>
                <span style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)" }}>{f.cta}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ FEATURED SCHOOLS — BENTO GRID ═══════════════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.25rem" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Browse by school</p>
            <h2 className="d-lg">Top Schools</h2>
          </div>
          <a href="/schools" className="btn btn-outline" style={{ padding: "0.6rem 1.25rem", fontSize: 14 }}>
            All {schools.length.toLocaleString()} schools →
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: 160, gap: 12 }}>
          {featured.map((school, i) => {
            const tall = i < 2;
            const [pc, sc] = getSchoolColors(school);
            const espnId = getSchoolEspnId(school);
            const domain = getSchoolDomain(school);
            const logoSize = tall ? 56 : 38;
            return (
              <a
                key={school.slug}
                href={`/schools/${school.slug}`}
                className="card"
                style={{
                  gridRow: tall ? "span 2" : "span 1",
                  background: `linear-gradient(135deg, ${pc} 50%, ${sc} 50%)`,
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  padding: tall ? "1.5rem" : "1rem",
                  textDecoration: "none", position: "relative",
                  minHeight: tall ? 332 : 160,
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", borderRadius: "inherit" }} />
                {/* Logo top-right */}
                <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: tall ? 14 : 10, padding: tall ? 6 : 4 }}>
                    <SchoolLogo espnId={espnId} domain={domain} fallbackSvg={schoolLogoBadge(school, logoSize)} alt={school.shortName} size={logoSize} />
                  </div>
                </div>
                {/* Name bottom-left */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  {school.nickname && <p style={{ color: "rgba(255,255,255,0.65)", fontSize: tall ? 12 : 10, fontWeight: 700, margin: "0 0 0.2rem" }}>{school.nickname}</p>}
                  <p style={{ color: "#fff", fontWeight: 900, fontSize: tall ? 20 : 13, margin: 0, lineHeight: 1.1 }}>{school.shortName}</p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: tall ? 12 : 10, margin: "0.2rem 0 0" }}>{school.city}, {school.state}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ══ AMAZON SECTION — inverted vibrant ══════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #fff4f7 0%, #ffe0eb 50%, #ffd1de 100%)", padding: "5rem 1.25rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-15%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "#ff3d6e", opacity: 0.18, filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "#7c3aed", opacity: 0.15, filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "10%", left: "45%", width: 260, height: 260, borderRadius: "50%", background: "#FF9900", opacity: 0.12, filter: "blur(70px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }} className="amazon-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              <div style={{ background: "#FF9900", borderRadius: 8, padding: "0.35rem 0.75rem", boxShadow: "0 8px 20px -6px rgba(255,153,0,0.45)" }}>
                <span style={{ fontWeight: 900, fontSize: 18, color: "#0F1111", letterSpacing: "-0.03em" }}>amazon</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#ff3d6e", letterSpacing: "0.12em", textTransform: "uppercase" }}>Ships Everything</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 900, color: "var(--ink)", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 1.25rem" }}>
              Every product.<br />
              <span style={{
                background: "linear-gradient(90deg, #ff3d6e 0%, #FF9900 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>Straight from Amazon.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(10,10,15,0.65)", lineHeight: 1.7, margin: "0 0 2rem", maxWidth: 420, fontWeight: 500 }}>
              No markup. No middleman. Prime shipping, easy returns, Amazon&apos;s price.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
              {[{ icon: "🚀", label: "Prime Eligible" }, { icon: "↩️", label: "Easy Returns" }, { icon: "🔒", label: "Secure Checkout" }, { icon: "⭐", label: "Verified Reviews" }].map(b => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,61,110,0.18)", borderRadius: 999, padding: "0.4rem 0.875rem", backdropFilter: "blur(8px)" }}>
                  <span style={{ fontSize: 13 }}>{b.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "var(--ink)" }}>{b.label}</span>
                </div>
              ))}
            </div>
            <a href={amazonSearch("dorm room essentials college")} target="_blank" rel="noopener noreferrer sponsored" style={{
              display: "inline-flex", alignItems: "center", gap: "0.625rem",
              background: "linear-gradient(135deg, #ff3d6e 0%, #f472b6 100%)",
              color: "#fff", fontWeight: 800, fontSize: 15,
              padding: "0.875rem 1.75rem", borderRadius: 999, textDecoration: "none",
              boxShadow: "0 12px 28px -8px rgba(255,61,110,0.5)",
            }}>
              Shop All Dorm Essentials on Amazon →
            </a>
          </div>
          {/* Category tiles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {CATEGORIES.map((cat, i) => {
              const tall = i === 2 || i === 6;
              return (
                <a key={cat.id} href={amazonSearch(`dorm room ${cat.label}`)} target="_blank" rel="noopener noreferrer sponsored"
                  style={{ gridRow: tall ? "span 2" : "span 1", background: cat.hue, borderRadius: 12, padding: tall ? "1.5rem 1rem" : "1rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem", textDecoration: "none", minHeight: tall ? 188 : 90, boxShadow: "0 12px 24px -10px rgba(10,10,15,0.2)" }}>
                  <span style={{ fontSize: tall ? 32 : 22 }}>{cat.emoji}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.2, opacity: 0.95 }}>{cat.label}</span>
                </a>
              );
            })}
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(10,10,15,0.4)", marginTop: "3rem", position: "relative", zIndex: 1, fontWeight: 600 }}>
          As an Amazon Associate, College Bed Party Essentials earns from qualifying purchases.
        </p>
      </section>

      {/* ══ CATEGORIES ════════════════════════════════════════ */}
      <section style={{ background: "var(--cream2)", padding: "5rem 1.25rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>What you need</p>
          <h2 className="d-lg" style={{ marginBottom: "2.5rem" }}>Shop by Category</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12 }}>
            {CATEGORIES.map(cat => (
              <a key={cat.id} href={`/schools?cat=${cat.id}`} className="card" style={{ background: "var(--cream)", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", textDecoration: "none", textAlign: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <span style={{ width: 52, height: 52, borderRadius: 16, background: `${cat.hue}1a`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{cat.emoji}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MUST-HAVES ════════════════════════════════════════ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.25rem" }}>
        <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" }}>The essentials</p>
        <h2 className="d-lg" style={{ marginBottom: "0.5rem" }}>Dorm Must-Haves</h2>
        <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: "2.5rem" }}>The stuff every freshman actually needs.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {topProducts.map(product => (
            <a key={product.id} href={amazonSearch(product.searchQuery)} target="_blank" rel="noopener noreferrer sponsored" className="card" style={{ background: "#fff", textDecoration: "none", display: "flex", flexDirection: "column", border: "1.5px solid rgba(0,0,0,0.07)" }}>
              <div style={{ aspectRatio: "1", background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <ProductImage src={productImage(product.id) || amazonImage(product.asin)} alt={product.title} padding="1.5rem" />
              </div>
              <div style={{ padding: "1rem 1.125rem 1.125rem", display: "flex", flexDirection: "column", gap: "0.375rem", flex: 1 }}>
                <div className="badge badge-dark" style={{ alignSelf: "flex-start", fontSize: 10, padding: "0.2rem 0.6rem" }}>★ Must-have</div>
                <p style={{ fontWeight: 800, fontSize: 13, lineHeight: 1.4, margin: 0, color: "var(--ink)" }}>{product.title}</p>
                <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>{product.description}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "0.5rem", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                  <span style={{ fontWeight: 900, fontSize: 16, color: "var(--accent)" }}>{product.price}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)" }}>Amazon →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ═════════════════════════════════════ */}
      <section className="grain" style={{ background: "var(--ink)", color: "var(--cream)", padding: "6rem 1.25rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-20%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: "var(--violet)", opacity: 0.12, filter: "blur(100px)" }} />
          <div style={{ position: "absolute", bottom: "-20%", right: "20%", width: 400, height: 400, borderRadius: "50%", background: "var(--accent)", opacity: 0.12, filter: "blur(80px)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Dead simple</p>
          <h2 className="d-xl" style={{ color: "var(--cream)", marginBottom: "4rem" }}>Three steps.<br />Perfect dorm.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
            {[
              { n: "01", icon: "🎓", title: "Find Your School", body: `Search ${schools.length.toLocaleString()} colleges.` },
              { n: "02", icon: "🛍️", title: "Browse Essentials", body: "9 categories, 30+ curated picks." },
              { n: "03", icon: "📦", title: "Ship from Amazon", body: "Prime eligible. No markup." },
            ].map(item => (
              <div key={item.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{item.icon}</div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,61,110,0.7)", letterSpacing: "0.08em", margin: 0 }}>{item.n}</p>
                <p style={{ fontWeight: 800, fontSize: 17, color: "var(--cream)", margin: 0 }}>{item.title}</p>
                <p style={{ fontSize: 14, color: "rgba(254,252,248,0.5)", lineHeight: 1.6, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "3.5rem" }}>
            <a href="/schools" className="btn btn-pink" style={{ fontSize: 16, padding: "0.875rem 2rem", textDecoration: "none" }}>Find My School →</a>
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ═══════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #1a0a14 100%)", color: "var(--cream)", padding: "5rem 1.25rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: "var(--accent)", opacity: 0.12, filter: "blur(120px)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 0.75rem" }}>Stay in the loop</p>
          <h2 className="d-lg" style={{ color: "var(--cream)", margin: "0 0 0.75rem" }}>Signup for new updates to your school merch!</h2>
          <p style={{ color: "rgba(254,252,248,0.6)", fontSize: 15, margin: "0 0 2rem", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            New products, restocks, and dorm drops — matched to your school's colors. No spam. Unsubscribe anytime.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
