"use client";

import { useEffect, useState } from "react";
import { SetInfo, ExampleSets, SetCard } from ".";
import { fetchSets } from "@/api/set";

export function SetGrid() {
  const [sets, setSets] = useState<SetInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredSets = sets.filter((set) =>
    set.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1216px] mx-auto px-0">
      {/* Search bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-[24px] text-[#111827]">
          Your Flashcard Sets
        </h1>
        <div className="flex w-[400px] bg-white border border-[#D1D5DB] items-center rounded-2xl px-3 py-1">
          <img
            src="./searchIcon.svg"
            alt="Search Icon"
            className="h-[16px] w-[16px]"
          />
          <input
            type="text"
            placeholder="Search sets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none px-2 py-2 text-sm"
          />
        </div>
      </div>

      {/* Filtered grid */}
      <div className="grid gap-x-0 sm:gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSets.map((set) => (
          <SetCard key={set.setId} setInfo={set} />
        ))}

        {/* Create new set card */}
        <div
          className="bg-gradient-to-r from-[#FDB927] to-[#EAB308] min-h-[204px]
        w-full max-w-sm sm:max-w-[390px] md:max-w-[390px] lg:max-w-[390px] 
        h-auto drop-shadow-lg rounded-[12px] flex items-center justify-center 
        cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="h-[64px] w-[64px] rounded-full bg-[#F5C545] flex items-center justify-center">
              <img src="./plusIcon.svg" alt="Plus Icon" />
            </div>
            <h1 className="text-white font-semibold text-[18px]">Create New Set</h1>
            <h2 className="text-white text-[14px]">Start building your next study deck</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
