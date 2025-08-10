"use client";

import { useRouter } from "next/navigation";
import { useSidebar, HomeIcon, ProfileIcon, PlusIcon, ChevronIcon } from ".";

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  extended: boolean;
  func: () => void;
}

function NavItem({ icon: Icon, label, extended, func }: NavItemProps) {
  return (
    <button
      onClick={func}
      className={`hover:bg-gray-100 duration-300 rounded-2xl cursor-pointer flex items-center w-full h-[48px] 
        justify-start transition-all relative overflow-hidden`}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-[48px] h-[48px] flex-shrink-0">
        <Icon
          className={`h-[24px] w-[24px] select-none transition-transform duration-300 ease-in-out text-gray-700
            ${label === "Collapse" && (extended ? "rotate-180" : "")}
          `}
        />
      </div>

      {/* Text */}
      <span
        className={`whitespace-nowrap transition-all duration-300 ease-in-out
          ${
            extended
              ? "opacity-100 translate-x-0 ml-1"
              : "opacity-0 -translate-x-4 ml-1"
          }
        `}
      >
        {label}
      </span>
    </button>
  );
}

export function SideNavbar() {
  const { extend, toggleExtend } = useSidebar();
  const router = useRouter();

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
            transition-all duration-300 ease-in-out
            ${
              extend
                ? "opacity-100 translate-x-0 ml-3"
                : "opacity-0 -translate-x-4 ml-3"
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
