import { Injectable } from '@nestjs/common';

import { Paginated, PaginateQueryRaw } from 'src/shared/interfaces/paginated';

import { PaginatedService } from 'src/shared/services/paginated.service';
import { CategoryRepository } from '../repositories/categoryRepository.repository';
import { CategoryEntity } from 'src/shared/entities/category.entity';

@Injectable()
export class GetAllCategoriesPaginatedService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly paginatedService: PaginatedService,
  ) {}

  async getAllCategoriesPaginated(
    params: PaginateQueryRaw,
  ): Promise<Paginated<CategoryEntity>> {
    const categoryQuery =
      this.categoryRepository.createQueryBuilder('category');

    if (params.search) {
      categoryQuery.where(
        'category.name LIKE :search OR category.description LIKE :search',
        {
          search: `%${params.search}%`,
        },
      );
    }

    return await this.paginatedService.paginateRows(categoryQuery, params);
  }
}
