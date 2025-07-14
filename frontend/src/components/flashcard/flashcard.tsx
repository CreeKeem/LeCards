"use client";

import { useState } from "react";
import { FlashcardInfo, UserCardInfo } from "./flashcard-info";

export const Flashcard = ({
  flashcard,
  userCardInfo,
}: {
  flashcard: FlashcardInfo;
  userCardInfo?: UserCardInfo;
}) => {
    const [favorite, setFavorite] = useState<boolean>(userCardInfo?.favorite || false);

    const clickFavorite = () => {
        setFavorite(!favorite);
    }
  return (
    <div className="flex max-w-[1216px] w-full bg-white min-h-[200px] h-[200px] shadow-sm rounded-2xl overflow-hidden">
      {/* Term*/}
      <div className="basis-[30%] p-4 flex items-center justify-center">
        {flashcard.term}
      </div>

      {/* Separator */}
      <div className=" w-px bg-[#37415124] h-[80%] self-center" />

      {/* Definition */}
      <div className="basis-[60%] p-4 flex items-center justify-center">
        {flashcard.definition}
      </div>

      {/* Separator */}
      <div className="w-px bg-[#37415124] h-[80%] self-center" />

      {/* Options */}
      <div className="basis-[10%] p-4 flex items-center justify-center flex-col gap-5">
        <img
          src={favorite ? "/favoriteIcon.svg" : "/nonFavoriteIcon.svg"}
          alt="Non-favorite Icon"
          className="cursor-pointer"
          onClick={clickFavorite}
        />
        <img src="/audioIcon.svg" alt="audioIcon" className="cursor-pointer" />
        <p className="cursor-pointer">⋯</p>
      </div>
    </div>
  );
};
