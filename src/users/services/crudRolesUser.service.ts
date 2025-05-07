import { Injectable } from '@nestjs/common';
import { RolesUserRepository } from '../repositories/rolesUserRepository.repository';
import { RolesUserEntity } from 'src/shared/entities/rolesUser.entity';

@Injectable()
export class CrudRolesUserService {
  constructor(private readonly rolesUserRepository: RolesUserRepository) {}

  async create(rolesUser: RolesUserEntity[]) {
    return await this.rolesUserRepository.save(rolesUser);
  }

  async deleteRolesUser(idUser: number) {
    await this.rolesUserRepository.delete({ userId: idUser });
  }

  async getRolesByUserId(userId: number) {
    return await this.rolesUserRepository.find({
      where: { userId: userId },
      relations: ['role'],
    });
  }
}
