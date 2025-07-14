"use client";

import { useState, useRef, useEffect } from "react";
import { FlashcardInfo } from "./flashcard-info";
import Image from "next/image";

interface Flashcard {
  flashcardInfo: FlashcardInfo;
}

export const Flashcard: React.FC<Flashcard> = ({ flashcardInfo }) => {
  const [flip, setFlip] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [isFrontOverflowing, setIsFrontOverflowing] = useState(false);
  const [isBackOverflowing, setIsBackOverflowing] = useState(false);

  const checkOverflow = () => {
    if (frontRef.current) {
      setIsFrontOverflowing(frontRef.current.scrollHeight > frontRef.current.clientHeight);
    }
    if (backRef.current) {
      setIsBackOverflowing(backRef.current.scrollHeight > backRef.current.clientHeight);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [flip]);

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      onClick={() => setFlip(!flip)}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flip ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front & Back */}
        {["front", "back"].map((side) => {
          const isFront = side === "front";
          const isOverflowing = isFront ? isFrontOverflowing : isBackOverflowing;
          const ref = isFront ? frontRef : backRef;

          const content = isFront ? (
            <>
              
              {flashcardInfo.imageTerm && (
                <div className="flex-shrink-0 w-full max-h-[40%] rounded-xl overflow-hidden">
                  <Image
                    src={flashcardInfo.imageTerm}
                    alt="Image"
                    width={300}
                    height={300}
                    className="object-contain w-full h-auto max-h-full rounded-xl"
                  />
                </div>
              )}
              {flashcardInfo.videoTerm && (
                <div className="flex-shrink-0 w-full max-h-[40%] rounded-xl overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto max-h-full rounded-xl"
                  >
                    <source src={flashcardInfo.videoTerm} type="video/mp4" />
                  </video>
                </div>
              )}
              {flashcardInfo.term && (
                <h1 className="text-[clamp(1.5rem,4vw,2.8rem)] font-semibold break-words text-center">
                  {flashcardInfo.term}
                </h1>
              )}
              {flashcardInfo.audioTerm && (
                <button className="flex-shrink-0">
                  <Image
                    src="/Logo.svg"
                    alt="Audio"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </button>
              )}
              
            </>
          ) : (
            <>
              {flashcardInfo.imageDef && (
                <div className="flex-shrink-0 w-full max-h-[40%] rounded-xl overflow-hidden">
                  <img
                    src={flashcardInfo.imageDef}
                    alt="Definition"
                    className="object-contain w-full h-auto max-h-full rounded-xl"
                  />
                </div>
              )}
              {flashcardInfo.audioDef && (
                <button className="flex-shrink-0">
                  <Image
                    src="/Logo.svg"
                    alt="Audio"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </button>
              )}
              {flashcardInfo.videoDef && (
                <div className="flex-shrink-0 w-full max-h-[40%] rounded-xl overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto max-h-full rounded-xl"
                  >
                    <source src={flashcardInfo.videoDef} type="video/mp4" />
                  </video>
                </div>
              )}
              <h1 className="text-[clamp(1.5rem,4vw,2.8rem)] break-words text-center font-semibold">
                {flashcardInfo.definition}
              </h1>
            </>
          );

          return (
            <div
              key={side}
              className="absolute w-full h-full bg-white rounded-2xl text-laker-purple p-4"
              style={{
                transform: isFront ? "rotateY(0deg)" : "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <div
                ref={ref}
                className={`flex flex-col items-center h-full w-full overflow-auto space-y-4 min-h-0 ${
                  isOverflowing ? "justify-start" : "justify-center"
                }`}
              >
                {content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
