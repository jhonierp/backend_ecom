import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpecificationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
