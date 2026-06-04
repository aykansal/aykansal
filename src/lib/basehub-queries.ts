import { basehub } from "basehub";

/**
 * Shared BaseHub query fragments & fetch helpers for blog posts.
 * All blog data now lives in BaseHub; local markdown files are kept
 * only as an archival reference.
 */

// ---------- Types ----------

export interface BasehubBlogPost {
    _title: string;
    _slug: string;
    subtitle: string | null;
    date: string | null;
    tags: string[];
    show: boolean;
    featured: boolean;
    priority: number | null;
    body: {
        readingTime: number;
        json: {
            content: unknown[];
            toc: unknown[];
        };
    } | null;
}

export interface BasehubBlogListItem {
    _title: string;
    _slug: string;
    subtitle: string | null;
    date: string | null;
    tags: string[];
    show: boolean;
    featured: boolean;
    priority: number | null;
}

// ---------- Helpers ----------

/** Lower number = higher priority; missing priority sorts after explicit values. */
function sortPriority(post: { priority: number | null }): number {
    return post.priority ?? Number.POSITIVE_INFINITY;
}

/** Newest first by ISO date string. */
function compareByDate(a: { date: string | null }, b: { date: string | null }): number {
    return new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();
}

export function compareBlogPosts<T extends { priority: number | null; date: string | null }>(a: T, b: T): number {
    const byPriority = sortPriority(a) - sortPriority(b);
    if (byPriority !== 0) return byPriority;
    return compareByDate(a, b);
}

// ---------- Queries ----------

/** Fetch the list of visible blog posts (lightweight, no body). */
export async function fetchBlogList(): Promise<BasehubBlogListItem[]> {
    const data = await basehub().query({
        blogs: {
            items: {
                _title: true,
                _slug: true,
                subtitle: true,
                date: true,
                tags: true,
                show: true,
                featured: true,
                priority: true,
            },
        },
    });

    return data.blogs.items
        .filter((post) => post.show)
        .sort(compareBlogPosts);
}

/** Fetch a single blog post by slug, including the rich-text body. */
export async function fetchBlogPost(slug: string): Promise<BasehubBlogPost | null> {
    const data = await basehub().query({
        blogs: {
            __args: {
                filter: { _slug: { eq: slug }, show: true },
                first: 1,
            },
            item: {
                _title: true,
                _slug: true,
                subtitle: true,
                date: true,
                tags: true,
                show: true,
                featured: true,
                priority: true,
                body: {
                    readingTime: true,
                    json: {
                        content: true,
                        toc: true,
                    },
                },
            },
        },
    });

    return (data.blogs.item as BasehubBlogPost) ?? null;
}

/** Fetch all slugs for static generation. */
export async function fetchBlogSlugs(): Promise<string[]> {
    const data = await basehub().query({
        blogs: {
            __args: {
                filter: { show: true },
            },
            items: {
                _slug: true,
            },
        },
    });

    return data.blogs.items.map((item) => item._slug);
}
