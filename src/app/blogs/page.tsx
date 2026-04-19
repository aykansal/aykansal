import { fetchHashnodePosts } from "@/lib/hashnode";
import { BlogPostList } from "@/components/sections/blog-post-list";

export default async function Blogs() {
    const { posts } = await fetchHashnodePosts(12);

    return (
        <main className="mx-auto max-w-3xl px-6 py-16 min-h-[calc(100vh-56px)]">
            {/* <header className="mb-10">
                <h1 className="font-jetbrains text-4xl sm:text-5xl font-bold text-text-primary mb-6">
                    Posts
                </h1>
            </header> */}

            <BlogPostList posts={posts} />
        </main>
    );
}
