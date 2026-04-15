"use client";
import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  padding?: string;
  /** Secondary fallback — category photo URL shown if Amazon CDN fails. */
  categoryPhoto?: string;
  /** Final fallback — school logo SVG data URI, always renders. */
  fallbackSrc?: string;
}

/**
 * Shows an Amazon product image.
 * Cascade: Amazon CDN → categoryPhoto (Unsplash) → fallbackSrc (school logo SVG)
 */
export function ProductImage({ src, alt, padding = "1.25rem", categoryPhoto, fallbackSrc }: Props) {
  // idx 0 = src (Amazon), 1 = categoryPhoto, 2 = fallbackSrc
  const [idx, setIdx] = useState(0);

  const srcs = [src, categoryPhoto, fallbackSrc].filter(Boolean) as string[];
  const current = srcs[Math.min(idx, srcs.length - 1)];
  const isLast = idx >= srcs.length - 1;
  const isSvgBadge = current?.startsWith("data:");

  if (isSvgBadge) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f4ef", padding: "1.5rem" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current} alt={alt} style={{ width: 80, height: 80, objectFit: "contain" }} />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={current}
      alt={alt}
      onError={() => { if (!isLast) setIdx(i => i + 1); }}
      style={{ width: "100%", height: "100%", objectFit: "cover", padding: isSvgBadge ? 0 : padding }}
    />
  );
}
