import { Badge } from "@/components/ui/badge";
import { type SkillCategory, skillsData } from "@/utils/data/skills";

function SkillsCategory({ category }: { category: SkillCategory }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-lg">{category.title}</h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <Badge
            className="px-3 py-1 text-sm"
            key={skill.name}
            variant="secondary"
          >
            {skill.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-2xl">
          Technical and Interpersonal Skills
        </h1>
        <div className="flex flex-col gap-6">
          {skillsData.map((category) => (
            <SkillsCategory category={category} key={category.title} />
          ))}
        </div>
      </div>
    </div>
  );
}
