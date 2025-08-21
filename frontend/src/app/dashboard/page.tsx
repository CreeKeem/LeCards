"use client";

import { SideNavbar, Footer, Header } from "@/components/navigation";
import Image from "next/image";
import { SetGrid, Recent, EditSetModal } from "@/components/set/";
import { useEffect, useState } from "react";
import { UserInfo } from "@/types/auth";
import { fetchCurrentUserProfile } from "@/api/auth";
import { fetchUserSetCount } from "@/api/set";
import { fetchUserCardCount } from "@/api/flashcard";
import { fetchUserMasteredCardCount } from "@/api/user-card-info";
import { useRouter } from "next/navigation";
import { TokenService } from "@/lib/auth/token-service";

export default function Dashboard() {
  const [user, setUser] = useState<UserInfo>();
  const [userSetCount, setUserSetCount] = useState<number>(0);
  const [userCardCount, setUserCardCount] = useState<number>(0);
  const [masteredPercent, setMasteredPercent] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!TokenService.hasValidAccessToken()) {
      router.push("/login");
      return;
    }

    const getUserData = async () => {
      try {
        const [userProfile, setCount, cardCount, masteredCount] =
          await Promise.all([
            fetchCurrentUserProfile(),
            fetchUserSetCount(),
            fetchUserCardCount(),
            fetchUserMasteredCardCount(),
          ]);

        if (userProfile) {
          setUser(userProfile);
        }

        setUserSetCount(setCount);
        setUserCardCount(cardCount);

        const percent = cardCount > 0 ? (masteredCount / cardCount) * 100 : 0;
        setMasteredPercent(Math.round(percent));
      } catch (error) {
        console.error("Error fetching user data:", error);
        // If there's an auth error, redirect to login
        if (!TokenService.hasValidAccessToken()) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-laker-purple mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex">
        <SideNavbar />
        <div className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-[80px] w-full flex flex-col items-center bg-[#F9FAFB]">
          <Header />
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
                    src={"/utility/trophyIcon2.svg"}
                    width={27}
                    height={24}
                    alt="Trophy"
                  />
                  <h1 className="text-white font-bold text-[24px] sm:text-[24px]">
                    Welcome back, {user?.fName} {user?.lName}!
                  </h1>
                </div>
                <h2 className="text-white font-normal text-[16px] sm:text-[16px]">
                  Ready to dominate your studies like LeBron dominates the
                  court?
                </h2>
                <div className="flex gap-6 flex-wrap">
                  <div className="flex flex-col items-center">
                    <h3 className="font-bold text-[20px] sm:text-[20px] text-laker-gold">
                      {userSetCount}
                    </h3>
                    <h4 className="font-normal text-[12px] sm:text-[12px] text-[#E9D5FF]">
                      Total Sets
                    </h4>
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="font-bold text-[20px] sm:text-[20px] text-laker-gold">
                      {userCardCount}
                    </h3>
                    <h4 className="font-normal text-[12px] sm:text-[12px] text-[#E9D5FF]">
                      Total Cards
                    </h4>
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="font-bold text-[20px] sm:text-[20px] text-laker-gold">
                      {masteredPercent}%
                    </h3>
                    <h4 className="font-normal text-[12px] sm:text-[12px] text-[#E9D5FF]">
                      Mastered
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            {/* Create new + Quick Study */}
            <div className="w-full max-w-[1216px] flex flex-col md:flex-row justify-between h-auto md:h-[96px] gap-[16px] md:gap-[32px]">
              {/* Create New */}
              <button
                className="w-full md:w-[50%] md:max-w-[600px] p-[24px] bg-laker-gold h-[96px] rounded-[12px] cursor-pointer hover:bg-[#E0A322] duration-300"
                onClick={() => router.push("set/create")}
              >
                <div className="text-white flex gap-5">
                  <div className="bg-[rgba(255,255,255,0.2)] w-[48px] h-[48px] rounded-[8px] flex items-center justify-center">
                    <Image
                      src="/utility/plusIcon.svg"
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
              <button
                className="w-full md:w-[50%] md:max-w-[600px] p-[24px] bg-laker-purple h-[96px] rounded-[12px] cursor-pointer hover:bg-[#7831B7] duration-300"
                onClick={() => {}}
              >
                <div className="text-white flex gap-5">
                  <div className="bg-[rgba(255,255,255,0.2)] w-[48px] h-[48px] rounded-[8px] flex items-center justify-center">
                    <Image
                      src="/utility/shuffleIcon.svg"
                      width={20}
                      height={28}
                      alt="Shuffle Icon"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <h2>Quick Study</h2>
                    <h3>Study your most recent set</h3>
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
      </div>
      <Footer />
    </div>
  );
}
