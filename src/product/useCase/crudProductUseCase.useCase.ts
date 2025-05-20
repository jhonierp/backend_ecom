import { Injectable } from '@nestjs/common';
import { CrudProductService } from '../services/crudProduct.service';
import { CreateOrUpdateProductDto } from '../dto/product.dto';
import { ProductEntity } from 'src/shared/entities/product.entity';
import { CrudSubCategoryService } from 'src/subcategory/services/crudSubCategory.service';

@Injectable()
export class CrudProductUseCase {
  constructor(
    private readonly crudProductService: CrudProductService,
    private readonly crudSubcategoryService: CrudSubCategoryService,
  ) {}

  async create(productDto: CreateOrUpdateProductDto) {
    const subcategory = await this.crudSubcategoryService.findOne(
      productDto.subcategoryId,
    );

    const product: ProductEntity = {
      name: productDto.name,
      description: productDto.description,
      price: productDto.price,
      image: productDto.image,
      subcategory,
    };
    return await this.crudProductService.create(product);
  }

  async findAll() {
    return await this.crudProductService.findAll();
  }

  async findOne(id: number) {
    return await this.crudProductService.findOne(id);
  }

  async update(productDto: CreateOrUpdateProductDto) {
    const subcategory = await this.crudSubcategoryService.findOne(
      productDto.subcategoryId,
    );

    const product: ProductEntity = {
      name: productDto.name,
      description: productDto.description,
      price: productDto.price,
      image: productDto.image,
      subcategory,
    };

    return await this.crudProductService.update(productDto.id, product);
  }

  async delete(id: number) {
    return await this.crudProductService.delete(id);
  }
}
