export interface Service {
    number: string;
    title: string;
    description: string;
    includes: string[];
}

export const services: Service[] = [
    {
        number: "01",
        title: "CUSTOM DEVELOPMENT",
        description:
            "From landing pages to full-stack applications. You bring the idea, I write the code that ships it.",
        includes: [
            "Next.js / React applications",
            "API design and integration",
            "Database architecture",
            "Performance optimization",
            "Deployment and CI/CD setup",
        ],
    },
    {
        number: "02",
        title: "AI Platform Engineering",
        description:
            "Building robust infrastructure and workflows to integrate custom intelligent LLM agents into your applications.",
        includes: [
            "Agentic Workflows & System Design",
            "LLM API Integrations & Tool Calling",
            "Evaluation & Feedback Loops",
            "Context Engineering & Memory",
            "RAG (Retrieval-Augmented Generation)",
        ],
    },
    {
        number: "03",
        title: "CONTRACT HIRE",
        description:
            "Embed me in your team for a sprint or a quarter. I plug into your workflow, your stack, your codebase.",
        includes: [
            "Part-time or full-time availability",
            "Async-first communication",
            "Your tools, your process",
            "Weekly progress reports",
            "Flexible contract terms",
        ],
    },
];
