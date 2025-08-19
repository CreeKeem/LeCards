import { useEffect, useState } from "react";
import { MatchCardProps } from ".";

export const MatchCard = ({
  card,
  selectFunction,
}: {
  card: MatchCardProps;
  selectFunction: (card: MatchCardProps) => void;
}) => {
  const handleSelect = () => {
    if (!card.matched) {
      selectFunction(card);
    }
  };
  return (
    <div
      className={`shadow-xl rounded-2xl w-full h-full cursor-pointer flex items-center justify-center p-5 border-2
    ${card.selected ? "border-laker-purple" : "border-none"}
    ${card.matched ? "invisible" : "bg-white"}`}
      onClick={handleSelect}
    >
      <h1 className="text-xl select-none">
        {!card.matched ? card.content : ""}
      </h1>
    </div>
  );
};
