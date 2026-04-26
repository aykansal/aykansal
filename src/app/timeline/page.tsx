import { formatCompactDate, normalizeTimelineEvents, timelineEvents, type TimelineEvent } from "@/content/timeline";
import { cn } from "@/lib/utils";

const TYPE_LABELS: Record<TimelineEvent["type"], string> = {
    hackathon: "HACKATHON",
    project: "PROJECT",
    award: "AWARD",
};

const TYPE_STYLES: Record<TimelineEvent["type"], string> = {
    hackathon: "bg-accent-primary/10 text-accent-primary",
    project: "bg-accent-tertiary/10 text-accent-tertiary",
    award: "bg-status-warning/10 text-status-warning",
};

function TimelineCompactCard({ event }: { event: TimelineEvent }) {
    return (
        <article className="group border border-border-default bg-bg-secondary p-4 transition-colors duration-200 hover:border-border-strong">
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className={cn("px-1.5 py-0.5 font-jetbrains text-[10px] uppercase tracking-wider", TYPE_STYLES[event.type])}>
                        {TYPE_LABELS[event.type]}
                    </span>
                    {event.status === "ONGOING" && (
                        <span className="bg-accent-primary/10 px-1.5 py-0.5 font-jetbrains text-[10px] uppercase tracking-wider text-accent-primary">
                            ONGOING
                        </span>
                    )}
                </div>
                {event.featured && (
                    <span className="shrink-0 border border-accent-primary/30 px-1.5 py-0.5 font-jetbrains text-[9px] uppercase tracking-[0.12em] text-accent-primary">
                        FEATURED
                    </span>
                )}
            </div>

            {formatCompactDate(event) && (
                <p className="mt-3 font-jetbrains text-[11px] uppercase tracking-wider text-text-muted">
                    {formatCompactDate(event)}
                </p>
            )}

            <h3 className="mt-2 font-jetbrains text-[16px] font-semibold leading-tight text-text-primary transition-colors duration-200 group-hover:text-accent-primary">
                {event.title}
            </h3>
            <p className="mt-2 line-clamp-1 font-space text-[14px] leading-normal text-text-secondary">
                {event.summary}
            </p>
        </article>
    );
}

export default function TimelinePage() {
    const groups = normalizeTimelineEvents(timelineEvents);

    return (
        <main className="mx-auto min-h-[calc(100vh-56px)] w-full max-w-6xl px-6 py-16">
            <header className="max-w-2xl">
                <h1 className="font-micro text-[40px] leading-none text-text-primary">TIMELINE</h1>
                <p className="mt-4 font-space text-[15px] leading-relaxed text-text-secondary">
                    The story of the builder, one event at a time. Latest first, grouped yearwise.
                </p>
            </header>

            <section className="mt-10 flex flex-col gap-6" aria-label="Builder timeline by year">
                {groups.map((group) => (
                    <article key={group.year} className="border border-border-subtle bg-bg-primary/60 p-4">
                        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                            <h2 className="font-jetbrains text-[22px] font-semibold tracking-wide text-text-primary">
                                {group.year}
                            </h2>
                            <span className="font-jetbrains text-[10px] uppercase tracking-wider text-text-muted">
                                {group.events.length} events
                            </span>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-3 min-[900px]:grid-cols-2">
                            {group.events.map((event) => (
                                <TimelineCompactCard key={event.id} event={event} />
                            ))}
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}