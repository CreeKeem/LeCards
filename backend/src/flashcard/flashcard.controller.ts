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

  @Post('')
  create(@Body() dto: CreateDto) {
    return this.flashcardService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashcardService.findOne(+id);
  }

  @Get('set/:setId')
  findSetCards(@Param('setId') setId: string) {
    return this.flashcardService.findSetCards(+setId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDto) {
    return this.flashcardService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.flashcardService.delete(+id);
  }
}
