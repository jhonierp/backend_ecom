import { Injectable } from '@nestjs/common';
import { CrudSpecificationTypeService } from '../services/crudSpecificationType.service';
import { CreateOrUpdateSpecificationTypeDto } from '../dto/specification-type.dto';

@Injectable()
export class SpecificationTypeUseCase {
  constructor(private readonly crudSpecificationTypeService: CrudSpecificationTypeService) {}

  async createSpecificationType(createSpecificationTypeDto: CreateOrUpdateSpecificationTypeDto) {
    return await this.crudSpecificationTypeService.create(createSpecificationTypeDto);
  }

  async updateSpecificationType(updateSpecificationTypeDto: CreateOrUpdateSpecificationTypeDto) {
    return await this.crudSpecificationTypeService.update(updateSpecificationTypeDto);
  }

  async getAllSpecificationTypes() {
    return await this.crudSpecificationTypeService.findAll();
  }

  async getSpecificationTypeById(id: number) {
    return await this.crudSpecificationTypeService.findOne(id);
  }

  async deleteSpecificationType(id: number) {
    return await this.crudSpecificationTypeService.remove(id);
  }
}
