export type JourneyKind = "school" | "ship" | "found" | "work" | "now";

export interface JourneyEvent {
    id: string;
    /** Short label shown in the date column, e.g. "2019" or "NOV 2024". */
    date: string;
    year: number;
    /** 1–12. Used only to space events by real elapsed time. */
    month: number;
    kind: JourneyKind;
    title: string;
    body: string;
    href?: string;
}

export const KIND_LABELS: Record<JourneyKind, string> = {
    school: "SCHOOL",
    ship: "SHIP",
    found: "FOUND",
    work: "WORK",
    now: "NOW",
};

/**
 * Sparse marks along the way — not a resume.
 * Month values for undated ships are mid-year estimates so spacing stays honest.
 */
export const journey: JourneyEvent[] = [
    {
        id: "high-school",
        date: "2019",
        year: 2019,
        month: 5,
        kind: "school",
        title: "High school",
        body: "First real contact with computers as a system, not a toy. The bugs were already more interesting than the syllabus.",
    },
    {
        id: "higher-secondary",
        date: "2021",
        year: 2021,
        month: 5,
        kind: "school",
        title: "Higher secondary",
        body: "Doubled down on code. The safer path was visible. I didn't take it.",
    },
    {
        id: "btech",
        date: "2022",
        year: 2022,
        month: 8,
        kind: "school",
        title: "B.Tech, Computer Science",
        body: "Mohali. The degree ran in the background. The building did not.",
    },
    {
        id: "arweave",
        date: "2023",
        year: 2023,
        month: 6,
        kind: "ship",
        title: "On-chain experiments",
        body: "bazARmash, NFToodle, Drawwy — matching, minting, pixel art that doesn't leave the chain.",
    },
    {
        id: "yielder",
        date: "2024",
        year: 2024,
        month: 6,
        kind: "ship",
        title: "Yielder",
        body: "An autonomous yield aggregator on AO. Pools, rebalancing, live tracking. Then a hackathon win.",
        href: "https://www.youtube.com/watch?v=KCot-h2u5oY",
    },
    {
        id: "tryanon",
        date: "NOV 2024",
        year: 2024,
        month: 11,
        kind: "found",
        title: "Tryanon",
        body: "Plain-language Web3 into dApps. 200 people showed up in the first month. Longview Labs did too.",
        href: "https://tryanon.ai",
    },
    {
        id: "aven",
        date: "OCT 2025",
        year: 2025,
        month: 10,
        kind: "work",
        title: "Aven",
        body: "A WhatsApp support agent with RAG, evals, and a way out when the model wasn't sure.",
    },
    {
        id: "now",
        date: "NOW",
        year: 2026,
        month: 8,
        kind: "now",
        title: "AI security harnesses",
        body: "Learning the sharp edges by building them. Still in Mohali. Open for work.",
    },
];

function toMonths(event: JourneyEvent): number {
    return event.year * 12 + event.month;
}

/** Vertical breathing room before an event, scaled to elapsed months. */
export function gapBefore(previous: JourneyEvent | undefined, current: JourneyEvent): number {
    if (!previous) return 0;
    const months = Math.max(0, toMonths(current) - toMonths(previous));
    return Math.round(Math.min(96, Math.max(28, months * 3.2)));
}
