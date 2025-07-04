import { IsOptional, IsString } from 'class-validator';

export class UpdateDto {
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
