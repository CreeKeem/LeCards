import { useEffect, useState } from "react";
import { MatchCardProps } from ".";

export const MatchCard = ({
  card,
  selectFunction,
}: {
  card: MatchCardProps;
  selectFunction: (card: MatchCardProps) => boolean;
}) => {

  const handleSelect = () => {
    selectFunction(card)
  };
  return (
    <div
      className={`bg-white shadow-xl rounded-2xl w-full h-full cursor-pointer flex items-center justify-center p-5 border-2
    ${card.selected ? "border-laker-purple" : "border-none"}
    ${card.matched && "bg-gray-200 border-none"}`}
      onClick={handleSelect}
    >
      <h1 className="text-xl select-none">{!card.matched ? card.content : ""}</h1>
    </div>
  );
};
