import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecificationTypeEntity } from '../shared/entities/specificationType.entity';
import { CrudSpecificationTypeService } from './services/crudSpecificationType.service';
import { SpecificationTypeUseCase } from './usecase/specificationType.usecase';
import { SpecificationTypeController } from './controllers/specificationType.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([SpecificationTypeEntity])],
  providers: [
    CrudSpecificationTypeService,
    SpecificationTypeUseCase,
    JwtService,
  ],
  controllers: [SpecificationTypeController],
  exports: [CrudSpecificationTypeService, SpecificationTypeUseCase],
})
export class SpecificationTypeModule {}
