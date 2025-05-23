import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImageEntity } from 'src/shared/entities/productImage.entity';

@Injectable()
export class CrudImageProductService {
  constructor(
    @InjectRepository(ProductImageEntity)
    private readonly imageRepo: Repository<ProductImageEntity>,
  ) {}

  async create(images: ProductImageEntity[]): Promise<ProductImageEntity[]> {
    return await this.imageRepo.save(images);
  }

  async findAll(): Promise<ProductImageEntity[]> {
    return await this.imageRepo.find({ relations: ['product'] });
  }

  async findOne(id: number): Promise<ProductImageEntity> {
    return await this.imageRepo.findOne({
      where: { id },
      relations: ['product'],
    });
  }

  async delete(id: number): Promise<void> {
    await this.imageRepo.delete(id);
  }

  async deleteByProductId(productId: number): Promise<void> {
    await this.imageRepo.delete({ product: { id: productId } });
  }

  async update(
    productId: number,
    newImages: ProductImageEntity[],
  ): Promise<ProductImageEntity[]> {
    await this.deleteByProductId(productId);
    return await this.imageRepo.save(newImages);
  }
  async deleteMany(images: ProductImageEntity[]) {
    const ids = images.map((img) => img.id);
    return this.imageRepo.delete(ids);
  }
}
