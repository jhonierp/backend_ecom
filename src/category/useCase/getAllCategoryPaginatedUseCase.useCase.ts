import { Injectable } from '@nestjs/common';
import { PaginateQueryRaw } from 'src/shared/interfaces/paginated';
import { GetAllCategoriesPaginatedService } from '../services/getAllCategoriesPaginated.service';

@Injectable()
export class GetAllCategoriesPaginatedUseCase {
  constructor(
    private readonly getAllCategoriesPaginatedService: GetAllCategoriesPaginatedService,
  ) {}

  async getAllCategoriesPaginated(params: PaginateQueryRaw) {
    return await this.getAllCategoriesPaginatedService.getAllCategoriesPaginated(
      params,
    );
  }
}
