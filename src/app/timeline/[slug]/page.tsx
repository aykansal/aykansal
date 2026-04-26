import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTimelineEventBySlug } from "@/content/timeline";
import { getTimelineDetailContent } from "@/lib/timeline-detail";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const event = getTimelineEventBySlug(slug);

    if (!event) {
        return { title: "Timeline Event Not Found" };
    }

    return {
        title: `${event.title} | Timeline`,
        description: event.summary,
    };
}

export default async function TimelineDetailPage({ params }: Props) {
    const { slug } = await params;
    const event = getTimelineEventBySlug(slug);
    if (!event) notFound();
    const detail = await getTimelineDetailContent(event);

    return (
        <main className="mx-auto min-h-[calc(100vh-56px)] w-full max-w-3xl px-6 py-16">
            <Link
                href="/timeline"
                className="inline-flex items-center gap-2 font-jetbrains text-[12px] uppercase tracking-wider text-text-muted transition-colors hover:text-text-primary"
            >
                <span>←</span>
                Back to timeline
            </Link>

            <header className="mt-8 border-b border-border-subtle pb-6">
                <div className="flex items-center gap-2">
                    <span className="bg-bg-secondary px-2 py-1 font-jetbrains text-[10px] uppercase tracking-wider text-text-secondary">
                        {event.type}
                    </span>
                    {event.status === "ONGOING" && (
                        <span className="bg-accent-primary/10 px-2 py-1 font-jetbrains text-[10px] uppercase tracking-wider text-accent-primary">
                            Ongoing
                        </span>
                    )}
                </div>
                <h1 className="mt-4 font-jetbrains text-4xl font-bold leading-tight text-text-primary">
                    {detail.title}
                </h1>
                <p className="mt-4 font-space text-[16px] leading-relaxed text-text-secondary">
                    {detail.brief}
                </p>
            </header>

            <article className="prose mt-8 max-w-none prose-headings:font-jetbrains prose-p:font-space prose-a:text-accent-primary prose-strong:text-text-primary dark:prose-invert text-text-secondary">
                {detail.html ? (
                    <div dangerouslySetInnerHTML={{ __html: detail.html }} />
                ) : (
                    <p>{detail.brief}</p>
                )}
            </article>
        </main>
    );
}
