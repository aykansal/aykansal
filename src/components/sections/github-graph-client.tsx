"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { GitHubDark, GitHubLight } from "@ridemountainpig/svgl-react";
import { cn } from "@/lib/utils";
import { SOCIAL, GITHUB_USERNAME } from "@/config/links";

/* ─── Types ─── */

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface YearData {
    total: number;
    contributions: ContributionDay[];
}

interface GitHubGraphClientProps {
    yearData: Record<number, YearData>;
    availableYears: number[];
}

/* ─── Constants ─── */

const CELL_SIZE = 11;
const GAP = 3;
const COL_WIDTH = CELL_SIZE + GAP;

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Helpers ─── */

function buildGrid(contributions: ContributionDay[]) {
    if (contributions.length === 0) {
        return { cells: [] as (ContributionDay | null)[], totalColumns: 0, monthLabels: [] as { label: string; colIndex: number }[] };
    }

    const firstDate = new Date(contributions[0].date + "T00:00:00");
    const startDayOfWeek = firstDate.getDay();

    const cells: (ContributionDay | null)[] = [];

    for (let i = 0; i < startDayOfWeek; i++) {
        cells.push(null);
    }

    for (const day of contributions) {
        cells.push(day);
    }

    while (cells.length % 7 !== 0) {
        cells.push(null);
    }

    const totalColumns = cells.length / 7;

    const monthLabels: { label: string; colIndex: number }[] = [];
    let prevMonth = -1;

    for (let i = 0; i < contributions.length; i++) {
        const date = new Date(contributions[i].date + "T00:00:00");
        const month = date.getMonth();

        if (month !== prevMonth) {
            prevMonth = month;
            const cellIndex = startDayOfWeek + i;
            const colIndex = Math.floor(cellIndex / 7);
            monthLabels.push({
                label: date.toLocaleString("en-US", { month: "short" }),
                colIndex,
            });
        }
    }

    return { cells, totalColumns, monthLabels };
}

function levelColor(level: number): string {
    switch (level) {
        case 1: return "bg-github-green-1";
        case 2: return "bg-github-green-2";
        case 3: return "bg-github-green-3";
        case 4: return "bg-github-green-4";
        default: return "bg-bg-tertiary";
    }
}

/* ─── Component ─── */

export function GitHubGraphClient({ yearData, availableYears }: GitHubGraphClientProps) {
    const [activeYear, setActiveYear] = useState(availableYears[0]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();

    const data = yearData[activeYear];
    const { cells, totalColumns, monthLabels } = useMemo(
        () => buildGrid(data.contributions),
        [activeYear, data.contributions],
    );

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [activeYear]);

    const gridWidth = totalColumns * COL_WIDTH - GAP;
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    const GitHubIcon = resolvedTheme === "light" ? GitHubLight : GitHubDark;

    return (
        <section className="mt-28 mb-4" aria-label="GitHub contribution graph">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <a
                        href={SOCIAL.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 font-jetbrains text-[12px] uppercase tracking-wide text-text-tertiary transition-colors hover:text-text-secondary"
                    >
                        {mounted ? <GitHubIcon width={14} height={14} /> : <div style={{ width: 14, height: 14 }} />}
                        <span className="hidden min-[480px]:inline">GITHUB.COM/{GITHUB_USERNAME.toUpperCase()}</span>
                        <span className="min-[480px]:hidden">@{GITHUB_USERNAME.toUpperCase()}</span>
                    </a>
                    <div className="flex gap-2">
                        {availableYears.map((year) => (
                            <button
                                key={year}
                                onClick={() => setActiveYear(year)}
                                className={cn(
                                    "font-jetbrains text-[12px] tracking-wider transition-colors duration-200",
                                    activeYear === year
                                        ? "text-text-primary"
                                        : "text-text-muted hover:text-text-secondary",
                                )}
                            >
                                [{year}]
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scrollable graph */}
                <div className="relative mt-6">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg-primary to-transparent min-[560px]:hidden" />
                    <div
                        ref={scrollRef}
                        className="overflow-x-auto scrollbar-hide"
                    >
                        <div style={{ width: gridWidth }}>
                            {/* Month labels */}
                            <div className="relative mb-2 h-4">
                                {monthLabels.map(({ label, colIndex }, i) => (
                                    <span
                                        key={i}
                                        className="absolute font-space text-[12px] text-text-tertiary"
                                        style={{ left: colIndex * COL_WIDTH }}
                                    >
                                        {label}
                                    </span>
                                ))}
                            </div>

                            {/* Contribution grid */}
                            <div
                                className="grid grid-flow-col"
                                style={{
                                    gridTemplateRows: `repeat(7, ${CELL_SIZE}px)`,
                                    gap: GAP,
                                }}
                            >
                                {cells.map((cell, i) => (
                                    <div
                                        key={i}
                                        className={cell ? levelColor(cell.level) : undefined}
                                        style={{
                                            width: CELL_SIZE,
                                            height: CELL_SIZE,
                                            visibility: cell ? "visible" : "hidden",
                                        }}
                                        title={
                                            cell
                                                ? `${cell.count} contribution${cell.count !== 1 ? "s" : ""} on ${cell.date}`
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-3 flex items-center justify-between">
                    <p className="font-jetbrains text-[10px] text-text-tertiary">
                        {data.total.toLocaleString()} CONTRIBUTIONS IN{" "}
                        <a
                            href={SOCIAL.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary underline decoration-border-strong underline-offset-2 transition-colors hover:text-text-primary"
                        >
                            {activeYear}
                        </a>
                    </p>
                    <div className="flex items-center gap-1.5">
                        <span className="font-jetbrains text-[10px] text-text-muted">Less</span>
                        {[0, 1, 2, 3, 4].map((level) => (
                            <div
                                key={level}
                                className={levelColor(level)}
                                style={{ width: CELL_SIZE, height: CELL_SIZE }}
                            />
                        ))}
                        <span className="font-jetbrains text-[10px] text-text-muted">More</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
