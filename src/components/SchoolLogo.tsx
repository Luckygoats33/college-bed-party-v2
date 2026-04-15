"use client";
import { useState } from "react";

interface Props {
  espnId?: number;
  fallbackSvg: string;
  alt: string;
  size: number;
  style?: React.CSSProperties;
}

/**
 * Renders the ESPN NCAA logo for schools with a known ESPN team ID.
 * Falls back to a generated SVG badge (initials on school color) for all others.
 * Handles broken ESPN images gracefully via onError.
 */
export function SchoolLogo({ espnId, fallbackSvg, alt, size, style }: Props) {
  const [failed, setFailed] = useState(false);

  const src =
    espnId && !failed
      ? `https://a.espncdn.com/i/teamlogos/ncaa/500/${espnId}.png`
      : fallbackSvg;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      style={{ width: size, height: size, objectFit: "contain", ...style }}
    />
  );
}
