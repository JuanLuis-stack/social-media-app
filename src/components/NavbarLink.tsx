// NavbarLink.tsx

import type React from "react";
import { NavLink } from "react-router-dom";
import { UseAnimation } from "../context/AnimationContext";
import { UseSubmitterPost } from "../context/SubmitPostContext";

type navbarLinkType = {
  to: string;
  children: React.ReactNode;
  className?: string;
  url: string;
  name: string;
};

function Navbarlink({ to, children, className, url, name }: navbarLinkType) {
  const { animate, activeAnimation } = UseAnimation();
  const { openSubmitPost } = UseSubmitterPost();

  if (to === "special") {
    return (
      <div
        id="newPostNavbar"
        onClick={() => {
          activeAnimation("newPostNavbar");
          openSubmitPost();
        }}
        className={`flex start text-sm items-center cursor-pointer hover:bg-white/3 p-2 rounded-md duration-300 ${animate === "newPostNavbar" && "animate-[spanIn_400ms_ease]"}`}
      >
        <div
          className={`flex items-center ${animate === "newPostNavbar" && `animate-[spanIn_400ms_ease]`}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="2 2 20 20"
            className="mr-2 "
          >
            <path d={url}></path>
          </svg>
          <div className="hidden md:block">{children}</div>
        </div>
      </div>
    );
  }
  return (
    <NavLink
      className={({ isActive }) =>
        `flex start text-sm lg:text-md hover:bg-white/3 p-2 rounded-md duration-300 ${className ?? ""} ${isActive && "bg-white/10"}`
      }
      to={to}
      id={name}
      onClick={() => activeAnimation(name)}
    >
      <div
        className={`flex items-center ${animate === name && `animate-[spanIn_400ms_ease]`}`}
        id={name}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="2 2 20 20"
          className="mr-2"
        >
          <path d={url}></path>
        </svg>
        <div className="hidden md:block">{children}</div>
      </div>
    </NavLink>
  );
}

export default Navbarlink;
