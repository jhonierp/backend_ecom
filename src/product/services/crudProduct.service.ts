import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/shared/entities/product.entity';

@Injectable()
export class CrudProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ['subcategory', 'subcategory.category'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['subcategory', 'subcategory.category'],
    });
    if (!product) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async update(id: number, product: ProductEntity) {
    const productExist = await this.findOne(id);
    this.productRepository.merge(productExist, product);
    return await this.productRepository.save(productExist);
  }

  async delete(id: number) {
    const product = await this.findOne(id);
    return await this.productRepository.softDelete(id);
  }
}
