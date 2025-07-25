import { IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsEnum, IsDate } from 'class-validator';
import { LearningStatus } from '@prisma/client'; 

export class CreateDto {
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
  @IsOptional()
  lastReviewed: Date
}
