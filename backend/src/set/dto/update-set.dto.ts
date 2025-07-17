import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  numCards?: number;

  @IsOptional()
  @IsNumber()
  cardsLearned?: number;

  @IsOptional()
  @IsDate()
  lastAccess?: Date;
}
