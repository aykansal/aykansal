import React from "react";
import SideFixed from "./components/SideFixed";
import SideScroll from "./components/SideScroll";

function App() {
  return (
    <div className="flex text-slate-400 bg-slate-900 min-h-screen max-w-screen py-[6rem] px-[12rem]">
      <div className="basis-1/2">
        <SideFixed />
      </div>
      <div className="basis-1/2">
        <SideScroll />
      </div>
    </div>
  );
}

export default App;
