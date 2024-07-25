import { headerData } from "../constants/Data";
import { motion } from "framer-motion";

function Header() {
  return (
    <>
      <section
        className="overflow-hidden text-white px-28 flex justify-center items-center h-screen mb-10"
        style={{
          backgroundImage: `url(${headerData.bg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          transition: "background-image 1s ease"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          className="basis-[60%] flex flex-col gap-5"
          initial={{ x: -600, visibility: "hidden", opacity: 0 }}
          animate={{ x: 0, visibility: "visible", opacity: 1 }}
          transition={{
            duration: 1.1,
            type: "tween",
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          <h3 className="bg-primary/[0.22] w-fit text-[1.4rem] text-primary tracking-wider px-4 py-2 rounded-xl ml-2">
            <span>✌🏻</span> Hi There! I'm Ayush
          </h3>
          <h1 className="text-7xl font-bold">
            A <span className=" font-cyborg text-primary">FrontEnd </span>
            Engineer
          </h1>
          <p className="text-gray-300 text-pretty text-2xl mt-4 w-[70%]">
            With a passion for Developing rich web applications and seamless
            interactive web experiences and responsive web applications.
          </p>
        </motion.div>
        <motion.div
          className="basis-[40%] mr-16"
          initial={{ x: 300, visibility: "hidden", opacity: 0 }}
          animate={{ x: 0, visibility: "visible", opacity: 1 }}
          transition={{
            duration: 1.1,
            type: "tween",
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          <img src={headerData.boy} alt="" height={366} width={500} />
        </motion.div>
      </section>
    </>
  );
}

export default Header;
