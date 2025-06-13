import DashboardNavbar from "@/components/dashboard-navbar";
import Footer from "@/components/footer";
import Image from "next/image";

export default function Dashboard() {
  const userName = "LeBron James";
  const totalSet = 1;
  const successRate = 100;
  const cardsStudied = 50;
  return (
    <div>
      <DashboardNavbar userName={userName} />
      <div className="min-h-screen px-4 sm:px-8 md:px-12 lg:px-[80px] w-full flex flex-col items-center bg-[#F9FAFB]">
        <div className="min-h-screen p-4 sm:p-6 md:p-8 lg:p-[32px] w-full flex flex-col items-center gap-[32px]">

          {/* Welcome Back Banner */}
          <div className="relative bg-gradient-to-r from-[#552583] to-[#6B21A8] h-[220px] w-full max-w-[1216px] rounded-[16px] overflow-hidden p-4 sm:p-6 md:p-8 lg:p-[32px]">
            {/* Top-right quarter circle */}
            <div className="absolute -top-[48px] -right-[48px] w-[96px] h-[96px] bg-[#FDB927] opacity-[10%] rounded-full"></div>

            {/* Bottom-left quarter circle */}
            <div className="absolute -bottom-[48px] -left-[48px] w-[96px] h-[96px] bg-[#FDB927] opacity-[10%] rounded-full"></div>

            {/* Content */}
            <div className="w-full h-full flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <Image 
                  src={'/trophyIcon2.svg'}
                  width={27}
                  height={24}
                  alt="Trophy"
                />
                <h1 className="text-white font-bold text-[24px] sm:text-[30px]">Welcome back, {userName}!</h1>
              </div>
              <h2 className="text-white font-normal text-[16px] sm:text-[18px]">Ready to dominate your studies like LeBron dominates the court?</h2>
              <div className="flex gap-6 flex-wrap">
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-[20px] sm:text-[24px] text-[#FDB927]">{totalSet}</h3>
                  <h4 className="font-normal text-[12px] sm:text-[14px] text-[#E9D5FF]">Total Sets</h4>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-[20px] sm:text-[24px] text-[#FDB927]">{cardsStudied}</h3>
                  <h4 className="font-normal text-[12px] sm:text-[14px] text-[#E9D5FF]">Cards Studied</h4>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-[20px] sm:text-[24px] text-[#FDB927]">{successRate}%</h3>
                  <h4 className="font-normal text-[12px] sm:text-[14px] text-[#E9D5FF]">Success Rate</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Create new + Quick Study */}
          <div className="">
            {/* Create New */}
            <button>
              <div>
                <div></div>
                <div></div>
              </div>
            </button>

            {/* Quick Study */}
            <button>
              <div>
                <div></div>
                <div></div>
              </div>
            </button>
          </div>

          {/* Sets */}
          <div>
            {/* Title */}
            <div></div>
            {/* Sets */}
            <div></div>
          </div>

          {/* Recent Activity */}
          <div></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
