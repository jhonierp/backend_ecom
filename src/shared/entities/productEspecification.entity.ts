import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { SpecificationEntity } from './specification.entity';
import { SpecificationTypeEntity } from './specificationType.entity';
import { TitleEntity } from './title.entity';

@Entity('product_specifications')
export class ProductSpecificationEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.specifications)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => SpecificationEntity)
  @JoinColumn({ name: 'specification_id' })
  specification: SpecificationEntity;

  @ManyToOne(() => TitleEntity)
  @JoinColumn({ name: 'title_id' })
  title: TitleEntity;

  @ManyToOne(() => SpecificationTypeEntity)
  @JoinColumn({ name: 'specification_type_id' })
  type: SpecificationTypeEntity;

  @CreateDateColumn()
  createdAt?: Timestamp;

  @UpdateDateColumn()
  updatedAt?: Timestamp;

  @DeleteDateColumn()
  deletedAt?: Timestamp;
}
