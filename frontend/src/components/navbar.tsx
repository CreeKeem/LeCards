import Image from "next/image";

export default function Navbar() {
  return (
    <div className="bg-[#552583] w-screen h-[72px] drop-shadow-xl px-[80px]">
      <div className="bg-white h-[72px] px-[24px] py-[16px]">
        <div className="flex h-[40px] bg-black">
          <div className="flex bg-white w-[210px] h-[32px] my-[4px]">
            <Image
              src={'/Logo.svg'}
              alt="LeCards Logo"
              width={32}
              height={32}
            ></Image>
            <h1 className="font-bold text-[24px] ">LeCards</h1>
          </div>
          <nav>

          </nav>
        </div>
      </div>
    </div>
  );
}
