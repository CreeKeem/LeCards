import Image from "next/image";
import Link from "next/link";
import { SetDto } from "@/components/set";

export function DashboardNavbar({
  userName,
  dashboardHome,
  setDto,
}: {
  userName: string;
  dashboardHome: boolean;
  setDto?: SetDto;
}) {
  return (
    <div className="bg-[#F9FAFB] w-full h-[72px] px-4 sm:px-6 md:px-[80px]">
      {!dashboardHome && (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <h1 className="font-semibold text-2xl sm:text-3xl text-center">
            {setDto?.name}
          </h1>
        </div>
      )}

      <div className="h-full flex items-center justify-between flex-wrap gap-y-2">
        {/* Logo + Brand */}

        {dashboardHome ? (
          <Link href="/dashboard">
            <div className="flex items-center flex-shrink-0 select-none w-auto">
              <Image
                src="/Logo.svg"
                alt="LeCards Logo"
                width={40}
                height={40}
              />
              <h1 className="text-[20px] sm:text-[24px] ml-[12px] whitespace-nowrap text-laker-purple font-oswald font-bold">
                LeCards
              </h1>
            </div>
          </Link>
        ) : (
          <div className="flex gap-2">
            <Link href="/dashboard">
              <img src="/backArrow.svg" alt="Back Arrow" />
            </Link>
          </div>
        )}

        {/* User Profile */}
        <div className="flex justify-center items-center gap-2 sm:gap-3">
          <Image
            src="/Lebron.svg"
            alt="User Profile"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <h1 className="text-[12px] sm:text-[14px] font-medium text-[#374151]">
            {userName}
          </h1>
        </div>
      </div>
    </div>
  );
}
