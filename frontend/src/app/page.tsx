import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen">
      <Navbar />

      {/* Section 1 */}
      <div className="bg-[#552583] min-h-[600px] flex justify-center items-center font-oswald px-4">
  <div className="w-full max-w-[1440px] flex flex-col md:flex-row items-center md:items-start md:justify-between gap-8 md:h-[53%]">
    
    {/* Text Section */}
    <div className="w-full md:w-1/2 text-white flex flex-col justify-center">
      <h1 className="font-bold text-[32px] md:text-[48px] md:w-[538px]">
        Master Your Knowledge Like <span className="text-[#FDB927]">The King</span>
      </h1>
      <h2 className="font-normal text-[16px] md:text-[20px] mt-4 md:mt-2 md:w-[490px] mb-6">
        Study smarter with custom made flashcards. From basketball history to life lessons, learn with the GOAT's wisdom.
      </h2>
      <button className="h-[56px] w-[170px] md:h-[64px] md:w-[190px] bg-[#FDB927] text-[#552583] rounded-[8px] font-bold text-[16px] md:text-[18px] cursor-pointer hover:bg-[#B97C10] duration-300 flex items-center justify-center gap-2">
        <Image
          src="/arrow.svg"
          alt="Arrow"
          width={13.5}
          height={18}
        />
        <span>Start Learning</span>
      </button>
    </div>

    {/* Image Section */}
    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
      <Image
        src="/Lebron.svg"
        alt="Lebron James"
        width={280}
        height={280}
        className="rounded-full border-4 border-[#FDB927] drop-shadow-2xl"
      />
    </div>
    
  </div>
</div>


      {/* Section 2 */}
      <div className="h-[580px] bg-white"></div>

      {/* Section 3 */}
      <div className="h-[652px] bg-[#552583]"></div>

      {/* Section 4 */}
      <div className="h-[232px] bg-[#FDB927]"></div>

      {/* Section 5 */}
      <div className="h-[472px] bg-white"></div>

      {/* Section 6 */}
      <div className="h-[348px] bg-[#552583]"></div>

      <Footer />
    </div>
  );
}
