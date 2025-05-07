import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../src/shared/shared.module';
import { PaginatedService } from '../src/shared/services/paginated.service';
import { UserSharedRepository } from '../src/shared/repositories/userRepository.repository';

describe('SharedModule', () => {
  let module: TestingModule;
  let configService: ConfigService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env', // Usa el archivo .env para configurar variables de entorno
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASS'),
            database: configService.get<string>('DB_NAME'),
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            synchronize: false,
          }),
          inject: [ConfigService],
        }),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
              expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
            },
          }),
          inject: [ConfigService],
        }),
        SharedModule.forRoot(),
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it('debería estar definido', () => {
    const sharedModule = module.get<SharedModule>(SharedModule);
    expect(sharedModule).toBeDefined();
  });

  it('debería proveer UserSharedRepository y PaginatedService', () => {
    const userSharedRepo =
      module.get<UserSharedRepository>(UserSharedRepository);
    const paginatedService = module.get<PaginatedService>(PaginatedService);

    expect(userSharedRepo).toBeDefined();
    expect(paginatedService).toBeDefined();
  });

  it('debería obtener las variables de entorno del archivo .env', () => {
    expect(configService.get<string>('DB_HOST')).toBeDefined();
    expect(configService.get<string>('DB_NAME')).toBeDefined();
    expect(configService.get<string>('JWT_SECRET')).toBeDefined();
  });
});
