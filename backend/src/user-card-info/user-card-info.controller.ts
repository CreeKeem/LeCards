import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UserCardInfoService } from './user-card-info.service';
import { CreateDto, UpdateDto } from './dto';

@Controller('user-card-info')
export class UserCardInfoController {
  constructor(private userCardInfoService: UserCardInfoService) {}

  @Post('')
  create(@Body() dto: CreateDto) {
    return this.userCardInfoService.create(dto);
  }

  @Get('user/:userId/card/:cardId')
  findOne(@Param('userId') userId: string, @Param('cardId') cardId: string) {
    return this.userCardInfoService.findOne(+userId, +cardId);
  }

  @Get('user/:userId/set/:setId')
  findSet(@Param('userId') userId: string, @Param('setId') setId: string) {
    return this.userCardInfoService.findSet(+userId, +setId);
  }

  @Patch('user/:userId/card/:cardId')
  update(
    @Param('userId') userId: string,
    @Param('cardId') cardId: string,
    @Body() dto: UpdateDto,
  ) {
    return this.userCardInfoService.update(+userId, +cardId, dto);
  }

  @Delete('user/:userId/card/:cardId')
  delete(@Param('userId') userId: string, @Param('cardId') cardId: string) {
    return this.userCardInfoService.delete(+userId, +cardId);
  }
}
