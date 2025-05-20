import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { SubCategoryController } from './controllers/subCategory.controller';
import { SubCategoryRepository } from './repositories/subCategoryRepository.repository';
import { CrudSubCategoryService } from './services/crudSubCategory.service';
import { CrudSubcategoryUseCase } from './useCase/crudSubCategoryUseCase.useCase';
import { JwtService } from '@nestjs/jwt';
import { CategoryRepository } from 'src/category/repositories/categoryRepository.repository';

import { GetAllSubCategoriesPaginatedService } from './services/getSubAllCategoriesPaginated.service';
import { GetAllSubCategoriesPaginatedUseCase } from './useCase/getAllSubCategoryPaginatedUseCase.useCase';

@Module({
  providers: [
    CrudSubcategoryUseCase,
    CrudSubCategoryService,
    SubCategoryRepository,
    JwtService,
    CategoryRepository,
    GetAllSubCategoriesPaginatedService,
    GetAllSubCategoriesPaginatedUseCase,
  ],
  controllers: [SubCategoryController],
  imports: [SharedModule.forRoot()],
  exports: [CrudSubCategoryService],
})
export class SubCategoryModule {}
