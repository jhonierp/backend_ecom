import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/shared/entities/user.entity';
import { UserSharedRepository } from 'src/shared/repositories/userRepository.repository';

@Injectable()
export class CrudUsersService {
  constructor(private readonly userRepository: UserSharedRepository) {}
  async create(user: UserEntity): Promise<number> {
    const findUserByemail = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (findUserByemail) {
      throw new HttpException(
        'Correo electronico en uso',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userCreated = await this.userRepository.save(user);
    return userCreated.id;
  }

  async update(user: UserEntity) {
    const userExist = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!userExist) {
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.update(user.id, user);
  }

  async delete(id: number) {
    const userExist = await this.userRepository.findOne({
      where: { id },
    });
    if (!userExist) {
      throw new HttpException('Usuario no encontrado', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.softDelete(id);
  }
}
