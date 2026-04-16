import type { Metadata } from "next";
import { notFound } from "next/navigation";
import posts from "@/data/blog-posts.json";
import { schools, getSchoolColors, schoolLogoBadge, getSchoolEspnId, getSchoolDomain } from "@/lib/schools";
import { SchoolLogo } from "@/components/SchoolLogo";

type Post = { slug: string; schoolSlug: string; title: string; excerpt: string; date: string; heroImage: string; bodyHtml: string };
const list = posts as Post[];
const bySlug = Object.fromEntries(list.map(p => [p.slug, p]));

export async function generateStaticParams() {
  return list.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = bySlug[slug];
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.heroImage ? [post.heroImage] : [] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = bySlug[slug];
  if (!post) notFound();

  const schoolBySlug = Object.fromEntries(schools.map(s => [s.slug, s]));
  const school = schoolBySlug[post.schoolSlug];
  const [spc, ssc] = school ? getSchoolColors(school) : ["#ff3d6e", "#7c3aed"];

  const related = list.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <article style={{ color: "var(--ink)" }}>
      {/* Hero */}
      <div style={{ position: "relative", background: "var(--cream2)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ position: "relative", aspectRatio: "21 / 9", maxHeight: 480, overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.heroImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: `linear-gradient(90deg, ${spc} 50%, ${ssc} 50%)` }} />
        </div>
      </div>

      {/* Title block */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "2.5rem 1.25rem 1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem", flexWrap: "wrap" }}>
          <a href="/blog" style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)", textDecoration: "none", letterSpacing: "0.04em" }}>← All Guides</a>
          <span style={{ color: "var(--muted)" }}>·</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{post.date}</span>
        </div>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(1.8rem, 4vw, 2.75rem)", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 1rem" }}>{post.title}</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(10,10,15,0.68)", margin: 0 }}>{post.excerpt}</p>

        {school && (
          <a href={`/schools/${school.slug}`} style={{
            display: "flex", alignItems: "center", gap: "0.875rem",
            marginTop: "2rem", padding: "1rem 1.25rem",
            borderRadius: 16, background: "#fff",
            border: "1px solid rgba(0,0,0,0.08)",
            textDecoration: "none", color: "var(--ink)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(180deg, ${spc} 50%, ${ssc} 50%)` }} />
            <div style={{ flexShrink: 0, marginLeft: "0.5rem" }}>
              <SchoolLogo espnId={getSchoolEspnId(school)} domain={getSchoolDomain(school)} fallbackSvg={schoolLogoBadge(school, 44)} alt={school.shortName} size={44} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>Shop the essentials</p>
              <p style={{ fontWeight: 900, fontSize: 15, margin: "0.125rem 0 0" }}>{school.shortName} Dorm Kit →</p>
            </div>
          </a>
        )}
      </div>

      {/* Body */}
      <div
        className="blog-body"
        style={{ maxWidth: 720, margin: "0 auto", padding: "1.5rem 1.25rem 4rem", fontSize: 16.5, lineHeight: 1.75, color: "rgba(10,10,15,0.82)" }}
        dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
      />

      {/* CTA */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 1.25rem 3rem" }}>
        <div style={{ padding: "2.25rem 1.5rem", background: "var(--ink)", borderRadius: 20, textAlign: "center", color: "var(--cream)" }}>
          <p style={{ fontWeight: 900, fontSize: 22, margin: "0 0 0.5rem", color: "var(--cream)" }}>Ready to throw yours?</p>
          <p style={{ color: "rgba(254,252,248,0.55)", fontSize: 14, margin: "0 0 1.5rem" }}>Shop the full dorm kit in your school&apos;s colors.</p>
          <a href={school ? `/schools/${school.slug}` : "/schools"} className="btn btn-pink" style={{ textDecoration: "none" }}>
            {school ? `Shop ${school.shortName} →` : "Find My School →"}
          </a>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "1rem 1.25rem 5rem" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#ff3d6e", letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 1rem" }}>More Guides</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
            {related.map(r => (
              <a key={r.slug} href={`/blog/${r.slug}`} className="card" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, overflow: "hidden", textDecoration: "none", color: "var(--ink)", display: "flex", flexDirection: "column" }}>
                <div style={{ aspectRatio: "16 / 10", overflow: "hidden", background: "var(--cream2)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.heroImage} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "0.875rem 1rem 1rem" }}>
                  <p style={{ fontWeight: 900, fontSize: 14, lineHeight: 1.3, margin: 0 }}>{r.title}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
