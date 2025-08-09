"use client";

import { Footer } from "@/components/navigation";
import { useEffect, useState, useRef } from "react";
import { FlashcardList, LearningStatus } from "@/components/flashcard";
import { useRouter, useParams } from "next/navigation";

export default function Edit() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const nameRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleCreateSet = () => {};

  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (nameRef.current) {
      nameRef.current.style.height = "auto";
      nameRef.current.style.height = nameRef.current.scrollHeight + "px";
    }
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto";
      descriptionRef.current.style.height =
        descriptionRef.current.scrollHeight + "px";
    }
    setDescription(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center py-10 bg-[#F9FAFB] gap-8">
        {/* Title + Description */}
        <div className="flex flex-col w-full max-w-[1216px] bg-white min-h-[180px] rounded-2xl drop-shadow-lg gap-8 p-6">
          <textarea
            ref={nameRef}
            value={name}
            onChange={handleNameChange}
            placeholder="Enter Name"
            rows={1}
            className="w-full resize-none overflow-hidden rounded-md border border-gray-300 focus:outline-none p-2 text-3xl min-h-[55px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
              }
            }}
          />
          <textarea
            ref={descriptionRef}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter Description"
            rows={1}
            className="w-full resize-none overflow-hidden rounded-md border border-gray-300 focus:outline-none p-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault();
              }
            }}
          />
        </div>

        {/* Create + Cancel Buttons*/}
        <div className="w-full max-w-[1216px] flex flex-col md:flex-row justify-between h-auto md:h-[96px] gap-[16px] md:gap-[32px]">
          {/* Create New */}
          <button
            className="w-full md:w-[50%] md:max-w-[600px bg-laker-gold h-[50px] rounded-[12px] cursor-pointer hover:bg-[#E0A322] duration-300"
            onClick={handleCreateSet}
          >
            <h1 className="text-2xl font-bold text-white">Create Set</h1>
          </button>

          {/* Quick Study */}
          <button
            className="w-full md:w-[50%] md:max-w-[600px]  bg-laker-purple h-[50px] rounded-[12px] cursor-pointer hover:bg-[#7831B7] duration-300"
            onClick={() => router.push("/dashboard")}
          >
            <h1 className="text-2xl font-bold text-white">Cancel</h1>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
