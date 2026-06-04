import Link from "next/link";
import { BlogListTransition, BlogListItem } from "@/components/blog/blog-list-transition";
import { fetchBlogList } from "@/lib/basehub-queries";

export const metadata = {
    title: "Blogs - Ayush Kansal",
    description: "Technical writing about software, cryptography, privacy, and building tools by Ayush Kansal.",
};

/** Format an ISO date string (e.g. "2026-05-22") into a readable form. */
function formatDate(iso: string | null): string {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export default async function Blogs() {
    const posts = await fetchBlogList();

    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col px-6 pt-12 pb-0">
            {/* Header section */}
            <header className="mb-10">
                <h1 className="font-micro text-[40px] uppercase leading-none text-text-primary">
                    Blogs
                </h1>
                <p className="font-jetbrains text-[12px] text-text-muted mt-1 uppercase tracking-wider">
                    by{" "}
                    <Link
                        href="/"
                        className="font-medium text-text-secondary hover:text-accent-primary transition-colors underline decoration-border-strong hover:decoration-accent-primary"
                    >
                        Ayush Kansal
                    </Link>
                </p>
            </header>

            {/* Vertical list of blog cards with stagger transition */}
            <BlogListTransition>
                {posts.map((post) => (
                    <BlogListItem key={post._slug}>
                        <Link
                            href={`/blogs/${post._slug}`}
                            className="group relative flex w-full flex-col rounded bg-bg-secondary p-5 transition-transform duration-300 ease-out hover:-translate-y-0.5"
                        >
                            {/* Dot-grid overlay for background micro-texture on hover */}
                            <div className="dot-grid-overlay pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 rounded" aria-hidden="true" />

                            <div className="relative z-10 flex flex-col gap-2">
                                {/* Title row */}
                                <div className="flex items-start justify-between gap-4">
                                    <h2 className="font-space text-lg font-semibold leading-snug text-text-primary group-hover:text-accent-primary transition-colors duration-200">
                                        {post._title}
                                    </h2>
                                    
                                    {post.featured && (
                                        <span className="shrink-0 px-1.5 py-0.5 font-jetbrains text-[9px] font-bold tracking-wider text-accent-primary bg-accent-primary/10 border border-accent-primary/20 uppercase rounded-sm">
                                            FEATURED
                                        </span>
                                    )}
                                </div>

                                {/* Metadata */}
                                <time className="font-jetbrains text-[10px] text-text-muted uppercase tracking-wider">
                                    {formatDate(post.date)}
                                </time>

                                {/* Subtitle/Preview */}
                                <p className="font-space text-[14px] leading-relaxed text-text-secondary">
                                    {post.subtitle}
                                </p>

                                {/* Chips/Tags */}
                                <div className="flex flex-wrap gap-1.5 mt-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-bg-tertiary px-1.5 py-0.5 font-jetbrains text-[10px] uppercase tracking-wider text-text-tertiary rounded-sm border border-border-default/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    </BlogListItem>
                ))}
            </BlogListTransition>
        </main>
    );
}
