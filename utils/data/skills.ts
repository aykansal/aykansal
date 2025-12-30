export interface Skill {
  name: string;
  category: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Generative AI",
    skills: [
      { name: "FastAPI", category: "Generative AI" },
      { name: "Agent Orchestration", category: "Generative AI" },
      { name: "OpenAI Agents SDK", category: "Generative AI" },
      { name: "Vercel AI SDK", category: "Generative AI" },
      { name: "LangChain", category: "Generative AI" },
      { name: "LangGraph", category: "Generative AI" },
    ],
  },
  {
    title: "Full-Stack Web",
    skills: [
      { name: "React", category: "Full-Stack Web" },
      { name: "Next.js", category: "Full-Stack Web" },
      { name: "JavaScript", category: "Full-Stack Web" },
      { name: "TypeScript", category: "Full-Stack Web" },
      { name: "REST API Integration", category: "Full-Stack Web" },
      { name: "Vitest", category: "Full-Stack Web" },
      { name: "Node.js", category: "Full-Stack Web" },
      { name: "Express.js", category: "Full-Stack Web" },
      { name: "Hono", category: "Full-Stack Web" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "SQL", category: "Databases" },
      { name: "PostgreSQL", category: "Databases" },
      { name: "Prisma ORM", category: "Databases" },
      { name: "Supabase", category: "Databases" },
      { name: "MongoDB", category: "Databases" },
    ],
  },
  {
    title: "Cloud / DevOps",
    skills: [
      { name: "AWS (ECS, EC2, ALB)", category: "Cloud / DevOps" },
      { name: "Docker", category: "Cloud / DevOps" },
      { name: "Coolify", category: "Cloud / DevOps" },
      { name: "Git", category: "Cloud / DevOps" },
      { name: "CI/CD", category: "Cloud / DevOps" },
    ],
  },
  {
    title: "Professional",
    skills: [
      { name: "Ownership", category: "Professional" },
      { name: "Self-starter mindset", category: "Professional" },
      { name: "Teamwork", category: "Professional" },
      { name: "Fast learner", category: "Professional" },
      { name: "Problem-solving", category: "Professional" },
    ],
  },
];
