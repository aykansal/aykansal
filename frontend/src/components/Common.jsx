import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { headingClass } from "../Data";

function Common({ array, sectionName }) {
  const [hoverBox, setHoverBox] = useState(null);

  return (
    <>
      <div id={sectionName} className={headingClass}>{sectionName}</div>
      {array?.map((prj) => (
        <motion.div
          key={prj.title}
          className={`flex flex-col justify-between sm:flex-row gap-[0.31rem] sm:gap-3 bg-transparent font-inter hover:bg-slate-800/[0.65] rounded-md transition-all ease-in-out py-3 xl:py-6 px-3 xl:px-5 w-[1/3] items-start
            ${hoverBox !== null && hoverBox !== prj.id ? "opacity-60" : ""}`}
          onHoverStart={() => setHoverBox(prj.id)}
          onHoverEnd={() => setHoverBox(null)}
        >
          <div className="basis-[20%] ">{prj.date}</div>
          <div className="basis-[80%] flex flex-col gap-y-1 flex-wrap">
            <Link className="inline-flex items-baseline font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base 2xl:text-[1.125rem] tracking-wide">
              {prj.title}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </Link>
            <p className="text-justify pr-6 xl:pr-12 2xl:pr-6 2xl:text-base">
              {prj.about}
            </p>
            <div className="mt-1 flex items-center flex-wrap">
              {prj.stack.map((i) => (
                <span
                  key={i}
                  className="m-1 rounded-full bg-teal-400/10 px-3 py-[0.15rem] text-[.85rem] 2xl:text-[.8rem] tracking-widest font-medium text-teal-300"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

export default Common;
