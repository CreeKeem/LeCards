"use client";

import { SideNavbar, Header } from "@/components/navigation";
import { useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { TokenService } from "@/lib/auth/token-service";

import { QuizSet } from "@/components/learn/quiz";

export default function Quiz() {
  const router = useRouter();
  const params = useParams();
  const setId = +(params?.setId || "-1");
  const setName = params?.setName + "";

  useEffect(() => {
    // Check authentication
    if (!TokenService.hasValidAccessToken()) {
      router.push("/login");
      return;
    }
  }, [router]);

  return (
    <div>
      <div className="flex">
        <SideNavbar />
        <div className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-[80px] w-full flex flex-col items-center bg-[#F9FAFB]">
          <Header />
          <div className="h-full flex items-center w-full justify-center py-5">
            <QuizSet setId={setId} setName={setName} />
          </div>
        </div>
      </div>
    </div>
  );
}
