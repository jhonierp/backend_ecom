import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecificationEntity } from '../shared/entities/specification.entity';
import { CrudSpecificationService } from './services/crudSpecification.service';
import { SpecificationController } from './controllers/specification.controller';
import { SpecificationUseCase } from './usecase/specification.usecase';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([SpecificationEntity])],
  providers: [CrudSpecificationService, SpecificationUseCase, JwtService],
  controllers: [SpecificationController],
  exports: [CrudSpecificationService, SpecificationUseCase],
})
export class SpecificationModule {}
