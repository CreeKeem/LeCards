import Image from "next/image";
import Link from "next/link";

export default function DashboardNavbar({ userName }: { userName: string }) {
  return (
    <div className="bg-white w-full h-[72px] drop-shadow-sm px-4 sm:px-6 md:px-[80px]">
      <div className="h-full flex items-center justify-between flex-wrap gap-y-2">
        {/* Logo + Brand */}
        <Link
          href="/dashboard"
          className="flex items-center flex-shrink-0 select-none w-auto"
        >
          <Image src="/Logo.svg" alt="LeCards Logo" width={40} height={40} />
          <h1 className="text-[20px] sm:text-[24px] ml-[12px] whitespace-nowrap text-[#552583] font-oswald font-bold">
            LeCards
          </h1>
        </Link>

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
