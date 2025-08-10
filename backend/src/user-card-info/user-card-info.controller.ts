import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserCardInfoService } from './user-card-info.service';
import { CreateDto, UpdateDto } from './dto';
import { GetCurrentUserId } from '../auth/decorators';

@UseGuards(AuthGuard('jwt'))
@Controller('user-card-info')
export class UserCardInfoController {
  constructor(private userCardInfoService: UserCardInfoService) {}

  @Post('')
  create(@Body() dto: CreateDto, @GetCurrentUserId() userId: number) {
    // Override userId from token for security
    return this.userCardInfoService.create({ ...dto }, userId);
  }

  @Get('card/:cardId')
  findOne(@Param('cardId') cardId: string, @GetCurrentUserId() userId: number) {
    return this.userCardInfoService.findOne(userId, +cardId);
  }

  @Get('set/:setId')
  findSet(@Param('setId') setId: string, @GetCurrentUserId() userId: number) {
    return this.userCardInfoService.findSet(userId, +setId);
  }

  @Patch('')
  update(@Body() dto: UpdateDto, @GetCurrentUserId() userId: number) {
    // Override userId from token for security
    return this.userCardInfoService.update({ ...dto }, userId);
  }

  @Delete('card/:cardId')
  delete(@Param('cardId') cardId: string, @GetCurrentUserId() userId: number) {
    return this.userCardInfoService.delete(userId, +cardId);
  }

  @Get('mastered/count')
  findUserMasteredCardCount(@GetCurrentUserId() userId: number) {
    return this.userCardInfoService.findUserMasteredCardCount(userId);
  }

  @Get('learning-status/counts')
  findLearningStatusCounts(@GetCurrentUserId() userId: number) {
    return this.userCardInfoService.findLearningStatusCounts(userId);
  }

  @Get('favorites')
  findUserFavoriteCards(@GetCurrentUserId() userId: number) {
    return this.userCardInfoService.findUserFavoriteCards(userId);
  }
}
