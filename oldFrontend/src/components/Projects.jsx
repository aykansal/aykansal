import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import arrow from "../assets/arrow.svg";
import { SectionTitle } from "./Utility.jsx";
import { projects } from "../constants/Data.jsx";

function Projects() {
  return (
    <section className="flex flex-col gap-20 items-center h-[90vh] w-screen text-primary text-center px-20">
      <SectionTitle title="Project Portfolio" />
      <div className="h-full w-full">
        <div className="flex grid grid-cols-3 gap-3 text-left">
          {projects.map((project, index) => (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                ease: "easeInOut",
                type: "tween",
                delay: 0.4 * index,
                duration: 0.4,
              }}
            >
              <ProjectCard key={project.title} project={project} />
            </motion.div>
          ))}
        </div>
        <div className="text-right pr-5 pt-3 text-2xl">
          <Link
            to={"/projects"}
            className="flex justify-end items-center"
            aria-disabled
          >
            <span className="hover:text-[#BFE274] transition-all duration-75 ease-in-out">
              View all Projects
            </span>
            <img src={arrow} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Projects;

function ProjectCard({ project }, ...props) {
  const [visibility, setVisibility] = useState("hidden");
  return (
    <motion.div
      className="bg-slate-800/70 rounded-md mx-2 pb-6 text-lg overflow-hidden h-[27rem] transition-scale duration-300
        hover:scale-[1.014]"
      onHoverStart={() => setVisibility("visible")}
      onHoverEnd={() => setVisibility("hidden")}
    >
      <motion.div
        onHoverStart={() => setVisibility("visible")}
        onHoverEnd={() => setVisibility("hidden")}
        className="relative w-full flex items-center h-[57%] justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${project.imgSrc})` }}
      >
        <div
          className={`absolute inset-0 transition-all duration-300 backdrop-filter ${
            visibility === "visible" ? "backdrop-blur-[2px]" : "backdrop-blur-0"
          }`}
        />
        {visibility === "visible" && (
          <motion.div
            animate={{ y: [10, 0], opacity: [0, 1] }}
            transition={{
              ease: "easeInOut",
              type: "tween",
              delay: 0.1,
              duration: 0.3,
            }}
          >
            <Link
              to={project.live}
              target="_blank"
              className={`flex gap-2 z-20 transition-all duration-300 ${visibility}`}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                opacity={0.75}
                stroke="#ffffff"
                viewBox="0 0 24.00 24.00"
                strokeWidth="1.6320000000000001"
                xmlns="http://www.w3.org/2000/svg"
                transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#a14a4a"
                  strokeWidth="0.24000000000000005"
                />
                <g id="SVGRepo_iconCarrier">
                  <g clipPath="url(#clip0_15_200)">
                    <circle
                      cx={12}
                      cy={13}
                      r={2}
                      stroke="#14e956"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 7.5C7.69517 7.5 4.47617 11.0833 3.39473 12.4653C3.14595 12.7832 3.14595 13.2168 3.39473 13.5347C4.47617 14.9167 7.69517 18.5 12 18.5C16.3048 18.5 19.5238 14.9167 20.6053 13.5347C20.8541 13.2168 20.8541 12.7832 20.6053 12.4653C19.5238 11.0833 16.3048 7.5 12 7.5Z"
                      stroke="#14e956"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
              </svg>
              <span className="text-neutral-300 opacity-100 ">Preview</span>
            </Link>
          </motion.div>
        )}
      </motion.div>
      <div className="m-3 h-[43%] flex flex-col item-start justify-center gap-1">
        <div className="flex justify-between pr-10 items-center">
          <h1 className="text-3xl">{project.title}</h1>
          <Link to={project.code} target="_blank">
            <svg
              width="40"
              height="40"
              viewBox="0 0 32.00 32.00"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#ffffff"
              stroke="#ffffff"
              strokeWidth="0.00032"
              transform="matrix(1, 0, 0, 1, 0, 0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#ffffff"
                  d="M16 5.343c-6.196 0-11.219 5.023-11.219 11.219 0 4.957 3.214 9.162 7.673 10.645 0.561 0.103 0.766-0.244 0.766-0.54 0-0.267-0.010-1.152-0.016-2.088-3.12 0.678-3.779-1.323-3.779-1.323-0.511-1.296-1.246-1.641-1.246-1.641-1.020-0.696 0.077-0.682 0.077-0.682 1.126 0.078 1.72 1.156 1.72 1.156 1.001 1.715 2.627 1.219 3.265 0.931 0.102-0.723 0.392-1.219 0.712-1.498-2.49-0.283-5.11-1.246-5.11-5.545 0-1.226 0.438-2.225 1.154-3.011-0.114-0.285-0.501-1.426 0.111-2.97 0 0 0.941-0.301 3.085 1.15 0.894-0.25 1.854-0.373 2.807-0.377 0.953 0.004 1.913 0.129 2.809 0.379 2.14-1.453 3.083-1.15 3.083-1.15 0.613 1.545 0.227 2.685 0.112 2.969 0.719 0.785 1.153 1.785 1.153 3.011 0 4.31-2.624 5.259-5.123 5.537 0.404 0.348 0.761 1.030 0.761 2.076 0 1.5-0.015 2.709-0.015 3.079 0 0.299 0.204 0.648 0.772 0.538 4.455-1.486 7.666-5.69 7.666-10.645 0-6.195-5.023-11.219-11.219-11.219z"
                />
              </g>
            </svg>
          </Link>
        </div>
        <h2 className="text-gray-400 ">{project.about}</h2>
        <div className="flex flex-col gap-1" >
          <h3>Tech Stack:&nbsp;</h3>
          <p className="text-[#bae0c4] font-mono flex flex-wrap">
            {project.stack.map((i) => (
              <span className="border border-primary rounded-3xl text-sm px-2 py-[1px] ml-1">
                {i}
              </span>
            ))}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
