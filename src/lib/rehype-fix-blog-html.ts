import type { Element, Parents, Root, RootContent } from "hast";

/** Self-closing custom tags parsed by rehype-raw swallow the rest of the document as children. */
const VOID_LIKE_TAGS = new Set(["gif", "image"]);

/** Block-level tags that must not live inside `<p>`. */
export const BLOG_BLOCK_TAGS = new Set([
    "div",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "pre",
    "blockquote",
    "table",
    "thead",
    "tbody",
    "tr",
    "td",
    "th",
    "figure",
    "figcaption",
    "hr",
    "details",
    "summary",
    "gif",
    "image",
    "threeplacesshowcase",
    "paintmixingshowcase",
    "prekeysshowcase",
    "doubleratchetshowcase",
    "securitybannershowcase",
    "encryptionendsshowcase",
]);

function isWhitespaceText(node: RootContent): boolean {
    return node.type === "text" && !node.value.trim();
}

function elementHasBlockChild(el: Element): boolean {
    for (const child of el.children ?? []) {
        if (child.type === "text") continue;
        if (child.type !== "element") continue;
        const childEl = child as Element;
        if (BLOG_BLOCK_TAGS.has(childEl.tagName)) return true;
        if (elementHasBlockChild(childEl)) return true;
    }
    return false;
}

function hoistVoidElementsOnce(tree: Root): boolean {
    const parents: Parents[] = [tree];

    while (parents.length > 0) {
        const parent = parents.pop()!;

        for (let i = 0; i < parent.children.length; i++) {
            const node = parent.children[i];
            if (node.type !== "element") continue;

            const el = node as Element;
            parents.push(el);

            if (!VOID_LIKE_TAGS.has(el.tagName) || !el.children?.length) continue;

            const hoisted = el.children;
            el.children = [];
            parent.children.splice(i + 1, 0, ...hoisted);
            return true;
        }
    }

    return false;
}

function fixInvalidParagraphs(node: Parents): void {
    const { children } = node;

    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.type !== "element") continue;

        const el = child as Element;
        fixInvalidParagraphs(el);

        if (el.tagName !== "p" || !elementHasBlockChild(el)) continue;

        const meaningful = el.children.filter((c) => !isWhitespaceText(c));
        const onlyBlocks =
            meaningful.length > 0 &&
            meaningful.every(
                (c) => c.type === "element" && BLOG_BLOCK_TAGS.has((c as Element).tagName),
            );

        if (onlyBlocks) {
            children.splice(i, 1, ...meaningful);
            i += meaningful.length - 1;
            continue;
        }

        el.tagName = "div";
        el.properties = { ...el.properties, dataBlogParagraph: "true" };
    }
}

/**
 * Fixes invalid HTML produced when markdown embeds custom block components:
 * - Hoists content swallowed by non-void `<gif />` / `<image />` tags
 * - Unwraps or retags `<p>` elements that illegally contain block-level children
 */
export function rehypeFixBlogHtml() {
    return (tree: Root) => {
        while (hoistVoidElementsOnce(tree)) {
            /* repeat until no mis-nested void-like tags remain */
        }
        fixInvalidParagraphs(tree);
    };
}

/** @deprecated Use rehypeFixBlogHtml */
export const rehypeHoistVoidCustomElements = rehypeFixBlogHtml;
