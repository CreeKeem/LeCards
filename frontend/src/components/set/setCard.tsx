import { useEffect, useState } from "react";
import { SetInfo } from "./set-info";

export function SetCard({ setInfo }: { setInfo: SetInfo }) {
  const [percentLearned, setPercentLearned] = useState<number>(NaN);
  const [learnedColorBg, setLearnedColorBg] = useState("#FEE2E2");
  const [learnedColorText, setLearnedColorText] = useState("#991B1B");

  useEffect(() => {
    const percent = setInfo.cardsLearned / setInfo.numCards;
    setPercentLearned(percent);
    if (percent >= 90) {
      setLearnedColorBg("#DCFCE7");
      setLearnedColorText("#166534");
    } else if (percent < 90 && percent >= 70) {
      setLearnedColorBg("#FEF9C3");
      setLearnedColorText("#854D0E");
    } else {
      setLearnedColorBg("#FEE2E2");
      setLearnedColorText("#991B1B");
    }
  });

  return (
    <div className="bg-white w-[390px] h-[204px] drop-shadow-lg rounded-[12px]">
      {/* Little color thing at the top */}
      <div
        className={`bg-[${setInfo.color}] w-full h-[12px] rounded-t-[12px]`}
      ></div>

      {/* The title, description, and image */}
      <div className="flex flex-col mx-[24px] my-[26px]">
        <div className="flex justify-between h-[44px] items-center">
          <div className="flex items-center gap-3">
            <div
              className={`h-[40px] w-[40px] bg-[${setInfo.color}] rounded-[8px] opacity-20 absolute`}
            ></div>
            <div className="h-[40px] w-[40px] flex items-center justify-center">
              <img
                src="./Lebron.svg"
                alt=""
                className="h-[24px] w-[24px] rounded-[50%] opacity-100"
              />
            </div>

            <div className="flex flex-col justify-between">
              <h3 className="text-[16px] font-semibold text-[#111827]">
                {setInfo.name}
              </h3>
              <h4 className="text-[14px] font-normal text-[#6B7280]">
                {setInfo.description}
              </h4>
            </div>
          </div>
          <button className="cursor-pointer">...</button>
        </div>

        {/* Cards info */}
        <div className="flex justify-between">
          <h3></h3>
          <h3 style={{ backgroundColor: learnedColorBg }} className="">{percentLearned}% mastered</h3>
        </div>

        {/* Study Button */}
        <div></div>
      </div>
    </div>
  );
}
