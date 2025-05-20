import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSpecificationEntity } from '../../shared/entities/productEspecification.entity';
import { CreateOrUpdateProductSpecificationDto } from '../dto/product-specification.dto';

@Injectable()
export class CrudProductSpecificationService {
  constructor(
    @InjectRepository(ProductSpecificationEntity)
    private readonly productSpecificationRepository: Repository<ProductSpecificationEntity>,
  ) {}

  async create(createProductSpecificationDto: CreateOrUpdateProductSpecificationDto) {
    const { productId, specificationId, titleId, typeId } = createProductSpecificationDto;
    
    const productSpecification = this.productSpecificationRepository.create({
      product: { id: productId },
      specification: { id: specificationId },
      title: { id: titleId },
      type: { id: typeId }
    });
    return await this.productSpecificationRepository.save(productSpecification);
  }

  async update(updateProductSpecificationDto: CreateOrUpdateProductSpecificationDto) {
    const { id, productId, specificationId, titleId, typeId } = updateProductSpecificationDto;
    
    const productSpecificationExist = await this.productSpecificationRepository.findOne({
      where: { id },
      relations: ['product', 'specification', 'title', 'type']
    });

    if (!productSpecificationExist) {
      throw new NotFoundException(`Product Specification with ID ${id} not found`);
    }

    this.productSpecificationRepository.merge(productSpecificationExist, {
      product: { id: productId },
      specification: { id: specificationId },
      title: { id: titleId },
      type: { id: typeId }
    });
    return await this.productSpecificationRepository.save(productSpecificationExist);
  }

  async findAll() {
    return await this.productSpecificationRepository.find({
      relations: ['product', 'specification', 'title', 'type']
    });
  }

  async findOne(id: number) {
    const productSpecification = await this.productSpecificationRepository.findOne({
      where: { id },
      relations: ['product', 'specification', 'title', 'type']
    });
    if (!productSpecification) {
      throw new NotFoundException(`Product Specification with ID ${id} not found`);
    }
    return productSpecification;
  }

  async findByProductId(productId: number) {
    return await this.productSpecificationRepository.find({
      where: { product: { id: productId } },
      relations: ['product', 'specification', 'title', 'type']
    });
  }

  async remove(id: number) {
    const productSpecification = await this.findOne(id);
    return await this.productSpecificationRepository.softDelete(id);
  }
}
