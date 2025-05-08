import { Injectable } from '@nestjs/common';

import { CreateOrUpdateSubCategoryDto } from '../dto/subCategory.dto';
// Repositorio de categorías

import { CrudSubCategoryService } from '../services/crudSubCategory.service';
import { CategoryRepository } from 'src/category/repositories/categoryRepository.repository';

@Injectable()
export class CrudSubcategoryUseCase {
  constructor(
    private readonly crudSubcategoryService: CrudSubCategoryService,
    private readonly categoryRepository: CategoryRepository, // Inyectamos el repositorio de categorías
  ) {}

  async create(subcategoryDto: CreateOrUpdateSubCategoryDto): Promise<number> {
    // Buscar la categoría completa en la base de datos usando el id
    const category = await this.categoryRepository.findOne({
      where: { id: subcategoryDto.categoryId },
    });

    if (!category) {
      throw new Error('La categoría no existe');
    }

    const subcategory = {
      name: subcategoryDto.name,
      description: subcategoryDto.description,
      category: category, // Usamos el objeto completo de CategoryEntity
    };

    const created = await this.crudSubcategoryService.create(subcategory);
    return created;
  }

  async update(subcategoryDto: CreateOrUpdateSubCategoryDto): Promise<void> {
    // Buscar la categoría completa en la base de datos usando el id
    const category = await this.categoryRepository.findOne({
      where: { id: subcategoryDto.categoryId },
    });

    if (!category) {
      throw new Error('La categoría no existe');
    }

    const subcategory = {
      id: subcategoryDto.id,
      name: subcategoryDto.name,
      description: subcategoryDto.description,
      category: category, // Usamos el objeto completo de CategoryEntity
    };

    await this.crudSubcategoryService.update(subcategory);
  }

  async delete(id: number): Promise<void> {
    await this.crudSubcategoryService.delete(id);
  }
}
