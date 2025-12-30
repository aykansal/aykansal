export interface Technology {
  name: string;
}

export const statusConfig = {
  active: {
    label: "Active",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  completed: {
    label: "Completed",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  archived: {
    label: "Archived",
    className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  },
  inactive: {
    label: "Inactive",
    className: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
} as const;

export type StatusType = keyof typeof statusConfig;

export interface ProjectStatus {
  type: StatusType;
  label?: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  technologies: Technology[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  status: ProjectStatus;
  category:
    | "devtool"
    | "web"
    | "mobile"
    | "api"
    | "tool"
    | "game"
    | "other"
    | "saas";
}

export const projects: ProjectItem[] = [
  {
    name: "Anon",
    description:
      "Turn ideas into Web3 dApps in 60 seconds. Scaled to 200+ unique users in under 30 days, serving 10k+ filtered requests.",
    technologies: [
      { name: "React" },
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "PostgreSQL" },
      { name: "FastAPI" },
      { name: "OpenAI SDK" },
      { name: "Claude SDK" },
      { name: "Groq APIs" },
      { name: "Arweave" },
    ],
    liveUrl: "https://tryanon.ai",
    githubUrl: "https://github.com/aykansal",
    image: "/images/tryanon.webp",
    status: {
      type: "active",
      label: "Creator & Developer",
    },
    category: "web",
  },
  {
    name: "AvenPing",
    description:
      "AI Support with WhatsApp Business Automation. Features RAG pipeline, multi-LLM orchestration, and confidence scoring.",
    technologies: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Vercel AI SDK" },
      { name: "PostgreSQL" },
      { name: "pgvector" },
      { name: "Jina AI" },
      { name: "LangChain" },
      { name: "WhatsApp Business API" },
    ],
    liveUrl: "https://avenping.com",
    githubUrl: "https://github.com/aykansal",
    image: "/images/avenping.webp",
    status: {
      type: "active",
      label: "Creator & Developer",
    },
    category: "saas",
  },
  {
    name: "Visual AO",
    description:
      "Text-to-Visual Programming Platform powered by n8n + ChatGPT. AI copilot for workflow generation with ReactFlow integration.",
    technologies: [
      { name: "React" },
      { name: "TypeScript" },
      { name: "n8n" },
      { name: "ReactFlow" },
      { name: "LangChain" },
      { name: "OpenAI Func Calling" },
      { name: "Gemini Base URL" },
    ],
    githubUrl: "https://github.com/aykansal/visual-ao",
    image: "/images/visual-ao.webp",
    status: {
      type: "completed",
      label: "Creator & Developer",
    },
    category: "devtool",
  },
];
