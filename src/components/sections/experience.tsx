"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { experience, formatDate, type ExperienceEntry } from "@/content/experience";

const ease = [0.16, 1, 0.3, 1] as const;

const BAR_CONFIG: Record<string, { color: string; hoverColor: string; label: string }> = {
    "Hammurabi AI": { color: "bg-accent-primary", hoverColor: "group-hover:bg-accent-primary-hover", label: "FULLTIME" },
    "Aven Technologies Inc": { color: "bg-text-muted/40", hoverColor: "group-hover:bg-text-muted/60", label: "CONTRACT" },
    "Freelance (Upwork)": { color: "bg-text-muted/40", hoverColor: "group-hover:bg-text-muted/60", label: "FREELANCE" },
    "Tryanon.ai": { color: "bg-text-muted/40", hoverColor: "group-hover:bg-text-muted/60", label: "STARTUP" },
};

/* ─── Year label ─── */
function YearTick({ text, delay = 0 }: { text: string; delay?: number }) {
    return (
        <motion.div
            className="flex w-full items-center gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay, ease }}
        >
            <span className="shrink-0 font-jetbrains text-[8px] leading-none text-text-muted">
                {text}
            </span>
            <motion.div
                className="h-px flex-1 bg-border-subtle"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: delay + 0.1, ease }}
                style={{ transformOrigin: "left" }}
            />
        </motion.div>
    );
}

/* ─── Sidebar Bar with year markers ─── */
function SideBar({
    color,
    hoverColor,
    label,
    active,
    startDate,
    endDate,
    index,
}: {
    color: string;
    hoverColor: string;
    label: string;
    active?: boolean;
    startDate: { month: number; year: number };
    endDate?: { month: number; year: number };
    index: number;
}) {
    const endLabel = active ? "NOW" : `${endDate?.year ?? ""}`;
    const startLabel = `${startDate.year}`;
    const barDelay = index * 0.1;

    return (
        <div className="hidden w-12 shrink-0 min-[560px]:flex min-[560px]:flex-col min-[560px]:items-end min-[560px]:gap-0">
            {/* End date tick (top) */}
            <YearTick text={endLabel} delay={barDelay} />

            {/* The bar itself — grows from bottom */}
            <motion.div
                className={`relative w-7 flex-1 self-end ${color} ${hoverColor} motion-safe:transition-colors motion-safe:duration-300`}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: barDelay + 0.15, ease }}
                style={{ transformOrigin: "bottom" }}
            >
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-jetbrains text-[8px] font-semibold uppercase tracking-[0.15em] text-text-primary/40 motion-safe:transition-opacity motion-safe:duration-300 group-hover:text-text-primary/70">
                    {label}
                </span>
            </motion.div>

            {/* Start date tick (bottom) */}
            <YearTick text={startLabel} delay={barDelay + 0.3} />
        </div>
    );
}

/* ─── Work Card ─── */
function WorkCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const isHammurabi = entry.logo?.includes("Hammurabi");

    return (
        <motion.div
            ref={ref}
            className="min-w-0 flex-1 border border-border-default bg-bg-secondary p-5 motion-safe:transition-[border-color] motion-safe:duration-200 group-hover:border-border-strong"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, ease }}
        >
            {/* Row 1: Logo + Company name | Date */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    {entry.logo && (
                        <Image
                            src={entry.logo}
                            alt=""
                            width={44}
                            height={22}
                            className={isHammurabi ? "h-[14px] w-auto" : "h-[20px] w-auto"}
                        />
                    )}
                    <span className="font-jetbrains text-lg leading-none text-text-primary">
                        {entry.company.toUpperCase()}
                    </span>
                </div>
                <span className="shrink-0 font-jetbrains text-[10px] uppercase tracking-wide text-text-tertiary">
                    {formatDate(entry.startDate)} — {entry.endDate ? formatDate(entry.endDate) : "PRESENT"}
                </span>
            </div>

            {/* Row 2: Badges */}
            {entry.badges && entry.badges.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {entry.badges.map((badge) => {
                        const isClosedSource = badge.toLowerCase() === "closed source";
                        const isOpenSource = badge.toLowerCase() === "open source";
                        const badgeClass = isClosedSource
                            ? "bg-status-error/10 text-status-error"
                            : isOpenSource
                              ? "bg-accent-tertiary/10 text-accent-tertiary"
                              : "bg-bg-tertiary text-text-secondary";
                        return (
                            <span
                                key={badge}
                                className={`px-2 py-0.5 font-jetbrains text-[10px] uppercase tracking-wider ${badgeClass}`}
                            >
                                {badge}
                            </span>
                        );
                    })}
                </div>
            )}

            {/* Row 3: Bullets */}
            {entry.bullets && entry.bullets.length > 0 && (
                <ul className="mt-6 flex flex-col gap-2">
                    {entry.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-2 font-space text-[14px] leading-normal text-text-secondary">
                            <span className={`mt-1 shrink-0 ${entry.active ? "text-accent-primary" : "text-text-muted"}`}>▪</span>
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
}

/* ─── Milestone Marker ─── */
function MilestoneMarker({ entry, index }: { entry: ExperienceEntry; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-30px" });

    return (
        <motion.div
            ref={ref}
            className="flex items-center gap-2 py-1"
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1, ease }}
        >
            <span className="h-2 w-2 shrink-0 bg-accent-tertiary" />
            <span className="font-space text-[12px] uppercase tracking-wide text-text-muted">{entry.company}</span>
            <span className="font-jetbrains text-[10px] text-text-muted">
                {entry.startDate.year}{entry.endDate && entry.endDate.year !== entry.startDate.year ? `–${entry.endDate.year}` : ""}
            </span>
        </motion.div>
    );
}

/* ─── Education Row (own inView ref so animation triggers reliably) ─── */
function EducationRow({
    milestones,
    eduStart,
    eduEnd,
    eduIndex,
    workCount,
}: {
    milestones: ExperienceEntry[];
    eduStart: { month: number; year: number };
    eduEnd: { month: number; year: number };
    eduIndex: number;
    workCount: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-30px" });
    const barDelay = eduIndex * 0.1;

    return (
        <div ref={ref} className="group flex gap-3">
            <div className="hidden w-12 shrink-0 min-[560px]:flex min-[560px]:flex-col min-[560px]:items-end min-[560px]:gap-0">
                <motion.div
                    className="flex w-full items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: barDelay, ease }}
                >
                    <span className="shrink-0 font-jetbrains text-[8px] leading-none text-text-muted">
                        {eduEnd.year}
                    </span>
                    <motion.div
                        className="h-px flex-1 bg-border-subtle"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.5, delay: barDelay + 0.1, ease }}
                        style={{ transformOrigin: "left" }}
                    />
                </motion.div>

                <motion.div
                    className="relative w-7 flex-1 self-end bg-accent-tertiary motion-safe:transition-[filter] motion-safe:duration-300 group-hover:brightness-110"
                    style={{
                        transformOrigin: "bottom",
                        backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.10) 2px, rgba(0,0,0,0.10) 4px)",
                    }}
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.6, delay: barDelay + 0.15, ease }}
                >
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap font-jetbrains text-[8px] font-semibold uppercase tracking-[0.15em] text-text-primary/40 motion-safe:transition-opacity motion-safe:duration-300 group-hover:text-text-primary/70">
                        EDUCATION
                    </span>
                </motion.div>

                <motion.div
                    className="flex w-full items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: barDelay + 0.3, ease }}
                >
                    <span className="shrink-0 font-jetbrains text-[8px] leading-none text-text-muted">
                        {eduStart.year}
                    </span>
                    <motion.div
                        className="h-px flex-1 bg-border-subtle"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.5, delay: barDelay + 0.4, ease }}
                        style={{ transformOrigin: "left" }}
                    />
                </motion.div>
            </div>
            <div className="flex flex-1 flex-col gap-1 py-2">
                {milestones.map((entry, i) => (
                    <MilestoneMarker key={entry.company} entry={entry} index={workCount + i} />
                ))}
            </div>
        </div>
    );
}

/* ─── Experience Section ─── */
export function Experience() {
    const workEntries = experience.filter((e) => e.type === "work");
    const milestones = experience.filter((e) => e.type === "milestone");
    const eduStart = milestones.length > 0
        ? milestones.reduce((min, e) => (e.startDate.year < min.year ? e.startDate : min), milestones[0].startDate)
        : { month: 1, year: 2018 };
    const eduEnd = milestones.length > 0
        ? milestones.reduce((max, e) => {
            const end = e.endDate ?? e.startDate;
            return end.year > max.year ? end : max;
        }, milestones[0].endDate ?? milestones[0].startDate)
        : { month: 1, year: 2024 };

    const eduIndex = workEntries.length;

    return (
        <section className="mt-24">
            <h2 className="font-micro text-[40px] leading-none text-text-primary">EXPERIENCE</h2>

            <div className="mt-10 flex flex-col gap-3">
                {/* Work entries — each row is a group for hover interaction */}
                {workEntries.map((entry, i) => {
                    const config = BAR_CONFIG[entry.company] ?? { color: "bg-text-muted/40", hoverColor: "group-hover:bg-text-muted/60", label: "" };
                    return (
                        <div key={entry.company} className="group flex gap-3">
                            <SideBar
                                color={config.color}
                                hoverColor={config.hoverColor}
                                label={config.label}
                                active={entry.active}
                                startDate={entry.startDate}
                                endDate={entry.endDate}
                                index={i}
                            />
                            <WorkCard entry={entry} index={i} />
                        </div>
                    );
                })}

                {/* Education milestones — with green sidebar + year ticks */}
                <EducationRow milestones={milestones} eduStart={eduStart} eduEnd={eduEnd} eduIndex={eduIndex} workCount={workEntries.length} />
            </div>
        </section>
    );
}
