import React from "react";
import { workExperience } from "../constants/Data";
import { SectionTitle, WorkTimeline } from "./Utility";

function Experience() {
  return (
    <>
      <section className="h-[90vh] flex flex-col items-center px-24 gap-y-10 my-10 w-full">
        <SectionTitle title="Work Experience" />
        <div className="w-full flex flex-col relative gap-y-10 flex flex-col gap-y-5 grid grid-flow-row grid-rows-2">
          {workExperience.map((i) => (
            <WorkTimeline {...i} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Experience;
