import type { Metadata } from "next";
import { featuredSchools, schools, getSchoolColors, schoolLogoBadge, getSchoolEspnId, getSchoolDomain } from "@/lib/schools";
import { CATEGORIES, mustHaves } from "@/lib/products";
import { amazonSearch, amazonImage } from "@/lib/amazon";
import { SchoolLogo } from "@/components/SchoolLogo";
import { ProductImage } from "@/components/ProductImage";

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
  const marqueeItems = schools.filter(s => s.nickname).slice(0, 28).map(s => `${s.shortName} ${s.nickname}`);

  return (
    <div style={{ color: "var(--ink)" }}>

      {/* ══ HERO — full screen photo background ════════════════ */}
      <section style={{ position: "relative", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", overflow: "hidden", color: "#fff" }}>
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1920&q=85"
          alt="College dorm room setup"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          loading="eager"
        />
        {/* Multi-layer overlay for depth */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,15,0.65)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,15,0.3) 0%, rgba(10,10,15,0.8) 100%)" }} />

        {/* Accent glows */}
        <div style={{ position: "absolute", top: "5%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: "#ff3d6e", opacity: 0.15, filter: "blur(120px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "#7c3aed", opacity: 0.12, filter: "blur(100px)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 900, width: "100%", padding: "2rem 1.25rem" }}>
          <div className="badge badge-outline" style={{ marginBottom: "2rem", display: "inline-flex" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
            {schools.length.toLocaleString()} colleges · All 50 states · Ships from Amazon
          </div>

          <h1 className="d-2xl" style={{ color: "#fff", marginBottom: "1.25rem" }}>
            Your Dorm.<br />
            <span style={{ WebkitTextStroke: "2px var(--accent)", color: "transparent" }}>Your Colors.</span>
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "rgba(255,255,255,0.65)", maxWidth: 540, margin: "0 auto 2.5rem", lineHeight: 1.65 }}>
            Shop dorm essentials matched to your school&apos;s exact colors. Every product ships from Amazon.
          </p>

          <form action="/schools" method="get" style={{ width: "100%", maxWidth: 500, margin: "0 auto 2rem" }}>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span style={{ position: "absolute", left: "1rem", fontSize: 18, pointerEvents: "none" }}>🔍</span>
              <input
                name="q"
                type="search"
                placeholder="Ohio State, Alabama, Duke..."
                autoComplete="off"
                style={{ width: "100%", height: 58, paddingLeft: "3rem", paddingRight: "8.5rem", borderRadius: 18, border: "1.5px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 15, outline: "none", backdropFilter: "blur(12px)" }}
              />
              <button type="submit" style={{ position: "absolute", right: 6, height: 46, padding: "0 1.375rem", background: "var(--accent)", color: "#fff", fontWeight: 800, borderRadius: 14, border: "none", fontSize: 14, cursor: "pointer" }}>
                Search →
              </button>
            </div>
          </form>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
            {["FL","TX","CA","NY","OH","GA","NC","TN","MI","AL","PA","IL"].map(st => (
              <a key={st} href={`/schools?state=${st}`} className="badge badge-outline" style={{ textDecoration: "none" }}>{st}</a>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.3)", fontSize: 11, zIndex: 2 }}>
          <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)" }} />
          <span>scroll</span>
        </div>
      </section>

      {/* ══ MARQUEE ═══════════════════════════════════════════ */}
      <div style={{ background: "var(--accent)", padding: "0.875rem 0", overflow: "hidden" }}>
        <div className="marquee-wrap">
          <div className="marquee-inner">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} style={{ color: "#fff", fontWeight: 800, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em", whiteSpace: "nowrap", padding: "0 1.5rem" }}>
                {item} <span style={{ opacity: 0.4, margin: "0 0.25rem" }}>✦</span>
              </span>
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

      {/* ══ AMAZON SECTION ════════════════════════════════════ */}
      <section style={{ background: "#0F1111", padding: "5rem 1.25rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-10%", left: "50%", transform: "translateX(-50%)", width: 700, height: 400, borderRadius: "50%", background: "#FF9900", opacity: 0.07, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
              <div style={{ background: "#FF9900", borderRadius: 8, padding: "0.35rem 0.75rem" }}>
                <span style={{ fontWeight: 900, fontSize: 18, color: "#0F1111", letterSpacing: "-0.03em" }}>amazon</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>Ships Everything</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", fontWeight: 900, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 1.25rem" }}>
              Every product.<br /><span style={{ color: "#FF9900" }}>Straight from Amazon.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "0 0 2rem", maxWidth: 400 }}>
              No markup. No middleman. Prime shipping, easy returns, Amazon&apos;s price.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginBottom: "2.5rem" }}>
              {[{ icon: "🚀", label: "Prime Eligible" }, { icon: "↩️", label: "Easy Returns" }, { icon: "🔒", label: "Secure Checkout" }, { icon: "⭐", label: "Verified Reviews" }].map(b => (
                <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "0.35rem 0.875rem" }}>
                  <span style={{ fontSize: 13 }}>{b.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{b.label}</span>
                </div>
              ))}
            </div>
            <a href={amazonSearch("dorm room essentials college")} target="_blank" rel="noopener noreferrer sponsored" style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem", background: "#FF9900", color: "#0F1111", fontWeight: 800, fontSize: 15, padding: "0.875rem 1.75rem", borderRadius: 999, textDecoration: "none" }}>
              Shop All Dorm Essentials on Amazon →
            </a>
          </div>
          {/* Category tiles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {CATEGORIES.map((cat, i) => {
              const tall = i === 2 || i === 6;
              return (
                <a key={cat.id} href={amazonSearch(`dorm room ${cat.label}`)} target="_blank" rel="noopener noreferrer sponsored"
                  style={{ gridRow: tall ? "span 2" : "span 1", background: cat.hue, borderRadius: 12, padding: tall ? "1.5rem 1rem" : "1rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem", textDecoration: "none", minHeight: tall ? 188 : 90 }}>
                  <span style={{ fontSize: tall ? 32 : 22 }}>{cat.emoji}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.2, opacity: 0.9 }}>{cat.label}</span>
                </a>
              );
            })}
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.2)", marginTop: "3rem", position: "relative", zIndex: 1 }}>
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
                <ProductImage src={amazonImage(product.asin)} alt={product.title} padding="1.5rem" />
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
    </div>
  );
}
