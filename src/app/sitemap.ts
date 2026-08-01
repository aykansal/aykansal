import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/links";
import { blogConfig } from "@/lib/blog-config";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${SITE_URL}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ];

    const blogPages: MetadataRoute.Sitemap = blogConfig
        .filter((post) => post.show)
        .map((post) => ({
            url: `${SITE_URL}/blogs/${post.slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }));

    return [...staticPages, ...blogPages];
}
