import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecificationTypeEntity } from '../../shared/entities/specificationType.entity';
import { CreateOrUpdateSpecificationTypeDto } from '../dto/specification-type.dto';

@Injectable()
export class CrudSpecificationTypeService {
  constructor(
    @InjectRepository(SpecificationTypeEntity)
    private readonly specificationTypeRepository: Repository<SpecificationTypeEntity>,
  ) {}

  async create(createSpecificationTypeDto: CreateOrUpdateSpecificationTypeDto) {
    const specificationType = this.specificationTypeRepository.create(createSpecificationTypeDto);
    return await this.specificationTypeRepository.save(specificationType);
  }

  async update(updateSpecificationTypeDto: CreateOrUpdateSpecificationTypeDto) {
    const specificationTypeExist = await this.specificationTypeRepository.findOne({
      where: { id: updateSpecificationTypeDto.id },
    });

    if (!specificationTypeExist) {
      throw new NotFoundException(
        `Specification Type with ID ${updateSpecificationTypeDto.id} not found`,
      );
    }

    this.specificationTypeRepository.merge(specificationTypeExist, updateSpecificationTypeDto);
    return await this.specificationTypeRepository.save(specificationTypeExist);
  }

  async findAll() {
    return await this.specificationTypeRepository.find();
  }

  async findOne(id: number) {
    const specificationType = await this.specificationTypeRepository.findOne({
      where: { id },
    });
    if (!specificationType) {
      throw new NotFoundException(`Specification Type with ID ${id} not found`);
    }
    return specificationType;
  }

  async remove(id: number) {
    const specificationType = await this.findOne(id);
    return await this.specificationTypeRepository.softDelete(id);
  }
}
