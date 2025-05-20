import { Injectable } from '@nestjs/common';
import { CrudProductSpecificationService } from '../services/crudProductSpecification.service';
import { CreateOrUpdateProductSpecificationDto } from '../dto/product-specification.dto';

@Injectable()
export class ProductSpecificationUseCase {
  constructor(
    private readonly crudProductSpecificationService: CrudProductSpecificationService,
  ) {}

  async createProductSpecification(
    createProductSpecificationDto: CreateOrUpdateProductSpecificationDto,
  ) {
    return await this.crudProductSpecificationService.create(
      createProductSpecificationDto,
    );
  }

  async updateProductSpecification(
    updateProductSpecificationDto: CreateOrUpdateProductSpecificationDto,
  ) {
    return await this.crudProductSpecificationService.update(
      updateProductSpecificationDto,
    );
  }

  async getAllProductSpecifications() {
    return await this.crudProductSpecificationService.findAll();
  }

  async getProductSpecificationById(id: number) {
    return await this.crudProductSpecificationService.findOne(id);
  }

  async getProductSpecificationsByProductId(productId: number) {
    return await this.crudProductSpecificationService.findByProductId(productId);
  }

  async deleteProductSpecification(id: number) {
    return await this.crudProductSpecificationService.remove(id);
  }
}
