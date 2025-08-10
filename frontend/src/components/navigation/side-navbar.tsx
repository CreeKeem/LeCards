"use client";

import { useRouter } from "next/navigation";
import {
  useSidebar,
  HomeIcon,
  ProfileIcon,
  PlusIcon,
  ChevronIcon,
  LogoutIcon,
} from ".";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { logout } from "@/api/auth";

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  extended: boolean;
  func: () => void;
}

function NavItem({ icon: Icon, label, extended, func }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isHovered && buttonRef.current && !extended) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 12,
      });
    }
  }, [isHovered, extended]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={func}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`hover:bg-gray-100 duration-300 rounded-2xl cursor-pointer flex items-center w-full h-[48px] 
          justify-start transition-all relative`}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-[48px] h-[48px] flex-shrink-0 relative">
          <Icon
            className={`h-[24px] w-[24px] select-none transition-transform duration-300 ease-in-out text-gray-700
              ${label === "Collapse" && (extended ? "rotate-180" : "")}
            `}
          />
        </div>

        {/* Text with proper slide and fade animations */}
        <span
          className={`whitespace-nowrap transition-all ease-out ml-1
            ${
              extended
                ? "opacity-100 translate-x-0 duration-500 delay-150"
                : "opacity-0 -translate-x-4 duration-150"
            }
          `}
        >
          {label}
        </span>
      </button>

      {/* Portal-based tooltip - rendered outside the sidebar */}
      {isHovered &&
        !extended &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            className="fixed pointer-events-none z-50 -translate-y-1/2"
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
            }}
          >
            <div
              className="
                bg-gray-800 text-white text-sm px-3 py-2 rounded-lg
                shadow-lg whitespace-nowrap
                animate-in fade-in slide-in-from-left-2 duration-200
                scale-95 animate-in zoom-in-95
              "
            >
              {label === "Collapse" ? (extended ? label : "Extend") : label}
              {/* Arrow pointing to the icon */}
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export function SideNavbar() {
  const { extend, toggleExtend } = useSidebar();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    {
      icon: HomeIcon,
      label: "Home",
      func: () => router.push("/dashboard"),
    },
    { icon: ProfileIcon, label: "Profile", func: () => {} },
    {
      icon: PlusIcon,
      label: "Create Set",
      func: () => router.push("/set/create"),
    },
    {
      icon: LogoutIcon,
      label: "Logout",
      func: handleLogout,
    },
    { icon: ChevronIcon, label: "Collapse", func: toggleExtend },
  ];

  return (
    <div
      className={`bg-white drop-shadow-xl h-screen sticky top-0 flex flex-col items-start p-3 gap-4 overflow-hidden
        transition-all duration-300 ease-in-out ${
          extend ? "w-[220px]" : "w-[75px]"
        }
      `}
    >
      {/* Logo */}
      <div className="flex items-center select-none px-1">
        <div className="flex items-center justify-center w-[40px] h-[40px] flex-shrink-0">
          <img src="/logo.svg" alt="LeCards Logo" className="h-[40px]" />
        </div>

        <h1
          className={`whitespace-nowrap text-laker-purple font-oswald font-bold text-[20px] sm:text-[24px]
            transition-all ease-out
            ${
              extend
                ? "opacity-100 translate-x-0 ml-3 duration-500 delay-150"
                : "opacity-0 -translate-x-4 ml-3 duration-150"
            }
          `}
        >
          LeCards
        </h1>
      </div>

      {/* Menu Items */}
      {navItems.map(({ icon, label, func }) => (
        <NavItem
          key={label}
          icon={icon}
          label={label}
          func={func}
          extended={extend}
        />
      ))}
    </div>
  );
}
