import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsOptional()
  video?: string;

  @IsOptional()
  audio?: string;

  @IsOptional()
  image?: string;
}
