import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecificationEntity } from '../../shared/entities/specification.entity';
import { CreateOrUpdateSpecificationDto } from '../dto/specification.dto';

@Injectable()
export class CrudSpecificationService {
  constructor(
    @InjectRepository(SpecificationEntity)
    private readonly specificationRepository: Repository<SpecificationEntity>,
  ) {}

  async create(createSpecificationDto: CreateOrUpdateSpecificationDto) {
    const specification = this.specificationRepository.create(createSpecificationDto);
    return await this.specificationRepository.save(specification);
  }

  async update(updateSpecificationDto: CreateOrUpdateSpecificationDto) {
    const specificationExist = await this.specificationRepository.findOne({
      where: { id: updateSpecificationDto.id },
    });

    if (!specificationExist) {
      throw new NotFoundException(
        `Specification with ID ${updateSpecificationDto.id} not found`,
      );
    }

    this.specificationRepository.merge(specificationExist, updateSpecificationDto);
    return await this.specificationRepository.save(specificationExist);
  }

  async findAll() {
    return await this.specificationRepository.find();
  }

  async findOne(id: number) {
    const specification = await this.specificationRepository.findOne({
      where: { id },
    });
    if (!specification) {
      throw new NotFoundException(`Specification with ID ${id} not found`);
    }
    return specification;
  }

  async remove(id: number) {
    const specification = await this.findOne(id);
    return await this.specificationRepository.softDelete(id);
  }
}
