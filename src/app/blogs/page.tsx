import { fetchHashnodePosts } from "@/lib/hashnode";
import Link from "next/link";

export default async function Blogs() {
    const { posts } = await fetchHashnodePosts(12);

    return (
        <main className="mx-auto max-w-3xl px-6 py-16 min-h-[calc(100vh-56px)]">
            {/* <header className="mb-10">
                <h1 className="font-jetbrains text-4xl sm:text-5xl font-bold text-text-primary mb-6">
                    Posts
                </h1>
            </header> */}

            {posts.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-border-strong rounded-xl ">
                    <p className="font-jetbrains text-text-tertiary">I'm still brewing the first story. When the ink dries, it'll land right here.</p>
                </div>
            ) : (
                <div className="flex flex-col">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blogs/${post.slug}`}
                            className="group flex flex-col py-8 border-b border-border-subtle last:border-0 transition-colors hover:bg-bg-surface/50 -mx-6 px-6 outline-none"
                        >
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
                                    Read article →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </main>
    );
}
