"use client";


import { useEffect, useState } from "react";
import { SetInfo, ExampleSets, SetCard } from "./index";
import { fetchSets } from "@/api/set";

export default function SetGrid() {
  const [sets, setSets] = useState<SetInfo[]>([]);

  useEffect(() => {
    const getSets = async () => {
      try {
        const data = await fetchSets(1);
        setSets(data);
      } catch (err) {
        console.error("Failed to fetch sets:", err);
        setSets([]);
      }
    };

    setSets(ExampleSets);
    // getSets();
  }, []);

  return (
    <div className="w-full max-w-[1216px] mx-auto px-0">
      <div className="grid gap-x-0 sm:gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sets.map((set) => (
          <SetCard key={set.setId} setInfo={set} />
        ))}
        <div
          className="bg-gradient-to-r from-[#FDB927] to-[#EAB308] 
        w-full max-w-sm sm:max-w-[390px] md:max-w-[390px] lg:max-w-[390px] 
        h-auto drop-shadow-lg rounded-[12px] flex items-center justify-center 
        cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="h-[64px] w-[64px] rounded-full bg-[#F5C545] flex items-center justify-center">
              <img src="./plusIcon.svg" alt="Plus Icon" />
            </div>
            <h1 className="text-white font-semibold text-[18px]">Create New Set</h1>
            <h2 className="text-white text-[14px]">Start builidng your next study deck</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
