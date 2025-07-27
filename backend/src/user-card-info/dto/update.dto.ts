import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LearningStatus } from '@prisma/client';

export class UpdateDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

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
  @Type(() => Date)
  @IsOptional()
  lastReviewed?: Date;
}
