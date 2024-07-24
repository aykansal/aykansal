import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { socials, sections } from "../Data";

function SideFixed(props) {
  const [hoverStates, setHoverStates] = useState({});
  const [sectionActive, setSectionActive] = useState(1);
  const [socialHovers, setSocialHovers] = useState({});

  const handleHoverStart = (section) => {
    setHoverStates((prevHoverStates) => ({
      ...prevHoverStates,
      [section.id]: true,
    }));
  };

  const handleHoverEnd = (section) => {
    setHoverStates((prevHoverStates) => ({
      ...prevHoverStates,
      [section.id]: false,
    }));
  };

  const handleSocialHoverStart = (index) => {
    setSocialHovers((prevSocialHovers) => ({
      ...prevSocialHovers,
      [index]: "e2e8f0",
    }));
  };

  const handleSocialHoverEnd = (index) => {
    setSocialHovers((prevSocialHovers) => ({
      ...prevSocialHovers,
      [index]: "94a3b8",
    }));
  };

  return (
    <div className="flex flex-col h-full content-center gap-24 fixed">
      <div className="flex flex-col gap-y-4 2xl:gap-y-8">
        <h1 className="text-[3.8rem] 2xl:text-[5.1rem] font-bold text-slate-200">
          Ayush Kansal
        </h1>
        <h3 className="text-slate-300 font-semibold text-[1.75rem] 2xl:text-4xl">
          Junior Frontend Engineer
        </h3>
        <p className="w-[24rem] 2xl:w-[28rem] text-2xl 2xl:text-3xl">
          I build pixel-perfect, engaging, and accessible digital experiences.
        </p>
      </div>
      <ul className="flex flex-col gap-y-5">
        {sections.map((section) => (
          <NavLink to={{}} key={section.id}>
            <motion.div
              className="flex items-center gap-7"
              onClick={() => setSectionActive(section.id)}
              onHoverStart={() => handleHoverStart(section)}
              onHoverEnd={() => handleHoverEnd(section)}
            >
              <div
                className={`h-[2px] bg-slate-300 transition-all ease-in-out duration-300 ${
                  hoverStates[section.id] || sectionActive === section.id
                    ? "w-[5rem] opacity-100"
                    : "w-[2rem] opacity-50 "
                }`}
              />
              <li
                key={section.id}
                className={`uppercase font-bold text-sm xl:text-xl xl:tracking-widest ${
                  section.id === sectionActive ? "text-slate-200" : ""
                }`}
              >
                {section.name}
              </li>
            </motion.div>
          </NavLink>
        ))}
      </ul>
      <div className="flex gap-10">
        {socials.map((i, index) => (
          <motion.a
            key={i.id}
            href={i.profile}
            onHoverStart={() => handleSocialHoverStart(index)}
            onHoverEnd={() => handleSocialHoverEnd(index)}
          >
            <img className="h-8 xl:h-11 w-8 xl:w-11" src={i.icon} />
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default SideFixed;
