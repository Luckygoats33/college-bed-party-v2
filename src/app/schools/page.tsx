import type { Metadata } from "next";
import { schools, schoolsByState, getSchoolColors, schoolLogoBadge, getSchoolEspnId, getSchoolDomain, featuredSchools } from "@/lib/schools";
import { SchoolLogo } from "@/components/SchoolLogo";

export const metadata: Metadata = {
  title: "All Schools",
  description: "Browse dorm essentials for all 2,773 US colleges and universities.",
};

const REGIONS = [
  "New England","Mid East","Great Lakes","Plains",
  "Southeast","Southwest","Rocky Mountains","Far West","Outlying Areas",
];

const STATE_NAMES: Record<string, string> = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",
  DE:"Delaware",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",
  KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",
  MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",
  NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",
  OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",
  TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",
  WI:"Wisconsin",WY:"Wyoming",DC:"D.C.",PR:"Puerto Rico",GU:"Guam",VI:"Virgin Islands",
};

interface PageProps {
  searchParams: Promise<{ q?: string; state?: string; region?: string }>;
}

export default async function SchoolsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const q = (params.q ?? "").trim().toLowerCase();
  const stateFilter = params.state ?? "";
  const regionFilter = params.region ?? "";

  let filtered = schools;
  if (q) {
    filtered = filtered.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.shortName.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.nickname.toLowerCase().includes(q)
    );
  }
  if (stateFilter) filtered = filtered.filter(s => s.state === stateFilter);
  if (regionFilter) filtered = filtered.filter(s => s.region === regionFilter);

  const byState = schoolsByState();
  const states = Object.keys(byState).sort();
  const showing = filtered.slice(0, 240);
  const hasFilters = !!(q || stateFilter || regionFilter);

  return (
    <div style={{ color: "var(--ink)" }}>
      {/* ══ HEADER — bright/airy ═════════════════════════════ */}
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
          <p style={{ fontSize: 11, fontWeight: 800, color: "#ff3d6e", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Browse</p>
          <h1 className="d-lg" style={{ color: "var(--ink)", margin: "0 0 0.5rem" }}>All Schools</h1>
          <p style={{ color: "rgba(10,10,15,0.55)", fontSize: 14, margin: 0 }}>
            {filtered.length.toLocaleString()} school{filtered.length !== 1 ? "s" : ""}
            {q && ` matching "${q}"`}
            {stateFilter && ` in ${STATE_NAMES[stateFilter] ?? stateFilter}`}
            {regionFilter && ` in the ${regionFilter} region`}
          </p>
        </div>
      </div>

      {/* ══ SEARCH + FILTERS ══════════════════════════════════ */}
      <div style={{ background: "var(--cream2)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "1.25rem", position: "sticky", top: "var(--header-h, 128px)", zIndex: 40 }}>
        <form method="get" style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "0.625rem", alignItems: "center" }}>
          <input
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search schools, cities, mascots..."
            style={{
              flex: "1 1 240px", height: 42, padding: "0 1rem",
              borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)",
              background: "#fff", fontSize: 14, outline: "none",
              color: "var(--ink)",
            }}
          />
          <select
            name="state"
            defaultValue={stateFilter}
            style={{ height: 42, padding: "0 0.75rem", borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontSize: 14, color: "var(--ink)", cursor: "pointer" }}
          >
            <option value="">All States</option>
            {states.map(st => <option key={st} value={st}>{STATE_NAMES[st] ?? st}</option>)}
          </select>
          <select
            name="region"
            defaultValue={regionFilter}
            style={{ height: 42, padding: "0 0.75rem", borderRadius: 12, border: "1px solid rgba(0,0,0,0.12)", background: "#fff", fontSize: 14, color: "var(--ink)", cursor: "pointer" }}
          >
            <option value="">All Regions</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <button type="submit" className="btn btn-pink" style={{ padding: "0 1.25rem", height: 42, minHeight: "auto" }}>
            Search
          </button>
          {hasFilters && (
            <a href="/schools" className="btn btn-outline" style={{ padding: "0 1rem", height: 42, minHeight: "auto", textDecoration: "none", fontSize: 13 }}>
              Clear ×
            </a>
          )}
        </form>
      </div>

      {/* ══ FEATURED SCHOOLS (only when no filters) ═══════════ */}
      {!hasFilters && (
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 1.25rem 0.5rem" }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.25rem" }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 800, color: "#ff3d6e", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.375rem" }}>Featured</p>
              <h2 style={{ fontWeight: 900, fontSize: 26, margin: 0, letterSpacing: "-0.02em" }}>Top Schools</h2>
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)", margin: 0, fontWeight: 600 }}>Most popular destinations</p>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
            gap: 10,
          }}>
            {featuredSchools(12).map(school => {
              const [spc, ssc] = getSchoolColors(school);
              return (
                <a
                  key={school.slug}
                  href={`/schools/${school.slug}`}
                  className="card"
                  style={{
                    background: "linear-gradient(180deg, #fff 0%, #fff8fa 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: "1rem 0.875rem 0.875rem",
                    minHeight: 170,
                    textDecoration: "none",
                    position: "relative",
                    border: "1px solid rgba(255,61,110,0.15)",
                    overflow: "hidden",
                    boxShadow: "0 8px 20px -10px rgba(255,61,110,0.2)",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${spc} 50%, ${ssc} 50%)` }} />
                  <span style={{ position: "absolute", top: 8, right: 8, background: "#ff3d6e", color: "#fff", borderRadius: 999, padding: "0.12rem 0.45rem", fontSize: 9, fontWeight: 800, letterSpacing: "0.04em" }}>★</span>
                  <div style={{ marginTop: "0.5rem", marginBottom: "0.625rem", display: "flex", alignItems: "center", justifyContent: "center", width: 64, height: 64 }}>
                    <SchoolLogo espnId={getSchoolEspnId(school)} domain={getSchoolDomain(school)} fallbackSvg={schoolLogoBadge(school, 64)} alt={school.shortName} size={64} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "var(--ink)", fontWeight: 900, fontSize: 13, margin: 0, lineHeight: 1.2 }}>{school.shortName}</p>
                    {school.nickname && (
                      <p style={{ color: "var(--muted)", fontSize: 10, margin: "0.125rem 0 0" }}>{school.nickname}</p>
                    )}
                    <p style={{ color: "var(--muted)", fontSize: 10, fontWeight: 600, margin: "0.25rem 0 0" }}>{school.city}, {school.state}</p>
                  </div>
                </a>
              );
            })}
          </div>
          <div style={{ marginTop: "2.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase", margin: 0 }}>Or browse all {filtered.length.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* ══ RESULTS GRID ══════════════════════════════════════ */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: hasFilters ? "2rem 1.25rem 5rem" : "1rem 1.25rem 5rem" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "6rem 1rem" }}>
            <p style={{ fontSize: 48, marginBottom: "1rem" }}>🎓</p>
            <p style={{ fontWeight: 900, fontSize: 22, marginBottom: "0.5rem" }}>No schools found</p>
            <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: "1.5rem" }}>Try a different search or clear your filters.</p>
            <a href="/schools" className="btn btn-dark">Browse all schools</a>
          </div>
        ) : (
          <>
            {filtered.length > 240 && (
              <p style={{ color: "var(--muted)", fontSize: 12, marginBottom: "1rem" }}>
                Showing {showing.length} of {filtered.length.toLocaleString()} — refine your search to narrow results.
              </p>
            )}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: 10,
            }}>
              {showing.map(school => {
                const [spc, ssc] = getSchoolColors(school);
                return (
                  <a
                    key={school.slug}
                    href={`/schools/${school.slug}`}
                    className="card"
                    style={{
                      background: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      padding: "1rem 0.875rem 0.875rem",
                      minHeight: 160,
                      textDecoration: "none",
                      position: "relative",
                      border: "1px solid rgba(0,0,0,0.06)",
                      overflow: "hidden",
                      transition: "transform 0.15s, box-shadow 0.15s",
                    }}
                  >
                    {/* top school-color accent bar */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${spc} 50%, ${ssc} 50%)` }} />
                    {/* Large centered logo */}
                    <div style={{ marginTop: "0.5rem", marginBottom: "0.625rem", display: "flex", alignItems: "center", justifyContent: "center", width: 64, height: 64 }}>
                      <SchoolLogo espnId={getSchoolEspnId(school)} domain={getSchoolDomain(school)} fallbackSvg={schoolLogoBadge(school, 64)} alt={school.shortName} size={64} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <p style={{ color: "var(--ink)", fontWeight: 900, fontSize: 13, margin: 0, lineHeight: 1.2 }}>{school.shortName}</p>
                      {school.nickname && (
                        <p style={{ color: "var(--muted)", fontSize: 10, margin: "0.125rem 0 0" }}>{school.nickname}</p>
                      )}
                      <p style={{ color: "var(--muted)", fontSize: 10, fontWeight: 600, margin: "0.25rem 0 0" }}>{school.city}, {school.state}</p>
                    </div>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
