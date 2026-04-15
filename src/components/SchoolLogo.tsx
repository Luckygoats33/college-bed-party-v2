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
 *   2. Clearbit logo  (pulls from school's own website domain)
 *   3. SVG badge      (initials on school color — always works)
 */
export function SchoolLogo({ espnId, domain, fallbackSvg, alt, size, style }: Props) {
  const sources = [
    espnId ? `https://a.espncdn.com/i/teamlogos/ncaa/500/${espnId}.png` : null,
    domain  ? `https://logo.clearbit.com/${domain}` : null,
    fallbackSvg,
  ].filter(Boolean) as string[];

  const [idx, setIdx] = useState(0);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[Math.min(idx, sources.length - 1)]}
      alt={alt}
      width={size}
      height={size}
      onError={() => setIdx(i => i + 1)}
      style={{ width: size, height: size, objectFit: "contain", ...style }}
    />
  );
}
