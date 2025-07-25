import { IsOptional, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateDto {
  @IsNumber()
  @IsNotEmpty()
  cardId: number;

  @IsOptional()
  @IsString()
  term?: string;

  @IsOptional()
  @IsString()
  definition?: string;

  @IsOptional()
  @IsString()
  contentDefinition?: string;

  @IsOptional()
  @IsString()
  audioDefinition?: string;

  @IsOptional()
  @IsString()
  contentTerm?: string;

  @IsOptional()
  @IsString()
  audioTerm?: string;
}
