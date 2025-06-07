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
  read(@Param('id') id: string) {
    return this.setService.read(+id);
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
