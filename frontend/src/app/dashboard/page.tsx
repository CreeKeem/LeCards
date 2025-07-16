"use client";

import { DashboardNavbar, Footer } from "@/components/navigation";
import Image from "next/image";
import {SetGrid, Recent, EditSetModal} from "@/components/set/";

export default function Dashboard() {
  const userName = "LeBron James";
  const totalSet = 1;
  const successRate = 100;
  const cardsStudied = 50;
  return (
    <div>
      <DashboardNavbar userName={userName} dashboardHome={true} />
      <div className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-[80px] w-full flex flex-col items-center bg-[#F9FAFB]">
        <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-[32px] w-full flex flex-col items-center gap-[32px] max-w-[1216px]">
          {/* Welcome Back Banner */}
          <div className="relative bg-gradient-to-r from-laker-purple to-[#6B21A8] h-[220px] w-full max-w-[1216px] rounded-[16px] overflow-hidden p-4 sm:p-6 md:p-8 lg:p-[32px]">
            {/* Top-right quarter circle */}
            <div className="absolute -top-[48px] -right-[48px] w-[96px] h-[96px] bg-laker-gold opacity-[10%] rounded-full"></div>

            {/* Bottom-left quarter circle */}
            <div className="absolute -bottom-[48px] -left-[48px] w-[96px] h-[96px] bg-laker-gold opacity-[10%] rounded-full"></div>

            {/* Content */}
            <div className="w-full h-full flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <Image
                  src={"/trophyIcon2.svg"}
                  width={27}
                  height={24}
                  alt="Trophy"
                />
                <h1 className="text-white font-bold text-[24px] sm:text-[24px]">
                  Welcome back, {userName}!
                </h1>
              </div>
              <h2 className="text-white font-normal text-[16px] sm:text-[16px]">
                Ready to dominate your studies like LeBron dominates the court?
              </h2>
              <div className="flex gap-6 flex-wrap">
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-[20px] sm:text-[20px] text-laker-gold">
                    {totalSet}
                  </h3>
                  <h4 className="font-normal text-[12px] sm:text-[12px] text-[#E9D5FF]">
                    Total Sets
                  </h4>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-[20px] sm:text-[20px] text-laker-gold">
                    {cardsStudied}
                  </h3>
                  <h4 className="font-normal text-[12px] sm:text-[12px] text-[#E9D5FF]">
                    Cards Studied
                  </h4>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-[20px] sm:text-[20px] text-laker-gold">
                    {successRate}%
                  </h3>
                  <h4 className="font-normal text-[12px] sm:text-[12px] text-[#E9D5FF]">
                    Success Rate
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Create new + Quick Study */}
          <div className="w-full max-w-[1216px] flex flex-col md:flex-row justify-between h-auto md:h-[96px] gap-[16px] md:gap-[32px]">
            {/* Create New */}
            <button className="w-full md:w-[50%] md:max-w-[600px] p-[24px] bg-laker-gold h-[96px] rounded-[12px] cursor-pointer hover:bg-[#E0A322] duration-300">
              <div className="text-white flex gap-5">
                <div className="bg-[rgba(255,255,255,0.2)] w-[48px] h-[48px] rounded-[8px] flex items-center justify-center">
                  <Image
                    src="/plusIcon.svg"
                    width={17.5}
                    height={28}
                    alt="Plus Icon"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h2>Create New Set</h2>
                  <h3>Start your championship run</h3>
                </div>
              </div>
            </button>

            {/* Quick Study */}
            <button className="w-full md:w-[50%] md:max-w-[600px] p-[24px] bg-laker-purple h-[96px] rounded-[12px] cursor-pointer hover:bg-[#7831B7] duration-300">
              <div className="text-white flex gap-5">
                <div className="bg-[rgba(255,255,255,0.2)] w-[48px] h-[48px] rounded-[8px] flex items-center justify-center">
                  <Image
                    src="/shuffleIcon.svg"
                    width={20}
                    height={28}
                    alt="Shuffle Icon"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h2>Quick Study</h2>
                  <h3>Random cards from all sets</h3>
                </div>
              </div>
            </button>
          </div>

          {/* Sets */}
          <SetGrid />

          {/* Recent Activity */}
          <Recent />
        </div>
      </div>
      <Footer />
    </div>
  );
}
