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
import { UserSetInfoService } from './user-set-info.service';
import { CreateDto, UpdateDto } from './dto';
import { GetCurrentUserId } from '../auth/decorators';

@UseGuards(AuthGuard('jwt'))
@Controller('user-set-info')
export class UserSetInfoController {
  constructor(private userSetInfoService: UserSetInfoService) {}

  @Post('')
  create(@Body() dto: CreateDto, @GetCurrentUserId() userId: number) {
    // Override userId from token for security
    return this.userSetInfoService.create({ ...dto }, userId);
  }

  @Get('set/:setId')
  findOne(@Param('setId') setId: string, @GetCurrentUserId() userId: number) {
    return this.userSetInfoService.findOne(userId, +setId);
  }

  @Get('')
  findUserSetInfos(@GetCurrentUserId() userId: number) {
    return this.userSetInfoService.findUserSetInfos(userId);
  }

  @Patch('')
  update(@Body() dto: UpdateDto, @GetCurrentUserId() userId: number) {
    return this.userSetInfoService.update({ ...dto, }, userId);
  }

  @Delete('set/:setId')
  delete(@Param('setId') setId: string, @GetCurrentUserId() userId: number) {
    return this.userSetInfoService.delete(userId, +setId)
  }

  @Patch('set/:setId/cards-learned')
  updateCardsLearned(@Param('setId') setId: string, @GetCurrentUserId() userId: number) {
    return this.userSetInfoService.updateCardsLearned(userId, +setId)
  }

}