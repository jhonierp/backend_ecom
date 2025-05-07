import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserSharedRepository } from 'src/shared/repositories/userRepository.repository';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserSharedRepository,
    private readonly authService: AuthService,
  ) {}

  async refreshToken(token: string) {
    let payload;
    try {
      payload = this.jwtService.verify(token);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      throw new UnauthorizedException();
    }

    const validateSession = await this.userRepository.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!validateSession) {
      throw new UnauthorizedException();
    }

    const refreshToken = this.authService.generateTokens({
      id: validateSession.id,
      email: validateSession.email,
    });

    return refreshToken;
  }
}
