"use client";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  padding?: string;
  /** Fallback image src (e.g. school logo SVG data URI) shown when the primary image fails. */
  fallbackSrc?: string;
}

/** Shows Amazon product image. Falls back to fallbackSrc (school logo) on error. */
export function ProductImage({ src, alt, padding = "1.25rem", fallbackSrc }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (fallbackSrc) {
      return (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f4ef", padding: "1.5rem" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fallbackSrc} alt={alt} style={{ width: 80, height: 80, objectFit: "contain" }} />
        </div>
      );
    }
    // Generic placeholder if no fallback provided
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "#f0ebe0", color: "#9ca3af" }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>No Image</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      style={{ width: "100%", height: "100%", objectFit: "contain", padding }}
    />
  );
}
