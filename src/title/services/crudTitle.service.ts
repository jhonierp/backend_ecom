import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TitleEntity } from '../../shared/entities/title.entity';
import { CreateOrUpdateTitleDto } from '../dto/title.dto';

@Injectable()
export class CrudTitleService {
  constructor(
    @InjectRepository(TitleEntity)
    private readonly titleRepository: Repository<TitleEntity>,
  ) {}

  async create(createTitleDto: CreateOrUpdateTitleDto): Promise<TitleEntity> {
    const title = this.titleRepository.create(createTitleDto);
    return await this.titleRepository.save(title);
  }

  async update(updateTitleDto: CreateOrUpdateTitleDto) {
    const titleExist = await this.titleRepository.findOne({
      where: { id: updateTitleDto.id },
    });

    if (!titleExist) {
      throw new NotFoundException(`Title with ID ${updateTitleDto.id} not found`);
    }

    this.titleRepository.merge(titleExist, updateTitleDto);
    return await this.titleRepository.save(titleExist);
  }

  async findAll() {
    return await this.titleRepository.find();
  }

  async findOne(id: number) {
    const title = await this.titleRepository.findOne({
      where: { id },
    });
    if (!title) {
      throw new NotFoundException(`Title with ID ${id} not found`);
    }
    return title;
  }

  async remove(id: number) {
    const title = await this.findOne(id);
    return await this.titleRepository.softDelete(id);
  }
}
