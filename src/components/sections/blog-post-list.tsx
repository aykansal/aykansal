"use client";

import type { HashnodePost } from "@/lib/hashnode";
import Link from "next/link";
import { useState } from "react";

type BlogPostListProps = {
    posts: HashnodePost[];
};

export function BlogPostList({ posts }: BlogPostListProps) {
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    if (posts.length === 0) {
        return (
            <div className="text-center py-20 border border-dashed border-border-strong rounded-xl ">
                <p className="font-jetbrains text-text-tertiary">
                    I&apos;m still brewing the first story. When the ink dries, it&apos;ll land right here.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">
            <div className="sr-only" role="status" aria-live="polite">
                {selectedPostId ? "Opening selected article." : ""}
            </div>
            {posts.map((post) => {
                const isSelected = selectedPostId === post.id;
                const isAnySelected = selectedPostId !== null;
                const postItemClassName = `group flex flex-col py-8 border-b border-border-subtle last:border-0 transition-colors hover:bg-bg-surface/50 -mx-6 px-6 outline-none ${
                    isAnySelected ? "cursor-wait opacity-90" : ""
                }`;
                const content = (
                    <div className="flex flex-col gap-2">
                        <time dateTime={post.publishedAt} className="text-xs text-text-muted font-space">
                            {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </time>
                        <h2 className="font-jetbrains text-2xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-text-secondary text-base leading-relaxed line-clamp-2 mt-2">
                            {post.brief}
                        </p>
                        <div className="font-jetbrains text-sm text-accent-primary flex items-center gap-2 mt-4 font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            {isSelected ? (
                                <>
                                    <span className="h-3 w-3 rounded-full border border-accent-primary/40 border-t-accent-primary animate-spin" />
                                    Opening article...
                                </>
                            ) : (
                                "Read article →"
                            )}
                        </div>
                    </div>
                );

                if (isAnySelected) {
                    return (
                        <div key={post.id} aria-busy={isSelected} aria-disabled={true} className={postItemClassName}>
                            {content}
                        </div>
                    );
                }

                return (
                    <Link
                        key={post.id}
                        href={`/blogs/${post.slug}`}
                        aria-busy={isSelected}
                        onClick={() => setSelectedPostId(post.id)}
                        className={postItemClassName}
                    >
                        {content}
                    </Link>
                );
            })}
        </div>
    );
}
