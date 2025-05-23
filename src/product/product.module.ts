import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { CrudProductUseCase } from './useCase/crudProductUseCase.useCase';
import { CrudProductService } from './services/crudProduct.service';
import { JwtService } from '@nestjs/jwt';
import { productController } from './controllers/product.controller';
import { SubCategoryModule } from 'src/subcategory/subcategory.module';
import { ProductEntity } from '../shared/entities/product.entity';
import { ProductImageEntity } from 'src/shared/entities/ProductImage.entity';
import { CrudImageProductService } from './services/crudImageProduct.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ProductImageEntity]),
    SharedModule.forRoot(),
    SubCategoryModule,
  ],
  providers: [
    CrudProductUseCase,
    CrudProductService,
    JwtService,
    CrudImageProductService,
  ],
  controllers: [productController],
  exports: [CrudProductService, CrudProductUseCase],
})
export class ProductModule {}
