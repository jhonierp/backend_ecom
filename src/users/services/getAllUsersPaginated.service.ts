import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/shared/entities/user.entity';
import { Paginated, PaginateQueryRaw } from 'src/shared/interfaces/paginated';
import { UserSharedRepository } from 'src/shared/repositories/userRepository.repository';
import { PaginatedService } from 'src/shared/services/paginated.service';

@Injectable()
export class GetAllUsersPaginatedService {
  constructor(
    private readonly sharedUserRepository: UserSharedRepository,
    private readonly paginatedService: PaginatedService,
  ) {}

  async getAllUsersPaginated(
    params: PaginateQueryRaw,
  ): Promise<Paginated<UserEntity>> {
    const userQuery = this.sharedUserRepository
      .createQueryBuilder('user')

      .innerJoinAndSelect('user.rolesUser', 'RolesUserEntity')
      .innerJoinAndSelect('RolesUserEntity.role', 'RoleEntity');

    if (params.search) {
      userQuery.where('user.name LIKE :search OR user.lastname LIKE :search', {
        search: `%${params.search}%`,
      });
    }

    return await this.paginatedService.paginateRows(userQuery, params);
  }
}
