import type { Metadata } from "next";
import posts from "@/data/blog-posts.json";
import { schools, getSchoolColors } from "@/lib/schools";

export const metadata: Metadata = {
  title: "Blog — College Bed Party Guides",
  description: "School-by-school bed party guides. Real decoration ideas, packing tips, and dorm inspiration for every major college.",
};

type Post = { slug: string; schoolSlug: string; title: string; excerpt: string; date: string; heroImage: string; bodyHtml: string };

export default function BlogPage() {
  const schoolBySlug = Object.fromEntries(schools.map(s => [s.slug, s]));
  const list = posts as Post[];

  return (
    <div style={{ color: "var(--ink)" }}>
      {/* Header */}
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
          <p style={{ fontSize: 11, fontWeight: 800, color: "#ff3d6e", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Blog</p>
          <h1 className="d-lg" style={{ color: "var(--ink)", margin: "0 0 0.5rem" }}>Bed Party Guides</h1>
          <p style={{ color: "rgba(10,10,15,0.55)", fontSize: 15, margin: 0, maxWidth: 560 }}>
            {list.length} school-by-school guides — decor ideas, color palettes, and dorm essentials matched to your team.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.25rem 6rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
          {list.map(post => {
            const school = schoolBySlug[post.schoolSlug];
            const [spc, ssc] = school ? getSchoolColors(school) : ["#ff3d6e", "#7c3aed"];
            return (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
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
                <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", background: "var(--cream2)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.heroImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${spc} 50%, ${ssc} 50%)` }} />
                </div>
                <div style={{ padding: "1.1rem 1.15rem 1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <p style={{ fontSize: 10.5, color: "var(--muted)", fontWeight: 700, margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>{post.date}</p>
                  <p style={{ fontWeight: 900, fontSize: 17, lineHeight: 1.25, margin: 0 }}>{post.title}</p>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0, flex: 1 }}>{post.excerpt}</p>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#ff3d6e", marginTop: "0.25rem" }}>Read Guide →</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
