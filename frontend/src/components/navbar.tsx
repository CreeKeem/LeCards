import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-[#552583] w-screen h-[72px] drop-shadow-xl px-[24px] md:px-[80px] font-oswald font-bold">
      <div className="h-full flex items-center justify-between text-white">
        {/* Logo + Brand */}
        <Link
          href="/"
          className="flex items-center flex-shrink-0 select-none w-auto"
        >
          <Image src="/Logo.svg" alt="LeCards Logo" width={32} height={32} />
          <h1 className="text-[24px] ml-[12px] whitespace-nowrap">LeCards</h1>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-[24px] text-[16px]">
          <Link href="/">Home</Link>
          <Link href="/">Flashcards</Link>
          <Link href="/">Study</Link>
          <Link href="/">About</Link>
          <Link
            href="/login"
            className="bg-[#FDB927] text-[#552583] py-[6px] px-[20px] rounded-[8px] whitespace-nowrap hover:bg-[#B97C10] duration-300"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </div>
  );
}
