export const AMAZON_TAG = "bedpartyprodu-20";

export function amazonLink(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
}

export function amazonSearch(query: string): string {
  const q = encodeURIComponent(query);
  return `https://www.amazon.com/s?k=${q}&tag=${AMAZON_TAG}`;
}

export function amazonImage(asin: string, size: "SL500" | "SL1000" = "SL500"): string {
  return `https://m.media-amazon.com/images/P/${asin}.01._${size}_.jpg`;
}
