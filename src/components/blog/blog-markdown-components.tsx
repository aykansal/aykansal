// Markdown element overrides use loose props from react-markdown.
// @ts-nocheck
import type { ReactNode } from "react";
import { BLOG_BLOCK_TAGS } from "@/lib/rehype-fix-blog-html";
import { CustomGif } from "@/components/blog/custom-gif";
import { CustomImage } from "@/components/blog/custom-image";
import { MermaidDiagram } from "@/components/blog/mermaid-diagram";
import { ThreePlacesShowcase } from "@/components/blog/interactive/three-places-showcase";
import { PaintMixingShowcase } from "@/components/blog/interactive/paint-mixing-showcase";
import { PrekeysShowcase } from "@/components/blog/interactive/prekeys-showcase";
import { DoubleRatchetShowcase } from "@/components/blog/interactive/double-ratchet-showcase";
import { SecurityBannerShowcase } from "@/components/blog/interactive/security-banner-showcase";
import { EncryptionEndsShowcase } from "@/components/blog/interactive/encryption-ends-showcase";

function codeText(children: ReactNode): string {
    if (typeof children === "string") return children.replace(/\n$/, "");
    if (Array.isArray(children)) return children.join("").replace(/\n$/, "");
    return String(children ?? "").replace(/\n$/, "");
}

export const blogMarkdownComponents = {
    h1: ({ children }) => (
        <h1 className="font-space text-2xl font-bold tracking-tight text-text-primary mt-8 mb-4">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="font-space text-xl font-semibold tracking-tight text-text-primary mt-8 mb-4 border-b border-border-default pb-2">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="font-space text-lg font-semibold tracking-tight text-text-primary mt-6 mb-3">
            {children}
        </h3>
    ),
    p: ({ children, node }) => {
        const className = "font-space text-[15px] leading-relaxed text-text-secondary my-4";
        const hasBlockChild = node?.children?.some(
            (child) =>
                child.type === "element" &&
                BLOG_BLOCK_TAGS.has((child as { tagName?: string }).tagName ?? ""),
        );
        if (hasBlockChild) {
            return <div className={className}>{children}</div>;
        }
        return <p className={className}>{children}</p>;
    },
    div: ({ children, node, ...props }) => {
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
    a: ({ href, children }) => (
        <a
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-accent-primary hover:underline transition-colors font-medium decoration-accent-primary/30"
        >
            {children}
        </a>
    ),
    ul: ({ children }) => (
        <ul className="list-disc pl-5 my-4 font-space text-[15px] text-text-secondary space-y-2">
            {children}
        </ul>
    ),
    ol: ({ children }) => (
        <ol className="list-decimal pl-5 my-4 font-space text-[15px] text-text-secondary space-y-2">
            {children}
        </ol>
    ),
    li: ({ children }) => (
        <li className="font-space text-[15px] leading-relaxed">{children}</li>
    ),
    table: ({ children }) => (
        <div className="my-6 overflow-x-auto rounded border border-border-default">
            <table className="w-full min-w-[480px] border-collapse font-space text-[14px] text-text-secondary">
                {children}
            </table>
        </div>
    ),
    thead: ({ children }) => <thead className="bg-bg-secondary">{children}</thead>,
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => <tr className="border-b border-border-default/60 last:border-0">{children}</tr>,
    th: ({ children }) => (
        <th className="border-b border-border-default px-3 py-2 text-left font-jetbrains text-[11px] font-medium uppercase tracking-wider text-text-primary">
            {children}
        </th>
    ),
    td: ({ children }) => (
        <td className="px-3 py-2 align-top text-text-secondary">{children}</td>
    ),
    hr: () => <hr className="my-8 border-border-default/60" />,
    blockquote: ({ children }) => (
        <blockquote className="my-4 border-l-2 border-accent-primary/40 pl-4 font-space text-[15px] text-text-muted">
            {children}
        </blockquote>
    ),
    pre: ({ children }) => <div className="my-4">{children}</div>,
    code: ({ className, children, ...props }) => {
        const isFenced = typeof className === "string" && className.startsWith("language-");

        if (isFenced && className.includes("language-mermaid")) {
            return <MermaidDiagram chart={codeText(children)} />;
        }

        if (isFenced) {
            return (
                <pre className="bg-bg-secondary border border-border-default p-4 rounded overflow-x-auto my-4 scrollbar-hide">
                    <code
                        className="font-jetbrains text-[12px] text-text-primary block leading-relaxed"
                        {...props}
                    >
                        {children}
                    </code>
                </pre>
            );
        }

        return (
            <code
                className="bg-bg-tertiary/60 px-1.5 py-0.5 rounded font-jetbrains text-[12px] text-text-primary"
                {...props}
            >
                {children}
            </code>
        );
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gif: (props: any) => <CustomGif {...props} />,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: (props: any) => <CustomImage {...props} />,
    threeplacesshowcase: () => <ThreePlacesShowcase />,
    paintmixingshowcase: () => <PaintMixingShowcase />,
    prekeysshowcase: () => <PrekeysShowcase />,
    doubleratchetshowcase: () => <DoubleRatchetShowcase />,
    securitybannershowcase: () => <SecurityBannerShowcase />,
    encryptionendsshowcase: () => <EncryptionEndsShowcase />,
};
