import { useEffect, useState } from "react";
import { MatchCardProps } from ".";

export const MatchCard = ({
  card,
  selectFunction,
}: {
  card: MatchCardProps;
  selectFunction: (card: MatchCardProps) => boolean;
}) => {
  const [matchCard, setMatchCard] = useState<MatchCardProps>(card);
  const [matched, setMatched] = useState<boolean>(false);

  const handleSelect = () => {
    const correct = selectFunction(matchCard);
    setMatchCard((prev) => ({ ...prev, selected: !matchCard.selected }));
    setMatched(correct)
  };
  return (
    <div
      className={`bg-white shadow-xl rounded-2xl w-full h-full cursor-pointer flex items-center justify-center p-5 border-2
    ${matchCard.selected ? "border-laker-purple" : "border-none"}
    ${matched && "bg-gray-200 border-none"}`}
      onClick={handleSelect}
    >
      <h1 className="text-xl select-none">{!matched ? matchCard.content : ""}</h1>
    </div>
  );
};
