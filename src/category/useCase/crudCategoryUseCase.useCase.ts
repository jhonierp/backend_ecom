import { Injectable } from '@nestjs/common';
import { CrudCategoryService } from '../services/crudCategory.service';
import { CreateOrUpdateCategoryDto } from '../dto/category.dto';
import { CategoryEntity } from 'src/shared/entities/category.entity';

@Injectable()
export class CrudCategoryUseCase {
  constructor(private readonly crudCategoryService: CrudCategoryService) {}
  async create(categoryDto: CreateOrUpdateCategoryDto): Promise<number> {
    const category: CategoryEntity = {
      name: categoryDto.name,
      description: categoryDto.description,
    };
    const createCategory = await this.crudCategoryService.create(category);
    return createCategory;
  }

  async update(categoryDto: CreateOrUpdateCategoryDto) {
    const category: CategoryEntity = {
      id: categoryDto.id,
      name: categoryDto.name,
      description: categoryDto.description,
    };

    await this.crudCategoryService.update(category);
  }

  async delete(id: number): Promise<void> {
    await this.crudCategoryService.delete(id);
  }
}
