import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateSpecificationDto {
  @ApiProperty({
    type: Number,
    nullable: true,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
