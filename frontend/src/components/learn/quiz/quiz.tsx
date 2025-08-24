"use client";

import { FlashcardDto, FlashcardFlip } from "@/components/flashcard";
import { fetchFlashcardsBySetId } from "@/api/flashcard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronIcon } from "@/components/navigation";
import { LearningStatus } from "@/components/flashcard";
import { updateUserCardInfo } from "@/api/user-card-info";
import { updateCardsLearned } from "@/api/user-set-info";
import { CreateQuizQuestion, CreateQuizQuestionDto } from "@/api/gemini";

interface QuizQuestionResponse {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

export const QuizSet = ({
  setId,
  setName,
}: {
  setId: number;
  setName: string;
}) => {
  const [question, setQuestion] = useState<QuizQuestionResponse | null>();
  const [error, setError] = useState<string | null>(null);
  const [cards, setCards] = useState<FlashcardDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    const fetchQuizQuestion = async () => {
      try {
        const req: CreateQuizQuestionDto = {
          term: "High School",
          definition: "St. Vincent-St. Mary High School",
          setName: "LeBron James Trivia",
        };

        console.log("Making API request:", req);
        const res = await CreateQuizQuestion(req);
        console.log("API response:", res);

        if (res) {
          setQuestion(res);
        } else {
          setError("Failed to fetch quiz question");
        }
      } catch (error) {
        console.error("Error fetching quiz question:", error);
        setError("An error occurred while fetching the quiz question");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizQuestion();
  }, [setId]);

  if (setId === -1) {
    return (
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl drop-shadow-xl flex items-center justify-center">
        <h1>Set Not Found</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl drop-shadow-xl flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-laker-purple mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Fetching Flashcards...</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl drop-shadow-xl flex items-center justify-center">
        <h1>No flashcards found</h1>
      </div>
    );
  }

  return (
    <div className="w-full bg-white h-full rounded-2xl drop-shadow-xl flex items-center justify-center">
        
    </div>
  );
};
