import { Injectable } from '@nestjs/common';
import { CrudSpecificationService } from '../services/crudSpecification.service';
import { CreateOrUpdateSpecificationDto } from '../dto/specification.dto';

@Injectable()
export class SpecificationUseCase {
  constructor(private readonly crudSpecificationService: CrudSpecificationService) {}

  async createSpecification(createSpecificationDto: CreateOrUpdateSpecificationDto) {
    return await this.crudSpecificationService.create(createSpecificationDto);
  }

  async updateSpecification(updateSpecificationDto: CreateOrUpdateSpecificationDto) {
    return await this.crudSpecificationService.update(updateSpecificationDto);
  }

  async getAllSpecifications() {
    return await this.crudSpecificationService.findAll();
  }

  async getSpecificationById(id: number) {
    return await this.crudSpecificationService.findOne(id);
  }

  async deleteSpecification(id: number) {
    return await this.crudSpecificationService.remove(id);
  }
}
