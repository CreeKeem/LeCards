"use client";

import { SideNavbar, Header } from "@/components/navigation";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { TokenService } from "@/lib/auth/token-service";

import { FlashcardLearn } from "@/components/learn";

export default function Flashcards() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!TokenService.hasValidAccessToken()) {
      router.push("/login");
      return;
    }

    try {
    } catch (error) {
      console.error("Error fetching user data:", error);
      // If there's an auth error, redirect to login
      if (!TokenService.hasValidAccessToken()) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-laker-purple mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading Learn...</p>
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
          <div className="h-full flex items-center w-full justify-center py-5">
            <FlashcardLearn />
          </div>
        </div>
      </div>
    </div>
  );
}
