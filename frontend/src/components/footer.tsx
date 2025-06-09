import Image from "next/image";

export default function Footer() {
  return (
    <div className="bg-[#552583] w-screen h-[313px] font-oswald font-bold text-[#E9D5FF] px-[104px] flex-col py-[48px]">
      {/* Footer content */}
      <div className="flex justify-between h-[128px]">

        <div className="h-[128px] w-[284px]">
          <div className="flex items-center flex-shrink-0 select-none w-auto">
            <Image src="/Logo.svg" alt="LeCards Logo" width={32} height={32} />
            <h1 className="text-[24px] ml-[12px] whitespace-nowrap">LeCards</h1>
          </div>
          <h1 className="mt-[21px] font-normal">Learn with the mindset of greatness.</h1>
        </div>

        <div className="h-[128px] w-[284px] flex flex-col justify-between">
          <h1>Product</h1>
          <ul className="font-normal h-[88px] flex flex-col justify-between text-normal">
            <li>Flashcards</li>
            <li>Study Tools</li>
            <li>Mobile App?</li>
          </ul>
        </div>

        <div className="h-[128px] w-[284px] flex flex-col justify-between">
          <h1>Company</h1>
          <ul className="font-normal h-[88px] flex flex-col justify-between text-normal">
            <li>About Us</li>
            <li>Contact</li>
            <li></li>
          </ul>
        </div>

        <div className="h-[128px] w-[284px] flex flex-col justify-between">
          <h1>Follow Us</h1>
          <ul className="font-normal h-[88px] flex">
            <li><Image src={'./twitter.svg'} alt="Twitter Logo" width={20} height={20}></Image></li>
            <li><Image src={'./instagram.svg'} alt="Twitter Logo" width={20} height={20} className="ml-4"></Image></li>
            <li><Image src={'./facebook.svg'} alt="Twitter Logo" width={20} height={20} className="ml-4"></Image></li>
          </ul>
        </div>
      </div>

      {/* Copyrights */}
      <div className="border-t border-solid border-[#9333EA] flex justify-end flex-col h-[57px] items-center mt-[32px]">
        <h1 className="font-normal">© 2025 LeCards. All rights reserved.</h1>
      </div>
    </div>
  );
}
