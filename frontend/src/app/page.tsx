import Navbar from "@/components/navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="overflow-x-hidden">

      <Navbar />

      {/* Title Section */}
      <div className="bg-[#FFF9E0] h-screen relative select-none">
        <Image 
          src="/Lebron Sunshine.svg"
          alt="Lebron Sunshine"
          fill
          className="object-cover absolute z-0"
        />
        
        <div className="flex flex-col items-center justify-center h-screen relative z-10">
          <h1 className="text-[#552583] text-[70px] font-bold p-4 mt-70">
            Learn Like a King
          </h1>
          <button className="cursor-pointer w-[400px] h-[108px] mt-4 bg-[#D1B1FF] text-black text-[40px] font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#6b2ba1] hover:text-white transition duration-300">
            <Link href="/signup">
              Get Started
            </Link>
          </button>
        </div>
      </div>



      {/* Section 1 */}
      <div className="mt-[600px] relative">
        <h1 className="absolute text-7xl text-[#FFF9E0] m">
          Say LeF*ck you to bad study guides!
        </h1>
        <video
          src='/LeFu3.mp4'
          autoPlay
          muted
          loop
          className="max-w-screen"
        >
          Your browswer does not support the video tag.
        </video>
      </div>

      {/* Section 2 */}
      <div className="mt-[600px]">
        <video
          src='/LeFu3.mp4'
          autoPlay
          muted
          loop
          className="max-w-screen"
        >
          Your browswer does not support the video tag.
        </video>
      </div>


    </div>
  );
}
