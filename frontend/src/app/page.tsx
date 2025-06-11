import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen font-oswald">
      <Navbar />

      {/* Section 1 */}
      <div className="bg-[#552583] min-h-[600px] flex justify-center items-center px-4">
        <div className="w-full max-w-[1240px] flex flex-col md:flex-row items-center md:items-start md:justify-between gap-8 md:h-[53%]">
          {/* Text Section */}
          <div className="w-full md:w-1/2 text-white flex flex-col justify-center">
            <h1 className="font-bold text-[32px] md:text-[48px] md:w-[538px]">
              Master Your Knowledge Like{" "}
              <span className="text-[#FDB927]">The King</span>
            </h1>
            <h2 className="font-normal text-[16px] md:text-[20px] mt-4 md:mt-2 md:w-[490px] mb-6">
              Study smarter with custom made flashcards. From basketball history
              to life lessons, learn with the GOAT's wisdom.
            </h2>
            <button className="h-[56px] w-[170px] md:h-[64px] md:w-[190px] bg-[#FDB927] text-[#552583] rounded-[8px] font-bold text-[16px] md:text-[18px] cursor-pointer hover:bg-[#B97C10] duration-300 flex items-center justify-center gap-2">
              <Image src="/arrow.svg" alt="Arrow" width={13.5} height={18} />
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
      <div className="h-[580px] bg-white p-[80px]">
        <div className="w-full h-[420px] px-[24px] bg-black flex flex-col justify-between items-center">
          {/* Why LeCards? */}
          <div className="flex flex-col items-center justify-end gap-[14px] bg-white">
            <h1 className="text-[#552583] font-bold text-[36px]">
              Why Choose LeCards?
            </h1>
            <h2 className="text-[#4B5563] h-[30px] font-normal text-[20px]">
              Learn with the mindset of a champion
            </h2>
          </div>

          {/* 3 Reasons */}
          <div className="bg-white w-[96%] h-[272px] flex justify-between">
            {/* 1st Reason */}
            <div className="w-[32%] bg-[#F0F0F0]">
              <Image src={"/arrow.svg"} alt="Brain" width={64} height={64} />
              <h4>Smart Learning</h4>
              <p>
                AI-powered spaced repition helps you retain information like
                LeBron retains his championship mentality
              </p>
            </div>

            {/* 2nd Reason */}
            <div className="w-[32%] bg-[#F0F0F0]">
              <Image src={"/arrow.svg"} alt="Brain" width={64} height={64} />
              <h4>Achievement System</h4>
              <p>
                Unlock badges and track your progress. Every Study session gets
                you closer to greatness
              </p>
            </div>

            {/* 3rd Reason */}
            <div className="w-[32%] bg-[#F0F0F0]">
              <Image src={"/arrow.svg"} alt="Brain" width={64} height={64} />
              <h4>Team Learning</h4>
              <p>
                Study with friends and compete. Just like LeBron, greatness is
                achieved together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="h-[652px] bg-[#552583]">
        <div>
          <div>
            <h1>Experience the Cards</h1>
            <h3>Interactive flashcards withe LeBron's winning philosophy</h3>
          </div>
          <div>Need To Create Flashcard Component</div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="h-[232px] bg-[#FDB927]">
        <div>
          <div>
            <h1>1</h1>
            <h2>Active Learner</h2>
          </div>

          <div>
            <h1>1</h1>
            <h2>Flashcard Set</h2>
          </div>

          <div>
            <h1>100%</h1>
            <h2>Success Rate</h2>
          </div>

          <div>
            <h1>5.0</h1>
            <h2>User Rating</h2>
          </div>
        </div>
      </div>

      {/* Section 5 */}
      <div className="h-[472px] bg-white">
        <div className="w-full h-[420px] px-[24px] bg-black flex flex-col justify-evenly items-center">
          {/* What Our Champions Say? */}
          <h1 className="text-[#552583] font-bold text-[36px]">
            What Our Champions Say
          </h1>

          {/* 3 Quotes */}
          <div className="bg-white w-[96%] h-[272px] flex justify-between">
            {/* 1st User */}
            <div className="w-[32%] bg-[#F0F0F0]">
              <div>
                <Image src={"/arrow.svg"} alt="Brain" width={64} height={64} />
                <div>
                  <h3>Bronny James</h3>
                  <h4>Future Face of the League</h4>
                </div>
              </div>
              <p>
                AI-powered spaced repition helps you retain information like
                LeBron retains his championship mentality
              </p>
            </div>

            {/* 2nd User */}
            <div className="w-[32%] bg-[#F0F0F0]">
              <div>
                <Image src={"/arrow.svg"} alt="Brain" width={64} height={64} />
                <div>
                  <h3>Michael Jordan</h3>
                  <h4>Second Greatest Basketball Player</h4>
                </div>
              </div>
              <p>
                Unlock badges and track your progress. Every Study session gets
                you closer to greatness
              </p>
            </div>

            {/* 3rd User */}
            <div className="w-[32%] bg-[#F0F0F0]">
              <div>
                <Image src={"/arrow.svg"} alt="Brain" width={64} height={64} />
                <div>
                  <h3>John Doe</h3>
                  <h4>Student</h4>
                </div>
              </div>
              <p>
                Study with friends and compete. Just like LeBron, greatness is
                achieved together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 6 */}
      <div className="h-[348px] bg-[#552583]">
        <div>
          <h1>Ready to Learn Like a Champion</h1>
          <h3>
            Join the one learner who kinda elevated their game with King James
            Cards
          </h3>
          <button>Start Now</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
