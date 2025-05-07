import { Injectable } from '@nestjs/common';
import { GetAllUsersPaginatedService } from '../services/getAllUsersPaginated.service';
import { PaginateQueryRaw } from 'src/shared/interfaces/paginated';

@Injectable()
export class GetAllUsersPaginatedUseCase {
  constructor(
    private readonly getAllUsersPaginatedService: GetAllUsersPaginatedService,
  ) {}

  async getAllUsersPaginated(params: PaginateQueryRaw) {
    return await this.getAllUsersPaginatedService.getAllUsersPaginated(params);
  }
}
