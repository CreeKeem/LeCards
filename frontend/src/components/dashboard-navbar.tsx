import Image from "next/image";
import Link from "next/link";

export default function DashboardNavbar() {
  return (
    <div className="bg-white w-screen h-[72px] drop-shadow-sm px-[24px] md:px-[80px] font-oswald font-bold">
      <div className="h-full flex items-center justify-between text-[#552583]">
        {/* Logo + Brand */}
        <Link
          href="/dashboard"
          className="flex items-center flex-shrink-0 select-none w-auto"
        >
          <Image src="/Logo.svg" alt="LeCards Logo" width={32} height={32} />
          <h1 className="text-[24px] ml-[12px] whitespace-nowrap">LeCards</h1>
        </Link>

        
      </div>
    </div>
  );
}
