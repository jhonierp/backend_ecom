import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { SubCategoryEntity } from './subcategory.entity';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @CreateDateColumn()
  createdAt?: Timestamp;

  @UpdateDateColumn()
  updatedAt?: Timestamp;

  @DeleteDateColumn()
  deletedAt?: Timestamp;

  @OneToMany(() => SubCategoryEntity, (sub) => sub.category)
  subcategories?: SubCategoryEntity[];
}
