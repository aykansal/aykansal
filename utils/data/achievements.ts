export interface Achievement {
  title: string;
  description: string;
  category: "hackathons" | "awards" | "community" | "grants";
}

export const achievements: Achievement[] = [
  {
    title: "Hackathon Success",
    description:
      "Winner of 6 hackathons (4 international), finalist in 10+, and organizer of 15+ technical events.",
    category: "hackathons",
  },
  {
    title: "Arweave India Incubation Launchpad",
    description:
      "Graduated from Arweave India Incubation Launchpad, awarded USD 2,500 grant, and showcased at Arweave Day Asia 2025.",
    category: "grants",
  },
  {
    title: "Best Software Project on Campus",
    description: "Received Best Software Project on Campus award.",
    category: "awards",
  },
  {
    title: "GEEK ROOM Community Manager",
    description: "Community Manager at GEEK ROOM (1,800+ students).",
    category: "community",
  },
];
