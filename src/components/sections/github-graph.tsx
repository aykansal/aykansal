import { GitHubGraphClient } from "./github-graph-client";
import { GITHUB_USERNAME } from "@/config/links";

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface YearData {
    total: number;
    contributions: ContributionDay[];
}

async function fetchContributions(username: string, year: number): Promise<YearData | null> {
    try {
        const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
            { next: { revalidate: 3600 } },
        );
        if (!res.ok) return null;
        const data = await res.json();
        return {
            total: data.total[String(year)] ?? 0,
            contributions: data.contributions,
        };
    } catch {
        return null;
    }
}

export async function GitHubGraph() {
    const username = GITHUB_USERNAME;
    const years = [2026, 2025, 2024];

    const results = await Promise.all(
        years.map(async (year) => ({
            year,
            data: await fetchContributions(username, year),
        })),
    );

    const yearData: Record<number, YearData> = {};
    for (const { year, data } of results) {
        if (data) yearData[year] = data;
    }

    const availableYears = years.filter((y) => y in yearData);

    if (availableYears.length === 0) {
        return (
            <section className="mt-24">
                <h2 className="font-micro text-[40px] leading-none text-text-primary">GITHUB</h2>
                <p className="mt-4 font-space text-[14px] text-text-tertiary">
                    Could not load contributions.
                </p>
            </section>
        );
    }

    return <GitHubGraphClient yearData={yearData} availableYears={availableYears} />;
}
