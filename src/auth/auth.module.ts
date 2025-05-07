import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthUseCae } from './useCase/authUseCase.useCase';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/shared/entities/user.entity';
import { PasswordService } from './services/password.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RefreshTokenUseCase } from './useCase/refreshTokenUseCase';

@Module({
  providers: [AuthService, AuthUseCae, PasswordService, RefreshTokenUseCase],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    SharedModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
        };
      },

      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
