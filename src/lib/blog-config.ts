import { blogConfigJson } from "@/content/blog-config.data";
import { parseBlogConfig } from "@/lib/blog-schema";

export { blogConfigJson } from "@/content/blog-config.data";
export type { BlogConfig, BlogPost } from "@/lib/blog-schema";

/** Runtime-validated blog entries (from typed `blogConfigJson`). */
export const blogConfig = parseBlogConfig(blogConfigJson);
