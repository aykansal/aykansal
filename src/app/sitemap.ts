import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/links";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${SITE_URL}/blogs`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ];
}
