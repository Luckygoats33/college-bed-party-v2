import schoolsData from "@/data/schools.json";

export type School = {
  slug: string;
  name: string;
  shortName: string;
  nickname: string;
  city: string;
  state: string;
  region: string;
  primaryColor: string;
  secondaryColor: string;
  enrollment: number;
  url: string;
};

export const schools = schoolsData as School[];

// ── Schools featured on the live site (pinned first) ─────────────────────────
// Names must match exactly as they appear in IPEDS HD2023 dataset
const PINNED_NAMES = [
  "Ohio State University-Main Campus",
  "The University of Alabama",
  "Pennsylvania State University-Main Campus",
  "University of Georgia",
  "Boston University",
  "University of Michigan-Ann Arbor",
  "University of Florida",
  "The University of Texas at Austin",
  "Florida State University",
  "University of Mississippi",
  "Vanderbilt University",
  "Tulane University of Louisiana",
  "Louisiana State University and Agricultural & Mechanical College",
  "Indiana University-Bloomington",
  "University of North Carolina at Chapel Hill",
  "The University of Tennessee-Knoxville",
  "University of Colorado Boulder",
  "University of Wisconsin-Madison",
  "University of Miami",
  "University of Central Florida",
  "Northeastern University",
  "Clemson University",
  "Auburn University",
  "University of Kansas",
  "Syracuse University",
  "University of Arizona",
  "University of California-Los Angeles",
  "University of Southern California",
];

// ── Deterministic color from school name ─────────────────────────────────────
// For schools with no NCAA color data, generate a vibrant unique color
const DEFAULT_PRIMARY = "#1e293b";

function nameHash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// Nice vibrant hues that look good as gradients, avoiding muddy colors
const VIBRANT_PALETTES: [string, string][] = [
  ["#c0392b", "#922b21"], // deep red
  ["#1a5276", "#21618c"], // navy
  ["#145a32", "#1e8449"], // forest green
  ["#6c3483", "#7d3c98"], // purple
  ["#1f618d", "#2874a6"], // royal blue
  ["#b7950b", "#9a7d0a"], // gold
  ["#922b21", "#78281f"], // crimson
  ["#1a5276", "#154360"], // dark blue
  ["#0e6655", "#117a65"], // teal
  ["#6e2f1a", "#935116"], // brown
  ["#1b2631", "#2c3e50"], // charcoal
  ["#512e5f", "#6c3483"], // dark purple
  ["#7b241c", "#641e16"], // dark red
  ["#1f618d", "#1a5276"], // steel blue
  ["#145a32", "#0e6655"], // emerald
  ["#b9770e", "#9a7d0a"], // amber
  ["#2e4057", "#2874a6"], // slate blue
  ["#784212", "#935116"], // burnt orange
  ["#1b4f72", "#21618c"], // ocean blue
  ["#4a235a", "#7d3c98"], // violet
];

export function getSchoolColors(school: School): [string, string] {
  if (school.primaryColor !== DEFAULT_PRIMARY) {
    return [school.primaryColor, school.secondaryColor];
  }
  // Generate deterministic palette from school name
  const idx = nameHash(school.name) % VIBRANT_PALETTES.length;
  return VIBRANT_PALETTES[idx];
}

// ── ESPN NCAA team logo IDs ────────────────────────────────────────────────────
// URL: https://a.espncdn.com/i/teamlogos/ncaa/500/{id}.png
const ESPN_IDS: Record<string, number> = {
  // Power 4 / major programs
  "ohio-state-university-main-campus": 194,
  "the-university-of-alabama": 333,
  "pennsylvania-state-university-main-campus": 213,
  "university-of-georgia": 61,
  "university-of-michigan-ann-arbor": 130,
  "university-of-florida": 57,
  "the-university-of-texas-at-austin": 251,
  "florida-state-university": 52,
  "university-of-mississippi": 145,
  "vanderbilt-university": 238,
  "louisiana-state-university-and-agricultural-mechanical-college": 99,
  "indiana-university-bloomington": 84,
  "university-of-north-carolina-at-chapel-hill": 153,
  "the-university-of-tennessee-knoxville": 2579,
  "university-of-colorado-boulder": 38,
  "university-of-wisconsin-madison": 275,
  "university-of-miami": 2390,
  "clemson-university": 228,
  "auburn-university": 2,
  "university-of-arizona": 12,
  "university-of-california-los-angeles": 26,
  "university-of-southern-california": 30,
  // Additional major programs
  "duke-university": 150,
  "university-of-kentucky": 96,
  "university-of-kansas": 2305,
  "kansas-state-university": 2306,
  "university-of-notre-dame": 87,
  "stanford-university": 24,
  "university-of-oregon": 2483,
  "oregon-state-university": 204,
  "university-of-washington-seattle-campus": 264,
  "washington-state-university": 265,
  "university-of-utah": 254,
  "the-university-of-texas-at-arlington": 251,
  "texas-am-university": 245,
  "texas-tech-university": 2641,
  "baylor-university": 239,
  "university-of-oklahoma": 201,
  "oklahoma-state-university-main-campus": 197,
  "texas-christian-university": 2628,
  "west-virginia-university": 277,
  "university-of-iowa": 2294,
  "iowa-state-university": 66,
  "university-of-nebraska-lincoln": 158,
  "university-of-minnesota-twin-cities": 135,
  "michigan-state-university": 127,
  "northwestern-university": 77,
  "purdue-university-main-campus": 2509,
  "university-of-illinois-urbana-champaign": 356,
  "university-of-maryland-college-park": 120,
  "rutgers-university-new-brunswick": 164,
  "university-of-pittsburgh-pittsburgh-campus": 221,
  "syracuse-university": 183,
  "boston-college": 103,
  "university-of-virginia-main-campus": 258,
  "virginia-polytechnic-institute-and-state-university": 259,
  "north-carolina-state-university-at-raleigh": 152,
  "georgia-institute-of-technology-main-campus": 59,
  "university-of-arkansas": 8,
  "mississippi-state-university": 344,
  "university-of-south-carolina-columbia": 2579,
  "university-of-missouri-columbia": 142,
  "university-of-california-berkeley": 25,
  "arizona-state-university-tempe": 9,
  "university-of-connecticut": 41,
  "temple-university": 218,
  "university-of-memphis": 235,
  "university-of-houston": 248,
  "university-of-louisville": 97,
  "tulane-university-of-louisiana": 2655,
  "university-of-central-florida": 2116,
};

/** Returns the ESPN NCAA team ID if known, otherwise undefined. */
export function getSchoolEspnId(school: School): number | undefined {
  return ESPN_IDS[school.slug];
}

// ── School logo badge (self-hosted SVG data URI, no external deps) ────────────
function schoolInitials(school: School): string {
  const skip = new Set(["the", "of", "at", "and", "a", "an", "in", "for"]);
  const words = school.shortName.replace(/[-]/g, " ").split(/\s+/).filter(Boolean);
  const sig = words.filter((w) => !skip.has(w.toLowerCase()) && w.length > 1);
  const src = sig.length ? sig : words;
  return src
    .slice(0, 3)
    .map((w) => w[0].toUpperCase())
    .join("");
}

/** Returns an inline SVG data URI badge — school initials on primary color. */
export function schoolLogoBadge(school: School, size = 56): string {
  const [pc] = getSchoolColors(school);
  const initials = schoolInitials(school) || school.shortName[0]?.toUpperCase() || "U";
  // Pick white or dark text depending on background brightness
  const hex = pc.replace("#", "").padEnd(6, "0");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const bright = (r * 299 + g * 587 + b * 114) / 1000;
  const fg = bright > 145 ? "#0a0a0f" : "#ffffff";
  const rx = Math.round(size * 0.22);
  const fs = Math.round(size * 0.38);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${rx}" fill="${pc}"/><text x="50%" y="54%" dominant-baseline="central" text-anchor="middle" font-family="system-ui,-apple-system,sans-serif" font-weight="900" font-size="${fs}" fill="${fg}">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
export function getSchool(slug: string): School | undefined {
  return schools.find((s) => s.slug === slug);
}

export function nearbySchools(school: School, limit = 8): School[] {
  return schools
    .filter((s) => s.slug !== school.slug && s.state === school.state)
    .slice(0, limit);
}

/** Returns the pinned live-site schools first, then fills with big schools */
export function featuredSchools(limit = 20): School[] {
  // Exact-match pinned schools, preserving PINNED_NAMES order
  const pinned: School[] = [];
  for (const name of PINNED_NAMES) {
    const school = schools.find((s) => s.name === name);
    if (school) pinned.push(school);
  }

  const pinnedSlugs = new Set(pinned.map((s) => s.slug));

  // Fill remaining slots with high-enrollment schools not already pinned
  const filler = schools
    .filter((s) => !pinnedSlugs.has(s.slug) && s.enrollment > 20000)
    .sort((a, b) => b.enrollment - a.enrollment)
    .slice(0, limit);

  return [...pinned, ...filler].slice(0, limit);
}

/** Extracts the bare hostname from a school's url field (for Clearbit logos). */
export function getSchoolDomain(school: School): string | undefined {
  if (!school.url) return undefined;
  try {
    const urlStr = school.url.startsWith("http") ? school.url : `https://${school.url}`;
    return new URL(urlStr).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}

export function schoolsByState(): Record<string, School[]> {
  const map: Record<string, School[]> = {};
  for (const s of schools) {
    if (!s.state) continue;
    (map[s.state] ??= []).push(s);
  }
  return map;
}
