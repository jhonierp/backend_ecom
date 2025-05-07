import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginateQueryRaw {
  @ApiProperty({
    type: String,
    required: false,
    example: '1',
  })
  @IsString()
  page?: string;
  @ApiProperty({
    type: String,
    required: false,
    example: '10',
  })
  @IsString()
  perPage?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'rodolfo',
  })
  @IsString()
  @IsOptional()
  search?: string;
}
export interface Paginated<T> {
  rows: T[];
  metadata: Metadata;
}
export interface Metadata {
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  searchTerm: string;
  nextPage: number;
}
