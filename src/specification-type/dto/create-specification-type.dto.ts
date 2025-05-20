import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpecificationTypeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
