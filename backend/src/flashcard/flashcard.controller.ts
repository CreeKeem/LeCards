import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { FlashcardDto } from './dto/index';

@Controller('flashcard')
export class FlashcardController {
  constructor(private flashcardService: FlashcardService) {}

  @Post('create')
  create(@Body() dto: FlashcardDto) {
    return this.flashcardService.create(dto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.flashcardService.delete(+id);
  }
}
