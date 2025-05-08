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
import { SubcategoryEntity } from './subcategory.entity';
import { ProductSpecificationEntity } from './productEspecification.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('varchar', { length: 255 })
  image: string;

  @ManyToOne(() => SubcategoryEntity)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: SubcategoryEntity;

  @CreateDateColumn()
  createdAt?: Timestamp;

  @UpdateDateColumn()
  updatedAt?: Timestamp;

  @DeleteDateColumn()
  deletedAt?: Timestamp;

  @OneToMany(() => ProductSpecificationEntity, (ps) => ps.product)
  specifications?: ProductSpecificationEntity[];
}
