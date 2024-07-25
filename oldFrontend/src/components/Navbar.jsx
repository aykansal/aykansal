import React from "react";

function Navbar() {
  return (
    <nav className="absolute border border-white text-white" >
      <div>logo</div>
      <ul className="flex">
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
