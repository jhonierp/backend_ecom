import { Injectable } from '@nestjs/common';
import { CrudTitleService } from '../services/crudTitle.service';
import { CreateOrUpdateTitleDto } from '../dto/title.dto';

@Injectable()
export class TitleUseCase {
  constructor(private readonly crudTitleService: CrudTitleService) {}

  async createTitle(createTitleDto: CreateOrUpdateTitleDto) {
    return await this.crudTitleService.create(createTitleDto);
  }

  async updateTitle(updateTitleDto: CreateOrUpdateTitleDto) {
    return await this.crudTitleService.update(updateTitleDto);
  }

  async getAllTitles() {
    return await this.crudTitleService.findAll();
  }

  async getTitleById(id: number) {
    return await this.crudTitleService.findOne(id);
  }

  async deleteTitle(id: number) {
    return await this.crudTitleService.remove(id);
  }
}
