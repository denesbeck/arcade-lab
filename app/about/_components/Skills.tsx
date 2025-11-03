import { Heading3, Info } from "@/_components";
import { SKILLS } from "../_config/data";
import Tooltip from "@mui/material/Tooltip";

const Skills = () => {
  return (
    <div className="overflow-x-auto py-1 animate-text-focus max-w-[30rem]">
      <Heading3>Skills</Heading3>
      <Info>Most of the time I work with the following tools:</Info>
      <div className="flex flex-wrap gap-4 items-center mt-3.5">
        {SKILLS.map((skill) => {
          const Icon = skill.icon;
          return (
            <Tooltip key={skill.name} arrow title={skill.name}>
              <Icon className="text-3xl transition-all duration-200 ease-in-out hover:scale-110 text-primary hover:brightness-125" />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
