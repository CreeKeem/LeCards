import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDto {

  @IsNotEmpty()
  @IsNumber()
  setId: number;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsNumber()
  cardsLearned?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastAccess?: Date;
}