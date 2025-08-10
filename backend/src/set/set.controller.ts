import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SetService } from './set.service';
import { CreateDto, UpdateDto } from './dto';
import { GetCurrentUserId } from '../auth/decorators';

@UseGuards(AuthGuard('jwt'))
@Controller('set')
export class SetController {
  constructor(private setService: SetService) {}

  @Post('')
  create(@Body() dto: CreateDto, @GetCurrentUserId() userId: number) {
    return this.setService.create({ ...dto }, userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    return this.setService.findOne(+id, userId);
  }

  @Get('user/my-sets')
  findUserSets(@GetCurrentUserId() userId: number) {
    return this.setService.findUserSets(userId);
  }

  @Patch('')
  async update(@Body() dto: UpdateDto, @GetCurrentUserId() userId: number) {
    return this.setService.update(dto, userId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    return this.setService.delete(+id, userId);
  }

  @Get('user/count')
  findUserSetCount(@GetCurrentUserId() userId: number) {
    return this.setService.findUserSetCount(userId);
  }
}
