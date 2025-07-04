"use client";

import { useState } from "react";
import { FlashcardInfo } from "./flashcard-info";
import Image from "next/image";

interface Flashcard {
  flashcardInfo: FlashcardInfo;
}

export const Flashcard: React.FC<Flashcard> = ({ flashcardInfo }) => {
  const [flip, setFlip] = useState(false);

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      onClick={() => setFlip(!flip)}
      style={{ perspective: "1000px" }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700`}
        style={{
          transformStyle: "preserve-3d",
          transform: flip ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute w-full h-full bg-white rounded-2xl flex items-center justify-center text-center text-[#552583] p-4"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <div>
            <h1 className="text-[clamp(1.5rem,2vw,3.5rem)]">
              {flashcardInfo.term}
            </h1>
            {flashcardInfo.videoTerm && (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute h-screen w-screen object-cover z-0 opacity-50"
              >
                <source src="/LeFu3.mp4" type="video/mp4" />
              </video>
            )}
            {flashcardInfo.imageTerm && (
              <Image
                src={"/Logo.svg"}
                alt="Image"
                fill
                className="rounded-full object-cover"
              />
            )}
            {flashcardInfo.audioTerm && (
              <button>
                <Image
                  src={"/Logo.svg"}
                  alt="Audio"
                  fill
                  className="rounded-full object-cover"
                />
              </button>
            )}
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute w-full h-full bg-white rounded-2xl flex items-center justify-center text-center text-[#552583] p-4"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <div className="flex flex-col items-center">
            {flashcardInfo.videoDef && (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute h-screen w-screen object-cover z-0 opacity-50"
              >
                <source src="/LeFu3.mp4" type="video/mp4" />
              </video>
            )}
            {flashcardInfo.imageDef && (
              <img src={flashcardInfo.imageDef} alt="Flashcard definition image" className="rounded-2xl "/>
            )}
            {flashcardInfo.audioDef && (
              <button>
                <Image src={"/Logo.svg"} alt="Audio" className="" />
              </button>
            )}
            <h1 className="text-[clamp(1.5rem,5vw,3.5rem)]">
              {flashcardInfo.definition}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
