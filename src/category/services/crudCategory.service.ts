import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../repositories/categoryRepository.repository';
import { CategoryEntity } from 'src/shared/entities/category.entity';

@Injectable()
export class CrudCategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(category: CategoryEntity): Promise<number> {
    const categoryCreated = await this.categoryRepository.save(category);
    return categoryCreated.id;
  }

  async update(category: CategoryEntity) {
    const categoryExist = await this.categoryRepository.findOne({
      where: { id: category.id },
    });

    if (!categoryExist) {
      throw new HttpException(
        'categoria no encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.categoryRepository.update(category.id, category);
  }

  async delete(id: number) {
    const categoryExist = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!categoryExist) {
      throw new HttpException(
        'categoria no encontrada',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.categoryRepository.softDelete(id);
  }
}
