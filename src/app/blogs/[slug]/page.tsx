import { fetchHashnodePost } from "@/lib/hashnode";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { MermaidRenderer } from "@/components/ui/mermaid-renderer";
import { TableOfContents } from "@/components/ui/table-of-contents";
import * as cheerio from "cheerio";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await fetchHashnodePost(resolvedParams.slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: post.title,
        description: post.brief,
        openGraph: {
            title: post.title,
            description: post.brief,
            type: "article",
            publishedTime: post.publishedAt,
            authors: ["aykansal"],
            images: post.coverImage ? [post.coverImage.url] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.brief,
            images: post.coverImage ? [post.coverImage.url] : [],
        },
    };
}

function generateSlug(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

export default async function BlogPost({ params }: Props) {
    const resolvedParams = await params;
    const post = await fetchHashnodePost(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    let parsedHtml = post.content?.html || "";
    let tocList: { id: string; level: number; title: string; slug: string }[] = [];

    if (parsedHtml) {
        const $ = cheerio.load(parsedHtml, null, false);
        const headingElements = $("h1, h2, h3, h4");

        headingElements.each((index, element) => {
            const h = $(element);
            const title = h.text();
            let id = h.attr("id");

            if (!id) {
                id = generateSlug(title);
                // Ensure unique id
                let count = 1;
                let uniqueId = id;
                while (tocList.find((t) => t.id === uniqueId)) {
                    uniqueId = `${id}-${count}`;
                    count++;
                }
                id = uniqueId;
                h.attr("id", id);
            }

            const level = parseInt(element.tagName.replace("h", ""), 10);
            
            tocList.push({
                id,
                title,
                slug: id,
                level,
            });
        });

        parsedHtml = $.html();
    }

    return (
        <main className="mx-auto max-w-5xl px-6 py-24 min-h-[calc(100vh-56px)] relative">
            <Link 
                href="/blogs" 
                className="group flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-12 font-jetbrains text-sm w-fit outline-none"
            >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                Back to blogs
            </Link>

            <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-16 items-start">
                <article className="min-w-0">
                    <header className="mb-12">
                        <h1 className="font-jetbrains text-4xl sm:text-5xl font-bold text-text-primary mb-8 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-text-muted text-sm font-space">
                            <time dateTime={post.publishedAt} className="flex items-center gap-2">
                                <span className="opacity-50">Published</span>
                                {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </time>
                        </div>
                    </header>

                    <div 
                        className="prose dark:prose-invert max-w-none prose-headings:font-jetbrains prose-p:font-space prose-a:text-accent-primary hover:prose-a:text-accent-primary-hover prose-img:rounded-xl prose-pre:bg-bg-secondary prose-pre:text-text-primary prose-pre:border prose-pre:border-border-subtle prose-hr:border-border-subtle prose-blockquote:border-l-accent-primary prose-blockquote:text-text-muted prose-blockquote:font-space prose-blockquote:not-italic prose-strong:text-text-primary prose-td:border-border-subtle prose-th:border-border-subtle prose-th:text-text-primary scroll-mt-24 text-text-secondary leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: parsedHtml }} 
                    />

                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-border-subtle">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <span 
                                        key={tag.name} 
                                        className="bg-bg-secondary text-text-primary px-3 py-1.5 rounded-full text-xs font-jetbrains"
                                    >
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </article>

                <TableOfContents items={tocList} />
            </div>

            <MermaidRenderer />
        </main>
    );
}
