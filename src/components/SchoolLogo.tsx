"use client";
import { useState } from "react";

interface Props {
  espnId?: number;
  domain?: string;       // school website domain → Clearbit logo
  fallbackSvg: string;   // always-works SVG badge
  alt: string;
  size: number;
  style?: React.CSSProperties;
}

/**
 * Cascades through logo sources until one loads:
 *   1. ESPN NCAA CDN  (22 major schools with known IDs)
 *   2. SVG badge      (initials on school color — always works)
 * Clearbit was removed (API discontinued Dec 2024).
 */
export function SchoolLogo({ espnId, domain: _domain, fallbackSvg, alt, size, style }: Props) {
  const sources = [
    espnId ? `https://a.espncdn.com/i/teamlogos/ncaa/500/${espnId}.png` : null,
    fallbackSvg,
  ].filter(Boolean) as string[];

  const [idx, setIdx] = useState(0);

  const isLast = idx >= sources.length - 1;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[Math.min(idx, sources.length - 1)]}
      alt={alt}
      width={size}
      height={size}
      onError={() => { if (!isLast) setIdx(i => i + 1); }}
      onLoad={(e) => {
        if (isLast) return;
        const img = e.currentTarget;
        // Clearbit/ESPN sometimes return 200 with a tiny/empty image — treat as failure
        if (img.naturalWidth < 8 || img.naturalHeight < 8) setIdx(i => i + 1);
      }}
      style={{ width: size, height: size, objectFit: "contain", ...style }}
    />
  );
}
