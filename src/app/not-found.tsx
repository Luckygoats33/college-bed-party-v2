export default function NotFound() {
  return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 1.25rem", color: "var(--ink)" }}>
      <p style={{ fontSize: 64, marginBottom: "1rem" }}>🛏️</p>
      <h1 style={{ fontWeight: 900, fontSize: 32, marginBottom: "0.5rem" }}>Page Not Found</h1>
      <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: "2rem" }}>This dorm room doesn&apos;t exist (yet).</p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <a href="/" className="btn btn-dark" style={{ textDecoration: "none" }}>← Home</a>
        <a href="/schools" className="btn btn-pink" style={{ textDecoration: "none" }}>Find My School →</a>
      </div>
    </div>
  );
}
