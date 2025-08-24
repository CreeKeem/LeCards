import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CreateQuestionDto } from './dto';

@Injectable()
export class GeminiService {
  private readonly genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);
  }

  async generateQuizQuestion(dto: CreateQuestionDto) {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
      });

      const prompt = `
        Create a quiz question for a flashcard in the set "${dto.setName}".
        Based on the term "${dto.term}" and definition "${dto.definition}".
        
        Return a valid JSON object with the following structure:
        {
          "question": "Your question here",
          "answer1": "Correct answer",
          "answer2": "Incorrect answer 1",
          "answer3": "Incorrect answer 2", 
          "answer4": "Incorrect answer 3"
        }
        
        Make sure answer1 is always the correct answer.
      `;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // Try to parse the JSON response
      try {
        const jsonResponse = this.parseGeminiResponse(responseText);
        return jsonResponse;
      } catch (parseError) {
        // If parsing fails, return the raw text
        console.error('Failed to parse Gemini response as JSON:', parseError);
        return { rawResponse: responseText };
      }
    } catch (error) {
      console.error('Error generating quiz question:', error);
      throw new Error('Failed to generate quiz question');
    }
  }

  parseGeminiResponse(responseText: string) {
    // Remove Markdown code fences like ```json ... ```
    const cleaned = responseText.replace(/```json|```/g, '').trim();

    try {
      return JSON.parse(cleaned);
    } catch (e) {
      console.error('Failed to parse JSON:', e, cleaned);
      return null;
    }
  }
}
