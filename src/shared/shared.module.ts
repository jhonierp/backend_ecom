import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSharedRepository } from './repositories/userRepository.repository';
import { JwtModule } from '@nestjs/jwt';
import { PaginatedService } from './services/paginated.service';

@Module({
  providers: [PaginatedService],
})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      module: SharedModule,
      providers: [UserSharedRepository],
      exports: [UserSharedRepository, PaginatedService],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get('DB_HOST'),
            port: +configService.get<number>('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASS'),
            database: configService.get('DB_NAME'),
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: false,
          }),
          inject: [ConfigService],
        }),

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
    };
  }
}
