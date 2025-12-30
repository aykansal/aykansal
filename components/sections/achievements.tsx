import { Badge } from "@/components/ui/badge";
import { type Achievement, achievements } from "@/utils/data/achievements";

function AchievementItem({ achievement }: { achievement: Achievement }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold text-lg">{achievement.title}</h3>
        <Badge className="text-xs" variant="outline">
          {achievement.category}
        </Badge>
      </div>
      <p className="text-muted-foreground">{achievement.description}</p>
    </div>
  );
}

export function Achievements() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-2xl">Achievements</h1>
        <div className="flex flex-col gap-6">
          {achievements.map((achievement) => (
            <AchievementItem
              achievement={achievement}
              key={achievement.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
