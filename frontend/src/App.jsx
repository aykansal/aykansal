import React from "react";
import SideFixed from "./components/SideFixed";
import SideScroll from "./components/SideScroll";
import { Navbar } from "./components";

function App() {
  return (
    <div
      className={`bg-slate-900 min-h-screen max-w-screen ${
        window.innerWidth > 768 && "flex justify-center"
      }`}
    >
      {/* <Navbar /> */}
      <div className="lg:flex justify-between gap-10 xl:gap-x-7 2xl:gap-x-0 justify-center max-w-[1536px] text-slate-400 py-[4rem] xl:py-[6rem] px-[6rem] xs:px-[6rem] sm:px-[6rem] md:px-[6rem] lg:px-[3.5rem] xl:px-[2rem] 2xl:px-[8rem]">
        <div className="basis-[45%] 2xl:basis-1/2  ">
          <SideFixed />
        </div>
        <div className="basis-[50%] xl:basis-[45%]  2xl:basis-1/2">
          <SideScroll />
        </div>
      </div>
    </div>
  );
}

export default App;
