import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSpecificationEntity } from '../shared/entities/productEspecification.entity';
import { CrudProductSpecificationService } from './services/crudProductSpecification.service';
import { ProductSpecificationController } from './controllers/productSpecification.controller';
import { ProductSpecificationUseCase } from './usecase/productSpecification.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSpecificationEntity])],
  providers: [CrudProductSpecificationService, ProductSpecificationUseCase],
  controllers: [ProductSpecificationController],
  exports: [CrudProductSpecificationService, ProductSpecificationUseCase],
})
export class ProductSpecificationModule {}
