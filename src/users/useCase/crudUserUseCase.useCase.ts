import { Injectable } from '@nestjs/common';
import { CrudUsersService } from '../services/crudUsers.service';
import { CreateOrUpdateUserDto } from '../dto/user.dto';
import { UserEntity } from 'src/shared/entities/user.entity';
import { PasswordService } from 'src/auth/services/password.service';
import { RolesUserEntity } from 'src/shared/entities/rolesUser.entity';
import { CrudRolesUserService } from '../services/crudRolesUser.service';

@Injectable()
export class CrudUserUseCase {
  constructor(
    private readonly crudUserService: CrudUsersService,
    private readonly passwordService: PasswordService,
    protected readonly crudRolesUserService: CrudRolesUserService,
  ) {}
  async create(userDto: CreateOrUpdateUserDto): Promise<number> {
    const passwordHash = await this.passwordService.hash(userDto.password);
    const user: UserEntity = {
      name: userDto.name,
      lastName: userDto.lastName,
      email: userDto.email,
      password: passwordHash,
    };
    const createUser = await this.crudUserService.create(user);

    const rolesUser = this.createOrUpdateRoles(createUser, userDto.roles);

    await this.crudRolesUserService.create(rolesUser);
    return createUser;
  }

  async update(userDto: CreateOrUpdateUserDto) {
    const user: UserEntity = {
      id: userDto.id,
      name: userDto.name,
      lastName: userDto.lastName,
      email: userDto.email,
    };

    if (userDto.password) {
      const passwordHash = await this.passwordService.hash(userDto.password);
      user.password = passwordHash;
    }
    await this.crudUserService.update(user);

    await this.crudRolesUserService.deleteRolesUser(user.id);

    const rolesUser = this.createOrUpdateRoles(user.id, userDto.roles);

    await this.crudRolesUserService.create(rolesUser);
  }

  async delete(id: number): Promise<void> {
    await this.crudUserService.delete(id);
  }

  private createOrUpdateRoles(userId: number, roles: number[]) {
    const rolesUser: RolesUserEntity[] = [];

    roles.map((role) => {
      rolesUser.push({
        userId: userId,
        roleId: role,
      });
    });

    return rolesUser;
  }
}
