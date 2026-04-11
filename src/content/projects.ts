export interface Project {
    slug: string;
    title: string;
    description: string;
    image?: string;
    liveUrl?: string;
    repoUrl?: string;
    source: "open" | "closed";
    status: "online" | "in-dev" | "archived";
    stack: string[];
}

export const projects: Project[] = [
    {
        slug: "cursor-workspace-manager",
        title: "Cursor Workspace Manager",
        description:
            "A desktop application enabling developers to inspect Cursor IDE workspace storage and safely transfer chat threads and context between different workspace hashes.",
        liveUrl: undefined,
        repoUrl: "https://github.com/aykansal/cursor-workspace-manager",
        source: "open",
        status: "in-dev",
        stack: ["Electron", "React", "TypeScript", "Tailwind CSS", "SQLite"],
    },
    {
        slug: "oauth-tokens-microservice",
        title: "MCP Token Microservice",
        description:
            "A Redis-based Token Vending Machine microservice that fully abstracts and secures OAuth token lifecycles from the main application via proactive caching and PostgreSQL storage.",
        liveUrl: undefined,
        repoUrl: "https://github.com/aykansal/MCP-Tokens-Microservice",
        source: "open",
        status: "archived",
        stack: ["Bun", "Redis", "PostgreSQL", "OAuth 2.0", "Microservices"],
    },
    {
        slug: "tryanon-ai",
        title: "Tryanon",
        description:
            "AI harness that generates full-stack Web3 applications from plain text prompts, compiling and deploying directly to blockchain.",
        liveUrl: "https://tryanon.ai",
        repoUrl: "https://github.com/aykansal/tryanon-fe",
        source: "open",
        status: "archived",
        stack: ["React", "TypeScript", "Lua", "Arweave", "OpenAI API"],
        image: "/banners/projects/tryanon.png"
    },
    {
        slug: "yielder-protocol",
        title: "Yielder Protocol",
        description:
            "Yielder is an autonomous yield aggregator on the AO computer that automatically finds and stakes your assets in the most profitable liquidity pools across multiple DEXs",
        liveUrl: "https://www.youtube.com/watch?v=KCot-h2u5oY",
        repoUrl: "https://github.com/aykansal/Yielder",
        source: "open",
        status: "archived",
        stack: ["React", "Lua", "Blockchain", "Arweave", "DeFi", "Hackathon Win"],
        image: "/banners/projects/yielder.png"
    },
];
