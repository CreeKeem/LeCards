import Navbar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-x-hidden">

      <Navbar />

      {/* Title Section */}
      <div className="bg-[#FFF9E0] h-screen relative">
        <Image 
          src="/Lebron Sunshine.svg"
          alt="Lebron Sunshine"
          fill
          className="object-cover absolute z-0"
        />
        
        <div className="flex flex-col items-center justify-center h-screen relative z-10">
          <h1 className="text-[#552583] text-5xl font-bold p-4 mt-70">
            Learn Like a King
          </h1>
          <button className="mt-4 bg-[#D1B1FF] text-black text-xl font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#6b2ba1] hover:text-white transition duration-300">
            Get Started
          </button>
        </div>
      </div>



      {/* Section 1 */}
      <div>
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
