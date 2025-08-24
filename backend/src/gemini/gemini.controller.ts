import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GeminiService } from './gemini.service';
import { CreateQuestionDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('gemini')
export class GeminiController {
  constructor(private geminiService: GeminiService) {}

  @Post('create-quiz-question')
  createQuizQuestion(@Body() dto: CreateQuestionDto) {
    return this.geminiService.generateQuizQuestion(dto);
  }
}