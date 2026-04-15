import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — College Dorm Tips & Guides",
  description: "Dorm room tips, college packing lists, and school color inspiration for every college student.",
};

const POSTS = [
  {
    slug: "ultimate-dorm-packing-list",
    emoji: "📋",
    title: "The Ultimate College Dorm Packing List (2024)",
    excerpt: "Everything you actually need for your first dorm — and what to leave at home. Organized by category.",
    date: "Aug 2024",
    tag: "Packing",
    color: "#ff3d6e",
  },
  {
    slug: "dorm-room-color-themes",
    emoji: "🎨",
    title: "Dorm Room Color Themes by School",
    excerpt: "How to build a dorm room around your school's official colors — from Alabama Crimson to Michigan Maize.",
    date: "Jul 2024",
    tag: "Decor",
    color: "#7c3aed",
  },
  {
    slug: "twin-xl-bedding-guide",
    emoji: "🛏️",
    title: "Twin XL Bedding: Everything You Need to Know",
    excerpt: "Why dorm beds are different, what size sheets to buy, and the best mattress toppers under $60.",
    date: "Jul 2024",
    tag: "Bedding",
    color: "#ff3d6e",
  },
  {
    slug: "dorm-storage-hacks",
    emoji: "📦",
    title: "15 Dorm Storage Hacks That Actually Work",
    excerpt: "Under-bed bins, over-door organizers, command hooks — how to fit your whole life into 120 sq ft.",
    date: "Jun 2024",
    tag: "Storage",
    color: "#7c3aed",
  },
  {
    slug: "string-lights-dorm",
    emoji: "✨",
    title: "The Best String Lights for Dorm Rooms (Ranked)",
    excerpt: "We tested 8 sets. These are the ones that don't die after a month and look good in photos.",
    date: "Jun 2024",
    tag: "Decor",
    color: "#f59e0b",
  },
  {
    slug: "mini-fridge-guide",
    emoji: "🧊",
    title: "Best Mini Fridges for Dorms — 2024 Guide",
    excerpt: "Compact, quiet, and actually cold. The best mini fridges for dorm rooms at every budget.",
    date: "May 2024",
    tag: "Tech",
    color: "#06b6d4",
  },
];

export default function BlogPage() {
  return (
    <div style={{ color: "var(--ink)" }}>
      {/* Header */}
      <div style={{ background: "var(--ink)", color: "var(--cream)", padding: "3.5rem 1.25rem 4rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: "var(--accent)", opacity: 0.1, filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "var(--accent)", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Blog</p>
          <h1 className="d-lg" style={{ color: "var(--cream)", margin: "0 0 0.75rem" }}>Dorm Tips & Guides</h1>
          <p style={{ color: "rgba(254,252,248,0.55)", fontSize: 15, margin: 0, maxWidth: 480 }}>
            Packing lists, color themes, storage hacks — everything you need before move-in day.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.25rem 6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {POSTS.map(post => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ borderRadius: 20, overflow: "hidden", background: "var(--cream2)", display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit" }}
            >
              {/* Color header */}
              <div style={{ height: 120, background: post.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 52, position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.1)" }} />
                <span style={{ position: "relative" }}>{post.emoji}</span>
                <span style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.35)", borderRadius: 999, padding: "0.2rem 0.7rem", fontSize: 10, fontWeight: 700, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>{post.tag}</span>
              </div>
              <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p style={{ fontSize: 10, color: "var(--muted)", fontWeight: 600, margin: 0 }}>{post.date}</p>
                <p style={{ fontWeight: 900, fontSize: 16, lineHeight: 1.3, margin: 0, color: "var(--ink)" }}>{post.title}</p>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0, flex: 1 }}>{post.excerpt}</p>
                <span style={{ fontSize: 13, fontWeight: 800, color: post.color, marginTop: "0.5rem" }}>Read More →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
