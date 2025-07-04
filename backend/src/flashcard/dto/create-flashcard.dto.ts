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
