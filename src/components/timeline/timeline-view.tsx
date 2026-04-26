"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { formatCompactDate, normalizeTimelineEvents, type TimelineEvent, type TimelineEventType, type TimelineYearGroup } from "@/content/timeline";
import { useIsMobile } from "@/lib/use-is-mobile";
import { TimelineDetailDrawer } from "@/components/timeline/timeline-detail-drawer";

const TYPE_ORDER: TimelineEventType[] = ["hackathon", "project", "award"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;

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

function TimelineCompactCard({ event, onOpen }: { event: TimelineEvent; onOpen: (event: TimelineEvent) => void }) {
    return (
        <button
            type="button"
            onClick={() => onOpen(event)}
            className="group w-full border border-border-default bg-bg-secondary p-4 text-left transition-colors duration-200 hover:border-border-strong"
        >
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
        </button>
    );
}

export function TimelineView({ events }: { events: TimelineEvent[] }) {
    const router = useRouter();
    const [activeTypes, setActiveTypes] = useState<Set<TimelineEventType>>(new Set(TYPE_ORDER));
    const isMobile = useIsMobile();
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
    const scrollTargetRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [maxTranslateX, setMaxTranslateX] = useState(0);

    const filteredEvents = useMemo(() => {
        return events.filter((event) => activeTypes.has(event.type));
    }, [activeTypes, events]);

    const groups = useMemo(() => normalizeTimelineEvents(filteredEvents), [filteredEvents]);
    const barPoints = useMemo(() => buildTimelineBarPoints(groups), [groups]);
    const [activeMonthKey, setActiveMonthKey] = useState<string>(barPoints[0]?.key ?? "");
    const [isScrubbing, setIsScrubbing] = useState(false);
    const barRailRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        setActiveMonthKey(barPoints[0]?.key ?? "");
    }, [barPoints]);

    useEffect(() => {
        if (isScrubbing || barPoints.length === 0) return;
        const unsubscribe = scrollYProgress.on("change", (value) => {
            const index = Math.round(value * (barPoints.length - 1));
            const next = barPoints[Math.max(0, Math.min(index, barPoints.length - 1))];
            if (next) setActiveMonthKey(next.key);
        });
        return unsubscribe;
    }, [barPoints, isScrubbing, scrollYProgress]);

    const seekToMonth = (monthKey: string) => {
        const point = barPoints.find((entry) => entry.key === monthKey);
        if (!point) return;
        setActiveMonthKey(monthKey);

        if (isMobile) {
            const card = document.getElementById(`timeline-event-${point.eventId}`);
            card?.scrollIntoView({ behavior: "smooth", block: "start" });
            return;
        }

        const target = scrollTargetRef.current;
        if (!target) return;
        const absoluteTop = window.scrollY + target.getBoundingClientRect().top;
        const travelSpace = Math.max(1, target.offsetHeight - window.innerHeight);
        window.scrollTo({ top: absoluteTop + travelSpace * point.progress, behavior: "smooth" });
    };

    const handleScrub = (clientX: number) => {
        if (!barRailRef.current || barPoints.length === 0) return;
        const rect = barRailRef.current.getBoundingClientRect();
        const ratio = (clientX - rect.left) / rect.width;
        const clamped = Math.max(0, Math.min(1, ratio));
        const idx = Math.round(clamped * (barPoints.length - 1));
        const point = barPoints[idx];
        if (point) seekToMonth(point.key);
    };

    const activeYear = barPoints.find((point) => point.key === activeMonthKey)?.year;
    const openEvent = (event: TimelineEvent) => {
        if (isMobile) {
            router.push(`/timeline/${event.slug}`);
            return;
        }
        setSelectedEvent(event);
    };

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
                                                    <div id={`timeline-event-${event.id}`} key={event.id}>
                                                        <TimelineCompactCard event={event} onOpen={openEvent} />
                                                    </div>
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
                                        <div id={`timeline-event-${event.id}`} key={event.id}>
                                            <TimelineCompactCard event={event} onOpen={openEvent} />
                                        </div>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>

                    {barPoints.length > 0 && (
                        <div className="sticky bottom-3 z-20 mt-6 border border-border-subtle bg-bg-primary/85 p-3 backdrop-blur">
                            <div className="mb-2 flex items-center gap-3 overflow-x-auto pb-1">
                                {[...new Set(barPoints.map((point) => point.year))].map((year) => (
                                    <button
                                        key={year}
                                        type="button"
                                        onClick={() => {
                                            const yearPoint = barPoints.find((point) => point.year === year);
                                            if (yearPoint) seekToMonth(yearPoint.key);
                                        }}
                                        className={cn(
                                            "shrink-0 font-jetbrains text-[11px] uppercase tracking-wider transition-colors",
                                            activeYear === year ? "text-accent-primary" : "text-text-muted hover:text-text-primary",
                                        )}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>

                            <div
                                ref={barRailRef}
                                className="flex items-end gap-1"
                                onMouseDown={(event) => {
                                    setIsScrubbing(true);
                                    handleScrub(event.clientX);
                                }}
                                onMouseMove={(event) => {
                                    if (isScrubbing) handleScrub(event.clientX);
                                }}
                                onMouseUp={() => setIsScrubbing(false)}
                                onMouseLeave={() => setIsScrubbing(false)}
                                onTouchStart={(event) => {
                                    setIsScrubbing(true);
                                    handleScrub(event.touches[0].clientX);
                                }}
                                onTouchMove={(event) => {
                                    handleScrub(event.touches[0].clientX);
                                }}
                                onTouchEnd={() => setIsScrubbing(false)}
                            >
                                {barPoints.map((point, index) => {
                                    const isActive = point.key === activeMonthKey;
                                    const isCurrentYear = point.year === activeYear;
                                    const baseHeight = 10 + ((index % 4) * 4);
                                    return (
                                        <button
                                            key={point.key}
                                            type="button"
                                            onClick={() => seekToMonth(point.key)}
                                            className={cn(
                                                "group relative flex-1 border border-border-subtle transition-all duration-200",
                                                isCurrentYear ? "bg-bg-secondary" : "bg-bg-tertiary/50",
                                                isActive && "border-accent-primary bg-accent-primary/20",
                                            )}
                                            style={{ height: isActive ? `${baseHeight + 16}px` : `${baseHeight}px` }}
                                            aria-label={`${point.monthLabel} ${point.year}`}
                                        >
                                            <span
                                                className={cn(
                                                    "absolute -top-5 left-1/2 -translate-x-1/2 font-jetbrains text-[10px] uppercase tracking-wider",
                                                    isActive ? "text-accent-primary" : "text-transparent group-hover:text-text-muted",
                                                )}
                                            >
                                                {point.monthLabel}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}

            {selectedEvent && (
                <TimelineDetailDrawer
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </section>
    );
}

function buildTimelineBarPoints(groups: TimelineYearGroup[]) {
    const keyToPoint = new Map<string, { key: string; monthLabel: string; month: number; year: number; eventId: string; progress: number }>();
    const flattened = groups.flatMap((group) => group.events);
    const total = Math.max(1, flattened.length - 1);

    flattened.forEach((event, index) => {
        const month = event.start?.month ?? event.end?.month;
        const year = event.start?.year ?? event.end?.year ?? event.year;
        if (!month) return;
        const key = `${year}-${month}`;
        if (keyToPoint.has(key)) return;
        keyToPoint.set(key, {
            key,
            monthLabel: MONTHS[month - 1],
            month,
            year,
            eventId: event.id,
            progress: index / total,
        });
    });

    return [...keyToPoint.values()].sort((a, b) => {
        const aValue = a.year * 100 + a.month;
        const bValue = b.year * 100 + b.month;
        return bValue - aValue;
    });
}
