import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { Metadata, Paginated, PaginateQueryRaw } from '../interfaces/paginated';

@Injectable()
export class PaginatedService {
  async paginateRows<T>(
    qb: SelectQueryBuilder<T>,
    query: PaginateQueryRaw,
  ): Promise<Paginated<T>> {
    const take = Number(query.perPage);
    const page = Number(query.page);
    const skip = take * page - take;

    const [rows, count] = await qb.take(take).skip(skip).getManyAndCount();

    const itemsPerPage = Number(query.perPage);
    const totalPages = Math.ceil(count / itemsPerPage);
    const totalItems = count;
    const currentPage = Number(query.page);
    const nextPage = totalPages - currentPage <= 0 ? null : currentPage + 1;

    const metadata: Metadata = {
      itemsPerPage,
      totalPages,
      totalItems,
      currentPage,
      nextPage,
      searchTerm: query.search || '',
    };

    return { rows, metadata };
  }
}
