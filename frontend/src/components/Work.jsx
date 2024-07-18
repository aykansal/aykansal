import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { work } from "../Data";

function Work() {
  return (
    <>
      <div className="">Experience</div>
      {work.map((company) => (
        <div className="flex gap-x-5 bg-transparent backdrop-filter hover:bg-slate-800/[0.65] rounded-md transition-all ease-in-out py-8 px-5">
          <div className="basis-1/5">{company.date}</div>
          <div className="basis-4/5 flex flex-col gap-y-2">
            <Link className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base">
              {company.title}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clip-rule="evenodd"
                />
              </motion.svg>
            </Link>
            <p className="text-justify pr-20 leading-normal">{company.about}</p>
            <div className="mt-4 flex items-center">
              {company.stack.map((i) => (
                <span className="mr-2  rounded-full bg-teal-400/10 px-3 py-1 text-[.85rem] font-medium  text-teal-300 ">
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Work;
