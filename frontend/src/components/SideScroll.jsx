import React, { useEffect } from "react";
import Lenis from "lenis";
import { Projects, Blogs, Work, Community } from "./index";

export default function SideScroll() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col gap-y-10">
      <p className="text-justify">
        My main focus these days is building accessible user interfaces for our
        customers at Klaviyo. I most enjoy building software in the sweet spot
        where design and engineering meet — things that look good but are also
        built well under the hood. In my free time, I've also released an online
        video course that covers everything you need to know to build a web app
        with the Spotify API.
      </p>
      <Projects />
      <Work />
      <Community />
      <Blogs />
    </div>
  );
}
