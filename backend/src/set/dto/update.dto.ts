import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  @IsNumber()
  setId: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  numCards?: number;
}