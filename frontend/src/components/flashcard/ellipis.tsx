"use client";

import { useEffect, useRef, useState } from "react";

export function Ellipsis({
  handleDelete,
  handleEdit,
}: {
  handleDelete: () => void;
  handleEdit: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const calculatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 100;

    setOpenUpward(spaceBelow < dropdownHeight && rect.top > dropdownHeight);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      calculatePosition();
    }
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const editItem = () => {
    setIsOpen(false);
    handleEdit();
  };

  const deleteItem = () => {
    setIsOpen(false);
    handleDelete();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", () => setIsOpen(false), true);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", () => setIsOpen(false), true);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        calculatePosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleDropdown}
        className="text-[#9CA3AF] cursor-pointer focus:outline-none rounded-full p-1 py-2 hover:bg-gray-100"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img src="/utility/ellipsisIcon.svg" alt="More options" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-50 w-32 bg-white rounded-md shadow-lg ring-1 ring-gray-300 ring-opacity-5 focus:outline-none ${
            openUpward 
              ? "bottom-full mb-1 right-0" 
              : "top-full mt-1 right-0"
          }`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
              role="menuitem"
              onClick={editItem}
            >
              Edit
            </button>
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
              role="menuitem"
              onClick={deleteItem}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}