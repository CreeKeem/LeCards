import { ApiClient } from "@/lib/api/api-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface CreateQuizQuestionDto {
  setName: string;
  term: string;
  definition: string;
}

export const CreateQuizQuestion = async (data: CreateQuizQuestionDto) => {
  try {
    const response = await ApiClient.authenticatedFetch(
      `${backendUrl}/gemini/create-quiz-question`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to create quiz question");

    return await response.json();
  } catch (error) {
    console.error("Error creating quiz question:", error);
    return null;
  }
};