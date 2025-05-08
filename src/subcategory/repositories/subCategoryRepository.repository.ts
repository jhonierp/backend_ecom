import { Injectable } from '@nestjs/common';
import { SubCategoryEntity } from 'src/shared/entities/subcategory.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SubCategoryRepository extends Repository<SubCategoryEntity> {
  constructor(dataSource: DataSource) {
    super(SubCategoryEntity, dataSource.createEntityManager());
  }
}
