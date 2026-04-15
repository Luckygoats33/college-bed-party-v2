import type { MetadataRoute } from "next";
import { schools } from "@/lib/schools";

const BASE = "https://collegebedpartyessentials.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/schools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/guides`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const schoolRoutes: MetadataRoute.Sitemap = schools.map(s => ({
    url: `${BASE}/schools/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: s.enrollment > 20000 ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...schoolRoutes];
}
