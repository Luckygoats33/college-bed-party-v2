import images from "@/data/amazon-images.json";

export const AMAZON_TAG = "bedpartyprodu-20";

type ImageRecord = { asin: string; image: string | null; title: string | null };
const IMG_MAP = images as Record<string, ImageRecord>;

export function amazonLink(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
}

export function amazonSearch(query: string): string {
  const q = encodeURIComponent(query);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG}`;
}

/** Static-CDN fallback pattern — only works for some ASINs. */
export function amazonImage(asin: string, size: "SL500" | "SL1000" = "SL500"): string {
  return `https://m.media-amazon.com/images/P/${asin}.01._${size}_.jpg`;
}

/** Scraped hero image for a product id, or null if we didn't get one. */
export function productImage(productId: string): string | null {
  return IMG_MAP[productId]?.image ?? null;
}

/** Current (refreshed) ASIN for a product id — falls back to the hardcoded one. */
export function productAsin(productId: string, fallbackAsin: string): string {
  return IMG_MAP[productId]?.asin ?? fallbackAsin;
}
