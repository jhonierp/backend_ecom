import { Injectable } from '@nestjs/common';
import { PaginateQueryRaw } from 'src/shared/interfaces/paginated';
import { GetAllSubCategoriesPaginatedService } from '../services/getSubAllCategoriesPaginated.service';

@Injectable()
export class GetAllSubCategoriesPaginatedUseCase {
  constructor(
    private readonly getAllSubCategoriesPaginatedService: GetAllSubCategoriesPaginatedService,
  ) {}

  async getAllSubCategoriesPaginated(params: PaginateQueryRaw) {
    return await this.getAllSubCategoriesPaginatedService.getAllSubCategoriesPaginated(
      params,
    );
  }
}
