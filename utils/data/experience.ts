export interface Skill {
  name: string;
}

export type PositionType =
  | "Co-op"
  | "Internship"
  | "Part-time"
  | "Full-time"
  | "Self-Employed"
  | "Contract";

export interface Position {
  role: string;
  type: PositionType;
  startDate: Date;
  endDate: Date | "present";
  location: string;
}

export interface ExperienceItem {
  company: string;
  companyUrl?: string;
  location: string;
  skills: Skill[];
  logo?: string;
  currentPosition: Position;
  promotions?: Position[];
  category: "work" | "education";
  note?: string;
}

export const experiences: ExperienceItem[] = [
  {
    company: "Chandigarh University",
    location: "Mohali, Punjab, India",
    currentPosition: {
      role: "Bachelor of Engineering in Computer Science and Engineering",
      type: "Full-time",
      startDate: new Date("2022-08-01"),
      endDate: new Date("2026-05-01"),
      location: "Mohali, Punjab, India",
    },
    skills: [],
    logo: "/images/chandigarh-university.webp",
    category: "education",
  },
];
