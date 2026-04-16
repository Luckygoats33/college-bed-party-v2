"use client";
import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, school }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("ok");
      setEmail("");
      setSchool("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div style={{ textAlign: "center", padding: "1rem 0" }}>
        <p style={{ fontSize: 28, margin: "0 0 0.5rem" }}>🎉</p>
        <p style={{ fontWeight: 900, fontSize: 18, margin: "0 0 0.25rem", color: "var(--cream)" }}>You're in.</p>
        <p style={{ fontSize: 13, color: "rgba(254,252,248,0.6)", margin: 0 }}>Watch your inbox for new drops tailored to your school.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", maxWidth: 560, margin: "0 auto" }}>
      <input
        type="text"
        value={school}
        onChange={e => setSchool(e.target.value)}
        placeholder="Your school (optional)"
        style={{ flex: "1 1 180px", minWidth: 0, height: 48, padding: "0 1rem", borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "var(--cream)", fontSize: 14, outline: "none" }}
      />
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="you@school.edu"
        style={{ flex: "2 1 220px", minWidth: 0, height: 48, padding: "0 1rem", borderRadius: 12, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "var(--cream)", fontSize: 14, outline: "none" }}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-pink"
        style={{ height: 48, padding: "0 1.5rem", minHeight: "auto", flex: "0 0 auto", opacity: status === "submitting" ? 0.6 : 1 }}
      >
        {status === "submitting" ? "Signing up..." : "Sign Up →"}
      </button>
      {status === "error" && (
        <p style={{ flexBasis: "100%", fontSize: 12, color: "#ffb3c8", margin: "0.25rem 0 0", textAlign: "center" }}>
          Something went wrong. Try again in a sec.
        </p>
      )}
    </form>
  );
}
