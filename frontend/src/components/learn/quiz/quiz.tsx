"use client";

import { FlashcardDto, FlashcardFlip } from "@/components/flashcard";
import { fetchFlashcardsBySetId } from "@/api/flashcard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronIcon } from "@/components/navigation";
import { LearningStatus } from "@/components/flashcard";
import { updateUserCardInfo } from "@/api/user-card-info";
import { updateCardsLearned } from "@/api/user-set-info";
import { CreateQuizQuestion, CreateQuizQuestionReq } from "@/api/gemini";

interface CreateQuizQuestionRes {
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
}

interface QuizQuestion {
  question: CreateQuizQuestionRes | null;
  cardId: number;
  answered: boolean;
  correctAnswer: string | null | undefined;
  selectedAnswer: string | null;
}

export const QuizSet = ({
  setId,
  setName,
}: {
  setId: number;
  setName: string;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  const router = useRouter();

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    const getQuiz = async () => {
      const flashcards = await fetchFlashcardsBySetId(setId);

      // Gets all the quiz questions and adds them to the QuizQuestions list

      // Fetches questions for all flashcards
      const promises = flashcards.map(fetchQuizQuestion);

      // Waits for all the api calls to return a value
      const results = await Promise.allSettled(promises);

      const questions: QuizQuestion[] = results.map((res, i) => ({
        question: res.status === "fulfilled" ? res.value : null,
        cardId: flashcards[i].cardId,
        answered: false,
        correctAnswer: res.status === "fulfilled" ? res.value?.answer1 : null,
        selectedAnswer: null,
      }));

      // const quiz = await fetchQuizQuestion(flashcards[0]);
      // const question = {
      //   question: quiz,
      //   cardId: flashcards[0].cardId,
      //   answered: false,
      //   correctAnswer: quiz?.answer1,
      //   selectedAnswer: null,
      // };

      // setQuizQuestions((prev) => [...prev, question]);
      setQuizQuestions(questions);
      setLoading(false);
    };
    getQuiz();
  }, [setId]);

  const fetchQuizQuestion = async (
    card: FlashcardDto
  ): Promise<CreateQuizQuestionRes | null> => {
    try {
      const req: CreateQuizQuestionReq = {
        term: card.term,
        definition: card.definition,
        setName: setName,
      };

      const res = await CreateQuizQuestion(req);

      if (res) {
        return res;
      } else {
        setError("Failed to fetch quiz question");
        return null;
      }
    } catch (error) {
      console.error("Error fetching quiz question:", error);
      setError("An error occurred while fetching the quiz question");
      return null;
    }
  };

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
          <p className="mt-4 text-lg text-gray-600">Generating Quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl drop-shadow-xl flex items-center justify-center">
        <div className="text-center">
          <p className="mt-4 text-lg text-gray-600">Error Generating Quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white h-full rounded-2xl drop-shadow-xl flex flex-col items-start justify-center gap-2 p-5">
      <div className="text-2xl">{quizQuestions[0].question?.question}</div>
    </div>
  );
};
