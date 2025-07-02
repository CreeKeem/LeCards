import { Footer, HomeNavbar } from "@/components/navigation/index";
import Image from "next/image";
import Link from "next/link";
import { Flashcard } from "@/components/flashcard/index";
import { FlashcardInfo } from "@/components/flashcard/flashcard-info";

const exampleFlashCard: FlashcardInfo = {
  card_id: -1,
  set_id: -1,
  term: "Who is the greatest basketball player ever?",
  definition: "Lebron James",
};

export default function Home() {
  return (
    <div className="w-screen font-oswald">
      <HomeNavbar />

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
            <Link
              href="/login"
              className="h-[56px] w-[170px] md:h-[64px] md:w-[190px] bg-[#FDB927] text-[#552583] rounded-[8px] font-bold text-[16px] md:text-[18px] cursor-pointer hover:bg-[#B97C10] duration-300 flex items-center justify-center gap-2"
            >
              <Image src="/arrow.svg" alt="Arrow" width={13.5} height={18} />
              <span>Start Learning</span>
            </Link>
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
      <div className="bg-white min-h-[580px] px-6 py-20 sm:px-10 md:px-20">
        <div className="max-w-[1280px] mx-auto flex flex-col items-center space-y-18">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-6 text-center">
            <h1 className="text-[#552583] font-bold text-3xl sm:text-4xl">
              Why Choose LeCards?
            </h1>
            <h2 className="text-[#4B5563] text-lg sm:text-xl font-normal">
              Learn with the mindset of a champion
            </h2>
          </div>

          {/* 3 Reasons */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Reason 1 */}
            <div className="bg-[#F0F0F0] rounded-xl flex flex-col items-center p-8 text-center">
              <Image src="/brainIcon.svg" alt="Brain" width={64} height={64} />
              <h4 className="text-[#552583] text-xl sm:text-2xl font-bold mt-4">
                Smart Learning
              </h4>
              <p className="text-sm sm:text-base mt-2">
                AI-powered spaced repetition helps you retain information like
                LeBron retains his championship mentality.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="bg-[#F0F0F0] rounded-xl flex flex-col items-center p-8 text-center">
              <Image
                src="/trophyIcon.svg"
                alt="Trophy"
                width={64}
                height={64}
              />
              <h4 className="text-[#552583] text-xl sm:text-2xl font-bold mt-4">
                Achievement System
              </h4>
              <p className="text-sm sm:text-base mt-2">
                Unlock badges and track your progress. Every study session gets
                you closer to greatness.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="bg-[#F0F0F0] rounded-xl flex flex-col items-center p-8 text-center">
              <Image src="/teamIcon.svg" alt="Team" width={64} height={64} />
              <h4 className="text-[#552583] text-xl sm:text-2xl font-bold mt-4">
                Team Learning
              </h4>
              <p className="text-sm sm:text-base mt-2">
                Study with friends and compete. Just like LeBron, greatness is
                achieved together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="bg-[#552583] flex justify-center px-6 py-20 sm:py-24">
        <div className="w-full max-w-7xl flex flex-col items-center space-y-12">
          {/* Text */}
          <div className="text-center text-white flex flex-col gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Experience the Cards
            </h1>
            <h3 className="text-lg sm:text-xl font-normal">
              Interactive flashcards with LeBron's winning philosophy
            </h3>
          </div>

          {/* Flashcard Box Placeholder */}
          <div className="h-[300px] sm:h-[360px] md:h-[420px] max-w-md sm:max-w-lg md:max-w-xl w-[600px]">
            <Flashcard flashcardInfo={exampleFlashCard} />
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="bg-[#FDB927] min-h-[232px] sm:px-10 text-[#552583] flex justify-items-center">
        <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-6">
          {/* Stat 1 */}
          <div className="w-[140px] sm:w-[200px] md:w-[220px] lg:w-[260px] flex flex-col items-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold">1</h1>
            <h2 className="text-sm sm:text-base font-semibold">
              Active Learner
            </h2>
          </div>

          {/* Stat 2 */}
          <div className="w-[140px] sm:w-[200px] md:w-[220px] lg:w-[260px] flex flex-col items-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold">1</h1>
            <h2 className="text-sm sm:text-base font-semibold">
              Flashcard Set
            </h2>
          </div>

          {/* Stat 3 */}
          <div className="w-[140px] sm:w-[200px] md:w-[220px] lg:w-[260px] flex flex-col items-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold">100%</h1>
            <h2 className="text-sm sm:text-base font-semibold">Success Rate</h2>
          </div>

          {/* Stat 4 */}
          <div className="w-[140px] sm:w-[200px] md:w-[220px] lg:w-[260px] flex flex-col items-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold">5.0 ★</h1>
            <h2 className="text-sm sm:text-base font-semibold">User Rating</h2>
          </div>
        </div>
      </div>

      {/* Section 5 */}
      <div className="bg-white px-6 py-16 sm:px-10 md:px-20 min-h-[472px]">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-16">
          {/* Header Section */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-[#552583] font-bold text-3xl sm:text-4xl">
              What Our Champions Say
            </h1>
          </div>

          {/* Testimonial Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#F0F0F0] rounded-xl flex flex-col p-6 sm:p-8 text-left gap-4 min-h-[220px]">
              <div className="flex items-center gap-4">
                <Image
                  src="/bronny.svg"
                  alt="Bornny James"
                  width={64}
                  height={64}
                  className="rounded-full object-cover w-[64px] h-[64px]"
                />
                <div className="flex flex-col -mt-1">
                  <h3 className="text-[#552583] text-lg sm:text-2xl font-bold">
                    Bronny James
                  </h3>
                  <h2 className="text-sm sm:text-base font-normal">NBA Star</h2>
                </div>
              </div>
              <p className="text-sm sm:text-base font-normal">
                "Daddy's cards will make me the next GOAT"
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F0F0F0] rounded-xl flex flex-col p-6 sm:p-8 text-left gap-4 min-h-[220px]">
              <div className="flex items-center gap-4">
                <Image
                  src="/michael.svg"
                  alt="Michael Jordan"
                  width={64}
                  height={64}
                  className="rounded-full object-cover w-[64px] h-[64px]"
                />
                <div className="flex flex-col -mt-1">
                  <h3 className="text-[#552583] text-lg sm:text-2xl font-bold">
                    Michael Jordan
                  </h3>
                  <h2 className="text-sm sm:text-base font-normal">
                    2nd Greatest Player of All Time
                  </h2>
                </div>
              </div>
              <p className="text-sm sm:text-base font-normal">
                "LeGoat got me learning a thing or two about winning. I wish I
                were as good as he was, but I got carried by Pippen."
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F0F0F0] rounded-xl flex flex-col p-6 sm:p-8 text-left gap-4 min-h-[220px]">
              <div className="flex items-center gap-4">
                <Image
                  src="/john.svg"
                  alt="Random White Man"
                  width={64}
                  height={64}
                  className="rounded-full object-cover w-[64px] h-[64px]"
                />
                <div className="flex flex-col -mt-1">
                  <h3 className="text-[#552583] text-lg sm:text-2xl font-bold">
                    John Doe
                  </h3>
                  <h2 className="text-sm sm:text-base font-normal">Student</h2>
                </div>
              </div>
              <p className="text-sm sm:text-base font-normal">
                "LeDaddy, I would do anything for him. mmmmhhhhmmmmm yes gimme
                his cards and make all his knowledge spray all over my face. I
                love LeCards."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 6 */}
      <div className="bg-[#552583] flex justify-center items-center px-6 py-16 sm:py-20">
        <div className="flex flex-col items-center text-center gap-10 max-w-3xl w-full">
          <div className="flex flex-col items-center text-white gap-4">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
              Ready to Learn Like a Champion?
            </h1>
            <h2 className="font-normal text-base sm:text-lg md:text-xl">
              Join the one learner who kinda elevated their game with King James
              Cards
            </h2>
          </div>

          <Link
            href="/login"
            className="bg-[#FDB927] text-[#552583] text-base sm:text-lg font-black h-14 w-48 rounded-lg cursor-pointer hover:bg-[#B97C10] transition duration-300 flex items-center justify-center gap-3"
          >
            <Image
              src="/rocketIcon.svg"
              alt="Rocket Ship"
              width={18}
              height={26}
              className="-ml-2"
            />
            Start Now
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
