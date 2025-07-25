import {
  Controller,
  Body,
  Post,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { UserSetInfoService } from './user-set-info.service';
import { CreateDto, UpdateDto } from './dto';

@Controller('user-set-info')
export class UserSetInfoController {
  constructor(private userSetInfoService: UserSetInfoService) {}

  @Post('')
  create(@Body() dto: CreateDto) {
    return this.userSetInfoService.create(dto);
  }

  @Get('user/:userId/set/:setId')
  findOne(@Param('userId') userId: string, @Param('setId') setId: string) {
    return this.userSetInfoService.findOne(+userId, +setId);
  }

  @Get('user/:userId')
  findUserSetInfos(@Param('userId') userId: string) {
    return this.userSetInfoService.findSet(+userId);
  }

  @Patch('')
  update(@Body() dto: UpdateDto) {
    return this.userSetInfoService.update(dto);
  }

  @Delete('user/:userId/set/:setId')
  delete(@Param('userId') userId: string, @Param('setId') setId: string) {
    return this.userSetInfoService.delete(+userId, +setId);
  }
}
