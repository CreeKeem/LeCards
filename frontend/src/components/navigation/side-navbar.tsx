"use client";
import { useState } from "react";

export function SideNavbar() {
  const [extend, setExtend] = useState<boolean>(false);

  return (
    <div
      className={`bg-white drop-shadow-xl h-screen sticky top-0 flex flex-col items-start p-3 transition-all duration-300 ease-in-out overflow-hidden gap-4 ${
        extend ? "w-[200px]" : "w-[70px]"
      }`}
    >
      {/* Logo + Text */}
      <div className="flex items-center select-none">
        <img src="./logo.svg" alt="LeCards Logo" className="h-[40px]" />
        <h1
          className={`text-[20px] sm:text-[24px] ml-[12px] whitespace-nowrap text-laker-purple font-oswald font-bold transform transition-all duration-300 ease-in-out
            ${
              extend ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}
        >
          LeCards
        </h1>
      </div>

      {/* Collapse / Extend button */}
      <button
        className="hover:bg-gray-100 duration-300 p-3 rounded-2xl cursor-pointer mt-4 flex items-center"
        onClick={() => setExtend(!extend)}
      >
        <img
          src="/arrows/extendArrow.svg"
          alt="Toggle Arrow"
          className={`${extend ? "rotate-180" : "rotate-360" } transition-transform duration-300 ease-in-out select-none h-[15px]`}
        />
        <h3
          className={`text-[15px] sm:text-[15px] ml-[15px] whitespace-nowrap transform transition-all duration-300 ease-in-out
            ${
              extend ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}
        >
          {extend && ("Collapse")}
        </h3>
      </button>
    </div>
  );
}
