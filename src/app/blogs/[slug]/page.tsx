import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { rehypeFixBlogHtml } from "@/lib/rehype-fix-blog-html";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { blogMarkdownComponents } from "@/components/blog/blog-markdown-components";
import { blogConfig } from "@/lib/blog-config";
import { BlogPostTransition } from "@/components/blog/blog-post-transition";

// Generate static params for Next.js build-time SSG
export async function generateStaticParams() {
    return blogConfig
        .filter((post) => post.show)
        .map((post) => ({
            slug: post.slug,
        }));
}

// Dynamic SEO metadata generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogConfig.find((p) => p.slug === slug && p.show);
    if (!post) return {};

    return {
        title: `${post.title} - Ayush Kansal`,
        description: post.subtitle,
        openGraph: {
            title: `${post.title} - Ayush Kansal`,
            description: post.subtitle,
            type: "article",
            tags: post.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: `${post.title} - Ayush Kansal`,
            description: post.subtitle,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogConfig.find((p) => p.slug === slug && p.show);
    if (!post) {
        notFound();
    }

    const filePath = path.join(process.cwd(), "src/content/blog-posts", post.markdownFile);
    let content = "";

    try {
        content = await fs.readFile(filePath, "utf-8");
    } catch (e) {
        console.error(`Failed to read markdown file: ${post.markdownFile}`, e);
        notFound();
    }

    // Reading time calculation (based on ~200 WPM)
    const words = content.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(words / 200));

    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col px-6 pt-12 pb-0">
            <BlogPostTransition>
                {/* Breadcrumb back navigation */}
                <Breadcrumb className="mb-6">
                    <BreadcrumbList className="font-jetbrains text-[11px] uppercase tracking-wide">
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/blogs">Blogs</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-text-primary truncate max-w-[200px] sm:max-w-none">
                                {post.title}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Header */}
                <header className="space-y-4 mb-6">
                    <h1 className="font-space text-[26px] sm:text-[32px] leading-tight font-bold tracking-tight text-text-primary">
                        {post.title}
                    </h1>

                    <div className="h-px bg-border-default/60" aria-hidden="true" />

                    <div className="flex flex-wrap items-center justify-between gap-2 text-[12px] font-jetbrains text-text-muted uppercase tracking-wider">
                        <p className="flex items-center gap-1.5">
                            <Link
                                href="/"
                                className="font-semibold text-text-secondary hover:text-accent-primary transition-colors"
                            >
                                Ayush Kansal
                            </Link>
                            <span className="text-text-muted/40 select-none">/</span>
                            <span>{post.date}</span>
                        </p>
                        <span className="font-normal text-text-muted/50 font-mono">
                            {readingTime} min read
                        </span>
                    </div>
                </header>

                {/* Markdown Body */}
                <div className="prose dark:prose-invert max-w-none prose-headings:font-space prose-headings:text-text-primary prose-p:text-text-secondary prose-p:leading-relaxed prose-a:text-accent-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-text-primary prose-code:font-jetbrains prose-code:text-text-primary prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-border-default prose-pre:rounded prose-img:rounded-xl">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeFixBlogHtml]}
                        components={blogMarkdownComponents as never}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </BlogPostTransition>
        </main>
    );
}
