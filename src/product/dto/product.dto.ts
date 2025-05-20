import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateProductDto {
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
    nullable: false,
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    nullable: false,
    required: false,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
    nullable: false,
    required: true,
  })
  @IsString()
  image: string;

  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
    example: 1,
  })
  @IsNumber()
  subcategoryId: number;
}
