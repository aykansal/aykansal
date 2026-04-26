export type TimelineEventType = "hackathon" | "project" | "award";

export type TimelineEventStatus = "ONGOING";

export interface TimelineDate {
    day?: number;
    month: number;
    year: number;
}

export interface TimelineEvent {
    id: string;
    slug: string;
    hashnodePostId: string;
    year: number;
    type: TimelineEventType;
    status?: TimelineEventStatus;
    featured?: boolean;
    title: string;
    summary: string;
    image?: string;
    start?: TimelineDate;
    end?: TimelineDate;
    fallback?: {
        brief?: string;
        html?: string;
    };
    metadata?: Record<string, unknown>;
}

export interface TimelineYearGroup {
    year: number;
    events: TimelineEvent[];
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;

export const timelineEvents: TimelineEvent[] = [
    {
        id: "hack-2026-delhi-builder-jam",
        slug: "delhi-builder-jam-2026",
        hashnodePostId: "69ee7f173d6a492cdd516ee3",
        year: 2026,
        type: "hackathon",
        featured: true,
        title: "Delhi Builder Jam",
        summary: "Built a real-time AI support prototype and shipped the MVP in 24 hours.",
        start: { day: 24, month: 2, year: 2026 },
        metadata: { city: "Delhi", mode: "in-person" },
    },
    {
        id: "award-2026-campus-showcase",
        slug: "campus-showcase-award-2026",
        hashnodePostId: "campus-showcase-award-2026-post-id",
        year: 2026,
        type: "award",
        title: "Best Product Story Award",
        summary: "Recognized for product storytelling and technical depth at the annual showcase.",
        start: { month: 3, year: 2026 },
    },
    {
        id: "project-2025-tryanon-public-beta",
        slug: "tryanon-public-beta-2025",
        hashnodePostId: "683f4ff6fb0f67c4d03f684f",
        year: 2025,
        type: "project",
        featured: true,
        status: "ONGOING",
        title: "Tryanon Public Beta",
        summary: "Launched beta for AI-assisted code workflows with iterative product feedback loops.",
        start: { month: 11, year: 2025 },
    },
    {
        id: "hack-2025-multi-agent-sprint",
        slug: "multi-agent-sprint-hackathon-2025",
        hashnodePostId: "multi-agent-sprint-hackathon-2025-post-id",
        year: 2025,
        type: "hackathon",
        title: "Multi-Agent Sprint",
        summary: "Created a multi-agent orchestration workflow and demoed live debugging assistants.",
        start: { day: 10, month: 12, year: 2025 },
        end: { day: 20, month: 12, year: 2025 },
    },
    {
        id: "project-2024-portfolio-v5",
        slug: "portfolio-v5-rebuild-2024",
        hashnodePostId: "portfolio-v5-rebuild-2024-post-id",
        year: 2024,
        type: "project",
        featured: true,
        title: "Portfolio V5 Rebuild",
        summary: "Rebuilt portfolio with animation systems, themed UI tokens, and content modularity.",
        start: { month: 9, year: 2024 },
    },
    {
        id: "award-2024-open-source-campus",
        slug: "open-source-campus-award-2024",
        hashnodePostId: "open-source-campus-award-2024-post-id",
        year: 2024,
        type: "award",
        title: "Open Source Contribution Recognition",
        summary: "Awarded for consistent contributions and peer mentoring in OSS student community.",
        start: { month: 5, year: 2024 },
    },
];

function toMonthLabel(month: number): string {
    return MONTHS[Math.max(1, Math.min(month, 12)) - 1];
}

function toSortableValue(date?: TimelineDate): number {
    if (!date) return -1;
    return date.year * 10000 + date.month * 100 + (date.day ?? 0);
}

function compareTimelineEvents(a: TimelineEvent, b: TimelineEvent): number {
    const aFeatured = a.featured ? 1 : 0;
    const bFeatured = b.featured ? 1 : 0;
    if (aFeatured !== bFeatured) return bFeatured - aFeatured;

    const bSort = toSortableValue(b.end ?? b.start);
    const aSort = toSortableValue(a.end ?? a.start);
    return bSort - aSort;
}

export function normalizeTimelineEvents(events: TimelineEvent[]): TimelineYearGroup[] {
    const grouped = new Map<number, TimelineEvent[]>();
    for (const event of events) {
        const list = grouped.get(event.year) ?? [];
        list.push(event);
        grouped.set(event.year, list);
    }

    const years = [...grouped.keys()].sort((a, b) => b - a);

    return years.map((year) => {
        const yearEvents = [...(grouped.get(year) ?? [])];
        const featuredCount = yearEvents.filter((event) => event.featured).length;

        if (featuredCount > 1 && process.env.NODE_ENV !== "production") {
            console.warn(`[timeline] Multiple featured events detected for year ${year}. First item in sorted order will win.`);
        }

        yearEvents.sort(compareTimelineEvents);

        let hasSeenFeatured = false;
        const sanitized = yearEvents.map((event) => {
            if (!event.featured) return event;
            if (!hasSeenFeatured) {
                hasSeenFeatured = true;
                return event;
            }
            return { ...event, featured: false };
        });

        return { year, events: sanitized };
    });
}

export function formatCompactDate(event: TimelineEvent): string {
    if (!event.start) return "";
    const startMonth = toMonthLabel(event.start.month);

    if (event.status === "ONGOING") {
        return event.start.day ? `${startMonth} ${event.start.day} - Ongoing` : `${startMonth} - Ongoing`;
    }

    if (!event.end) {
        return event.start.day ? `${startMonth} ${event.start.day}` : `${startMonth}`;
    }

    const endMonth = toMonthLabel(event.end.month);
    const startDay = event.start.day;
    const endDay = event.end.day;

    if (!startDay || !endDay) {
        return startMonth === endMonth ? startMonth : `${startMonth}-${endMonth}`;
    }

    if (startMonth === endMonth) {
        return `${startMonth} ${startDay}-${endDay}`;
    }

    return `${startMonth} ${startDay}-${endMonth} ${endDay}`;
}

export function getTimelineEventBySlug(slug: string): TimelineEvent | null {
    return timelineEvents.find((event) => event.slug === slug) ?? null;
}
