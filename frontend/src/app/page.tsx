import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="w-screen">
      <Navbar/>

      {/* Section 1 */}
      <div className="bg-[#552583] h-[600px] flex justify-center items-center">
        <div className="w-[86%] h-[53%]">
          <div>
            <div>
              <h1 className="text-white font-bold text-[48px]">Master Your Knowledge Like <span className="text-[#FDB927]">The King</span></h1>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="h-[580px] bg-white">
        
      </div>

      {/* Section 3 */}
      <div className="h-[652px] bg-[#552583]">
        
      </div>

      {/* Section 4 */}
      <div className="h-[232px] bg-[#FDB927]">
        
      </div>

      {/* Section 5 */}
      <div className="h-[472px] bg-white">
        
      </div>

      {/* Section 6 */}
      <div className="h-[348px] bg-[#552583]">
        
      </div>

      <Footer />
    </div>
  );
}
