export interface ExperienceEntry {
    type: "work" | "milestone";
    company: string;
    role?: string;
    logo?: string;
    startDate: { month: number; year: number };
    endDate?: { month: number; year: number };
    badges?: string[];
    active?: boolean;
    bullets?: string[];
    barColor: "accent" | "gray" | "green";
    barLabel?: string;
}

export const TIMELINE_START_YEAR = 2018;
export const TIMELINE_END_YEAR = 2026;
export const YEAR_HEIGHT = 80;

export const experience: ExperienceEntry[] = [
    {
        type: "work",
        company: "Aven Technologies Inc",
        role: "Applied AI Engineer",
        logo: "/icons/avenping.svg",
        startDate: { month: 10, year: 2025 },
        endDate: { month: 11, year: 2025 },
        badges: ["APPLIED AI ENGINEER", "REMOTE", "CLOSED SOURCE"],
        barColor: "gray",
        bullets: [
            "built WhatsApp support agent using OpenAI SDK, Next.js and Meta APIs, reducing response time by 20%",
            "improved ticket resolution by 15% via agent pipelines with evals, guardrails, and fallback escalation",
            "developed RAG system with pgvector, enabling accurate answers from multi-format customer data",
            "orchestrated multi-LLM workflows via Vercel AI SDK, improving response reliability across diverse queries",
            "integrated LLM routing and confidence scoring to auto-escalate complex or low-confidence cases",
        ],
    },
    {
        type: "work",
        company: "Tryanon.ai",
        role: "Founder",
        logo: "/icons/Tryanon.png",
        startDate: { month: 11, year: 2024 },
        endDate: { month: 5, year: 2025 },
        badges: ["FOUNDER", "REMOTE", "OPEN SOURCE"],
        barColor: "gray",
        bullets: [
            'built AI code generation harness pipeline using Google GenAI and Anthropic SDKs with chat history context, chunked response rendering, and automatic npm dependency extraction',
            'acquiring 200+ unique users and processing 10,000+ requests within the first month of launch'
        ],
    },
    {
        type: "milestone",
        company: "B.Tech in Computer Science",
        startDate: { month: 8, year: 2022 },
        endDate: { month: 5, year: 2026 },
        barColor: "green",
        barLabel: "Education",
    },
    {
        type: "milestone",
        company: "Higher Secondary",
        startDate: { month: 5, year: 2021 },
        endDate: { month: 5, year: 2021 },
        barColor: "green",
    },
    {
        type: "milestone",
        company: "High School",
        startDate: { month: 5, year: 2019 },
        endDate: { month: 5, year: 2019 },
        barColor: "green",
    },
];

export function dateToY(month: number, year: number): number {
    const totalMonths = (year - TIMELINE_START_YEAR) * 12 + (month - 1);
    const totalTimelineMonths = (TIMELINE_END_YEAR - TIMELINE_START_YEAR) * 12;
    return ((totalTimelineMonths - totalMonths) / 12) * YEAR_HEIGHT;
}

export function getBarHeight(start: { month: number; year: number }, end?: { month: number; year: number }): number {
    const endDate = end ?? { month: new Date().getMonth() + 1, year: new Date().getFullYear() };
    const months = (endDate.year - start.year) * 12 + (endDate.month - start.month);
    return Math.max(8, (months / 12) * YEAR_HEIGHT);
}

export function formatDate(d: { month: number; year: number }): string {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return `${months[d.month - 1]} ${d.year}`;
}
