"use client";

import { useState, useRef, useEffect } from "react";
import { FlashcardDto } from ".";
import Image from "next/image";

export const FlashcardFlip = ({
  flashcardDto,
}: {
  flashcardDto: FlashcardDto;
}) => {
  const [flip, setFlip] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [isFrontOverflowing, setIsFrontOverflowing] = useState(false);
  const [isBackOverflowing, setIsBackOverflowing] = useState(false);

  const checkOverflow = () => {
    if (frontRef.current) {
      setIsFrontOverflowing(
        frontRef.current.scrollHeight > frontRef.current.clientHeight
      );
    }
    if (backRef.current) {
      setIsBackOverflowing(
        backRef.current.scrollHeight > backRef.current.clientHeight
      );
    }
  };

  useEffect(() => {
    checkOverflow();
    const handleResize = () => {
      setTimeout(checkOverflow, 100); // Small delay to ensure layout is updated
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [flashcardDto]); // Check when flashcard content changes

  // Force a recheck after flip animation completes
  useEffect(() => {
    const timer = setTimeout(checkOverflow, 350); // Half of animation duration
    return () => clearTimeout(timer);
  }, [flip]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative w-full h-full cursor-pointer"
        onClick={() => setFlip(!flip)}
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: "preserve-3d",
            transform: flip ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Side */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-2xl text-laker-purple p-4 shadow-lg"
            style={{
              transform: "rotateY(0deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div
              ref={frontRef}
              className={`flex flex-col items-center h-full w-full space-y-4 min-h-0 ${
                isFrontOverflowing
                  ? "justify-start overflow-y-auto"
                  : "justify-center overflow-hidden"
              }`}
            >
              {flashcardDto.contentTerm && (
                <div className="flex-shrink-0 w-full max-h-[40%] rounded-xl overflow-hidden">
                  <Image
                    src={flashcardDto.contentTerm}
                    alt="Term Image"
                    width={300}
                    height={300}
                    className="object-contain w-full h-auto max-h-full rounded-xl"
                  />
                </div>
              )}
              {flashcardDto.term && (
                <h1 className="text-[clamp(1.5rem,4vw,2.8rem)] font-semibold break-words text-center leading-tight">
                  {flashcardDto.term}
                </h1>
              )}
              {flashcardDto.audioTerm && (
                <button
                  className="flex-shrink-0 hover:scale-110 transition-transform duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Image
                    src="/Logo.svg"
                    alt="Play Audio"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Back Side */}
          <div
            className="absolute inset-0 w-full h-full bg-white rounded-2xl text-laker-purple p-4 shadow-lg"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
            }}
          >
            <div
              ref={backRef}
              className={`flex flex-col items-center h-full w-full space-y-4 min-h-0 ${
                isBackOverflowing
                  ? "justify-start overflow-y-auto"
                  : "justify-center overflow-hidden"
              }`}
            >
              {flashcardDto.contentDefinition && (
                <div className="flex-shrink-0 w-full max-h-[40%] rounded-xl overflow-hidden">
                  <img
                    src={flashcardDto.contentDefinition}
                    alt="Definition"
                    className="object-contain w-full h-auto max-h-full rounded-xl"
                  />
                </div>
              )}
              {flashcardDto.audioDefinition && (
                <button
                  className="flex-shrink-0 hover:scale-110 transition-transform duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Image
                    src="/Logo.svg"
                    alt="Play Audio"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </button>
              )}
              <h1 className="text-[clamp(1.5rem,4vw,2.8rem)] break-words text-center font-semibold leading-tight">
                {flashcardDto.definition}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
