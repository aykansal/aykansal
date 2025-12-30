import type { Metadata } from "next";
import { Achievements } from "@/components/sections/achievements";

export const metadata: Metadata = {
  title: "Achievements",
  description: "My achievements, awards, and community contributions.",
};

export default function AchievementsPage() {
  return <Achievements />;
}
