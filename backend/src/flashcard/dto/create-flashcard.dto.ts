import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDto {
  @IsNumber()
  @IsNotEmpty()
  set_id: number;

  @IsString()
  @IsNotEmpty()
  term: string;

  @IsString()
  @IsNotEmpty()
  definition: string;

  @Optional()
  video?: string;

  @Optional()
  audio?: string;

  @Optional()
  image?: string;
}
