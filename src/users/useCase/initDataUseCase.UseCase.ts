import { Injectable } from '@nestjs/common';
import { UserSharedRepository } from 'src/shared/repositories/userRepository.repository';
import { CrudRolesUserService } from '../services/crudRolesUser.service';

@Injectable()
export class InitDataUseCase {
  constructor(
    private readonly sharedUserRepository: UserSharedRepository,
    private readonly curdRolesUserService: CrudRolesUserService,
  ) {}

  async initData(userId: number) {
    const user = await this.sharedUserRepository.findOne({
      where: { id: userId },
    });

    delete user.password;

    const rolesUser = await this.curdRolesUserService.getRolesByUserId(userId);

    const roles = rolesUser.map((role) => role.role);
    return { ...user, roles };
  }
}
