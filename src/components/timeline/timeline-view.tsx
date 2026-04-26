"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatCompactDate, normalizeTimelineEvents, type TimelineEvent, type TimelineEventType } from "@/content/timeline";
import { useIsMobile } from "@/lib/use-is-mobile";

const TYPE_ORDER: TimelineEventType[] = ["hackathon", "project", "award"];

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

export function TimelineView({ events }: { events: TimelineEvent[] }) {
    const [activeTypes, setActiveTypes] = useState<Set<TimelineEventType>>(new Set(TYPE_ORDER));
    const isMobile = useIsMobile();
    const scrollTargetRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [maxTranslateX, setMaxTranslateX] = useState(0);

    const filteredEvents = useMemo(() => {
        return events.filter((event) => activeTypes.has(event.type));
    }, [activeTypes, events]);

    const groups = useMemo(() => normalizeTimelineEvents(filteredEvents), [filteredEvents]);
    const { scrollYProgress } = useScroll({
        target: scrollTargetRef,
        offset: ["start start", "end end"],
    });
    const trackX = useTransform(scrollYProgress, (value) => -value * maxTranslateX);

    const toggleType = (type: TimelineEventType) => {
        setActiveTypes((prev) => {
            const next = new Set(prev);
            if (next.has(type)) {
                next.delete(type);
            } else {
                next.add(type);
            }
            return next;
        });
    };

    useEffect(() => {
        if (isMobile) {
            setMaxTranslateX(0);
            return;
        }

        const measure = () => {
            const viewport = viewportRef.current;
            const track = trackRef.current;
            if (!viewport || !track) return;
            const overflow = track.scrollWidth - viewport.clientWidth;
            setMaxTranslateX(Math.max(0, overflow));
        };

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [groups.length, isMobile]);

    return (
        <section className="mt-10" aria-label="Builder timeline by year">
            <div className="mb-6 flex flex-wrap items-center gap-2">
                {TYPE_ORDER.map((type) => {
                    const active = activeTypes.has(type);
                    return (
                        <button
                            key={type}
                            type="button"
                            onClick={() => toggleType(type)}
                            className={cn(
                                "border px-2.5 py-1 font-jetbrains text-[11px] uppercase tracking-wider transition-colors duration-200",
                                active
                                    ? "border-border-strong bg-bg-secondary text-text-primary"
                                    : "border-border-subtle bg-transparent text-text-muted hover:text-text-primary",
                            )}
                            aria-pressed={active}
                        >
                            {TYPE_LABELS[type]}
                        </button>
                    );
                })}
            </div>

            {groups.length === 0 ? (
                <div className="border border-dashed border-border-strong bg-bg-secondary/30 px-6 py-16 text-center">
                    <p className="font-space text-[14px] text-text-secondary">
                        No events match current filters.
                    </p>
                </div>
            ) : (
                <>
                    {!isMobile && (
                        <div ref={scrollTargetRef} className="relative hidden min-[900px]:block" style={{ height: "280vh" }}>
                            <div ref={viewportRef} className="sticky top-[76px] h-[calc(100vh-104px)] overflow-hidden">
                                <motion.div ref={trackRef} style={{ x: trackX }} className="flex h-full items-start gap-4">
                                    {groups.map((group) => (
                                        <article key={group.year} className="h-full w-[520px] shrink-0 border border-border-subtle bg-bg-primary/60 p-4">
                                            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                                                <h2 className="font-jetbrains text-[22px] font-semibold tracking-wide text-text-primary">
                                                    {group.year}
                                                </h2>
                                                <span className="font-jetbrains text-[10px] uppercase tracking-wider text-text-muted">
                                                    {group.events.length} events
                                                </span>
                                            </div>

                                            <div className="mt-4 flex max-h-[calc(100%-48px)] flex-col gap-3 overflow-auto pr-1">
                                                {group.events.map((event) => (
                                                    <TimelineCompactCard key={event.id} event={event} />
                                                ))}
                                            </div>
                                        </article>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    )}

                    <div className={cn("flex flex-col gap-6", !isMobile && "min-[900px]:hidden")}>
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

                                <div className="mt-4 grid grid-cols-1 gap-3">
                                    {group.events.map((event) => (
                                        <TimelineCompactCard key={event.id} event={event} />
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}
