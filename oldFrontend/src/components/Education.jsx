import { SectionTitle, Timeline } from "./Utility";
import { motion } from "framer-motion";
import { schools } from "../constants/Data";

function Education() {
  return (
    <section className="h-[90vh] flex flex-col items-center px-24 my-10 w-full">
      <SectionTitle title="Education" />
      <div className=" relative text-textLightGray2 text-lg my-10 w-full flex justify-center gap-10">
        {schools.map((school) => (
          <Timeline {...school} />
        ))}
      </div>
    </section>
  );
}

export default Education;

const SchoolCard = (props) => {
  return <></>;
};
