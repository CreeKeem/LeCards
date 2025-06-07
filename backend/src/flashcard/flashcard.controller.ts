import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { CreateDto, UpdateDto } from './dto/index';

@Controller('flashcard')
export class FlashcardController {
  constructor(private flashcardService: FlashcardService) {}

  @Post('create')
  create(@Body() dto: CreateDto) {
    return this.flashcardService.create(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.flashcardService.delete(+id);
  }

  @Patch('update')
  update(@Body() dto: UpdateDto) {
    return this.flashcardService.update(dto);
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.flashcardService.read(+id);
  }
}
