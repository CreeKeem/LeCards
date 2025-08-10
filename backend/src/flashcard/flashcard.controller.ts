import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FlashcardService } from './flashcard.service';
import { CreateDto, UpdateDto } from './dto/index';
import { GetCurrentUserId } from '../auth/decorators';

@UseGuards(AuthGuard('jwt'))
@Controller('flashcard')
export class FlashcardController {
  constructor(private flashcardService: FlashcardService) {}

  @Post('')
  create(@Body() dto: CreateDto, @GetCurrentUserId() userId: number) {
    return this.flashcardService.create(dto, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    return this.flashcardService.findOne(+id, userId);
  }

  @Get('set/:setId')
  findSetCards(
    @Param('setId') setId: string,
    @GetCurrentUserId() userId: number,
  ) {
    return this.flashcardService.findSetCards(+setId, userId);
  }

  @Patch('')
  update(@Body() dto: UpdateDto, @GetCurrentUserId() userId: number) {
    return this.flashcardService.update(dto, userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    return this.flashcardService.delete(+id, userId);
  }

  @Get('user/count')
  findUserCardCount(@GetCurrentUserId() userId: number) {
    return this.flashcardService.findUserCardCount(userId);
  }
}
