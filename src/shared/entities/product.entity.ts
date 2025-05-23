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

import { ProductSpecificationEntity } from './productEspecification.entity';
import { SubCategoryEntity } from './subcategory.entity';
import { ProductImageEntity } from './ProductImage.entity';

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

  @OneToMany(() => ProductImageEntity, (image) => image.product, {
    cascade: true, // importante para que se guarden las imágenes automáticamente
  })
  images: ProductImageEntity[];

  @ManyToOne(() => SubCategoryEntity)
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: SubCategoryEntity;

  @CreateDateColumn()
  createdAt?: Timestamp;

  @UpdateDateColumn()
  updatedAt?: Timestamp;

  @DeleteDateColumn()
  deletedAt?: Timestamp;

  @OneToMany(() => ProductSpecificationEntity, (ps) => ps.product)
  specifications?: ProductSpecificationEntity[];
}
