import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from './roles.entity';

@Entity('RolesUser')
export class RolesUserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id?: number;

  @Column({ type: 'bigint', nullable: false })
  userId: number;

  @Column({ type: 'bigint', nullable: false })
  roleId: number;

  @CreateDateColumn()
  createdAt?: Timestamp;

  @UpdateDateColumn()
  updatedAt?: Timestamp;

  @DeleteDateColumn()
  deletedAt?: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.rolesUser)
  @JoinColumn({ name: 'userId' })
  user?: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.rolesUser)
  @JoinColumn({ name: 'roleId' })
  role?: RoleEntity;
}
