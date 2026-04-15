import type { Metadata } from "next";
import { schools, schoolsByState, getSchoolColors, schoolLogoBadge, getSchoolEspnId } from "@/lib/schools";
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
      {/* ══ HEADER ═══════════════════════════════════════════ */}
      <div style={{ background: "var(--ink)", color: "var(--cream)", padding: "3rem 1.25rem 3.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "var(--accent)", opacity: 0.12, filter: "blur(80px)" }} />
          <div style={{ position: "absolute", bottom: "-20%", left: "20%", width: 300, height: 300, borderRadius: "50%", background: "var(--violet)", opacity: 0.1, filter: "blur(60px)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Browse</p>
          <h1 className="d-lg" style={{ color: "var(--cream)", margin: "0 0 0.5rem" }}>All Schools</h1>
          <p style={{ color: "rgba(254,252,248,0.5)", fontSize: 14, margin: 0 }}>
            {filtered.length.toLocaleString()} school{filtered.length !== 1 ? "s" : ""}
            {q && ` matching "${q}"`}
            {stateFilter && ` in ${STATE_NAMES[stateFilter] ?? stateFilter}`}
            {regionFilter && ` in the ${regionFilter} region`}
          </p>
        </div>
      </div>

      {/* ══ SEARCH + FILTERS ══════════════════════════════════ */}
      <div style={{ background: "var(--cream2)", borderBottom: "1px solid rgba(0,0,0,0.06)", padding: "1.25rem", position: "sticky", top: 64, zIndex: 40 }}>
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

      {/* ══ RESULTS GRID ══════════════════════════════════════ */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.25rem 5rem" }}>
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
              {showing.map(school => (
                <a
                  key={school.slug}
                  href={`/schools/${school.slug}`}
                  className="card"
                  style={{
                    background: `linear-gradient(135deg, ${getSchoolColors(school)[0]} 50%, ${getSchoolColors(school)[1]} 50%)`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "1rem",
                    minHeight: 120,
                    textDecoration: "none",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)", borderRadius: "inherit" }} />
                  {/* Logo badge */}
                  <div style={{ position: "absolute", top: 8, right: 8, background: "rgba(255,255,255,0.95)", borderRadius: 8, padding: 3 }}>
                    <SchoolLogo espnId={getSchoolEspnId(school)} fallbackSvg={schoolLogoBadge(school, 28)} alt={school.shortName} size={28} />
                  </div>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: 600, margin: 0 }}>{school.city}, {school.state}</p>
                    <p style={{ color: "#fff", fontWeight: 900, fontSize: 13, margin: 0, lineHeight: 1.2 }}>{school.shortName}</p>
                    {school.nickname && (
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, margin: 0 }}>{school.nickname}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
