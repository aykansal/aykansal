import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/links";
import { fetchBlogSlugs } from "@/lib/basehub-queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const slugs = await fetchBlogSlugs();

    const blogEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
        url: `${SITE_URL}/blogs/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [
        { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${SITE_URL}/blogs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        ...blogEntries,
    ];
}
