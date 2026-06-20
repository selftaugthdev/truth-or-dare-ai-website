import type { MetadataRoute } from "next";
import { CATEGORIES, SITE_URL } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/play"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = CATEGORIES.map((category) => ({
    url: `${SITE_URL}/${category.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes];
}
