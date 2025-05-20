import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubCategoryRepository } from '../repositories/subCategoryRepository.repository';
import { SubCategoryEntity } from 'src/shared/entities/subcategory.entity';
import { CategoryRepository } from 'src/category/repositories/categoryRepository.repository';

@Injectable()
export class CrudSubCategoryService {
  constructor(
    private readonly subCategoryRepository: SubCategoryRepository,
    private readonly categoryRepository: CategoryRepository, // Agregamos el repositorio de categorías
  ) {}

  async create(subCategory: SubCategoryEntity): Promise<number> {
    // Verificar si la categoría existe
    const categoryExists = await this.categoryRepository.findOne({
      where: { id: subCategory.category.id },
    });

    if (!categoryExists) {
      throw new HttpException('La categoría no existe', HttpStatus.BAD_REQUEST);
    }

    const subCategoryCreated =
      await this.subCategoryRepository.save(subCategory);
    return subCategoryCreated.id;
  }

  async update(subCategory: SubCategoryEntity) {
    const subCategoryExist = await this.subCategoryRepository.findOne({
      where: { id: subCategory.id },
    });

    if (!subCategoryExist) {
      throw new HttpException(
        'Subcategoría no encontrada',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Verificar si la categoría existe antes de actualizar
    const categoryExists = await this.categoryRepository.findOne({
      where: { id: subCategory.category.id },
    });

    if (!categoryExists) {
      throw new HttpException('La categoría no existe', HttpStatus.BAD_REQUEST);
    }

    await this.subCategoryRepository.update(subCategory.id, subCategory);
  }

  async delete(id: number) {
    const subCategoryExist = await this.subCategoryRepository.findOne({
      where: { id },
    });

    if (!subCategoryExist) {
      throw new HttpException(
        'Subcategoría no encontrada',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.subCategoryRepository.softDelete(id);
  }

  async findOne(id: number): Promise<SubCategoryEntity> {
    const subCategory = await this.subCategoryRepository.findOne({
      where: { id },
      relations: ['category'], // Incluir la relación con la categoría
    });

    if (!subCategory) {
      throw new HttpException(
        'Subcategoría no encontrada',
        HttpStatus.BAD_REQUEST,
      );
    }

    return subCategory;
  }
}
