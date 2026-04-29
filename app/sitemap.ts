import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

const routes = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/docs",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/user-manual",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/changelog",
    changeFrequency: "weekly",
    priority: 0.65,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
