import rawBlogConfig from "@/content/blog-config.json";
import type { BlogConfig } from "@/lib/blog-schema";

/**
 * Compile-time typed view of `blog-config.json`.
 * Edit the JSON file; TypeScript errors here if the shape drifts from {@link BlogConfig}.
 */
export const blogConfigJson = rawBlogConfig satisfies BlogConfig;
