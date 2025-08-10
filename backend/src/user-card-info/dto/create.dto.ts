import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsDate,
} from 'class-validator';
import { LearningStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateDto {
  @IsNotEmpty()
  @IsNumber()
  cardId: number;

  @IsOptional()
  @IsBoolean()
  favorite?: boolean;

  @IsOptional()
  @IsEnum(LearningStatus)
  learningStatus?: LearningStatus;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  lastReviewed?: Date;
}