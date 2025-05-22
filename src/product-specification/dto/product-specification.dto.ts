import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateOrUpdateProductSpecificationDto {
  @ApiProperty({
    type: Number,
    nullable: true,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
  })
  @IsNumber()
  specificationId: number;

  @ApiProperty({
    type: Number,
    nullable: true,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  titleId?: number | null;

  @ApiProperty({
    type: Number,
    nullable: false,
    required: true,
  })
  @IsNumber()
  typeId: number;
}
