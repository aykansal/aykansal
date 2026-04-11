import { SITE_URL, SOCIAL } from "./links";

export const SITE = {
    name: "Ayush Kansal",
    url: SITE_URL,
    domain: "aykansal.com",
    title: "Ayush Kansal",
    description: "Full-stack developer building web apps, real-time systems, and AI-powered products. Next.js, React, TypeScript, and Node.js. Available for freelance and contract work.",
    descriptionShort: "Full-stack developer building web apps, real-time systems, and AI-powered products. Available for freelance and contract work.",
    locale: "en_US",
    jobTitle: "Full-Stack Developer",
    employer: "",
    location: { city: "Mohali", country: "IN" },
    sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.x],
} as const;
