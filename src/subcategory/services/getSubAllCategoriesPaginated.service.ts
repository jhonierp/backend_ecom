import { Injectable } from '@nestjs/common';
import { Paginated, PaginateQueryRaw } from 'src/shared/interfaces/paginated';
import { PaginatedService } from 'src/shared/services/paginated.service';
import { SubCategoryRepository } from '../repositories/subCategoryRepository.repository';
import { SubCategoryEntity } from 'src/shared/entities/subcategory.entity';

@Injectable()
export class GetAllSubCategoriesPaginatedService {
  constructor(
    private readonly subCategoryRepository: SubCategoryRepository,
    private readonly paginatedService: PaginatedService,
  ) {}

  async getAllSubCategoriesPaginated(
    params: PaginateQueryRaw,
  ): Promise<Paginated<SubCategoryEntity>> {
    const subcategoryQuery =
      this.subCategoryRepository.createQueryBuilder('subcategory')
      .leftJoinAndSelect('subcategory.category', 'category'); // Incluir la relación con la categoría

    if (params.search) {
      subcategoryQuery.where(
        'subcategory.name LIKE :search OR subcategory.description LIKE :search',
        {
          search: `%${params.search}%`,
        },
      );
    }

    return await this.paginatedService.paginateRows(subcategoryQuery, params);
  }
}
