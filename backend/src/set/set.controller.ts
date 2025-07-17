import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SetService } from './set.service';
import { CreateDto, UpdateDto } from './dto';

@Controller('set')
export class SetController {
  constructor(private setService: SetService) {}

  @Post('')
  create(@Body() dto: CreateDto) {
    return this.setService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setService.findOne(+id);
  }

  @Get('user/:userId')
  findUserSets(@Param('userId') userId: string) {
    return this.setService.findUserSets(+userId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDto) {
    return this.setService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.setService.delete(+id);
  }
}
