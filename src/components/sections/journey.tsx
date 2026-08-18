"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { gapBefore, journey, KIND_LABELS, type JourneyEvent } from "@/content/journey";

const ease = [0.16, 1, 0.3, 1] as const;
const SPINE = "left-[calc(4rem+(1.25rem/2)-0.5px)]";

function JourneyMark({
    event,
    index,
    previous,
    active,
}: {
    event: JourneyEvent;
    index: number;
    previous?: JourneyEvent;
    active: boolean;
}) {
    const ref = useRef<HTMLLIElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const isNow = event.kind === "now";

    return (
        <motion.li
            ref={ref}
            data-journey-id={event.id}
            aria-current={active ? "step" : undefined}
            className="grid grid-cols-[4rem_1.25rem_minmax(0,1fr)] items-start"
            style={{ paddingTop: gapBefore(previous, event) }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: Math.min(index * 0.05, 0.25), ease }}
        >
            {isNow ? (
                <span
                    className="whitespace-nowrap pt-[3px] font-jetbrains text-[10px] uppercase leading-none tracking-wider text-accent-primary"
                >
                    {event.date}
                </span>
            ) : (
                <time
                    className={cn(
                        "whitespace-nowrap pt-[3px] font-jetbrains text-[10px] uppercase leading-none tracking-wider motion-safe:transition-colors motion-safe:duration-500",
                        active ? "text-accent-primary" : "text-text-muted",
                    )}
                    dateTime={`${event.year}-${String(event.month).padStart(2, "0")}`}
                >
                    {event.date}
                </time>
            )}

            <div className="relative flex justify-center pt-0.5">
                <span
                    className={cn(
                        "relative z-10 mt-px block rounded-full motion-safe:transition-[transform,background-color,box-shadow] motion-safe:duration-500",
                        active || isNow ? "h-2 w-2 bg-accent-primary" : "h-1.5 w-1.5 bg-border-strong",
                        isNow && "motion-safe:animate-[status-pulse_2.8s_ease-in-out_infinite]",
                        active && "shadow-[0_0_0_4px_color-mix(in_oklch,var(--accent-primary)_16%,transparent)]",
                    )}
                    aria-hidden="true"
                />
            </div>

            <div className="-mt-0.5 pb-1 pl-1">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="font-jetbrains text-[9px] uppercase tracking-[0.16em] text-text-muted">
                        {KIND_LABELS[event.kind]}
                    </span>
                    {event.href ? (
                        <a
                            href={event.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "font-space text-[15px] leading-snug underline decoration-1 underline-offset-4 outline-none motion-safe:transition-colors motion-safe:duration-500",
                                active ? "text-text-primary decoration-border-strong" : "text-text-secondary decoration-border-default",
                                "hover:text-accent-primary hover:decoration-accent-primary focus-visible:text-accent-primary",
                            )}
                        >
                            {event.title}
                        </a>
                    ) : (
                        <span
                            className={cn(
                                "font-space text-[15px] leading-snug motion-safe:transition-colors motion-safe:duration-500",
                                active ? "text-text-primary" : "text-text-secondary",
                            )}
                        >
                            {event.title}
                        </span>
                    )}
                </p>
                <p
                    className={cn(
                        "mt-1.5 max-w-[38ch] font-space text-[14px] leading-relaxed motion-safe:transition-colors motion-safe:duration-500",
                        active ? "text-text-secondary" : "text-text-tertiary",
                    )}
                >
                    {event.body}
                </p>
            </div>
        </motion.li>
    );
}

export function Journey() {
    const sectionRef = useRef<HTMLElement>(null);
    const listRef = useRef<HTMLOListElement>(null);
    const reduceMotion = useReducedMotion();
    const [activeId, setActiveId] = useState<string>(journey[0]?.id ?? "");

    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const nodes = list.querySelectorAll<HTMLElement>("[data-journey-id]");
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting);
                if (visible.length === 0) return;

                const focusY = window.innerHeight * 0.45;
                let best = visible[0];
                let bestDist = Infinity;
                for (const entry of visible) {
                    const rect = entry.boundingClientRect;
                    const dist = Math.abs(rect.top + rect.height / 2 - focusY);
                    if (dist < bestDist) {
                        bestDist = dist;
                        best = entry;
                    }
                }

                const id = (best.target as HTMLElement).dataset.journeyId;
                if (id) setActiveId(id);
            },
            { rootMargin: "-36% 0px -46% 0px", threshold: [0, 0.25, 0.6] },
        );

        for (const node of nodes) observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 0.75", "end 0.45"],
    });

    const lineProgress = useSpring(scrollYProgress, {
        stiffness: 70,
        damping: 28,
        restDelta: 0.001,
        bounce: 0,
    });

    return (
        <section ref={sectionRef} id="journey" className="mt-24 scroll-mt-16">
            <h2 className="font-micro text-[40px] leading-none text-text-primary">JOURNEY</h2>
            <p className="mt-3 font-space text-[14px] leading-normal text-text-tertiary">
                the turns that actually stuck
            </p>

            <ol ref={listRef} className="relative mt-10 pb-2" aria-label="Journey timeline">
                <div
                    className={cn("pointer-events-none absolute top-1 bottom-2 w-px bg-border-default", SPINE)}
                    aria-hidden="true"
                />
                {reduceMotion ? (
                    <div
                        className={cn("pointer-events-none absolute top-1 bottom-2 w-px bg-accent-primary/70", SPINE)}
                        aria-hidden="true"
                    />
                ) : (
                    <motion.div
                        className={cn("pointer-events-none absolute top-1 bottom-2 w-px origin-top bg-accent-primary/70", SPINE)}
                        style={{ scaleY: lineProgress }}
                        aria-hidden="true"
                    />
                )}

                {journey.map((event, index) => (
                    <JourneyMark
                        key={event.id}
                        event={event}
                        index={index}
                        previous={journey[index - 1]}
                        active={activeId === event.id}
                    />
                ))}
            </ol>
        </section>
    );
}
