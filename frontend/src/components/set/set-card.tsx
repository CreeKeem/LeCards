"use client";

import { useEffect, useState } from "react";
import { SetDto, UserSetInfoDto } from ".";
import { useRouter } from "next/navigation";
import { Ellipsis } from "../flashcard";
import { updateUserSetInfo } from "@/api/user-set-info";

export function SetCard({
  setDto,
  userSetInfoDto,
}: {
  setDto: SetDto;
  userSetInfoDto: UserSetInfoDto;
}) {
  const [percentLearned, setPercentLearned] = useState<number>(NaN);
  const [learnedColorBg, setLearnedColorBg] = useState("#FEE2E2");
  const [learnedColorText, setLearnedColorText] = useState("#991B1B");
  const [setColor, setSetColor] = useState<string>("#");
  const router = useRouter();

  useEffect(() => {}, [userSetInfoDto]);

  useEffect(() => {
    let percent = 100;
    if (userSetInfoDto) {
      setSetColor(userSetInfoDto.color);
      percent = (userSetInfoDto.cardsLearned / setDto.numCards) * 100;
    }
    setPercentLearned(Math.round(percent));
    if (percent >= 90) {
      setLearnedColorBg("#DCFCE7");
      setLearnedColorText("#166534");
    } else if (percent >= 70) {
      setLearnedColorBg("#FEF9C3");
      setLearnedColorText("#854D0E");
    } else {
      setLearnedColorBg("#FEE2E2");
      setLearnedColorText("#991B1B");
    }
  }, [setDto, userSetInfoDto]);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleStudyClick = async () => {
    const update = await updateUserSetInfo({userId: 1, setId:setDto.setId, lastAccess: new Date()})
    if (!update) return
    const slug = slugify(setDto.name);
    router.push(`/study/${setDto.setId}/${slug}`);
  };

  const handleEditClick = () => {
    const slug = slugify(setDto.name);
    router.push(`/study/${setDto.setId}/${slug}`);
  };
  return (
    <div className="bg-white w-full max-w-sm sm:max-w-[390px] md:max-w-[390px] lg:max-w-[390px] h-auto drop-shadow-lg rounded-[12px]">
      {/* Colored top bar */}
      <div
        className={`w-full h-[12px] rounded-t-[12px] bg-[${setColor}]`}
      ></div>

      <div className="flex flex-col px-4 py-5 sm:py-6 gap-4">
        {/* Header: Image + Title/Description + Ellipsis */}
        <div className="flex justify-between items-center min-h-[70px] -mt-2">
          <div className="flex items-center gap-3 relative">
            <div>
              <div
                className={`h-10 w-10 rounded-[8px] absolute opacity-20 bg-[${setColor}]`}
              ></div>
              <div className="h-10 w-10 flex items-center justify-center relative z-10">
                <img src="./logo.svg" alt="" className="h-6 w-6 rounded-full" />
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-[#111827]">
                {setDto.name}
              </h3>
              <h4 className="text-sm text-[#6B7280]">{setDto.description}</h4>
            </div>
          </div>
          <Ellipsis handleDelete={() => {}} handleEdit={() => {}} />
        </div>

        {/* Card count & percent mastered */}
        <div className="flex justify-between items-center text-sm text-[#4B5563]">
          <p>{setDto.numCards} cards</p>
          <p
            style={{ backgroundColor: learnedColorBg, color: learnedColorText }}
            className={`rounded-2xl px-2 py-0.5 bg-[${learnedColorBg}] text-[${learnedColorText}]`}
          >
            {percentLearned}% mastered
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 sm:gap-4">
          <button
            className="flex flex-1 h-[42px] bg-laker-purple rounded-xl items-center justify-center text-white gap-2 sm:gap-3 cursor-pointer min-w-0 hover:bg-[#7831B7] duration-300"
            onClick={handleStudyClick}
          >
            <img
              src="./arrowWhite.svg"
              alt="White Arrow Icon"
              className="h-4 w-4 sm:h-5 sm:w-5"
            />
            <p>Study</p>
          </button>
          <button
            className="h-[42px] w-[42px] sm:w-[50px] border border-[#D1D5DB] flex items-center justify-center rounded-xl cursor-pointer hover:bg-gray-100 duration-300"
            onClick={handleEditClick}
          >
            <img
              src="./editIcon.svg"
              alt="Edit icon"
              className="h-4 w-4 sm:h-5 sm:w-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
