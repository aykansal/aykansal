import { motion } from "framer-motion";

export function SectionTitle({ title }) {
  return (
    <div className="sectionTitle w-fit">
      <h2 className="text-5xl font-extrabold">{title}</h2>
    </div>
  );
}

export function Timeline(props) {
  return (
    <div className="relative h-72 w-96 rounded-t-3xl overflow-hidden p-5 bg-neutral-700">
      <div className="flex justify-between items-center h-1/3 text-2xl">
        {/* <img
          alt="logo"
          src={props.logo}
          className="bottom-1 left-1/2 transform -translate-x-1/2"
        /> */}
        <h2>{props.title}</h2>
      </div>
      <div className="h-2/3 font-mono border ">
        <div>{props.course}</div>
        <div>{props.cgpa}</div>
        {props.courseDesc && <div>{props.courseDesc}</div>}
        <div>{props.duration}</div>
      </div>
    </div>
  );
}

export function WorkTimeline(props) {
  return (
    <div className="shadow shadow-white flex flex-col gap-y-5 items-start text-textLightGray1 bg-slate-600 bg-transparent rounded-xl p-5 row-span-1 h-[12rem]">
      <div className="flex justify-between items-center w-[35rem]">
        <span className="text-3xl"> {props.companyName}</span>
        <span className="text-2xl">
          {props.startDate}
          {" - "}
          {props.endDate}
        </span>
      </div>
      <p className="text-lg font-mono w-full h-full">{props.workDesc}</p>
    </div>
  );
}

export function allProjTimeline(props) {
  return (
    <div className="border w-full h-full flex flex-col relative gap-y-10 ">
      {/* {workExperience.map((i) => (
      <div className="flex mx-10">
        <div className="border border-textPrimaryLight flex items-start justify-center relative">
          <div className="h-4 w-4 rounded-full absolute bg-primary" />
        </div>
        <div className=" mx-10">
          <WorkTimeline {...i} />
        </div>
      </div>
    ))} */}
    </div>
  );
}
