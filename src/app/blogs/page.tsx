// import { fetchHashnodePosts } from "@/lib/hashnode";
// import { BlogPostList } from "@/components/sections/blog-post-list";
import { notFound } from "next/navigation";

export default async function Blogs() {
    notFound();

    /*
    const { posts } = await fetchHashnodePosts(12);

    return (
        <main className="mx-auto max-w-3xl px-6 py-16 min-h-[calc(100vh-56px)]">
            <BlogPostList posts={posts} />
        </main>
    );
    */
}
