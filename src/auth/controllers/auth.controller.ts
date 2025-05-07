import { Body, Controller, Post } from '@nestjs/common';
import { AuthUseCae } from '../useCase/authUseCase.useCase';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto, RefreshTokenDto } from '../dto/auth.dto';
import { RefreshTokenUseCase } from '../useCase/refreshTokenUseCase';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authUseCase: AuthUseCae,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('/login')
  async login(@Body() userData: AuthDto) {
    const accessToken = await this.authUseCase.run(userData);

    return {
      accessToken,
    };
  }

  @Post('/refresh-token')
  async refreshToken(@Body() accesTokenDto: RefreshTokenDto) {
    const refreshToken = await this.refreshTokenUseCase.refreshToken(
      accesTokenDto.accesToken,
    );

    return {
      refreshToken,
    };
  }
}
