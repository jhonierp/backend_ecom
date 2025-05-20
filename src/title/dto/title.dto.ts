import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateTitleDto {
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
  title: string;
}
