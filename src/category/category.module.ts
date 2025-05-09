import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { CategoryController } from './controllers/category.controller';
import { CrudCategoryUseCase } from './useCase/crudCategoryUseCase.useCase';
import { CrudCategoryService } from './services/crudCategory.service';
import { CategoryRepository } from './repositories/categoryRepository.repository';
import { JwtService } from '@nestjs/jwt';
import { GetAllCategoriesPaginatedService } from './services/getAllCategoriesPaginated.service';
import { GetAllCategoriesPaginatedUseCase } from './useCase/getAllCategoryPaginatedUseCase.useCase';

@Module({
  providers: [
    CrudCategoryUseCase,
    CrudCategoryService,
    CategoryRepository,
    JwtService,
    GetAllCategoriesPaginatedService,
    GetAllCategoriesPaginatedUseCase,
  ],
  controllers: [CategoryController],
  imports: [SharedModule.forRoot()],
})
export class CategoryModule {}
