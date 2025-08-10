"use client";

import { useEffect, useState } from "react";
import {
  ExampleSets,
  ExampleUserSetInfos,
  SetCard,
  UserSetInfoDto,
  SetDto,
} from ".";
import { fetchUserSets } from "@/api/set";
import { fetchUserSetInfos } from "@/api/user-set-info";
import { useRouter } from "next/navigation";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export function SetGrid() {
  const [sets, setSets] = useState<SetDto[]>([]);
  const [userSetInfos, setUserSetInfos] = useState<UserSetInfoDto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { isAuthenticated } = useAuthGuard();

  useEffect(() => {
    if (!isAuthenticated) return;

    const getSetsAndInfos = async () => {
      try {
        const [sets, setInfos] = await Promise.all([
          fetchUserSets(),
          fetchUserSetInfos(),
        ]);
        setSets(sets ?? []);
        setUserSetInfos(setInfos ?? []);
      } catch (err) {
        console.error("Failed to fetch sets:", err);
      } finally {
        setLoading(false);
      }
    };

    getSetsAndInfos();
  }, [isAuthenticated]);

  if (loading) {
    return (
      <div className="w-full max-w-[1216px] mx-auto px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-[24px] text-[#111827]">
            Your Flashcard Sets
          </h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-laker-purple"></div>
        </div>
      </div>
    );
  }

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
            src="/utility/searchIcon.svg"
            alt="Search Icon"
            className="h-[16px] w-[16px]"
          />
          <input
            type="text"
            placeholder="Search your sets"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none px-2 py-2 text-sm"
          />
        </div>
      </div>

      {/* Filtered grid */}
      <div className="grid gap-x-0 sm:gap-x-6 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSets.map((set) => (
          <SetCard
            key={set.setId}
            setDto={set}
            userSetInfoDto={userSetInfos.find((x) => x.setId == set.setId)!}
          />
        ))}

        {/* Create new set card */}
        <div
          className="bg-laker-gold min-h-[204px]
        w-full max-w-sm sm:max-w-[390px] md:max-w-[390px] lg:max-w-[390px] 
        h-auto drop-shadow-lg rounded-[12px] flex items-center justify-center 
        cursor-pointer hover:bg-[#E0A322] duration-300"
          onClick={() => router.push("/set/create")}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="bg-[rgba(255,255,255,0.2)] w-[48px] h-[48px] rounded-full flex items-center justify-center">
              <img
                src="/utility/plusIcon.svg"
                width={17.5}
                height={28}
                alt="Plus Icon"
              />
            </div>
            <h1 className="text-white font-semibold text-[18px]">
              Create New Set
            </h1>
            <h2 className="text-white text-[14px]">
              Start building your next study deck
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
