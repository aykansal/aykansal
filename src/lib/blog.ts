import type { BlogPost } from "@/lib/blog-schema";

export type { BlogPost, BlogConfig } from "@/lib/blog-schema";
export {
    blogPostSchema,
    blogConfigSchema,
    blogConfigJsonSchema,
    parseBlogConfig,
} from "@/lib/blog-schema";
export { blogConfigJson, blogConfig } from "@/lib/blog-config";
/** Newest first by display date string (e.g. "April 19, 2026"). */
function compareByDate(a: BlogPost, b: BlogPost): number {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/** Lower number = higher priority; missing priority sorts after explicit values. */
function sortPriority(post: BlogPost): number {
    return post.priority ?? Number.POSITIVE_INFINITY;
}

export function compareBlogPosts(a: BlogPost, b: BlogPost): number {
    const byPriority = sortPriority(a) - sortPriority(b);
    if (byPriority !== 0) return byPriority;
    return compareByDate(a, b);
}

export function getVisibleBlogPosts(posts: BlogPost[]): BlogPost[] {
    return posts.filter((post) => post.show).sort(compareBlogPosts);
}
