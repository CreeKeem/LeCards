import Image from "next/image"
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="absolute top-0 left-0 w-full z-50 px-6 py-3 select-none">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <Image 
            src="/Logo.svg"
            alt="LeCards Logo"
            width={60}
            height={60}
            className="mr-[23px]"
          />
          <h1 className="text-[50px] font-bold text-[#552583]">
            LeCards
          </h1>
        </div>

        {/* Login Button */}
        <button className="text-[#552583] font-semibold text-[40px] cursor-pointer">
          <Link href="/login">
            Login
          </Link>
        </button>
      </div>
    </div>
  );
}
