import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserSharedRepository } from 'src/shared/repositories/userRepository.repository';
import { PasswordService } from '../services/password.service';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthUseCae {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserSharedRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async run(userCredentials: AuthDto) {
    const user = await this.userRepository.findOne({
      where: { email: userCredentials.email },
    });

    if (!user) {
      throw new HttpException('Usuario no encontrado', 404);
    }

    const verifyPassword = await this.passwordService.compare(
      userCredentials.password,
      user.password,
    );

    if (!verifyPassword) {
      throw new HttpException('Email o contraseña incorrecto', 500);
    }

    const token = await this.authService.generateTokens({
      id: user.id,
      email: user.email,
    });

    return token;
  }
}
