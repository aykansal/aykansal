"use client";

import Link from "next/link";
import { formatCompactDate, type TimelineEvent } from "@/content/timeline";

interface TimelineDetailDrawerProps {
    event: TimelineEvent;
    onClose: () => void;
}

export function TimelineDetailDrawer({ event, onClose }: TimelineDetailDrawerProps) {
    return (
        <div className="fixed inset-0 z-50 hidden min-[640px]:block" role="dialog" aria-modal="true" aria-label={event.title}>
            <button type="button" className="absolute inset-0 bg-black/45" onClick={onClose} aria-label="Close timeline detail" />
            <aside className="absolute right-0 top-0 h-full w-full max-w-[640px] overflow-y-auto border-l border-border-subtle bg-bg-primary p-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-jetbrains text-[24px] font-semibold leading-tight text-text-primary">
                        {event.title}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="border border-border-subtle px-2 py-1 font-jetbrains text-[10px] uppercase tracking-wider text-text-muted transition-colors hover:text-text-primary"
                    >
                        Close
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="bg-bg-secondary px-2 py-1 font-jetbrains text-[10px] uppercase tracking-wider text-text-secondary">
                        {event.type}
                    </span>
                    {event.status === "ONGOING" && (
                        <span className="bg-accent-primary/10 px-2 py-1 font-jetbrains text-[10px] uppercase tracking-wider text-accent-primary">
                            Ongoing
                        </span>
                    )}
                    {formatCompactDate(event) && (
                        <span className="font-jetbrains text-[11px] uppercase tracking-wider text-text-muted">
                            {formatCompactDate(event)}
                        </span>
                    )}
                </div>

                <p className="mt-6 font-space text-[15px] leading-relaxed text-text-secondary">
                    {event.fallback?.brief ?? event.summary}
                </p>

                <div className="mt-8 flex items-center gap-3">
                    <Link
                        href={`/timeline/${event.slug}`}
                        className="border border-border-strong bg-bg-secondary px-3 py-2 font-jetbrains text-[11px] uppercase tracking-wider text-text-primary transition-colors hover:border-accent-primary hover:text-accent-primary"
                    >
                        Open Full Page
                    </Link>
                    <button
                        type="button"
                        onClick={onClose}
                        className="border border-border-subtle px-3 py-2 font-jetbrains text-[11px] uppercase tracking-wider text-text-muted transition-colors hover:text-text-primary"
                    >
                        Back to Timeline
                    </button>
                </div>
            </aside>
        </div>
    );
}
