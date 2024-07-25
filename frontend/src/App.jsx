import React from "react";
import SideFixed from "./components/SideFixed";
import SideScroll from "./components/SideScroll";
import { Navbar } from "./components";
import { sections } from "./Data";

function App() {
  return (
    <div
      className={`bg-slate-900 min-h-screen max-w-screen
        ${window.innerWidth > 768 && "flex justify-center"}`}
    >
      {window.innerWidth <= 640 && <Navbar navItems={sections} />}
      <div className="lg:flex gap-x-10 xl:gap-x-[5rem] justify-center w-full text-slate-400 py-[1.25rem] sm:py-[4rem] xl:py-[5rem] 2xl:py-[6rem] px-[1.25rem] sm:px-[3.5rem] md:px-[3.5rem] lg:px-[3.5rem] xl:px-[2rem] 2xl:px-[6rem]">
        <div className="basis-[45%] 2xl:basis-[35%]">
          <SideFixed />
        </div>
        <div className="basis-[50%] xl:basis-[45%] 2xl:basis-[36%]">
          <SideScroll />
        </div>
      </div>
    </div>
  );
}

export default App;
