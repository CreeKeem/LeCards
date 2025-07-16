"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export function Ellipsis({
  handleDelete,
  handleEdit,
}: {
  handleDelete: () => void;
  handleEdit: () => void;
}) {
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

  return (
    <Menu as="div" className="relative text-left">
      <div>
        <MenuButton
          ref={buttonRef}
          onClick={handleClick}
          className="text-[#9CA3AF] cursor-pointer focus:outline-none rounded-full p-1 py-2 hover:bg-gray-100"
        >
          <img src="/ellipsisIcon.svg" alt="..." />
        </MenuButton>
      </div>

      {shouldRender && (
        <MenuItems
          className={`absolute w-50 z-50 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition
            ${
              openUpward ? "bottom-full mb-2 right-0" : "top-full mt-2 right-0"
            }`}
        >
          <div className="py-1">
            <MenuItem>
              <button className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleEdit}>
                Edit
              </button>
            </MenuItem>
            <MenuItem>
              <button className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" onClick={handleDelete}>
                Delete
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      )}
    </Menu>
  );
}
