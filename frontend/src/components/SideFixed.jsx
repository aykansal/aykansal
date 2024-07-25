import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { socials, sections } from "../Data";
// import { Navbar } from "./";

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
    <div className="flex flex-col h-full content-center gap-24 lg:fixed">
      <div className="flex flex-col -mt-4 gap-y-4 2xl:gap-y-8">
        <h1 className="text-[3rem] text-[2.7rem] xl:text-[3.9rem] 2xl:text-[5.1rem] font-bold text-slate-200">
          Ayush Kansal
        </h1>
        <h3 className="text-slate-300 font-semibold text-[1.75rem] 2xl:text-4xl">
          Junior Frontend Engineer
        </h3>
        {window.innerWidth >= 1024 ? (
          <p className="w-[24rem] 2xl:w-[28rem] text-2xl 2xl:text-3xl">
            I build pixel-perfect, engaging, and accessible digital experiences.
          </p>
        ) : (
          <p className="w-full xl:w-[30rem] text-justify 2xl:text-xl">
            My main focus these days is building accessible user interfaces for
            our customers at Klaviyo. I most enjoy building software in the
            sweet spot where design and engineering meet — things that look good
            but are also built well under the hood. In my free time, I've also
            released an online video course that covers everything you need to
            know to build a web app with the Spotify API.
          </p>
        )}
      </div>
      {window.innerWidth >= 1024 && (
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
      )}
      {window.innerWidth >= 1024 && (
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
      )}
    </div>
  );
}

export default SideFixed;
