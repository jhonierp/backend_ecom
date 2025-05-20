import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/shared/entities/product.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(dataSource: DataSource) {
    super(ProductRepository, dataSource.createEntityManager());
  }
}
