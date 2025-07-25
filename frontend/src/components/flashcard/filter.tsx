"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";

type FilterState = {
  notLearned: boolean;
  learning: boolean;
  mastered: boolean;
  favorite: boolean;
};

type FilterProps = {
  filter: FilterState;
  setFilter: React.Dispatch<React.SetStateAction<FilterState>>;
};

export function Filter({ filter, setFilter }: FilterProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [openUpward, setOpenUpward] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const calculatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 200;

    setOpenUpward(spaceBelow < dropdownHeight);
    setShouldRender(true);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShouldRender(false);
    calculatePosition();
  };

  useEffect(() => {
    window.addEventListener("resize", calculatePosition);
    return () => window.removeEventListener("resize", calculatePosition);
  }, []);

  const toggleFilter = (key: keyof FilterState) => {
    setFilter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Menu as="div" className="relative text-left">
      <div>
        <MenuButton
          ref={buttonRef}
          onClick={handleClick}
          className="cursor-pointer rounded-md px-4 py-2"
        >
          Filter
        </MenuButton>
      </div>

      {shouldRender && (
        <MenuItems
          className={`absolute z-50 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition ${
            openUpward ? "bottom-full mb-2 right-0" : "top-full mt-2 right-0"
          }`}
        >
          <div className="p-2 text-sm text-gray-700 flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filter.favorite}
                onChange={() => toggleFilter("favorite")}
              />
              Favorite
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filter.notLearned}
                onChange={() => toggleFilter("notLearned")}
              />
              Not Learned
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filter.learning}
                onChange={() => toggleFilter("learning")}
              />
              Learning
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filter.mastered}
                onChange={() => toggleFilter("mastered")}
              />
              Mastered
            </label>
          </div>
        </MenuItems>
      )}
    </Menu>
  );
}
