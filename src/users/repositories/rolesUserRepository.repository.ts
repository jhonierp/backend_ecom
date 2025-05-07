import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RolesUserEntity } from 'src/shared/entities/rolesUser.entity';

@Injectable()
export class RolesUserRepository extends Repository<RolesUserEntity> {
  constructor(dataSource: DataSource) {
    super(RolesUserEntity, dataSource.createEntityManager());
  }
}
