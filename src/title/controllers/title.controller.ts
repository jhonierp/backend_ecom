import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateOrUpdateTitleDto } from '../dto/title.dto';
import { TitleUseCase } from '../usecase/title.usecase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('title')
@ApiBearerAuth()
@Controller('title')
export class TitleController {
  constructor(private readonly titleUseCase: TitleUseCase) {}

  @Post()
  create(@Body() createTitleDto: CreateOrUpdateTitleDto) {
    return this.titleUseCase.createTitle(createTitleDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTitleDto: CreateOrUpdateTitleDto,
  ) {
    return this.titleUseCase.updateTitle({ ...updateTitleDto, id: +id });
  }

  @Get()
  findAll() {
    return this.titleUseCase.getAllTitles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.titleUseCase.getTitleById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.titleUseCase.deleteTitle(+id);
  }
}
