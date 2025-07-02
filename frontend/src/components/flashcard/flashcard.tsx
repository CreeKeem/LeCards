"use client";

import { useState, useEffect } from "react";
import { FlashcardInfo } from "./flashcard-info";
import Image from "next/image";

interface Flashcard {
  flashcardInfo: FlashcardInfo;
}

export const Flashcard: React.FC<Flashcard> = ({ flashcardInfo }) => {
  const [flip, setFlip] = useState(false);

  return (
    <div
      onClick={() => setFlip(!flip)}
      className="w-full bg-white rounded-2xl h-full flex items-center justify-center text-center text-[#552583] font-medium"
    >
      {flip ? (
        <div>
          {/* Definition */}
          
          <h1 className="text-[clamp(1.5rem,5vw,3.5rem)]">{flashcardInfo.definition}</h1>

          {/* If there is a video for the definition then render it */}
          {flashcardInfo.videoDef ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-screen w-screen object-cover absolute z-1 opacity-50"
            >
              <source src="/LeFu3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <></>
          )}

          {/* If there is a image for the definition then render it */}
          {flashcardInfo.imageDef ? (
            <Image
              src={"/Logo.svg"}
              alt="Lebron James"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <></>
          )}

          {/* If there is an audio for the definition render a button to play it */}
          {flashcardInfo.audioDef ? (
            <button>
              <Image
                src={"/Logo.svg"}
                alt="Lebron James"
                fill
                className="rounded-full object-cover"
              />
            </button>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>
          {/* Term */}
          <h1 className="text-[clamp(1.5rem,2vw,3.5rem)]">{flashcardInfo.term}</h1>

          {/* If there is a video for the term then render it */}
          {flashcardInfo.videoTerm ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-screen w-screen object-cover absolute z-1 opacity-50"
            >
              <source src="/LeFu3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <></>
          )}

          {/* If there is a image for the term then render it */}
          {flashcardInfo.imageTerm ? (
            <Image
              src={"/Logo.svg"}
              alt="Lebron James"
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <></>
          )}

          {/* If there is an audio for the term render a button to play it */}
          {flashcardInfo.audioTerm ? (
            <button>
              <Image
                src={"/Logo.svg"}
                alt="Lebron James"
                fill
                className="rounded-full object-cover"
              />
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
