import NFTNexs from "../assets/nftnexus.png";
import Node from "../assets/toolroom/Node.svg";
import Axios from "../assets/toolroom/Axios.svg";
import MongoDB from "../assets/toolroom/Mongo.svg";
import Express from "../assets/toolroom/Express.svg";
import Tailwind from "../assets/toolroom/Tailwind.svg";
import Firebase from "../assets/toolroom/Firebase.svg";
import Mongoose from "../assets/toolroom/Mongoose.svg";
import Boy from "../assets/Boy.svg";
import headerBG from "../assets/headerBg.svg";

export const headerData = {
  bg: headerBG,
  boy: Boy,
};
export const tools = [
  {
    name: "React",
    logoSrc:
      "https://img.icons8.com/external-tal-revivo-color-tal-revivo/24/external-react-a-javascript-library-for-building-user-interfaces-logo-color-tal-revivo.png",
  },
  { name: "Node", logoSrc: Node },
  { name: "MongoDB", logoSrc: MongoDB },
  { name: "Tailwind", logoSrc: Tailwind },
  { name: "Git", logoSrc: "Git" },
  { name: "Axios", logoSrc: Axios },
  { name: "Express", logoSrc: Express },
  { name: "Firebase", logoSrc: Firebase },
  { name: "Mongoose", logoSrc: Mongoose },
  { name: "GitHub", logoSrc: "GitHub" },
];
export const projects = [
  {
    type: "Web3 Community Platform",
    title: "NFT Nexus",
    about:
      "Platform to connect NFT enthusiasts and creators to Enhance market Reach and foster Community Growth.",
    stack: ["React", "TailwindCSS", "MongoSDB", "Express", "NodeJS"],
    imgSrc: NFTNexs,
    live: "https://nftnexs.vercel.app",
    code: "",
  },
  {
    type: "Web3 Community Platform",
    title: "UniSync",
    about:
      "Platform for organizing NFT enthusiasts and creators to enhance market reach and foster community growth.",
    stack: ["React", "TailwindCSS", "MongoSDB", "Express", "NodeJS"],
    imgSrc: NFTNexs,
    live: "https://campusync.vercel.app",
    code: "",
  },
  {
    type: "Web3 Community Platform",
    title: "BuildNest",
    about:
      "Platform for organizing NFT enthusiasts and creators to enhance market reach and foster community growth.",
    stack: ["React", "TailwindCSS", "MongoSDB", "Express", "NodeJS"],
    imgSrc: NFTNexs,
    live: "https://campusync.vercel.app",
    code: "",
  },
];
export const socials = {
  linkedin: {
    profile: "https://linkedin.com/in/aykansal",
    icon: "linkedin",
  },
  github: { github: "https://github.com/Ayush031", icon: "github" },
  twitter: { github: "https://x.com/aykansal", icon: "twitter" },
};
export const schools = [
  {
    logo: "buildspace",
    title: "BuildSpace",
    cgpa: "NA",
    course: "Startup",
    duration: "June 2024",
    status: "Enrolled",
    delay: 0,
  },
  {
    logo: "cu",
    title: "Chandigarh University",
    cgpa: "8 CGPA",
    course: "B.Tech Computer Science",
    duration: "2022-2026",
    status: "Enrolled",
    delay: 0.5,
  },
  {
    logo: "dav",
    title: "Kali Ram DAV Public School",
    cgpa: "88.7%",
    course: "12th",
    duration: "2021",
    status: "Completed",
    delay: 1,
  },
];
export const workExperience = [
  {
    companyName: "Curious EcoSystem",
    position: "Full Stack Developer",
    startDate: "Jun 2024",
    endDate: "Present",
    workDesc: "Building About Page of the company website with React , TailwindCSS, Aceternity UI, Framer Motion.",
  },
  {
    companyName: "WictroniX",
    position: "FrontEnd Developer",
    startDate: "Jun 2023",
    endDate: "Jul-2023",
    workDesc: "Creating About Page of the company website.",
  },
];
