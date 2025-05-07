import { Module } from '@nestjs/common';
import { CrudUsersService } from './services/crudUsers.service';
import { UserController } from './controllers/user.controller';
import { SharedModule } from 'src/shared/shared.module';
import { CrudUserUseCase } from './useCase/crudUserUseCase.useCase';
import { UserSharedRepository } from 'src/shared/repositories/userRepository.repository';
import { PasswordService } from 'src/auth/services/password.service';
import { InitDataUseCase } from './useCase/initDataUseCase.UseCase';
import { JwtService } from '@nestjs/jwt';
import { CrudRolesUserService } from './services/crudRolesUser.service';
import { RolesUserRepository } from './repositories/rolesUserRepository.repository';
import { GetAllUsersPaginatedService } from './services/getAllUsersPaginated.service';
import { GetAllUsersPaginatedUseCase } from './useCase/getAllUsersPaginatedUseCase.useCase';

@Module({
  providers: [
    CrudUsersService,
    CrudUserUseCase,
    UserSharedRepository,
    PasswordService,
    InitDataUseCase,
    JwtService,
    CrudRolesUserService,
    RolesUserRepository,
    GetAllUsersPaginatedService,
    GetAllUsersPaginatedUseCase,
  ],
  controllers: [UserController],
  imports: [SharedModule.forRoot()],
})
export class UsersModule {}
