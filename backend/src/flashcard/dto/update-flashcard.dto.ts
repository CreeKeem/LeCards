import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  @IsNumber()
  card_id: number;

  @IsOptional()
  @IsString()
  term?: string;

  @IsOptional()
  @IsString()
  definition?: string;

  @IsOptional()
  @IsString()
  audio?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  video?: string;
}
