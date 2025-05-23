import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
    type: [String], // Cambiado a array de strings
    nullable: false,
    required: true,
    example: ['https://mi-sitio.com/img1.jpg', 'https://mi-sitio.com/img2.jpg'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  imageUrls: string[];

  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
    example: 1,
  })
  @IsNumber()
  subcategoryId: number;
}
