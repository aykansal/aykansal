import { motion } from "framer-motion";
import { tools, socials } from "../constants/Data.jsx";
import { SectionTitle } from "./Utility.jsx";

function ToolRoom() {
  return (
    <section className="h-screen -mb-20 ">
      <div className=" flex flex-col justify-center items-center py-10 gap-20">
        <div className="flex flex-col items-center gap-5">
          <SectionTitle title="Skills & Tools" />
          <motion.p
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.8 }}
            className="text-neutral-300 text-[27px] "
          >
            Visit my
            <a
              href={socials.linkedin.profile}
              target="_blank"
              className="fontbold text-blue-400"
            >
              &nbsp;Linkedin&nbsp;
            </a>
            for more details.
          </motion.p>
        </div>
        <motion.div className="flex flex-wrap gap-3 grid grid-cols-5 gap-y-7 scale-[1.25] ">
          {tools.map((tool, index) => {
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: -80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.17 }}
                className="flex items-center justify-center gap-3 bg-primary/[0.15] font-exospace text-primary text-[26.5px] p-2 pt-3 tracking-wider rounded-xl"
              >
                <img src={tool.logoSrc} width="28" />
                <span>{tool.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
        {/* <OrbitingCirclesDemo /> */}
      </div>
    </section>
  );
}

export default ToolRoom;
