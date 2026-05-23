import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { BLOG_BLOCK_TAGS, rehypeFixBlogHtml } from "@/lib/rehype-fix-blog-html";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CustomGif } from "@/components/blog/custom-gif";
import { CustomImage } from "@/components/blog/custom-image";
import { ThreePlacesShowcase } from "@/components/blog/interactive/three-places-showcase";
import { PaintMixingShowcase } from "@/components/blog/interactive/paint-mixing-showcase";
import { PrekeysShowcase } from "@/components/blog/interactive/prekeys-showcase";
import { DoubleRatchetShowcase } from "@/components/blog/interactive/double-ratchet-showcase";
import { SecurityBannerShowcase } from "@/components/blog/interactive/security-banner-showcase";
import { EncryptionEndsShowcase } from "@/components/blog/interactive/encryption-ends-showcase";
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

const markdownComponents = {
    // Standard elements styled to match design system via tailwind
    h1: ({ children }: any) => (
        <h1 className="font-space text-2xl font-bold tracking-tight text-text-primary mt-8 mb-4">
            {children}
        </h1>
    ),
    h2: ({ children }: any) => (
        <h2 className="font-space text-xl font-semibold tracking-tight text-text-primary mt-8 mb-4 border-b border-border-default pb-2">
            {children}
        </h2>
    ),
    p: ({ children, node }: any) => {
        const className = "font-space text-[15px] leading-relaxed text-text-secondary my-4";
        const hasBlockChild = node?.children?.some(
            (child: { type?: string; tagName?: string }) =>
                child.type === "element" && BLOG_BLOCK_TAGS.has(child.tagName ?? ""),
        );
        if (hasBlockChild) {
            return <div className={className}>{children}</div>;
        }
        return <p className={className}>{children}</p>;
    },
    div: ({ children, node, ...props }: any) => {
        if (node?.properties?.dataBlogParagraph) {
            return (
                <div
                    className="font-space text-[15px] leading-relaxed text-text-secondary my-4"
                    {...props}
                >
                    {children}
                </div>
            );
        }
        return <div {...props}>{children}</div>;
    },
    a: ({ href, children }: any) => (
        <a
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-accent-primary hover:underline transition-colors font-medium decoration-accent-primary/30"
        >
            {children}
        </a>
    ),
    ul: ({ children }: any) => (
        <ul className="list-disc pl-5 my-4 font-space text-[15px] text-text-secondary space-y-2">
            {children}
        </ul>
    ),
    ol: ({ children }: any) => (
        <ol className="list-decimal pl-5 my-4 font-space text-[15px] text-text-secondary space-y-2">
            {children}
        </ol>
    ),
    li: ({ children }: any) => (
        <li className="font-space text-[15px] leading-relaxed">
            {children}
        </li>
    ),
    pre: ({ children }: any) => <div className="my-4">{children}</div>,
    code: ({ inline, className, children, ...props }: any) => {
        return !inline ? (
            <pre className="bg-bg-secondary border border-border-default p-4 rounded overflow-x-auto my-4 scrollbar-hide">
                <code className="font-jetbrains text-[12px] text-text-primary block leading-relaxed" {...props}>
                    {children}
                </code>
            </pre>
        ) : (
            <code className="bg-bg-tertiary/60 px-1.5 py-0.5 rounded font-jetbrains text-[12px] text-text-primary" {...props}>
                {children}
            </code>
        );
    },

    // Custom interactive/media tags mapping (parsed in lowercase by HTML parser)
    gif: (props: any) => <CustomGif {...props} />,
    image: (props: any) => <CustomImage {...props} />,
    threeplacesshowcase: () => <ThreePlacesShowcase />,
    paintmixingshowcase: () => <PaintMixingShowcase />,
    prekeysshowcase: () => <PrekeysShowcase />,
    doubleratchetshowcase: () => <DoubleRatchetShowcase />,
    securitybannershowcase: () => <SecurityBannerShowcase />,
    encryptionendsshowcase: () => <EncryptionEndsShowcase />,
};

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
                            <Link href="/" className="font-semibold text-text-secondary hover:text-accent-primary transition-colors">
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
                        rehypePlugins={[rehypeRaw, rehypeFixBlogHtml]}
                        components={markdownComponents as any}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

            </BlogPostTransition>
        </main>
    );
}
