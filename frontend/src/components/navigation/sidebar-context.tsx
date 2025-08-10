"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  extend: boolean;
  setExtend: (value: boolean) => void;
  toggleExtend: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [extend, setExtend] = useState(false);

  const toggleExtend = () => setExtend((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ extend, setExtend, toggleExtend }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used inside SidebarProvider");
  }
  return context;
}
