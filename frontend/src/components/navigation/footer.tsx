import Image from "next/image";

export function Footer() {
  return (
    <div className="bg-[#552583] w-full font-oswald font-bold text-[#E9D5FF] px-6 md:px-[80px] py-[48px]">
      {/* Footer content */}
      <div className="flex flex-wrap justify-between gap-y-10 md:gap-y-0">
        {/* Brand */}
        <div className="w-full md:w-[284px]">
          <div className="flex items-center select-none">
            <Image src="/Logo.svg" alt="LeCards Logo" width={32} height={32} />
            <h1 className="text-[24px] ml-[12px] whitespace-nowrap">LeCards</h1>
          </div>
          <h1 className="mt-[21px] font-normal text-sm md:text-base">
            Learn with the mindset of greatness.
          </h1>
        </div>

        {/* Product Links */}
        <div className="w-1/2 sm:w-1/3 md:w-[284px] flex flex-col space-y-4">
          <h1>Product</h1>
          <ul className="font-normal text-sm md:text-base space-y-2">
            <li>Flashcards</li>
            <li>Study Tools</li>
            <li>Mobile App?</li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="w-1/2 sm:w-1/3 md:w-[284px] flex flex-col space-y-4">
          <h1>Company</h1>
          <ul className="font-normal text-sm md:text-base space-y-2">
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="w-full sm:w-auto md:w-[284px] flex flex-col space-y-4">
          <h1>Follow Us</h1>
          <ul className="flex space-x-4">
            <li>
              <Image src="/twitter.svg" alt="Twitter" width={20} height={20} />
            </li>
            <li>
              <Image
                src="/instagram.svg"
                alt="Instagram"
                width={20}
                height={20}
              />
            </li>
            <li>
              <Image
                src="/facebook.svg"
                alt="Facebook"
                width={20}
                height={20}
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div className="border-t border-solid border-[#9333EA] flex justify-center items-center h-[57px] mt-[32px] text-sm md:text-base">
        <h1 className="font-normal">© 2025 LeCards. All rights reserved.</h1>
      </div>
    </div>
  );
}
